import NextAuth from 'next-auth';
import authConfig from './auth.config';

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  session: { strategy: 'jwt' },
  secret: process.env.NEXTAUTH_SECRET,
});

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