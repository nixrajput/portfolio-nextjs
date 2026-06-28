import { signIn, auth } from "@/auth";
import { redirect } from "next/navigation";

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
        <button type="submit" className="bg-foreground text-background rounded-md px-5 py-2.5">
          Sign in with GitHub
        </button>
      </form>
    </main>
  );
}
