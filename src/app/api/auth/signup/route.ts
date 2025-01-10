import { z } from 'zod';
import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
import sendgrid from '@sendgrid/mail';
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
    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
        expiresIn: '1h',
    });
    try {
        const hash = await bcrypt.hash(password, saltRounds);
        await prisma.user.create({
            data: {
                email,
                password: hash,
                lastName: name,
                firstName: firstname,
                isEmailVerified: false,
                emailVerificationToken: token,
            },
        });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: 'Error hashing password or creating user', success: false }, { status: 500 });
    }

    if (!process.env.SENDGRID_TOKEN) {
        throw new Error('SENDGRID_TOKEN is not defined');
    }

    try {
        sendgrid.setApiKey(process.env.SENDGRID_TOKEN);
        await sendgrid.send({
            to: email,
            from: 'projex.verif@gmail.com',
            subject: 'ProjeX - Verify your email',
            text: `Click here to verify your email: http://localhost:3000/auth/verify-email?token=${token}`,
        });
    } catch (error) {
        console.error('Error sending email:', error);
        return NextResponse.json({ message: 'Error sending email', success: false }, { status: 500 });
    }
    return NextResponse.json({ message: 'Registration successful', mail_token: token, success: true }, { status: 200 });
}
