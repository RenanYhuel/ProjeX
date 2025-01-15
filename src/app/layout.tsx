import type { Metadata } from "next";
import React from "react";
import './global.css';
import Content from "@/components/Content";

export const metadata: Metadata = {
  title: "ProjeX",
  description: "A simple project management tool",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" />
      </head>
      <body className="overflow-x-hidden">
        <Content>
          {children}
        </Content>
      </body>
    </html>
  );
}
