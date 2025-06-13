import { render, screen, fireEvent } from "@testing-library/react";
import CustomNavBar from "../../nav/custom-nav-bar";
import { usePathname } from "next/navigation";

// Mock next/navigation
jest.mock("next/navigation", () => ({
  usePathname: jest.fn(),
}));

describe("CustomNavBar", () => {
  beforeEach(() => {
    // Mock usePathname to return home path by default
    (usePathname as jest.Mock).mockReturnValue("/");
  });

  it("renders with default props", () => {
    render(<CustomNavBar />);

    // Check if logo is rendered
    expect(screen.getByRole("img")).toHaveAttribute("src", "/icon.png");

    // Check if all default nav items are rendered
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("About")).toBeInTheDocument();
    expect(screen.getByText("Services")).toBeInTheDocument();
    expect(screen.getByText("Projects")).toBeInTheDocument();
    expect(screen.getByText("Contact")).toBeInTheDocument();
  });

  it("renders with custom props", () => {
    const customNavItems = [
      { name: "Custom1", link: "/custom1" },
      { name: "Custom2", link: "/custom2" },
    ];

    render(
      <CustomNavBar
        className="custom-class"
        navItems={customNavItems}
        logoSrc="/custom-logo.png"
      />
    );

    // Check if custom logo is rendered
    expect(screen.getByRole("img")).toHaveAttribute("src", "/custom-logo.png");

    // Check if custom nav items are rendered
    expect(screen.getByText("Custom1")).toBeInTheDocument();
    expect(screen.getByText("Custom2")).toBeInTheDocument();

    // Check if default nav items are not rendered
    expect(screen.queryByText("Home")).not.toBeInTheDocument();
  });

  it("toggles mobile menu when clicking the toggle button", () => {
    render(<CustomNavBar />);

    // Mobile menu should be closed initially
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

    // Click the mobile menu toggle button
    const toggleButton = screen.getByRole("button", { name: /toggle menu/i });
    fireEvent.click(toggleButton);

    // Mobile menu should be open
    expect(screen.getByRole("dialog")).toBeInTheDocument();

    // Click again to close
    fireEvent.click(toggleButton);

    // Mobile menu should be closed
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("closes mobile menu when clicking a nav item", () => {
    render(<CustomNavBar />);

    // Open mobile menu
    const toggleButton = screen.getByRole("button", { name: /toggle menu/i });
    fireEvent.click(toggleButton);

    // Click a nav item
    const navItem = screen.getByText("Home");
    fireEvent.click(navItem);

    // Mobile menu should be closed
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("renders theme toggle button", () => {
    render(<CustomNavBar />);

    // Check if theme toggle button exists
    expect(
      screen.getByRole("button", { name: /toggle theme/i })
    ).toBeInTheDocument();
  });

  it("highlights active nav item based on current path", () => {
    // Mock current path as /about
    (usePathname as jest.Mock).mockReturnValue("/about");

    render(<CustomNavBar />);

    // About link should have active class
    const aboutLink = screen.getByText("About");
    expect(aboutLink).toHaveClass("active");

    // Other links should not have active class
    const homeLink = screen.getByText("Home");
    expect(homeLink).not.toHaveClass("active");
  });
});
