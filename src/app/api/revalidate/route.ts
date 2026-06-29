import { timingSafeEqual } from "node:crypto";
import { NextResponse } from "next/server";
import { revalidatePortfolio } from "@/lib/revalidate";

export const dynamic = "force-dynamic";

// Constant-time comparison so a request can't probe the secret byte-by-byte via
// response timing. Bails out (false) when either side is missing or the lengths
// differ — timingSafeEqual requires equal-length buffers.
function secretMatches(provided: string | null, expected: string | undefined): boolean {
  if (!provided || !expected) return false;
  const a = Buffer.from(provided);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

export async function POST(req: Request) {
  const secret = req.headers.get("x-revalidate-secret");
  if (!secretMatches(secret, process.env.REVALIDATE_SECRET)) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }
  revalidatePortfolio();
  return NextResponse.json({ ok: true, revalidated: true });
}
