import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CineSearch — Movie App",
  description: "Search and discover movies",
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
