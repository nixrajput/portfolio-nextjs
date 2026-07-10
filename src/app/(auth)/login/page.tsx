import { signIn, auth } from "@/auth";
import { redirect } from "next/navigation";
import { Github } from "lucide-react";

// Admin sign-in page: keep it out of the index, and override the canonical so
// it points at /login rather than inheriting the root layout's "/" (which would
// wrongly claim the homepage as this page's canonical).
export const metadata = {
  title: "Login",
  robots: { index: false },
  alternates: { canonical: "/login" },
};

export default async function SignInPage() {
  const session = await auth();
  if (session?.user) redirect("/admin");
  return (
    <main className="flex min-h-screen items-center justify-center">
      <form
        action={async () => {
          "use server";
          await signIn("github", { redirectTo: "/admin" });
        }}
      >
        <button
          type="submit"
          className="bg-foreground text-background inline-flex items-center gap-2 rounded-md px-5 py-2.5"
        >
          <Github className="h-4 w-4" aria-hidden />
          Login with GitHub
        </button>
      </form>
    </main>
  );
}
