import type { Product } from "@/app/api/products/route";
import Link from "next/link";

// সার্ভার কম্পোনেন্টে ডেটা ফেচ ফাংশন
async function getProducts(): Promise<Product[]> {
  try {
    // বাস্তবে এটি external API বা ডেটাবেজ হবে
    const res = await fetch("http://localhost:3001/api/products", {
      cache: "no-store", // সর্বদা fresh ডেটা পেতে
    });
    console.log("🚀 ~ getProducts ~ res:", res)

    if (!res.ok) {
      throw new Error("পণ্য লোড করতে সমস্যা হয়েছে");
    }

    const data = await res.json();
    return data.data;
  } catch (error) {
    console.error("Product fetch error:", error);
    return [];
  }
}

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">আমাদের পণ্যসমূহ</h1>

      {products.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">কোন পণ্য পাওয়া যায়নি</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  {product.name}
                </h2>
                <p className="text-gray-600 mb-4">{product.description}</p>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-2xl font-bold text-green-600">
                    ৳{product.price.toLocaleString("bn-BD")}
                  </span>
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                    {product.category}
                  </span>
                </div>
                <Link
                  href={`/products/${product.id}`}
                  className="block w-full text-center bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
                >
                  বিস্তারিত দেখুন
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
