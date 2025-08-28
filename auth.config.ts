/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */

import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcryptjs from "bcryptjs";
import { JWT } from "next-auth/jwt";
import { Session } from "next-auth";

// Define proper types for demo users
// TypeScript type extensions
declare module 'next-auth' {
  interface User {
    id: string;
    name: string;
    email: string;
    password: string;
    role: string;
  }
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role?: string;
    };
  }
}

type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  role: string;
};

const users: User[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    password: "$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi", // password
    role: "admin",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    password: "$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi", // password
    role: "user",
  },
];

export default {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (
          !credentials ||
          typeof credentials.email !== "string" ||
          typeof credentials.password !== "string" ||
          !credentials.email.includes("@") ||
          credentials.password.length < 6
        ) {
          return null;
        }

        const { email, password } = credentials;
        const user = users.find((u) => u.email === email);

        if (!user) return null;

        const passwordsMatch = await bcryptjs.compare(password, user.password);

        if (passwordsMatch) {
          // Return the full user object as required by the type
          return user;
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: User }) {
      if (user?.role) {
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      if (token?.role) {
        session.user.role = token.role as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/signin",
    signUp: "/auth/signup",
  },
};