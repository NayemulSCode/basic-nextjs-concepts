import { NextResponse } from "next/server";

const feedItems = [
  { id: 1, author: "Alice", content: "Just launched my new portfolio site 🚀" },
  { id: 2, author: "Bob", content: "Next.js 15 App Router makes routing fun!" },
  { id: 3, author: "Charlie", content: "Going hiking this weekend 🏔️" },
];

export async function GET() {
  // Simulate slow network (2s delay)
  await new Promise((res) => setTimeout(res, 2000));
  return NextResponse.json(feedItems);
}
