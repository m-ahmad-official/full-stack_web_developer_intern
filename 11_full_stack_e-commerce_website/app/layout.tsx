// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import SmoothScroll from "./components/SmoothScroll";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { Notification } from "./components/Notification";
import { Providers } from "./components/Providers";

export const metadata: Metadata = {
  title: "Coffee Vault — Premium Coffee Karachi",
  description:
    "Single-origin brews, specialty lattes and cold brew — delivered fresh to your door across Karachi.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-vault-dark">
        <SmoothScroll>
          <Providers>
            <Navbar />
            <Notification />
            <main className="flex-1">{children}</main>
            <Footer />
          </Providers>
        </SmoothScroll>
      </body>
    </html>
  );
}
