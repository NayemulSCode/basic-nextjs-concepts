import { NextRequest, NextResponse } from "next/server";
import { Product } from "../route";

// নমুনা ডেটা (বাস্তবে ডেটাবেজ থেকে আসবে)
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
];

// GET - একক পণ্যের তথ্য
export async function GET(
  request: NextRequest,
  // { params }: { params: { id: string } }
  context: { params: Promise<{ id: string }> }
) {
  try {
    // const productId = parseInt(params.id);
    const { id } = await context.params; // ✅ await params
    const productId = parseInt(id);
    const product = products.find((p) => p.id === productId);
    if (!product) {
      return NextResponse.json(
        { success: false, error: "পণ্য পাওয়া যায়নি" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: product,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "পণ্যের তথ্য লোড করতে সমস্যা হয়েছে" },
      { status: 500 }
    );
  }
}

// PUT - পণ্যের তথ্য আপডেট
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    const body = await request.json();
    const productIndex = products.findIndex((p) => p.id === id);

    if (productIndex === -1) {
      return NextResponse.json(
        { success: false, error: "পণ্য পাওয়া যায়নি" },
        { status: 404 }
      );
    }

    products[productIndex] = { ...products[productIndex], ...body };

    return NextResponse.json({
      success: true,
      data: products[productIndex],
      message: "পণ্যের তথ্য আপডেট হয়েছে",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "পণ্য আপডেট করতে সমস্যা হয়েছে" },
      { status: 400 }
    );
  }
}
