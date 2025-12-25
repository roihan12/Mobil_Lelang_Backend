import NextAuth, { type DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      username: string;
    } & DefaultSession["user"];
    access_token: string;
  }
  interface Profile {
    username: string;
  }
  interface User {
    username: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    username: string;
    access_token: string;
  }
}
