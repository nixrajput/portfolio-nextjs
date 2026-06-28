import { NextRequest, NextResponse } from "next/server";
import { submitTestimonial } from "@/lib/testimonials/submit";

export const runtime = "nodejs"; // sharp requires the Node runtime

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const result = await submitTestimonial(formData, req.headers);
  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: result.status });
  }
  return NextResponse.json({ ok: true }, { status: 201 });
}
