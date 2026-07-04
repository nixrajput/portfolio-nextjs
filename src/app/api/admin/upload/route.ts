import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { BLOB_FOLDERS, uploadIcon, type BlobFolder } from "@/lib/blob";

export const runtime = "nodejs"; // sharp requires the Node runtime

// Only these folders are writable from the admin uploader.
const ALLOWED_FOLDERS = new Set<BlobFolder>([BLOB_FOLDERS.avatar, BLOB_FOLDERS.skills]);

/**
 * Admin-only image upload. Accepts a file + target folder, stores it in Vercel
 * Blob (SVG raw, raster optimized), and returns the public CDN URL. Used by the
 * admin ImageUploadField for the profile avatar and skill icons.
 */
export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await req.formData();
  const file = formData.get("file");
  const folder = String(formData.get("folder") || "") as BlobFolder;

  if (!(file instanceof File) || file.size === 0) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }
  if (!ALLOWED_FOLDERS.has(folder)) {
    return NextResponse.json({ error: "Invalid folder" }, { status: 400 });
  }

  try {
    const url = await uploadIcon(file, folder);
    return NextResponse.json({ url }, { status: 201 });
  } catch (err) {
    // Surface the size/type validation message without leaking internals.
    const message = err instanceof Error ? err.message : "Upload failed";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
