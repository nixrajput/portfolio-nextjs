import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { dbForAdapter } from "@/db/client";
import { authUsers, authAccounts, authSessions, authVerificationTokens } from "@/db/schema";
import { isAdminProfile } from "@/lib/auth-callbacks";

export const { handlers, auth, signIn, signOut } = NextAuth({
  // Derive the OAuth redirect_uri from the request host so a single GitHub
  // OAuth app works across environments: localhost in dev, nixrajput.com in
  // prod. Without this, a self-hosted prod deploy throws UntrustedHost.
  trustHost: true,
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
    // GitHub's profile.id is the numeric user id; reject anyone but the admin.
    async signIn({ profile }) {
      return isAdminProfile(profile, process.env.ADMIN_GITHUB_ID);
    },
  },
  pages: { signIn: "/login" },
});
