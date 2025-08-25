import type { Product } from "@/app/api/products/route";
import { notFound } from "next/navigation";

// একক পণ্যের তথ্য পেতে
async function getProduct(id: string): Promise<Product | null> {
  try {
    const res = await fetch(`http://localhost:3001/api/products/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      if (res.status === 404) {
        return null;
      }
      throw new Error("পণ্যের তথ্য লোড করতে সমস্যা হয়েছে");
    }

    const data = await res.json();
    return data.data;
  } catch (error) {
    console.error("Product fetch error:", error);
    throw error;
  }
}

// Dynamic metadata generation
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // const product = await getProduct(params.id);
  const { id } = await params; // ✅ await params
  const product = await getProduct(id);
  if (!product) {
    return {
      title: "পণ্য পাওয়া যায়নি",
    };
  }

  return {
    title: `${product.name} - পণ্যের বিস্তারিত`,
    description: product.description,
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  const product = await getProduct(id);
  console.log("🚀 ~ ProductDetailPage ~ product:", product)

  // যদি পণ্য না পাওয়া যায়
  if (!product) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-8">
            <div className="mb-4">
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                {product.category}
              </span>
            </div>

            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {product.name}
            </h1>

            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              {product.description}
            </p>

            <div className="bg-gray-50 p-6 rounded-lg mb-6">
              <div className="text-3xl font-bold text-green-600 mb-2">
                ৳{product.price.toLocaleString("bn-BD")}
              </div>
              <p className="text-gray-500">সর্বোচ্চ মানের নিশ্চয়তা</p>
            </div>

            <div className="flex gap-4">
              <button className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors">
                কার্টে যোগ করুন
              </button>
              <button className="flex-1 bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition-colors">
                এখনই কিনুন
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
