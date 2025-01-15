"use client";
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import ExempleProfil from '@/assets/exemple-profile.avif';
import {  useRouter } from 'next/navigation';

export default function Navbar() {
    const [user, setUser] = useState<{ firstname: string, lastname: string } | null>(null);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            fetch('/api/user/getme', {
                method: 'GET',
                headers: {
                    'X-TOKEN': token
                }
            })
            .then(response => response.json())
            .then(data => {
                setUser({ firstname: data.firstName, lastname: data.lastName });
            })
            .catch(error => {
                console.error('Error fetching user data:', error);
            });
        }
    }, [router]);

    return (
        <nav className="bg-[#f6f6f9] flex justify-between items-center relative h-16 nav px-4 m-w-full w-full">
            <div className="flex items-center space-x-4">
                <input
                    type="text"
                    placeholder="Search..."
                    className="px-2 py-1 border rounded"
                />
            </div>
            <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                    <span className="material-symbols-outlined">notifications</span>
                </div>
                {user && (
                    <span className="font-medium">{`${user.firstname} ${user.lastname}`}</span>
                )}
                <Image src={ExempleProfil} alt="Profile" width={40} height={40} className="rounded-full" />
            </div>
        </nav>
    );
};

