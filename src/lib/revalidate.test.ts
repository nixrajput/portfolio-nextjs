import { afterEach, describe, expect, it, vi } from "vitest";

const revalidatePath = vi.fn();
const revalidateTag = vi.fn();
vi.mock("next/cache", () => ({ revalidatePath, revalidateTag }));

afterEach(() => vi.clearAllMocks());

describe("revalidatePortfolio", () => {
  it("revalidates /, both llms routes and the github tag with a cacheLife arg", async () => {
    const { revalidatePortfolio } = await import("./revalidate");
    revalidatePortfolio();
    expect(revalidatePath).toHaveBeenCalledWith("/");
    expect(revalidatePath).toHaveBeenCalledWith("/llms.txt");
    expect(revalidatePath).toHaveBeenCalledWith("/llms-full.txt");
    expect(revalidateTag).toHaveBeenCalledWith("github", "max");
  });
});
