import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import client from "../../../../lib/server/client";
import GithubProvider from "next-auth/providers/github";

const {
  NEXTAUTH_SECRET,
  GITHUB_ID,
  GITHUB_SECRET,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
} = process.env;

if (
  !NEXTAUTH_SECRET ||
  !GITHUB_ID ||
  !GITHUB_SECRET ||
  !GOOGLE_CLIENT_ID ||
  !GOOGLE_CLIENT_SECRET
) {
  throw new Error("Missing required environment variables");
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(client),
  secret: NEXTAUTH_SECRET,
  providers: [
    GithubProvider({
      clientId: GITHUB_ID,
      clientSecret: GITHUB_SECRET,
    }),
  ],
};

export default NextAuth(authOptions);
