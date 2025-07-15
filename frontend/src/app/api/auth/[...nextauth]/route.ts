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
        login: { label: "Email or Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        try {
          if (!credentials?.login || !credentials?.password) {
            console.error("Missing credentials in authorize");
            throw new Error("Missing login credentials");
          }

          console.log("Authorizing with credentials:", {
            login: credentials.login,
            passwordLength: credentials.password.length
          });

          const result = await authApi.login({
            login: credentials.login,
            password: credentials.password
          });

          console.log("Auth API response:", result);

          if (!result?.data?.access_token) {
            throw new Error(result?.data?.message || result?.error?.message || "Invalid credentials");
          }

          return {
            id: credentials.login,
            login: credentials.login,
            accessToken: result.data.access_token
          };
        } catch (error) {
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