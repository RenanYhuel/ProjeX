import { SessionData } from "@/types/sessionData";

export default async function checkSession(token: string): Promise<SessionData> {
    if (token) {
        const response = await fetch('/api/auth/session', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token }),
        });

        const data: SessionData = await response.json();

        return data;
    }

    return { message: 'No token provided', success: false };
}