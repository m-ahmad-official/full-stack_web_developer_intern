import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ChatFlow — Real-time Messaging",
  description: "Real-time chat application built with Socket.io",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
