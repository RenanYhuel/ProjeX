import type { Metadata } from "next";
import React from "react";
import './global.css'

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
      <body>
        {children}
      </body>
    </html>
  );
}
