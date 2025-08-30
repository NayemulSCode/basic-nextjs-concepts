import { users } from "@/app/lib/data";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { firstName, lastName, email, password } = await req.json();
    console.log("🚀 ~ POST ~ email:", email);
    console.log("🚀 ~ POST ~ password:", password);

    const userExists = users.find((user) => user.email === email);
    console.log("🚀 ~ POST ~ userExists:", userExists);

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
    console.log("🚀 ~ POST ~ newUser:", newUser);

    return NextResponse.json({ message: "User registered." }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred while registering the user." },
      { status: 500 }
    );
  }
}
