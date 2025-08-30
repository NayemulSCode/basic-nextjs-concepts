import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcryptjs";
import { readUsers, writeUsers, User } from "@/app/lib/data";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          return null;
        }

        const users = readUsers();
        const user = users.find((user) => user.email === credentials.email);

        if (user && user.provider === 'credentials' && user.password) {
          // For the initial hardcoded users, we compare plaintext.
          // For users registered via the form, we compare the hash.
          const isPasswordCorrect = user.password.startsWith('$2a$')
            ? await bcrypt.compare(credentials.password, user.password)
            : credentials.password === user.password;

          if (isPasswordCorrect) {
            return user;
          }
        }

        return null;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        const users = readUsers();
        const userExists = users.find((u) => u.email === user.email);
        if (!userExists && user.email) {
          const newUser: User = {
            id: (users.length + 1).toString(),
            name: user.name,
            email: user.email,
            role: "user",
            provider: "google",
          };
          users.push(newUser);
          writeUsers(users);
        }
      }
      return true;
    },
    async jwt({ token, user, account }) {
      // Initial sign in
      if (account && user) {
        const users = readUsers();
        const dbUser = users.find(u => u.email === user.email);

        // This is a failsafe, the user should exist due to the signIn callback
        if (!dbUser) {
            return token;
        }

        return {
          ...token,
          id: dbUser.id,
          role: dbUser.role,
          provider: dbUser.provider,
          name: dbUser.name,
        };
      }
      return token;
    },
    async session({ session, token }) {
      // The token now has all our custom properties
      session.user.id = token.id;
      session.user.role = token.role;
      session.user.provider = token.provider;
      session.user.name = token.name;

      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
