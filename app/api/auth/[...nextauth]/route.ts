import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async signIn({ account }) {
      // Exchange Google ID token for a backend JWT on every sign-in
      if (account?.provider === "google" && account.id_token) {
        try {
          const res = await fetch(`${API_URL}/api/auth/google`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token: account.id_token }),
            signal: AbortSignal.timeout(30000),
          });
          if (!res.ok) {
            const text = await res.text().catch(() => "(unreadable)");
            console.error("[Auth] Backend rejected token:", res.status, text);
            return false;
          }
          const data = await res.json();
          // Stash on account so the jwt callback can pick it up
          (account as Record<string, unknown>).backendToken = data.access_token;
          (account as Record<string, unknown>).backendUser = data.user;
        } catch (err) {
          console.error("[Auth] Fetch to backend failed:", err);
          return false;
        }
      }
      return true;
    },

    async jwt({ token, account }) {
      // On initial sign-in, account is populated — copy backend data into the JWT
      if (account) {
        token.backendToken = (account as Record<string, unknown>).backendToken as string;
        token.backendUser = (account as Record<string, unknown>).backendUser as typeof token.backendUser;
      }
      return token;
    },

    async session({ session, token }) {
      // Expose backend token & user profile to the client
      session.backendToken = token.backendToken as string | undefined;
      session.backendUser = token.backendUser as {
        id: number;
        email: string;
        name: string | null;
        picture: string | null;
      } | undefined;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
