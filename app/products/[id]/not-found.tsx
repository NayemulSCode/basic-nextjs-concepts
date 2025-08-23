import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-900 mb-4">৪০৪</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          পণ্য পাওয়া যায়নি
        </h2>
        <p className="text-gray-600 mb-8">
          দুঃখিত, আপনি যে পণ্যটি খুঁজছেন তা আমাদের কাছে নেই।
        </p>
        <Link
          href="/products"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          সব পণ্য দেখুন
        </Link>
      </div>
    </div>
  );
}
