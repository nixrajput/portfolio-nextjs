"use client";

import { useEffect } from "react";
import { RotateCw } from "lucide-react";
import { Button } from "@/components/ui/Button";

/**
 * Route error boundary. We deliberately do NOT render `error.message` — it can
 * contain database/internal details (connection strings, SQL, stack frames)
 * that must never reach the client. Next.js logs the full error server-side;
 * we surface only a friendly message and the safe `digest` as a reference code.
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Full error is captured by Next.js server logs; nothing sensitive is shown.
    console.error("Route error", error.digest ?? "");
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-5 px-6 text-center">
      <p className="text-muted font-mono text-xs tracking-widest uppercase">Error</p>
      <h1 className="text-2xl font-bold sm:text-3xl">Something went wrong</h1>
      <p className="text-muted max-w-md text-pretty">
        An unexpected error occurred on our end. Please try again - if it keeps happening, this is a
        backend issue to look into.
      </p>
      {error.digest && (
        <p className="text-muted font-mono text-xs">
          Reference: <span className="select-all">{error.digest}</span>
        </p>
      )}
      <Button onClick={() => reset()} leftIcon={<RotateCw className="size-4" aria-hidden />}>
        Try again
      </Button>
    </div>
  );
}
