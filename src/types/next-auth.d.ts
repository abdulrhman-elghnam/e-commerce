import NextAuth, { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      token: string;
      role?: string;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    token: string;
    role?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    token: string;
    role?: string;
  }
}
