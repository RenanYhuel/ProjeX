"use client";

import React from 'react';
import Link from 'next/link';

const Sidebar = () => {

  return (
    <div className="min-h-full fixed top-0 left-0 bg-[#f6f6f9] w-[230px] h-[100px] z-[2000]">
      <div className="flex h-16 w-full items-center justify-center p-[20px] text-[24px]">
        <span className="text-3xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Proje<span className="text-purple-600">X</span>
        </span>
      </div>
      <div>
        <ul className="mt-[48px] w-full">
          <li className="h-[48px] bg-transparent ml-[6px] rounded-l-[48px] p-[4px] active sidebar">
            <Link href="/" className="w-full h-full bg-[#f6f6f9] flex items-center rounded-[48px] text-[16px] text-[#363949] whitespace-nowrap ">
              <span className="material-symbols-outlined ml-3">dashboard</span>
              <span className="ml-2">Dashboard</span>
            </Link>
          </li>
          <li className="h-[48px] bg-transparent ml-[6px] rounded-l-[48px] p-[4px] sidebar">
            <Link href="" className="w-full h-full bg-[#f6f6f9] flex items-center rounded-[48px] text-[16px] text-[#363949] whitespace-nowrap ">
              <span className="material-symbols-outlined ml-3">folder</span>
              <span className="ml-2">Projects</span>
            </Link>
          </li>
        </ul>
      </div>
      <ul className="mb-4">
        <li className="p-4">
          <Link href="#" className="flex items-center">
            <span className="material-symbols-outlined">logout</span>
            <span className="ml-2">Logout</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;