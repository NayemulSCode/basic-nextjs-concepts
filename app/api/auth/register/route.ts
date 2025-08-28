import { NextRequest, NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';

// Define user type
interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: string;
}

// In-memory user storage (replace with DB in production)
const users: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    password: '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',
    role: 'admin',
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    password: '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',
    role: 'user',
  },
];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate input manually
    if (!body.name || typeof body.name !== 'string') {
      return NextResponse.json(
        { error: 'Name must be a valid string' },
        { status: 400 }
      );
    }

    if (!body.email || typeof body.email !== 'string' || !body.email.includes('@')) {
      return NextResponse.json(
        { error: 'Valid email required' },
        { status: 400 }
      );
    }

    if (!body.password || typeof body.password !== 'string' || body.password.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters' },
        { status: 400 }
      );
    }

    // Check if user exists
    const existingUser = users.find(user => user.email === body.email);
    if (existingUser) {
      return NextResponse.json(
        { error: 'User already exists' },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcryptjs.hash(body.password, 12);

    // Create new user
    const newUser: User = {
      id: String(users.length + 1),
      name: body.name,
      email: body.email,
      password: hashedPassword,
      role: 'user',
    };

    users.push(newUser);

    return NextResponse.json(
      {
        message: 'User created successfully',
        user: {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
        },
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}