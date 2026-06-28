import { redirect } from "next/navigation";
import { auth } from "@/auth";
import type { ReactNode } from "react";

export const dynamic = "force-dynamic";

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const session = await auth();
  // signIn callback already blocks non-admins; if there's no session, gate it.
  if (!session?.user) {
    redirect("/login");
  }
  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <header className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Admin</h1>
        <span className="text-muted-foreground text-sm">
          {session.user.name ?? session.user.email}
        </span>
      </header>
      {children}
    </div>
  );
}
