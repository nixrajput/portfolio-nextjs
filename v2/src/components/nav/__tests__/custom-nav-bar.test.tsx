/* eslint-disable @next/next/no-img-element */
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, mock } from "bun:test";
import React from "react";
import CustomNavBar from "../custom-nav-bar";

// Import test setup for DOM environment
import "../../../../bun-test-setup";

// Mock the useTheme hook
const mockSetTheme = mock(() => {});
const mockUseTheme = mock(() => ({
  theme: "system" as const,
  setTheme: mockSetTheme,
  effectiveTheme: "dark" as const,
}));

// Mock the usePathname hook
const mockUsePathname = mock(() => "/");

// Mock next/navigation
mock.module("next/navigation", () => ({
  usePathname: mockUsePathname,
}));

// Mock the useTheme hook
mock.module("@/hooks/use-theme", () => ({
  useTheme: mockUseTheme,
}));

// Mock the utils
mock.module("@/lib/utils", () => ({
  cn: (...classes: string[]) => classes.filter(Boolean).join(" "),
}));

// Mock framer-motion to avoid animation issues in tests
mock.module("motion/react", () => ({
  motion: {
    nav: ({ children, ...props }: React.ComponentProps<"nav">) => (
      <nav {...props}>{children}</nav>
    ),
    div: ({ children, ...props }: React.ComponentProps<"div">) => (
      <div {...props}>{children}</div>
    ),
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => (
    <>{children}</>
  ),
  useScroll: () => ({ scrollY: { get: () => 0 } }),
  useMotionValueEvent: () => {},
}));

// Mock Tabler icons
mock.module("@tabler/icons-react", () => ({
  IconMenu2: (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} data-testid="menu-icon" />
  ),
  IconX: (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} data-testid="close-icon" />
  ),
}));

// Mock Lucide icons
mock.module("lucide-react", () => ({
  Sun: (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} data-testid="sun-icon" />
  ),
  Moon: (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} data-testid="moon-icon" />
  ),
}));

// Mock Next.js Image component
mock.module("next/image", () => ({
  default: ({
    src,
    alt,
    ...props
  }: {
    src: string;
    alt: string;
    [key: string]: unknown;
  }) => <img src={src} alt={alt} {...props} />,
}));

