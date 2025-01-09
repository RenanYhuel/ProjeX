import type { NextApiRequest, NextApiResponse } from 'next'
import { z } from 'zod';
import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
import sendgrid from '@sendgrid/mail';
const prisma = new PrismaClient();

const schema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
    name: z.string(),
    firstname: z.string(),
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'HTTP method not allowed' });
    }
    const body = req.body;
    const result = schema.safeParse(body);

    if (!result.success) {
        return res.status(400).json({ message: 'Invalid data' });
    }

    const { email, password, name, firstname } = result.data;
    const userExists = await prisma.user.findUnique({
        where: {
            email,
        },
    });
    if (userExists) {
        return res.status(400).json({ message: 'This email is already associated with an account' });
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
        return res.status(500).json({ message: 'Error hashing password or creating user' });
    }

    if (!process.env.SENDGRID_API_KEY) {
        throw new Error('SENDGRID_API_KEY is not defined');
    }

    try {
        sendgrid.send(
            {
                to: email,
                from: 'projex.verif@gmail.com',
                subject: 'ProjeX - Verify your email',
                text: `Click here to verify your email: http://localhost:3000/api/auth/verify-email?token=${token}`,
            },
        )
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Error sending email' });
    }

    res.status(200).json({ message: 'Registration successful' });
}
