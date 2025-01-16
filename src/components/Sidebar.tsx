"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <div className="min-h-full bg-[#f6f6f9] w-[230px] z-[2000] h-screen">
      <div className="flex h-16 w-full items-center justify-center p-[20px] text-[24px]">
        <span className="text-3xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Proje<span className="text-purple-600">X</span>
        </span>
      </div>
      <div>
        <ul className="mt-[48px] w-full">
          <li className={`h-[48px] bg-transparent ml-[6px] rounded-l-[48px] p-[4px] sidebar ${pathname === '/' ? 'active' : ''}`}>
            <Link href="/" className="w-full h-full bg-[#f6f6f9] flex items-center rounded-[48px] text-[16px] text-[#363949] whitespace-nowrap">
              <span className="material-symbols-outlined ml-3">dashboard</span>
              <span className="ml-2">Dashboard</span>
            </Link>
          </li>
          <li className={`h-[48px] bg-transparent ml-[6px] rounded-l-[48px] p-[4px] sidebar ${pathname.includes('/projects') ? 'active' : ''}`}>
            <Link href="/projects" className="w-full h-full bg-[#f6f6f9] flex items-center rounded-[48px] text-[16px] text-[#363949] whitespace-nowrap">
              <span className="material-symbols-outlined ml-3">folder</span>
              <span className="ml-2">Projects</span>
            </Link>
          </li>
        </ul>
      </div>
      <ul className="mt-[48px] w-full">
        <li className="h-[48px] bg-transparent ml-[6px] rounded-l-[48px] p-[4px] sidebar">
          <Link href="#" className="w-full h-full bg-[#f6f6f9] flex items-center rounded-[48px] text-[16px] whitespace-nowrap text-red-600">
            <span className="material-symbols-outlined ml-3">logout</span>
            <span className="ml-2">Logout</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
