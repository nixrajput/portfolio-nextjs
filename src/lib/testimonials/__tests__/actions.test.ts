import { describe, expect, it, vi, beforeEach } from "vitest";

// Hoist mockAuth AND db mock fns so they can be used inside vi.mock factories
const { mockAuth, mockWhere, mockSet, mockUpdate, mockDeleteWhere, mockDelete } = vi.hoisted(() => {
  const mockWhere = vi.fn().mockResolvedValue(undefined);
  const mockSet = vi.fn().mockReturnValue({ where: mockWhere });
  const mockUpdate = vi.fn().mockReturnValue({ set: mockSet });
  const mockDeleteWhere = vi.fn().mockResolvedValue(undefined);
  const mockDelete = vi.fn().mockReturnValue({ where: mockDeleteWhere });
  return {
    mockAuth: vi.fn(),
    mockWhere,
    mockSet,
    mockUpdate,
    mockDeleteWhere,
    mockDelete,
  };
});

// Mock DB so no DATABASE_URL is needed
vi.mock("@/db/client", () => ({
  db: {
    update: mockUpdate,
    delete: mockDelete,
  },
}));

// Mock next/cache so revalidatePath is a no-op in tests
vi.mock("next/cache", () => ({ revalidatePath: vi.fn(), revalidateTag: vi.fn() }));

// Auth mock — default to unauthenticated; individual tests override
vi.mock("@/auth", () => ({ auth: mockAuth }));

// Mock revalidate so revalidatePortfolio is a no-op
vi.mock("@/lib/revalidate", () => ({ revalidatePortfolio: vi.fn() }));

import {
  approveTestimonial,
  rejectTestimonial,
  deleteTestimonial,
  toggleFeatured,
  reorderTestimonials,
} from "../actions";

const VALID_UUID = "a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11";
const VALID_UUID_2 = "b1eebc99-9c0b-4ef8-bb6d-6bb9bd380a22";

function authedSession() {
  return { user: { name: "Admin", email: "admin@example.com" } };
}

beforeEach(() => {
  vi.clearAllMocks();
  // Restore default mock return values after clearAllMocks
  mockWhere.mockResolvedValue(undefined);
  mockSet.mockReturnValue({ where: mockWhere });
  mockUpdate.mockReturnValue({ set: mockSet });
  mockDeleteWhere.mockResolvedValue(undefined);
  mockDelete.mockReturnValue({ where: mockDeleteWhere });
});

describe("requireAdmin guard", () => {
  it("throws Unauthorized when there is no session", async () => {
    mockAuth.mockResolvedValue(null);
    await expect(approveTestimonial(VALID_UUID)).rejects.toThrow("Unauthorized");
  });

  it("throws Unauthorized when session has no user", async () => {
    mockAuth.mockResolvedValue({ user: null });
    await expect(rejectTestimonial(VALID_UUID)).rejects.toThrow("Unauthorized");
  });

  it("allows action when session has a user", async () => {
    mockAuth.mockResolvedValue(authedSession());
    await expect(deleteTestimonial(VALID_UUID)).resolves.toBeUndefined();
  });
});

describe("approveTestimonial", () => {
  beforeEach(() => {
    mockAuth.mockResolvedValue(authedSession());
  });

  it("updates status to approved", async () => {
    await approveTestimonial(VALID_UUID);
    expect(mockUpdate).toHaveBeenCalledOnce();
    expect(mockSet).toHaveBeenCalledWith({ status: "approved" });
    expect(mockWhere).toHaveBeenCalledOnce();
  });

  it("rejects invalid UUID", async () => {
    await expect(approveTestimonial("not-a-uuid")).rejects.toThrow();
  });
});

describe("rejectTestimonial", () => {
  beforeEach(() => {
    mockAuth.mockResolvedValue(authedSession());
  });

  it("updates status to rejected", async () => {
    await rejectTestimonial(VALID_UUID);
    expect(mockUpdate).toHaveBeenCalledOnce();
    expect(mockSet).toHaveBeenCalledWith({ status: "rejected" });
    expect(mockWhere).toHaveBeenCalledOnce();
  });

  it("rejects invalid UUID", async () => {
    await expect(rejectTestimonial("bad-id")).rejects.toThrow();
  });
});

describe("deleteTestimonial", () => {
  beforeEach(() => {
    mockAuth.mockResolvedValue(authedSession());
  });

  it("deletes the row", async () => {
    await deleteTestimonial(VALID_UUID);
    expect(mockDelete).toHaveBeenCalledOnce();
    expect(mockDeleteWhere).toHaveBeenCalledOnce();
  });

  it("rejects invalid UUID", async () => {
    await expect(deleteTestimonial("not-uuid")).rejects.toThrow();
  });
});

describe("toggleFeatured", () => {
  beforeEach(() => {
    mockAuth.mockResolvedValue(authedSession());
  });

  it("sets featured: true", async () => {
    await toggleFeatured(VALID_UUID, true);
    expect(mockUpdate).toHaveBeenCalledOnce();
    expect(mockSet).toHaveBeenCalledWith({ featured: true });
    expect(mockWhere).toHaveBeenCalledOnce();
  });

  it("sets featured: false", async () => {
    await toggleFeatured(VALID_UUID, false);
    expect(mockUpdate).toHaveBeenCalledOnce();
    expect(mockSet).toHaveBeenCalledWith({ featured: false });
    expect(mockWhere).toHaveBeenCalledOnce();
  });

  it("rejects invalid UUID", async () => {
    await expect(toggleFeatured("bad", true)).rejects.toThrow();
  });
});

describe("reorderTestimonials", () => {
  beforeEach(() => {
    mockAuth.mockResolvedValue(authedSession());
  });

  it("issues updates with correct order indices", async () => {
    await reorderTestimonials([VALID_UUID, VALID_UUID_2]);
    expect(mockUpdate).toHaveBeenCalledTimes(2);
    // First call: order 0
    expect(mockSet).toHaveBeenNthCalledWith(1, { order: 0 });
    // Second call: order 1
    expect(mockSet).toHaveBeenNthCalledWith(2, { order: 1 });
  });

  it("rejects empty array", async () => {
    await expect(reorderTestimonials([])).rejects.toThrow();
  });

  it("rejects array containing non-UUID strings", async () => {
    await expect(reorderTestimonials(["not-a-uuid"])).rejects.toThrow();
  });
});
