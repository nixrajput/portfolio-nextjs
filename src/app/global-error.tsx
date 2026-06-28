"use client";

/**
 * Global error boundary — replaces the root layout when it (or the root) throws,
 * so it must render its own <html>/<body> and cannot depend on app styles.
 * Like the route boundary, it never renders `error.message` (could leak
 * database/internal details); only a friendly message + the safe `digest`.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "1rem",
          padding: "1.5rem",
          textAlign: "center",
          background: "#07070c",
          color: "#fafafa",
          fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, sans-serif",
        }}
      >
        <h1 style={{ fontSize: "1.75rem", fontWeight: 700 }}>Something went wrong</h1>
        <p style={{ maxWidth: "28rem", color: "rgba(250,250,250,0.62)" }}>
          An unexpected error occurred. Please try again — if it keeps happening, it&apos;s a
          backend issue to look into.
        </p>
        {error.digest && (
          <p
            style={{ fontFamily: "monospace", fontSize: "0.75rem", color: "rgba(250,250,250,0.5)" }}
          >
            Reference: {error.digest}
          </p>
        )}
        <button
          onClick={() => reset()}
          style={{
            marginTop: "0.5rem",
            padding: "0.625rem 1.25rem",
            borderRadius: "9999px",
            border: "none",
            cursor: "pointer",
            fontWeight: 600,
            color: "#fff",
            background: "linear-gradient(135deg, #7c3aed 0%, #06b6d4 50%, #ec4899 100%)",
          }}
        >
          Try again
        </button>
      </body>
    </html>
  );
}
