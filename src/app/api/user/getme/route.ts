import { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

const secret = process.env.JWT_SECRET;

export async function GET(req: NextRequest) {
    try {
        const token = req.headers.get('x-token');

        if (!token) {
            return NextResponse.json({ message: 'Token is missing', success: false }, { status: 401 });
        }

        let decoded;
        if (!secret) {
            return NextResponse.json({ message: 'Secret key is missing', success: false }, { status: 500 });
        }
        try {
            decoded = jwt.verify(token, secret) as jwt.JwtPayload;
        } catch (error) {
            console.log("Error verifying token", error);
            return NextResponse.json({ message: 'Invalid token', success: false }, { status: 401 });
        }

        const email = decoded.email;

        if (!email) {
            return NextResponse.json({ message: 'Email not found in token', success: false }, { status: 400 });
        }

        const user = await prisma.user.findUnique({
            where: { email },
            select: {
                email: true,
                lastName: true,
                firstName: true,
            },
        });

        if (!user) {
            return NextResponse.json({ message: 'User not found', success: false }, { status: 404 });
        }

        return NextResponse.json(user, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Internal server error', success: false }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}