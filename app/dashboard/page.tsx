import { getServerSession } from "next-auth";
import Link from "next/link";

interface User {
  name?: string | null | undefined;
  email?: string | null | undefined;
  image?: string | null | undefined;
  role?: string | null | undefined;
}

export default async function DashboardPage() {
  const session = await getServerSession();
  const user: User | undefined = session?.user;

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">ড্যাশবোর্ড হোম</h1>
      <p className="text-xl mb-4">Welcome, {user?.name}</p>
      <p className="text-lg mb-4">Your role is: {user?.role}</p>

      {user?.role === "admin" && (
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-6">
          <p className="font-bold">Admin Content</p>
          <p>This content is only visible to administrators.</p>
          <Link href="/dashboard/admin" className="text-blue-600 hover:underline">
            Go to Admin Panel
          </Link>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">মোট ব্যবহারকারী</h3>
          <p className="text-3xl font-bold text-blue-600">১,২৩৪</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">মাসিক বিক্রয়</h3>
          <p className="text-3xl font-bold text-green-600">৫৬,৭৮৯</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibent mb-2">নতুন অর্ডার</h3>
          <p className="text-3xl font-bold text-purple-600">৯৮</p>
        </div>
      </div>
    </div>
  );
}
