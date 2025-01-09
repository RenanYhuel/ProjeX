import type { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';
import jwt from 'jsonwebtoken';

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
        return res.status(400).json({ message: 'Invalid data', success: false });
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
        res.status(200).json({ message: 'Token is valid', success: true });
    } catch (error) {
        console.log(error);
        res.status(401).json({ message: 'Invalid or expired token', success: false });
    }
}
