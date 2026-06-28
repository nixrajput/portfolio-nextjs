import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { platformIcon, type SocialRow } from "@/components/home/Contact";

export function Footer({ socials }: { socials: SocialRow[] }) {
  const sorted = [...socials].sort((a, b) => a.order - b.order);
  const year = new Date().getFullYear();

  return (
    <footer className="border-border border-t px-6 py-12">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-8">
        {/* Row 1: logo + social icons */}
        <div className="flex w-full flex-col items-center gap-6 sm:flex-row sm:justify-between">
          <Link href="#hero" aria-label="Back to top">
            <Logo />
          </Link>

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

        {/* Row 2: personal sign-off + copyright */}
        <div className="flex flex-col items-center gap-1 text-center">
          <p className="text-foreground/80 text-sm">
            Designed &amp; built in India <span aria-label="India">🇮🇳</span>
          </p>
          <p className="text-muted text-xs">&copy; {year} Nikhil Rajput. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
