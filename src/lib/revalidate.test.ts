import { afterEach, describe, expect, it, vi } from "vitest";

const revalidatePath = vi.fn();
const revalidateTag = vi.fn();
vi.mock("next/cache", () => ({ revalidatePath, revalidateTag }));

afterEach(() => vi.clearAllMocks());

describe("revalidatePortfolio", () => {
  it("revalidates / and the github tag with a cacheLife arg", async () => {
    const { revalidatePortfolio } = await import("./revalidate");
    revalidatePortfolio();
    expect(revalidatePath).toHaveBeenCalledWith("/");
    expect(revalidateTag).toHaveBeenCalledWith("github", "max");
  });
});
