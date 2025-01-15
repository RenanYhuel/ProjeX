"use client";
import React from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { usePathname } from "next/navigation";

export default function Content({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    console.log(pathname);
    const noSidebarPaths = ["/auth/login", "/auth/signup", "/auth/verify-email"];
    const showSidebar = !noSidebarPaths.includes(pathname);
    console.log(showSidebar);

    return (
        <>
            {!showSidebar ? (
                children
            ) : (
<div className="min-h-screen flex flex-col bg-[#eee] overflow-x-hidden">
    <div className="flex flex-grow w-full">
        <Sidebar /> {/* La Sidebar prend déjà la hauteur de l'écran */}
        <div className="flex flex-col w-full flex-grow overflow-hidden">
            <Navbar />
            <main className="flex flex-col w-full flex-grow p-4 overflow-y-auto box-border bg-[#eee] z-[2001]">
                {children}
            </main>
        </div>
    </div>
</div>





            )}
        </>
    )
}