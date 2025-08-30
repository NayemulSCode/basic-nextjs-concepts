import { users } from "@/app/lib/data";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await getServerSession();
  console.log("🚀 ~ GET ~ session:", session);

  // @ts-ignore
  if (!session || session.user.role !== "admin") {
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  }

  // Don't send password hashes to the client
  const usersWithoutPasswords = users.map((user) => {
    const { password, ...rest } = user;
    return rest;
  });

  return NextResponse.json(usersWithoutPasswords);
}
