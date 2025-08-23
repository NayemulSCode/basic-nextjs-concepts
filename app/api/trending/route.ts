import { NextResponse } from "next/server";

const trendingItems = [
  { id: 1, topic: "#Nextjs15", mentions: 1200 },
  { id: 2, topic: "#AI", mentions: 850 },
  { id: 3, topic: "#React19", mentions: 640 },
];

export async function GET() {
  // Faster response (0.5s delay)
  await new Promise((res) => setTimeout(res, 500));
  return NextResponse.json(trendingItems);
}