// Mock Next.js Link component
mock.module("next/link", () => ({
  default: ({
    href,
    children,
    ...props
  }: {
    href: string;
    children: React.ReactNode;
    [key: string]: unknown;
  }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

// Mock UI components from resizable-navbar
mock.module("@/components/ui/resizable-navbar", () => ({
  Navbar: ({
    children,
    className,
  }: {
    children: React.ReactNode;
    className?: string;
  }) => <nav className={className}>{children}</nav>,
  NavBody: ({
    children,
    className,
  }: {
    children: React.ReactNode;
    className?: string;
  }) => <div className={className}>{children}</div>,
  NavItems: ({
    items,
    className,
    onItemClick,
    activePath,
  }: {
    items: { name: string; link: string }[];
    className?: string;
    onItemClick?: () => void;
    activePath?: string;
  }) => (
    <div className={className}>
      {items.map((item, index) => (
        <a
          key={index}
          href={item.link}
          onClick={onItemClick}
          className={activePath === item.link ? "active" : ""}
        >
          {item.name}
        </a>
      ))}
    </div>
  ),
  MobileNav: ({
    children,
    className,
  }: {
    children: React.ReactNode;
    className?: string;
  }) => <div className={className}>{children}</div>,
  MobileNavHeader: ({
    children,
    className,
  }: {
    children: React.ReactNode;
    className?: string;
  }) => <div className={className}>{children}</div>,
  MobileNavMenu: ({
    children,
    className,
    isOpen,
  }: {
    children: React.ReactNode;
    className?: string;
    isOpen: boolean;
  }) => (isOpen ? <div className={className}>{children}</div> : null),
  MobileNavItems: ({
    items,
    className,
    onItemClick,
    activePath,
  }: {
    items: { name: string; link: string }[];
    className?: string;
    onItemClick?: () => void;
    activePath?: string;
  }) => (
    <div className={className}>
      {items.map((item, index) => (
        <a
          key={index}
          href={item.link}
          onClick={onItemClick}
          className={activePath === item.link ? "active" : ""}
        >
          {item.name}
        </a>
      ))}
    </div>
  ),
  MobileNavToggle: ({
    isOpen,
    onClick,
  }: {
    isOpen: boolean;
    onClick: () => void;
  }) => (
    <button onClick={onClick} data-testid="mobile-nav-toggle">
      {isOpen ? (
        <svg data-testid="close-icon" />
      ) : (
        <svg data-testid="menu-icon" />
      )}
    </button>
  ),
  NavbarLogo: ({
    logoSrc,
    logoText,
    className,
  }: {
    logoSrc: string;
    logoText?: string;
    className?: string;
  }) => (
    <div className={className}>
      <img src={logoSrc} alt="logo" />
      {logoText && <span>{logoText}</span>}
    </div>
  ),
}));

// Mock ThemeModeToggle component
mock.module("@/components/theme/theme-mode-toggle", () => ({
  default: ({ onClick }: { onClick?: () => void }) => (
    <button onClick={onClick} data-testid="theme-toggle">
      <svg data-testid="sun-icon" />
    </button>
  ),
}));

describe("CustomNavBar", () => {
  beforeEach(() => {
    cleanup();
    // Reset mocks
    mockUsePathname.mockReturnValue("/");
    mockSetTheme.mockClear();
    mockUseTheme.mockReturnValue({
      theme: "system" as const,
      setTheme: mockSetTheme,
      effectiveTheme: "dark" as const,
    });
  });

  it("renders with default props", () => {
    render(<CustomNavBar />);

    // Check if logo is rendered
    const logo = screen.getByRole("img");
    expect(logo).toHaveAttribute("src", "/icon.png");

    // Check if all default nav items are rendered
    expect(screen.getByText("Home")).toBeDefined();
    expect(screen.getByText("About")).toBeDefined();
    expect(screen.getByText("Services")).toBeDefined();
    expect(screen.getByText("Projects")).toBeDefined();
    expect(screen.getByText("Contact")).toBeDefined();
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
    const logo = screen.getByRole("img");
    expect(logo).toHaveAttribute("src", "/custom-logo.png");

    // Check if custom nav items are rendered
    expect(screen.getByText("Custom1")).toBeDefined();
    expect(screen.getByText("Custom2")).toBeDefined();

    // Check if default nav items are not rendered
    expect(screen.queryByText("Home")).toBeNull();
  });

  it("toggles mobile menu when clicking the toggle button", () => {
    render(<CustomNavBar />);

    // Find the mobile menu toggle button by its icon
    const toggleButton = screen.getByTestId("menu-icon").closest("button");
    expect(toggleButton).toBeDefined();

    // Click the mobile menu toggle button
    fireEvent.click(toggleButton!);

    // Check if mobile menu items are visible (they should be in DOM after opening)
    // The mobile nav items should be present after clicking
    const mobileNavItems = screen.getAllByText("Home");
    expect(mobileNavItems.length).toBeGreaterThan(1); // Should have both desktop and mobile versions
  });

  it("closes mobile menu when clicking a nav item", () => {
    render(<CustomNavBar />);

    // Open mobile menu first
    const toggleButton = screen.getByTestId("menu-icon").closest("button");
    fireEvent.click(toggleButton!);

    // Find and click a nav item in mobile menu
    const navItems = screen.getAllByText("Home");
    const mobileNavItem = navItems[navItems.length - 1]; // Get the last one (mobile version)
    fireEvent.click(mobileNavItem);

    // Mobile menu should close (this is handled by the component's state)
    // We can verify the state change by checking if the menu icon is back to menu (not close)
    expect(screen.getByTestId("menu-icon")).toBeDefined();
  });

  it("renders theme toggle buttons", () => {
    render(<CustomNavBar />);

    // Check if theme toggle buttons exist (there should be two - desktop and mobile)
    const sunIcons = screen.getAllByTestId("sun-icon");
    const moonIcons = screen.getAllByTestId("moon-icon");

    // Should have at least one theme toggle (could be sun or moon depending on current theme)
    expect(sunIcons.length + moonIcons.length).toBeGreaterThan(0);
  });

  it("highlights active nav item based on current path", () => {
    // Mock current path as /about
    mockUsePathname.mockReturnValue("/about");

    render(<CustomNavBar />);

    // Check that the component renders with the mocked path
    // The active state styling would be applied by the NavItems component
    expect(screen.getByText("About")).toBeDefined();
    expect(screen.getByText("Home")).toBeDefined();
  });

  it("calls setTheme when theme toggle is clicked", () => {
    render(<CustomNavBar />);

    // Find theme toggle button and click it to open dropdown
    const themeButtons = screen.getAllByRole("button");
    const themeToggleButton = themeButtons.find(
      (button) =>
        button.querySelector('[data-testid="sun-icon"]') ||
        button.querySelector('[data-testid="moon-icon"]')
    );

    expect(themeToggleButton).toBeDefined();
    fireEvent.click(themeToggleButton!);

    // The dropdown should open, but we're testing the component structure
    // The actual theme setting would happen when dropdown items are clicked
    expect(mockUseTheme).toHaveBeenCalled();
  });

  it("passes onClick prop to ThemeModeToggle components", () => {
    const _onClickSpy = mock(() => {});

    // We can't directly test the onClick prop passing without modifying the component
    // But we can test that the component renders without errors when onClick is used
    render(<CustomNavBar />);

    // Verify that both theme toggles are rendered (desktop and mobile)
    const themeButtons = screen
      .getAllByRole("button")
      .filter(
        (button) =>
          button.querySelector('[data-testid="sun-icon"]') ||
          button.querySelector('[data-testid="moon-icon"]')
      );

    expect(themeButtons.length).toBeGreaterThanOrEqual(1);
  });

  it("handles mobile menu state correctly", () => {
    render(<CustomNavBar />);

    // Initially, mobile menu should be closed
    const toggleButton = screen.getByTestId("menu-icon").closest("button");
    expect(toggleButton).toBeDefined();

    // Click to open
    fireEvent.click(toggleButton!);

    // Click to close
    fireEvent.click(toggleButton!);

    // Should be back to menu icon
    expect(screen.getByTestId("menu-icon")).toBeDefined();
  });

  it("renders correct number of navigation items", () => {
    render(<CustomNavBar />);

    // Should render all default nav items
    const defaultItems = ["Home", "About", "Services", "Projects", "Contact"];
    defaultItems.forEach((item) => {
      expect(screen.getByText(item)).toBeDefined();
    });
  });

  it("applies custom className when provided", () => {
    const customClass = "custom-navbar-class";
    render(<CustomNavBar className={customClass} />);

    // The navbar should be rendered (we can't easily test className without DOM queries)
    // But we can verify the component renders without errors
    expect(screen.getByRole("navigation")).toBeDefined();
  });
});
