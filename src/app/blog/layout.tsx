// src/app/blog/layout.tsx
import { Inter } from "next/font/google";
import { Geist, Geist_Mono } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });
const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={`${geistSans.variable} ${geistMono.variable} min-h-screen antialiased text-foreground font-mono`}
    >
      <main className="dark:text-gray-100">{children}</main>
    </div>
  );
}
