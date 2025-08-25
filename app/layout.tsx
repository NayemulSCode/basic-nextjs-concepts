import Footer from "@/components/Footer";
import Header from "@/components/Header";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "আমার Next.js অ্যাপ",
    template: "%s | আমার Next.js অ্যাপ",
  },
  description: "Next.js App Router এর সাথে তৈরি একটি আধুনিক অ্যাপ্লিকেশন",
  keywords: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
  authors: [{ name: "আপনার নাম" }],
  creator: "আপনার নাম",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="bn" className="h-full" suppressHydrationWarning>
      <body className={`${inter.className} h-full flex flex-col`}>
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
