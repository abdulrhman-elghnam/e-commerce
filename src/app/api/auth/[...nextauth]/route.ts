import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing credentials");
        }

        try {
          const apiBase = process.env.NEXT_PUBLIC_API_URL || "https://ecommerce.routemisr.com/api/v1";
          const res = await fetch(`${apiBase}/auth/signin`, {
            method: 'POST',
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password
            })
          });

          const data = await res.json();

          if (res.ok && data.token) {
            // Decoding the JWT on the client safely to extract ID if necessary, 
            // but RouteMISR often embeds ID in the token string itself, which NextAuth will hold.
            return {
              id: data.user?.email || "1", // Fallback ID
              name: data.user?.name,
              email: data.user?.email,
              role: data.user?.role,
              token: data.token,
            };
          }

          throw new Error(data.message || "Invalid credentials");
        } catch (error: unknown) {
          throw new Error(error instanceof Error ? error.message : "Failed to log in");
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      // If user object is passed (only on initial sign in), map properties to token
      if (user) {
        token.id = user.id;
        token.token = user.token as string;
        token.role = user.role as string;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.token = token.token as string;
        session.user.role = token.role as string;
      }
      return session;
    }
  },
  pages: {
    signIn: '/signin',
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET || "freshcart-production-auth-fallback-secret-key-32chars",
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
