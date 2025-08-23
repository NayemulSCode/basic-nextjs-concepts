import Link from "next/link";

export default function Home() {
  console.log("Home page rendered");
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            স্বাগতম আমাদের Next.js অ্যাপে
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            এটি একটি আধুনিক Next.js অ্যাপ্লিকেশন যা App Router, Server
            Components এবং API Routes ব্যবহার করে তৈরি।
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/products"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              পণ্য দেখুন
            </Link>
            <Link
              href="/about"
              className="bg-gray-600 text-white px-8 py-3 rounded-lg hover:bg-gray-700 transition-colors"
            >
              আমাদের সম্পর্কে
            </Link>
            <Link
              href="/dashboard"
              className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition-colors"
            >
              ড্যাশবোর্ড
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
