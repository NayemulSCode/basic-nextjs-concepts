import { User, users } from "@/app/lib/data";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

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

        const user = users.find((user) => user.email === credentials.email);
        console.log("🚀 ~ authorize ~ user:", user);

        if (user && user.provider === "credentials" && user.password) {
          // This is a mock comparison. In a real app, you'd use bcrypt.
          // For this example, we'll just compare plaintext passwords.
          // Note: The data.ts file should ideally have hashed passwords.
          // We are using plaintext here to avoid needing a live bcrypt execution environment.
          const isPasswordCorrect = credentials.password === user.password;

          // A real implementation would look like this:
          // const isPasswordCorrect = await bcrypt.compare(
          //   credentials.password,
          //   user.password
          // );

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
        }
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        const dbUser = users.find((u) => u.email === user.email);
        if (dbUser) {
          token.id = dbUser.id;
          token.role = dbUser.role;
          token.provider = dbUser.provider;
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.role = token.role;
        session.user.provider = token.provider;
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
});

export { handler as GET, handler as POST };
