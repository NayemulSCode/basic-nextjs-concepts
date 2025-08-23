import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-2xl font-bold text-blue-600">
            আমার অ্যাপ
          </Link>

          <nav className="flex space-x-6">
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
          </nav>
        </div>
      </div>
    </header>
  );
}
