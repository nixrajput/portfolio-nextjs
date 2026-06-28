import { redirect } from "next/navigation";
import { auth } from "@/auth";
import type { ReactNode } from "react";
import { AdminShell } from "@/components/admin/AdminShell";

export const dynamic = "force-dynamic";

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const session = await auth();
  // signIn callback already blocks non-admins; if there's no session, gate it.
  if (!session?.user) {
    redirect("/login");
  }
  return (
    <AdminShell userLabel={session.user.name ?? session.user.email ?? "Admin"}>
      {children}
    </AdminShell>
  );
}
