import { beforeEach, describe, expect, it, vi } from "vitest";

const putMock = vi.fn();
vi.mock("@vercel/blob", () => ({ put: (...a: unknown[]) => putMock(...a) }));

vi.mock("sharp", () => {
  const chain = {
    resize: vi.fn().mockReturnThis(),
    webp: vi.fn().mockReturnThis(),
    toBuffer: vi.fn().mockResolvedValue(Buffer.from("optimized")),
  };
  return { default: vi.fn(() => chain) };
});

import sharp from "sharp";
import { optimizeAndUploadAvatar } from "../upload-image";

function fakeFile(type: string, size: number): File {
  const f = new File([new Uint8Array(size)], "a.png", { type });
  return f;
}

describe("optimizeAndUploadAvatar", () => {
  beforeEach(() => {
    putMock.mockReset().mockResolvedValue({ url: "https://blob.test/x.webp" });
  });

  it("optimizes to 256px square webp and returns the blob url", async () => {
    const url = await optimizeAndUploadAvatar(fakeFile("image/png", 1000));
    expect(url).toBe("https://blob.test/x.webp");
    const chain = (sharp as unknown as ReturnType<typeof vi.fn>).mock.results[0]!.value;
    expect(chain.resize).toHaveBeenCalledWith(256, 256, {
      fit: "cover",
      position: "center",
    });
    expect(chain.webp).toHaveBeenCalledWith({ quality: 80 });
    expect(putMock).toHaveBeenCalledWith(
      expect.stringMatching(/^testimonials\/.+\.webp$/),
      expect.any(Buffer),
      expect.objectContaining({
        access: "public",
        contentType: "image/webp",
      }),
    );
  });

  it("rejects unsupported types", async () => {
    await expect(optimizeAndUploadAvatar(fakeFile("application/pdf", 100))).rejects.toThrow(
      /Unsupported/,
    );
  });

  it("rejects oversize files", async () => {
    await expect(optimizeAndUploadAvatar(fakeFile("image/png", 6 * 1024 * 1024))).rejects.toThrow(
      /too large/,
    );
  });
});
