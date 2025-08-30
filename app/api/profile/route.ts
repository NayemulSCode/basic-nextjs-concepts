import { NextResponse } from "next/server";
import { users } from "@/app/lib/data";

export async function PUT(req: Request) {
  try {
    const { userId, firstName, lastName } = await req.json();

    const userIndex = users.findIndex((user) => user.id === userId);

    if (userIndex === -1) {
      return NextResponse.json(
        { message: "User not found." },
        { status: 404 }
      );
    }

    if (users[userIndex].provider === 'google') {
        return NextResponse.json(
            { message: "Cannot update Google users." },
            { status: 403 }
        );
    }

    users[userIndex] = {
        ...users[userIndex],
        firstName,
        lastName,
        name: `${firstName} ${lastName}`,
    };

    return NextResponse.json(
      { message: "Profile updated successfully." },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred while updating the profile." },
      { status: 500 }
    );
  }
}
