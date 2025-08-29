"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";

export default function Header() {
  const { data: session } = useSession();

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-2xl font-bold text-blue-600">
            আমার অ্যাপ
          </Link>

          <nav className="flex items-center space-x-6">
            <Link href="/" className="text-gray-600 hover:text-blue-600">
              হোম
            </Link>
            <Link
              href="/products"
              className="text-gray-600 hover:text-blue-600"
            >
              পণ্য
            </Link>
            <Link href="/about" className="text-gray-600 hover:text-blue-600">
              আমাদের সম্পর্কে
            </Link>
            <Link
              href="/dashboard"
              className="text-gray-600 hover:text-blue-600"
            >
              ড্যাশবোর্ড
            </Link>
            {session ? (
              <>
                <span className="text-gray-800">
                  Welcome, {session.user?.name}
                </span>
                <button
                  onClick={() => signOut()}
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                >
                  Logout
                </button>
              </>
            ) : (
              <button
                onClick={() => signIn()}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              >
                Login
              </button>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
