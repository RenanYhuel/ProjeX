import { z } from 'zod';
import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';
import { NextResponse, NextRequest } from 'next/server';
const prisma = new PrismaClient();

const schema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
    name: z.string(),
    firstname: z.string(),
});

export async function POST(req: NextRequest) {
    if (req.method !== 'POST') {
        return NextResponse.json({ message: 'HTTP method not allowed', success: false }, { status: 405 });
    }
    const body = await req.json();
    console.log(req.body)
    const result = schema.safeParse(body);
    if (!result.success) {
        return NextResponse.json({ message: 'Invalid data', success: false }, { status: 400 });
    }

    const { email, password, name, firstname } = result.data;
    const userExists = await prisma.user.findUnique({
        where: {
            email,
        },
    });
    if (userExists) {
        return NextResponse.json({ message: 'This email is already associated with an account', success: false }, { status: 400 });
    }

    if (!process.env.JWT_SECRET) {
        throw new Error('JWT_SECRET is not defined');
    }

    const saltRounds = 10;
    try {
        const hash = await bcrypt.hash(password, saltRounds);
        await prisma.user.create({
            data: {
                email,
                password: hash,
                lastName: name,
                firstName: firstname,
                isEmailVerified: false,
            },
        });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: 'Error hashing password or creating user', success: false }, { status: 500 });
    }

    return NextResponse.json({ message: 'Registration successful', success: true }, { status: 200 });
}
