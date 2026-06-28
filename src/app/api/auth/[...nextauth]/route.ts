import { handlers } from "@/auth";

// Prevent Next.js from statically collecting this route at build time.
// AUTH_SECRET is not available during `next build` (credential-free CI builds);
// marking the route dynamic ensures it is rendered only at request time.
export const dynamic = "force-dynamic";

export const { GET, POST } = handlers;
