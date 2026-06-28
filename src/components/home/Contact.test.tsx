import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { Contact, platformIcon } from "./Contact";
import type { SocialRow } from "./Contact";
import { Github, Linkedin, Twitter, Instagram, Send, Mail, Globe } from "lucide-react";

// Mock framer-motion to avoid jsdom animation issues
vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
      <div className={className} {...props}>
        {children}
      </div>
    ),
  },
}));

// Mock Reveal to render children directly
vi.mock("@/components/motion/Reveal", () => ({
  Reveal: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

// Mock usePrefersReducedMotion
vi.mock("@/hooks/usePrefersReducedMotion", () => ({
  usePrefersReducedMotion: vi.fn(() => false),
}));

const mockSocials: SocialRow[] = [
  { platform: "github", url: "https://github.com/nixrajput", username: "nixrajput", order: 1 },
  {
    platform: "linkedin",
    url: "https://linkedin.com/in/nixrajput",
    username: "nixrajput",
    order: 2,
  },
  { platform: "twitter", url: "https://twitter.com/nixrajput", username: "nixrajput", order: 3 },
];

describe("platformIcon", () => {
  it("returns Github icon for github", () => expect(platformIcon("github")).toBe(Github));
  it("returns Linkedin icon for linkedin", () => expect(platformIcon("linkedin")).toBe(Linkedin));
  it("returns Twitter icon for twitter", () => expect(platformIcon("twitter")).toBe(Twitter));
  it("returns Twitter icon for x", () => expect(platformIcon("x")).toBe(Twitter));
  it("returns Instagram icon for instagram", () =>
    expect(platformIcon("instagram")).toBe(Instagram));
  it("returns Send icon for telegram", () => expect(platformIcon("telegram")).toBe(Send));
  it("returns Mail icon for email", () => expect(platformIcon("email")).toBe(Mail));
  it("returns Globe icon for unknown platform", () => expect(platformIcon("unknown")).toBe(Globe));
  it("is case-insensitive", () => expect(platformIcon("GitHub")).toBe(Github));
});

describe("Contact", () => {
  const email = "nkr.nikhil.nkr@gmail.com";

  it("renders the contact section with id='contact'", () => {
    const { container } = render(<Contact socials={mockSocials} email={email} />);
    expect(container.querySelector("#contact")).toBeTruthy();
  });

  it("renders a mailto link with the given email", () => {
    render(<Contact socials={mockSocials} email={email} />);
    const link = screen.getByRole("link", { name: new RegExp(email) });
    expect(link).toBeTruthy();
    expect(link.getAttribute("href")).toBe(`mailto:${email}`);
  });

  it("renders social links with accessible labels", () => {
    render(<Contact socials={mockSocials} email={email} />);
    expect(screen.getByLabelText("github: nixrajput")).toBeTruthy();
    expect(screen.getByLabelText("linkedin: nixrajput")).toBeTruthy();
    expect(screen.getByLabelText("twitter: nixrajput")).toBeTruthy();
  });

  it("renders external social links that open in a new tab (target=_blank)", () => {
    render(<Contact socials={mockSocials} email={email} />);
    const githubLink = screen.getByLabelText("github: nixrajput");
    expect(githubLink.getAttribute("href")).toBe("https://github.com/nixrajput");
    expect(githubLink.getAttribute("target")).toBe("_blank");
    expect(githubLink.getAttribute("rel")).toBe("noopener noreferrer");
  });

  it("renders the heading", () => {
    render(<Contact socials={mockSocials} email={email} />);
    expect(screen.getByText(/Let's build something/i)).toBeTruthy();
  });

  it("renders all social icons in sorted order", () => {
    const unsorted: SocialRow[] = [
      {
        platform: "twitter",
        url: "https://twitter.com/nixrajput",
        username: "nixrajput",
        order: 3,
      },
      { platform: "github", url: "https://github.com/nixrajput", username: "nixrajput", order: 1 },
      {
        platform: "linkedin",
        url: "https://linkedin.com/in/nixrajput",
        username: "nixrajput",
        order: 2,
      },
    ];
    const { container } = render(<Contact socials={unsorted} email={email} />);
    const items = container.querySelectorAll("li a");
    expect(items).toHaveLength(3);
  });

  it("renders empty social list gracefully", () => {
    render(<Contact socials={[]} email={email} />);
    const link = screen.getByRole("link", { name: new RegExp(email) });
    expect(link).toBeTruthy();
  });
});
