import { NextResponse } from "next/server";
import { readUsers } from "@/app/lib/data";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET() {
const session = await getServerSession(authOptions);
    console.log("🚀 ~ GET ~ session:", session)

    if (!session || session.user.role !== 'admin') {
        return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    const users = readUsers();
    console.log("🚀 ~ GET ~ users:", users)

    // Don't send password hashes to the client
    const usersWithoutPasswords = users.map(user => {
        const { password, ...rest } = user;
        return rest;
    });

    return NextResponse.json(usersWithoutPasswords);
}
