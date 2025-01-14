import type { Metadata } from "next";
import React from "react";
import './global.css';
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";

export const metadata: Metadata = {
  title: "ProjeX",
  description: "A simple project management tool",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" />
      </head>
      <body className="min-h-screen relative flex flex-col bg-[#eee] overflow-x-hidden h-screen">
        <div className="flex h-full w-full">
          <Sidebar />
            <div className="h-full relative left-[230px] overflow-hidden box-border container">
            <Navbar />
            <main className="flex flex-col w-full h-full p-4 overflow-y-auto box-border m-w-full">
              {children}
            </main>
            </div>
        </div>
        
      </body>
    </html>
  );
}
