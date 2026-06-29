import { signIn, auth } from "@/auth";
import { redirect } from "next/navigation";
import { Github } from "lucide-react";

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
          Sign in with GitHub
        </button>
      </form>
    </main>
  );
}
