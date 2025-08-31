import { NextResponse } from "next/server";
import { readUsers, writeUsers } from "@/app/lib/data";
import { getServerSession } from "next-auth";

export async function PUT(req: Request, { params }: { params: { id: string } }) {
    const session = await getServerSession();

    if (!session || session.user.role !== 'admin') {
        return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    try {
        const { id } = params;
        const { role } = await req.json();
        const users = readUsers();

        const userIndex = users.findIndex((user) => user.id === id);

        if (userIndex === -1) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        if (users[userIndex].provider === 'google') {
            return NextResponse.json({ message: "Cannot change role for Google users" }, { status: 400 });
        }

        if (role !== 'admin' && role !== 'user') {
            return NextResponse.json({ message: "Invalid role" }, { status: 400 });
        }

        users[userIndex].role = role;
        writeUsers(users);

        return NextResponse.json({ message: "User role updated" }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
    }
}
