import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@/db/client", () => ({
  db: {
    insert: vi.fn(() => ({
      values: vi.fn(() => ({
        returning: vi.fn().mockResolvedValue([{ id: "row-1" }]),
      })),
    })),
  },
}));
vi.mock("@/db/schema", () => ({ testimonials: {} }));
vi.mock("../upload-image", () => ({
  optimizeAndUploadAvatar: vi.fn().mockResolvedValue("https://blob.test/a.webp"),
}));
vi.mock("../notify", () => ({
  notifyNewTestimonial: vi.fn().mockResolvedValue(undefined),
}));

import { db } from "@/db/client";
import { optimizeAndUploadAvatar } from "../upload-image";
import { notifyNewTestimonial } from "../notify";
import { submitTestimonial } from "../submit";

function fd(fields: Record<string, string>): FormData {
  const f = new FormData();
  for (const [k, v] of Object.entries(fields)) f.set(k, v);
  return f;
}

const headers = (ip: string) => new Headers({ "x-forwarded-for": ip });

const good = {
  name: "Jane Doe",
  relationship: "Worked together at NixLab",
  content: "Nikhil delivered our platform rewrite ahead of schedule. Stellar.",
  website: "",
};

describe("submitTestimonial", () => {
  const insertMock = vi.mocked(db.insert);
  const uploadMock = vi.mocked(optimizeAndUploadAvatar);
  const notifyMock = vi.mocked(notifyNewTestimonial);

  beforeEach(() => {
    vi.clearAllMocks();
    // Re-wire the insert chain after clearAllMocks resets return values
    const returning = vi.fn().mockResolvedValue([{ id: "row-1" }]);
    const values = vi.fn(() => ({ returning }));
    insertMock.mockReturnValue({ values } as unknown as ReturnType<typeof db.insert>);
    uploadMock.mockResolvedValue("https://blob.test/a.webp");
    notifyMock.mockResolvedValue(undefined);
  });

  it("inserts a pending row and notifies on valid input", async () => {
    const r = await submitTestimonial(fd(good), headers("10.0.0.1"));
    expect(r.ok).toBe(true);
    expect(insertMock).toHaveBeenCalled();
    // values() was called with status: 'pending'
    const valuesFn = insertMock.mock.results[0]!.value.values as ReturnType<typeof vi.fn>;
    expect(valuesFn).toHaveBeenCalledWith(expect.objectContaining({ status: "pending" }));
    expect(notifyMock).toHaveBeenCalledOnce();
  });

  it("rejects short content with 400", async () => {
    const r = await submitTestimonial(fd({ ...good, content: "nope" }), headers("10.0.0.2"));
    expect(r).toMatchObject({ ok: false, status: 400 });
    expect(insertMock).not.toHaveBeenCalled();
  });

  it("silently accepts-and-drops honeypot hits without inserting", async () => {
    const r = await submitTestimonial(fd({ ...good, website: "http://bot" }), headers("10.0.0.3"));
    expect(r.ok).toBe(true);
    expect(insertMock).not.toHaveBeenCalled();
  });

  it("returns 429 after exceeding the per-IP limit", async () => {
    const ip = headers("10.0.0.99");
    await submitTestimonial(fd(good), ip);
    await submitTestimonial(fd(good), ip);
    await submitTestimonial(fd(good), ip);
    const r = await submitTestimonial(fd(good), ip);
    expect(r).toMatchObject({ ok: false, status: 429 });
  });

  it("still returns ok when notification email fails", async () => {
    notifyMock.mockRejectedValueOnce(new Error("email down"));
    const r = await submitTestimonial(fd(good), headers("10.0.0.10"));
    expect(r.ok).toBe(true);
    expect(insertMock).toHaveBeenCalled();
  });
});
