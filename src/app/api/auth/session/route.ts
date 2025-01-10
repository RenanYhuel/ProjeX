import { z } from 'zod';
import jwt from 'jsonwebtoken';
import { NextResponse, NextRequest } from 'next/server';

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

    const { token } = result.data;

    if (!process.env.JWT_SECRET) {
        throw new Error('JWT_SECRET is not defined');
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
            throw new Error('Invalid token');
        }
        return NextResponse.json({ message: 'Token is valid', success: true }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: 'Invalid or expired token', success: false }, { status: 401 });
    }
}
