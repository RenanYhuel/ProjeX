import type { NextApiRequest, NextApiResponse } from 'next'
import { z } from 'zod';
import bcrypt from 'bcrypt'
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const schema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
    name: z.string(),
    firstname: z.string(),
});

export default async function handler(req: NextApiRequest,res: NextApiResponse
) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Méthode HTTP non autorisée' });
    }
    const body = req.body;
    const result = schema.safeParse(body);

    if (!result.success) {
        return res.status(400).json({ message: 'Données invalides' });
    }

    const { email, password, name, firstname } = result.data;
    const saltRounds = 10;
    try {
        const hash = await bcrypt.hash(password, saltRounds);
        await prisma.user.create({
            data: {
                email,
                password: hash,
                name,
                firstname,
            },
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Erreur lors du hashage du mot de passe ou de la création de l\'utilisateur' });
    }

    res.status(200).json({ message: 'Inscription réussie' });
}