import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "ড্যাশবোর্ড",
  description: "ব্যবহারকারীর ড্যাশবোর্ড প্যানেল",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* সাইডবার */}
      <div className="w-64 bg-white shadow-md">
        <div className="p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            ড্যাশবোর্ড
          </h2>
          <nav className="space-y-2">
            <Link
              href="/dashboard"
              className="block px-4 py-2 text-gray-600 hover:bg-blue-50 hover:text-blue-600 rounded-md"
            >
              হোম
            </Link>
            <Link
              href="/dashboard/users"
              className="block px-4 py-2 text-gray-600 hover:bg-blue-50 hover:text-blue-600 rounded-md"
            >
              ব্যবহারকারী
            </Link>
            <Link
              href="/dashboard/settings"
              className="block px-4 py-2 text-gray-600 hover:bg-blue-50 hover:text-blue-600 rounded-md"
            >
              সেটিংস
            </Link>
          </nav>
        </div>
      </div>

      {/* মেইন কনটেন্ট */}
      <div className="flex-1 p-8">{children}</div>
    </div>
  );
}
