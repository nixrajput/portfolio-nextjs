"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  User,
  FolderGit2,
  Briefcase,
  Wrench,
  Sparkles,
  Link2,
  HandCoins,
  MessageSquareQuote,
  ExternalLink,
  Menu,
  X,
} from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { cn } from "@/utils/cn";

const NAV = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/profile", label: "Profile", icon: User },
  { href: "/admin/projects", label: "Projects", icon: FolderGit2 },
  { href: "/admin/experiences", label: "Experiences", icon: Briefcase },
  { href: "/admin/skills", label: "Skills", icon: Wrench },
  { href: "/admin/services", label: "Services", icon: Sparkles },
  { href: "/admin/social-links", label: "Social Links", icon: Link2 },
  { href: "/admin/funding-links", label: "Funding Links", icon: HandCoins },
  { href: "/admin/testimonials", label: "Testimonials", icon: MessageSquareQuote },
];

function NavLinks({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  return (
    <nav className="flex flex-col gap-1">
      {NAV.map((item) => {
        const active = item.exact ? pathname === item.href : pathname.startsWith(item.href);
        const Icon = item.icon;
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            aria-current={active ? "page" : undefined}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition",
              active
                ? "bg-foreground/8 text-foreground"
                : "text-muted hover:bg-foreground/5 hover:text-foreground",
            )}
          >
            <span
              className={cn(
                "grid size-7 shrink-0 place-items-center rounded-md",
                active ? "bg-[image:var(--gradient-brand)] text-white" : "text-muted",
              )}
            >
              <Icon className="size-4" aria-hidden />
            </span>
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}

export function AdminShell({
  userLabel,
  children,
}: {
  userLabel: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-background min-h-screen">
      {/* ── Desktop sidebar ─────────────────────────────────────────────── */}
      <aside className="border-border bg-surface fixed inset-y-0 left-0 hidden w-64 flex-col border-r p-4 lg:flex">
        <Link href="/" className="mb-6 flex items-center gap-2 px-2">
          <Logo />
          <span className="text-foreground text-sm font-semibold">Portfolio Admin</span>
        </Link>
        <NavLinks />
        <div className="mt-auto">
          <Link
            href="/"
            className="text-muted hover:text-foreground flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition"
          >
            <ExternalLink className="size-4" aria-hidden />
            View site
          </Link>
        </div>
      </aside>

      {/* ── Mobile drawer ───────────────────────────────────────────────── */}
      {open ? (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            aria-label="Close menu"
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          <aside className="border-border bg-surface absolute inset-y-0 left-0 flex w-64 flex-col border-r p-4">
            <div className="mb-6 flex items-center justify-between px-2">
              <Link href="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
                <Logo />
                <span className="text-foreground text-sm font-semibold">Admin</span>
              </Link>
              <button
                aria-label="Close menu"
                onClick={() => setOpen(false)}
                className="text-muted hover:text-foreground"
              >
                <X className="size-5" aria-hidden />
              </button>
            </div>
            <NavLinks onNavigate={() => setOpen(false)} />
          </aside>
        </div>
      ) : null}

      {/* ── Main column ─────────────────────────────────────────────────── */}
      <div className="lg:pl-64">
        {/* Top bar */}
        <header className="border-border bg-background/80 sticky top-0 z-30 flex h-14 items-center justify-between gap-3 border-b px-4 backdrop-blur-md sm:px-6">
          <div className="flex items-center gap-3">
            <button
              aria-label="Open menu"
              onClick={() => setOpen(true)}
              className="text-muted hover:text-foreground lg:hidden"
            >
              <Menu className="size-5" aria-hidden />
            </button>
            <span className="text-foreground text-sm font-semibold">Admin</span>
          </div>
          <span className="text-muted text-sm">{userLabel}</span>
        </header>

        <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6">{children}</main>
      </div>
    </div>
  );
}
