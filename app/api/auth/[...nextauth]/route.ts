import NextAuth, { AuthOptions, User as AuthUser, Account, Session } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcryptjs";
import { readUsers, writeUsers, User } from "@/app/lib/data";
import { JWT } from "next-auth/jwt";

export const authOptions: AuthOptions = {
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
          const isPasswordCorrect = user.password.startsWith('$2a$')
            ? await bcrypt.compare(credentials.password, user.password)
            : credentials.password === user.password;

          if (isPasswordCorrect) {
            const { password, ...userWithoutPassword } = user;
            return userWithoutPassword as AuthUser;
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
    async signIn({ user, account }: { user: AuthUser; account: Account | null }) {
      if (account?.provider === "google") {
        const users = readUsers();
        const userExists = users.find((u) => u.email === user.email);
        if (!userExists && user.email) {
          // @ts-ignore
          const newUser: User = {
            id: (users.length + 1).toString(),
            name: user.name as string,
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
    async jwt({ token, user, account }: { token: JWT; user?: AuthUser; account?: Account | null }) {
      if (account && user) {
        const users = readUsers();
        const dbUser = users.find(u => u.email === user.email);

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
    async session({ session, token }: { session: Session; token: JWT }) {
      if (session.user) {
        (session.user as any).id = token.id;
        (session.user as any).role = token.role;
        (session.user as any).provider = token.provider;
        (session.user as any).name = token.name;
      }
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
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };