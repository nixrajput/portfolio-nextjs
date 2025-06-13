import { render, screen } from "@testing-library/react";
import ProfileCard from "@/components/about/profile-card";
import { defaultSocialLinks } from "@/data";

// Mock next/image
jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: {
    src: string;
    alt: string;
    width?: number;
    height?: number;
    sizes?: string;
    loading?: "eager" | "lazy";
    placeholder?: string;
    blurDataURL?: string;
    className?: string;
  }) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} alt={props.alt || ""} />;
  },
}));

describe("ProfileCard", () => {
  const defaultProps = {
    name: "Test Name",
    title: "Test Title",
    avatarSrc: "/test-avatar.png",
    avatarAlt: "Test Avatar",
    socialLinks: defaultSocialLinks,
  };

  it("renders with default props", () => {
    render(<ProfileCard />);

    expect(screen.getByText("Nikhil Rajput")).toBeInTheDocument();
    expect(screen.getByText("Full Stack Developer")).toBeInTheDocument();
    expect(screen.getByAltText("Nikhil Rajput")).toHaveAttribute(
      "src",
      "/images/profile.png"
    );
  });

  it("renders with custom props", () => {
    render(<ProfileCard {...defaultProps} />);

    expect(screen.getByText(defaultProps.name)).toBeInTheDocument();
    expect(screen.getByText(defaultProps.title)).toBeInTheDocument();
    expect(screen.getByAltText(defaultProps.avatarAlt)).toHaveAttribute(
      "src",
      defaultProps.avatarSrc
    );
  });

  it("renders social links", () => {
    render(<ProfileCard />);

    defaultSocialLinks.forEach((link) => {
      const socialLink = screen.getByRole("link", {
        name: new RegExp(link.href),
      });
      expect(socialLink).toBeInTheDocument();
      expect(socialLink).toHaveAttribute("href", link.href);
      if (link.external) {
        expect(socialLink).toHaveAttribute("target", "_blank");
        expect(socialLink).toHaveAttribute("rel", "noopener noreferrer");
      }
    });
  });

  it("renders chat button", () => {
    render(<ProfileCard />);

    const chatButton = screen.getByRole("button", { name: /let's chat/i });
    expect(chatButton).toBeInTheDocument();
    expect(chatButton).toHaveClass(
      "bg-gradient-to-r",
      "from-purple-500",
      "via-violet-500",
      "to-pink-500"
    );
  });
});
