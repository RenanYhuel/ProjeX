"use client";
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import ExempleProfil from '@/assets/exemple-profile.avif';
import { usePathname, useRouter } from 'next/navigation';

export default function Navbar() {
    const [user, setUser] = useState<{ firstname: string, lastname: string } | null>(null);

    const router = useRouter();

    const pathname = usePathname();
    const noNavbarPaths = ["/auth/login", "/auth/signup", "/auth/verify-email"];
    const showNavbar = !noNavbarPaths.includes(pathname);


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
        <>
        {showNavbar && (
            <nav className="bg-white shadow-md flex justify-between items-center relative h-16">
                <div className="flex items-center h-full px-6">
                    <span className="text-3xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        Proje<span className="text-purple-600">X</span>
                    </span>
                </div>
                <div className="flex items-center space-x-4 px-4">
                    <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                            <span className="material-symbols-outlined">notifications</span>
                        </div>
                        {user && (
                            <span className="font-medium">{`${user.firstname} ${user.lastname}`}</span>
                        )}
                        <Image src={ExempleProfil} alt="Profile" width={40} height={40} className="rounded-full" />
                    </div>
                </div>
            </nav>
        )}
        </>
    );
};

