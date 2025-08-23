import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "আমাদের সম্পর্কে",
  description: "আমাদের কোম্পানি এবং আমাদের মিশন সম্পর্কে জানুন",
  openGraph: {
    title: "আমাদের সম্পর্কে - আমার Next.js অ্যাপ",
    description: "আমাদের কোম্পানি এবং আমাদের মিশন সম্পর্কে জানুন",
    type: "website",
  },
};

export default function About() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-900 mb-8">
          আমাদের সম্পর্কে
        </h1>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <p className="text-lg text-gray-600 mb-6 leading-relaxed">
            আমরা একটি প্রযুক্তি কোম্পানি যা আধুনিক ওয়েব অ্যাপ্লিকেশন তৈরি করে।
            আমাদের লক্ষ্য হল ব্যবহারকারীদের জন্য সেরা ডিজিটাল অভিজ্ঞতা প্রদান
            করা।
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            আমাদের মিশন
          </h2>
          <p className="text-gray-600 mb-6">
            প্রযুক্তির মাধ্যমে মানুষের জীবনযাত্রার মান উন্নত করা এবং ব্যবসায়িক
            সমস্যার উদ্ভাবনী সমাধান প্রদান করা।
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            আমাদের দল
          </h2>
          <p className="text-gray-600">
            আমাদের দলে রয়েছে অভিজ্ঞ ডেভেলপার, ডিজাইনার এবং প্রোডাক্ট ম্যানেজার
            যারা একসাথে কাজ করে অসাধারণ পণ্য তৈরি করেন।
          </p>
        </div>
      </div>
    </div>
  );
}
