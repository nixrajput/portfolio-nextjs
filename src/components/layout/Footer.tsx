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
    <footer className="border-foreground/10 border-t px-6 py-12">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-8 text-center sm:flex-row sm:justify-between sm:text-left">
        <Link href="#hero">
          <Logo withWordmark />
        </Link>

        <nav
          aria-label="Footer"
          className="text-foreground/70 flex flex-wrap justify-center gap-5 text-sm"
        >
          {NAV.map((n) => (
            <Link key={n.id} href={`#${n.id}`} className="hover:text-foreground transition-colors">
              {n.label}
            </Link>
          ))}
        </nav>

        <ul className="flex gap-3">
          {sorted.map((s) => {
            const Icon = platformIcon(s.platform);
            return (
              <li key={s.platform}>
                <a
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.platform}
                  className="text-foreground/60 hover:text-foreground transition-colors"
                >
                  <Icon className="size-5" aria-hidden />
                </a>
              </li>
            );
          })}
        </ul>
      </div>

      <p className="text-foreground/50 mx-auto mt-8 max-w-5xl text-center text-xs">
        Built with Next.js, Tailwind CSS &amp; framer-motion. &copy; {year} Nikhil Rajput.
      </p>
    </footer>
  );
}

export default Footer;
