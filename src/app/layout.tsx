import type { Metadata } from "next";
import React from "react";
import './global.css';
import Navbar from "@/components/Navbar";

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
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
