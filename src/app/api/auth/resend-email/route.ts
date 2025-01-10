import { z } from 'zod';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
import sendgrid from '@sendgrid/mail';
import { NextResponse, NextRequest } from 'next/server';

const prisma = new PrismaClient();

const schema = z.object({
    mail_token: z.string(),
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

    const { mail_token } = result.data;

    if (!process.env.JWT_SECRET) {
        throw new Error('JWT_SECRET is not defined');
    }

    let decoded;
    try {
        decoded = jwt.verify(mail_token, process.env.JWT_SECRET) as { email: string };
    } catch (error) {
        console.error('Error verifying token:', error);
        return NextResponse.json({ message: 'Invalid token', success: false }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
        where: { email: decoded.email },
    });

    if (!user) {
        return NextResponse.json({ message: 'Invalid token', success: false }, { status: 400 });
    }

    if (!process.env.SENDGRID_TOKEN) {
        throw new Error('SENDGRID_TOKEN is not defined');
    }

    const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, { expiresIn: '1d' });

    try {
        sendgrid.setApiKey(process.env.SENDGRID_TOKEN);
        await sendgrid.send({
            to: user.email,
            from: 'projex.verif@gmail.com',
            subject: 'ProjeX - Verify your email',
            text: `Click here to verify your email: http://localhost:3000/auth/verify-email?token=${token}`,
        });
    } catch (error) {
        console.error('Error sending email:', error);
        return NextResponse.json({ message: 'Error sending email', success: false }, { status: 500 });
    }

    return NextResponse.json({ message: "Resend mail was successfully sent", mail_token: token, success: true }, { status: 200 });
}
