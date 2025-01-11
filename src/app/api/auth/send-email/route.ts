import { z } from 'zod';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
import sendgrid from '@sendgrid/mail';
import { NextResponse, NextRequest } from 'next/server';

const prisma = new PrismaClient();
const rateLimitMap = new Map<string, { lastRequest: number, requestCount: number }>();

const schema = z.object({
    email: z.string().email(),
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

    const email = body.email;
    const now = Date.now();

    const rateLimit = rateLimitMap.get(email);
    if (rateLimit) {
        const timeSinceLastRequest = now - rateLimit.lastRequest;
        if (timeSinceLastRequest < 2 * 60 * 1000) {
            return NextResponse.json({ message: 'Too many requests, please try again later', success: false }, { status: 429 });
        }
        rateLimit.lastRequest = now;
        rateLimit.requestCount += 1;
    } else {
        rateLimitMap.set(email, { lastRequest: now, requestCount: 1 });
    }

    // Check daily rate limit in database
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const requestCount = await prisma.emailRequest.count({
        where: {
            email: email,
            createdAt: {
                gte: today,
            },
        },
    });

    if (requestCount >= 5) {
        return NextResponse.json({ message: 'Daily request limit reached', success: false }, { status: 429 });
    }

    // Log the request in the database
    await prisma.emailRequest.create({
        data: {
            email: email,
        },
    });

    if (!process.env.JWT_SECRET) {
        throw new Error('JWT_SECRET is not defined');
    }

    const user = await prisma.user.findUnique({
        where: { email: email },
    });

    if (!user) {
        return NextResponse.json({ message: 'Invalid token', success: false }, { status: 400 });
    }

    if (user.isEmailVerified) {
        return NextResponse.json({ message: 'Email already verified', already: true, success: false }, { status: 400 });
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

    try {
        await prisma.user.update({
            where: { email: email },
            data: { emailVerificationToken: token },
        });
    } catch (error) {
        console.error('Error updating user:', error);
        return NextResponse.json({ message: 'Error updating user', success: false }, { status: 500 });
    }

    return NextResponse.json({ message: "Mail was successfully sent", success: true }, { status: 200 });
}
