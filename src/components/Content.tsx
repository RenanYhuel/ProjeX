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
<div className="min-h-screen flex flex-col bg-[#eee] overflow-x-hidden overflow-y-hidden">
    <div className="flex flex-grow w-full overflow-x-hidden overflow-y-hidden">
        <Sidebar />
        <div className="flex flex-col w-full flex-grow overflow-hidden">
            <Navbar />
            <main className="flex flex-col w-full flex-grow p-4 box-border bg-[#eee] z-[4000] main">
                <div className='bg-[#f6f6f9] w-full h-full rounded-[25px] overflow-hidden p-0'>
                    <div className="p-6  overflow-y-auto w-full h-full">
                        {children}
                    </div>
                </div>
            </main>
        </div>
    </div>
</div>





            )}
        </>
    )
}