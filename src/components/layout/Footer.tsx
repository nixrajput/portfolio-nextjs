import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { platformIcon, type SocialRow } from "@/components/home/Contact";

const NAV = [
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "services", label: "Services" },
  { id: "contact", label: "Contact" },
];

export function Footer({ socials }: { socials: SocialRow[] }) {
  const sorted = [...socials].sort((a, b) => a.order - b.order);
  const year = new Date().getFullYear();

  return (
    <footer className="border-border border-t px-6 py-12">
      <div className="mx-auto max-w-6xl space-y-8">
        {/* Top row: logo + nav + social icons */}
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
          <Link href="#hero" aria-label="Back to top">
            <Logo />
          </Link>

          <nav aria-label="Footer" className="flex flex-wrap justify-center gap-5">
            {NAV.map((n) => (
              <Link
                key={n.id}
                href={`#${n.id}`}
                className="text-muted hover:text-foreground relative text-sm transition-colors after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-current after:transition-[width] after:duration-300 hover:after:w-full"
              >
                {n.label}
              </Link>
            ))}
          </nav>

          <ul className="flex items-center gap-3">
            {sorted.map((s) => {
              const Icon = platformIcon(s.platform);
              const isExternal = s.url.startsWith("http");
              return (
                <li key={s.platform}>
                  <a
                    href={s.url}
                    aria-label={s.platform}
                    {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="text-muted hover:text-foreground hover:bg-surface-2 focus-visible:ring-ring grid size-8 place-items-center rounded-full transition-colors focus-visible:ring-2 focus-visible:outline-none motion-safe:transition-transform motion-safe:hover:scale-110"
                  >
                    <Icon className="size-4" aria-hidden />
                  </a>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Credit line */}
        <p className="text-muted text-center text-xs">
          Built with Next.js, Tailwind CSS &amp; framer-motion. &copy; {year} Nikhil Rajput.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
