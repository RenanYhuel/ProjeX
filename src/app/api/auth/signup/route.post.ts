import type { NextApiRequest, NextApiResponse } from 'next'
import { z } from 'zod';

const schema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
    name: z.string(),
    firstname: z.string(),
});

export default function handler(req: NextApiRequest,res: NextApiResponse
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

    res.status(200).json({ message: 'Inscription réussie' });
}