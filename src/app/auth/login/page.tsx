"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import checkSession from '@/utils/checkSession';
import { SessionData } from '@/types/sessionData';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [needToVerify, setNeedToVerify] = useState(false);
    const [mailToken, setMailToken] = useState('');
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            checkSession(token).then((data: SessionData) => {
                if (data.success) {
                    router.push('/');
                }
            });
        }
    }, [router]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setNeedToVerify(false);
        let valid = true;

        if (!email) {
            setEmailError('Email is required');
            valid = false;
        } else {
            setEmailError('');
        }

        if (!password) {
            setPasswordError('Password is required');
            valid = false;
        } else {
            setPasswordError('');
        }

        if (!valid) return;

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
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4 sm:p-6 lg:p-8">
            <div className="w-full max-w-md">
                <div className="bg-white p-8 rounded-lg shadow-md">
                    <h1 className="text-2xl font-bold mb-6">Login</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-gray-700">Email:</label>
                            <input
                                type="email"
                                className="w-full mt-2 p-2 border rounded"
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                    if (e.target.value) setEmailError('');
                                }}
                            />
                            {emailError && <p className="mt-2 text-red-500">{emailError}</p>}
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Password:</label>
                            <input
                                type="password"
                                className="w-full mt-2 p-2 border rounded"
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                    if (e.target.value) setPasswordError('');
                                }}
                            />
                            {passwordError && <p className="mt-2 text-red-500">{passwordError}</p>}
                        </div>
                        {error && <p className="mt-2 text-red-500">{error}</p>}
                        <div className="flex justify-between items-center mt-5">
                            <p>
                                Don&apos;t have an account?{' '}<br/>
                                <a href="/auth/signup" className="text-blue-500 underline">
                                    Create one
                                </a>
                            </p>
                            <button
                                type="submit"
                                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                            >
                                Login
                            </button>
                        </div>
                    </form>
                    {needToVerify && (
                        <div className="mt-4">
                            <p className="text-red-500">You need to verify your email.</p>
                            <button
                                className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 mt-2"
                                onClick={handleResendEmail}
                            >
                                Resend Verification Email
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}