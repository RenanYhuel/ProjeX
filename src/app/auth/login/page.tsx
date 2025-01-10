"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [needToVerify, setNeedToVerify] = useState(false);
    const [mailToken, setMailToken] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setNeedToVerify(false);

        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (data.success) {
            localStorage.setItem('token', data.token);
            router.push('/');
        } else if (data.need_to_verify) {
            setNeedToVerify(true);
            setMailToken(data.mail_token);
        } else {
            setError(data.message);
        }
    };

    const handleResendEmail = async () => {
        const response = await fetch('/api/auth/resend-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ mail_token: mailToken }),
        });

        const data = await response.json();

        if (data.success) {
            alert('Verification email sent successfully.');
        } else {
            setError(data.message);
        }
    };

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <button type="submit">Login</button>
            </form>
            {needToVerify && (
                <div>
                    <p>You need to verify your email.</p>
                    <button onClick={handleResendEmail}>Resend Verification Email</button>
                </div>
            )}
            <p>
                Don&apos;t have an account? <a href="/auth/signup">Create one</a>
            </p>
        </div>
    );
}