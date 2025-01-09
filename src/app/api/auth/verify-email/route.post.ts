import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
import { z } from 'zod';
const prisma = new PrismaClient();

const schema = z.object({
    token: z.string(),
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'HTTP method not allowed', success: false });
    }

    const body = req.body;
    const result = schema.safeParse(body);

    if (!result.success) {
        return res.status(400).json({ message: 'Invalid data', success : false});
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
            return res.status(400).json({ message: 'Invalid token', success: false });
        }

        await prisma.user.update({
            where: {
                email: decoded.email,
            },
            data: {
                isEmailVerified: true,
            },
        });

        res.status(200).json({ message: 'Email verified successfully', success: true });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Error verifying email', success: false });
    }
}
