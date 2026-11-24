import { describe, expect, it, vi } from "vitest";
import { render, waitFor } from "@testing-library/react";
import { ServiceCard, toIconName } from "./ServiceCard";
import type { ServiceRow } from "./Services";

vi.mock("@/hooks/useReducedMotion", () => ({ useReducedMotion: () => true }));

const service = (icon: string | null): ServiceRow => ({
  id: 1,
  title: "API Design",
  description: "RESTful and GraphQL APIs.",
  shortDescription: null,
  icon,
  order: 0,
});

describe("toIconName", () => {
  it("keeps a lucide icon name", () => expect(toIconName("code")).toBe("code"));
  it("accepts the older PascalCase component names", () => {
    expect(toIconName("Smartphone")).toBe("smartphone");
    expect(toIconName("MonitorSmartphone")).toBe("monitor-smartphone");
    expect(toIconName("Code2")).toBe("code-2");
  });
  it.each([null, "", "  ", "/icons/web.svg", "not-an-icon"])("returns null for %j", (name) =>
    expect(toIconName(name)).toBeNull(),
  );
});

describe("ServiceCard icon", () => {
  it("renders the named lucide icon", async () => {
    const { container } = render(<ServiceCard service={service("code")} />);
    await waitFor(() => expect(container.querySelector("svg.lucide-code")).toBeInTheDocument());
  });
  it("renders the fallback icon for an unknown or empty name", () => {
    for (const icon of [null, "not-an-icon"]) {
      const { container, unmount } = render(<ServiceCard service={service(icon)} />);
      expect(container.querySelector("svg.lucide-sparkles")).toBeInTheDocument();
      unmount();
    }
  });
});
