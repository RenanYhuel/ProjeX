import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import { NextResponse, NextRequest } from 'next/server';

const prisma = new PrismaClient();

const schema = z.object({
    token: z.string(),
});

export async function POST(req: NextRequest) {
    if (req.method !== 'POST') {
        return NextResponse.json({ message: 'HTTP method not allowed', success: false }, { status: 405 });
    }

    const body = await req.json();
    const result = schema.safeParse(body);

    if (!result.success) {
        return NextResponse.json({ message: 'Invalid data', success: false }, { status: 400 });
    }

    if (!process.env.JWT_SECRET) {
        throw new Error('JWT_SECRET is not defined');
    }

    try {
        const decoded = jwt.verify(result.data.token, process.env.JWT_SECRET) as { email: string };

        const user = await prisma.user.findUnique({
            where: {
                email: decoded.email,
            },
        });

        if (!user) {
            return NextResponse.json({ message: 'Invalid token', success: false }, { status: 400 });
        }

        if (user.isEmailVerified) {
            return NextResponse.json({ message: 'Email already verified', success: false, already: true }, { status: 400 });
        }

        await prisma.user.update({
            where: {
                email: decoded.email,
            },
            data: {
                isEmailVerified: true,
            },
        });

        return NextResponse.json({ message: 'Email verified successfully', success: true }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: 'Invalid or expired token', success: false }, { status: 500 });
    }
}
