import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectDb } from "./db";
import User from "@/models/User";
import bcrypt from "bcryptjs";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          throw new Error("Missing email or Password");
        }
        try {
          await connectDb();
          const user = await User.findOne({ email: credentials.email });
          if (!user) {
            throw new Error("No User found with these credentials");
          }
          const isValid = await bcrypt.compare(
            credentials.password,
            user.password
          );
          if (!isValid) {
            throw new Error("Invalid Password");
          }
          return {
            id: user._id.toString(),
            email: user.email,
          };
        } catch (err) {
          console.error("Next-Auth Error while login: ", err);
          throw err;
        }
      },
    }),
    // ....i can add more providers here
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  secret: process.env.NEXTAUTH_SECRET,
};
