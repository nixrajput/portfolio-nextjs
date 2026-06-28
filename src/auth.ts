import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { dbForAdapter } from "@/db/client";
import { authUsers, authAccounts, authSessions, authVerificationTokens } from "@/db/schema";
import { isAllowedLogin } from "@/lib/auth-callbacks";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: DrizzleAdapter(dbForAdapter, {
    usersTable: authUsers,
    accountsTable: authAccounts,
    sessionsTable: authSessions,
    verificationTokensTable: authVerificationTokens,
  }),
  session: { strategy: "jwt" },
  providers: [
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
    }),
  ],
  callbacks: {
    // GitHub profile exposes `login`; reject anyone but the admin.
    async signIn({ profile }) {
      const login = (profile as { login?: string } | undefined)?.login;
      return isAllowedLogin(login, process.env.ADMIN_GITHUB_LOGIN);
    },
  },
  pages: { signIn: "/signin" },
});
