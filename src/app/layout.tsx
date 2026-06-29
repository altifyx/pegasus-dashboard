import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pegasus | High-Performance Discord Bot",
  description: "Advanced, production-ready Discord bot administration dashboard and landing page.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="min-h-full flex flex-col bg-black text-neutral-100 selection:bg-[#5E5CE6]/30 selection:text-white">
        {children}
      </body>
    </html>
  );
}
