import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { readUsers, writeUsers } from "@/app/lib/data";

export async function POST(req: Request) {
  try {
    const { firstName, lastName, email, password } = await req.json();
    const users = readUsers();

    const userExists = users.find((user) => user.email === email);

    if (userExists) {
      return NextResponse.json(
        { message: "User already exists." },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
      id: (users.length + 1).toString(),
      firstName,
      lastName,
      name: `${firstName} ${lastName}`,
      email,
      password: hashedPassword,
      role: "user" as const,
      provider: "credentials" as const,
    };

    users.push(newUser);
    writeUsers(users);

    return NextResponse.json(
      { message: "User registered." },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred while registering the user." },
      { status: 500 }
    );
  }
}
