import type { Metadata } from "next";
import "./globals.css";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import SessionWrapper from "@/components/SessionWrapper";

export const metadata: Metadata = {
  title: "DevNotes — A Developer Blog",
  description: "Share your dev thoughts with the world",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="en">
      <body>
        <SessionWrapper session={session}>{children}</SessionWrapper>
      </body>
    </html>
  );
}
