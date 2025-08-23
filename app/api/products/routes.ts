import { NextRequest, NextResponse } from "next/server";

// পণ্যের ডেটা টাইপ
export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  category: string;
}

// নমুনা ডেটা
const products: Product[] = [
  {
    id: 1,
    name: "স্মার্টফোন",
    price: 25000,
    description: "সর্বশেষ প্রযুক্তির স্মার্টফোন",
    category: "ইলেকট্রনিক্স",
  },
  {
    id: 2,
    name: "ল্যাপটপ",
    price: 55000,
    description: "উচ্চ কর্মক্ষমতার ল্যাপটপ",
    category: "কম্পিউটার",
  },
  {
    id: 3,
    name: "হেডফোন",
    price: 3500,
    description: "নয়েজ ক্যান্সেলিং হেডফোন",
    category: "অডিও",
  },
];

// GET রিকুয়েস্ট - সব পণ্য পেতে
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");

    let filteredProducts = products;

    if (category) {
      filteredProducts = products.filter((p) =>
        p.category.toLowerCase().includes(category.toLowerCase())
      );
    }

    // কৃত্রিম বিলম্ব (বাস্তব API অনুকরণ করতে)
    await new Promise((resolve) => setTimeout(resolve, 500));

    return NextResponse.json({
      success: true,
      data: filteredProducts,
      total: filteredProducts.length,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "পণ্য লোড করতে সমস্যা হয়েছে" },
      { status: 500 }
    );
  }
}

// POST রিকুয়েস্ট - নতুন পণ্য যোগ করতে
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const newProduct: Product = {
      id: products.length + 1,
      name: body.name,
      price: body.price,
      description: body.description,
      category: body.category,
    };

    products.push(newProduct);

    return NextResponse.json(
      {
        success: true,
        data: newProduct,
        message: "পণ্য সফলভাবে যোগ করা হয়েছে",
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "পণ্য যোগ করতে সমস্যা হয়েছে" },
      { status: 400 }
    );
  }
}
