// src/app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { authApi } from "@/app/utils/api";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        try {
          if (!credentials?.email || !credentials?.password) {
            console.error("Missing credentials in authorize");
            throw new Error("Missing login credentials");
          }

          console.log("Authorizing with credentials:", {
            email: credentials.email,
            passwordLength: credentials.password.length
          });

          const result = await authApi.login({
            email: credentials.email,
            password: credentials.password
          });

          console.log("Auth API response:", result);

          if (!result?.success) {
            throw new Error(result?.message || "Invalid credentials");
          }

          return {
            id: credentials.email,
            email: credentials.email,
            accessToken: result.access_token
          };
        } catch (error: any) {
          console.error("Authorization error:", error);
          throw new Error(error.message || "Authentication failed");
        }
      }
    })
  ],
  pages: {
    signIn: "/login-signup",
    error: "/login-signup"
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60 // 30 days
  },
  callbacks: {
    async jwt({ token, user }) {
      console.log("JWT Callback:", { token, user });
      if (user) {
        token.accessToken = user.accessToken;
      }
      return token;
    },
    async session({ session, token }) {
      console.log("Session Callback:", { session, token });
      if (session.user) {
        session.user.id = token.sub as string;
        session.accessToken = token.accessToken as string;
      }
      return session;
    }
  },
  debug: true
});

export { handler as GET, handler as POST };