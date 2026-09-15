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
import { uploadAvatar, uploadIcon } from "../blob";

function fakeFile(type: string, size: number, name = "a.png"): File {
  return new File([new Uint8Array(size)], name, { type });
}

function lastChain(index: number) {
  return (sharp as unknown as ReturnType<typeof vi.fn>).mock.results[index]!.value;
}

describe("uploadAvatar", () => {
  beforeEach(() => {
    putMock.mockReset().mockResolvedValue({ url: "https://blob.test/x.webp" });
    (sharp as unknown as ReturnType<typeof vi.fn>).mockClear();
  });

  // The regression this guards: routing the portrait through uploadIcon stored it at 128px, so
  // About upscaled it ~5x and it rendered blurry.
  it("keeps a portrait at 1024px rather than an icon's 128px box", async () => {
    await uploadAvatar(fakeFile("image/png", 1000));
    expect(lastChain(0).resize).toHaveBeenCalledWith(1024, 1024, {
      fit: "inside",
      position: "center",
    });
    expect(lastChain(0).webp).toHaveBeenCalledWith({ quality: 90 });
    expect(putMock).toHaveBeenCalledWith(
      expect.stringMatching(/^avatar\/.+\.webp$/),
      expect.any(Buffer),
      expect.objectContaining({ access: "public", contentType: "image/webp" }),
    );
  });

  it("still stores an SVG raw", async () => {
    putMock.mockResolvedValue({ url: "https://blob.test/x.svg" });
    const url = await uploadAvatar(fakeFile("image/svg+xml", 100, "a.svg"));
    expect(url).toBe("https://blob.test/x.svg");
    expect(putMock).toHaveBeenCalledWith(
      expect.stringMatching(/^avatar\/.+\.svg$/),
      expect.any(Buffer),
      expect.objectContaining({ contentType: "image/svg+xml" }),
    );
  });

  it("rejects oversize files", async () => {
    await expect(uploadAvatar(fakeFile("image/png", 6 * 1024 * 1024))).rejects.toThrow(/too large/);
  });

  it("leaves icons on the 128px box", async () => {
    await uploadIcon(fakeFile("image/png", 1000), "skills");
    expect(lastChain(0).resize).toHaveBeenCalledWith(128, 128, {
      fit: "inside",
      position: "center",
    });
  });
});
