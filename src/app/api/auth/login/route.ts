import { z } from 'zod';
import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
import { NextResponse, NextRequest } from 'next/server';
const prisma = new PrismaClient();

const schema = z.object({
    email: z.string().email(),
    password: z.string(),
});

export async function POST(req: NextRequest) {
    if (req.method !== 'POST') {
        return NextResponse.json(
            { message: 'HTTP method not allowed', success: false },
            { status: 405 }
        );
    }
    const body = await req.json();
    const result = schema.safeParse(body);

    if (!result.success) {
        return NextResponse.json(
            { message: 'Invalid data', success: false },
            { status: 400 }
        );
    }

    const { email, password } = result.data;
    const user = await prisma.user.findUnique({
        where: {
            email,
        },
    });

    if (!user) {
        return NextResponse.json(
            { message: 'Invalid email or password', success: false },
            { status: 400 }
        );
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
        return NextResponse.json(
            { message: 'Invalid email or password', success: false },
            { status: 400 }
        );
    }

    if (!process.env.JWT_SECRET) {
        throw new Error('JWT_SECRET is not defined');
    }

    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
        expiresIn: '1d',
    });

    return NextResponse.json(
        { message: 'Login successful', token, success: true },
        { status: 200 }
    );
}
