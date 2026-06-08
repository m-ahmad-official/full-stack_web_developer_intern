import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Taskly — To-Do List App",
  description: "A clean and modern to-do list application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
