import { NextResponse } from "next/server";
import { revalidatePortfolio } from "@/lib/revalidate";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const secret = req.headers.get("x-revalidate-secret");
  if (!secret || secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }
  revalidatePortfolio();
  return NextResponse.json({ ok: true, revalidated: true });
}
