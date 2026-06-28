import {
  Github,
  Linkedin,
  Twitter,
  Instagram,
  Send,
  Mail,
  Globe,
  type LucideIcon,
} from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";

const ICONS: Record<string, LucideIcon> = {
  github: Github,
  linkedin: Linkedin,
  twitter: Twitter,
  x: Twitter,
  instagram: Instagram,
  telegram: Send,
  email: Mail,
};

export function platformIcon(platform: string): LucideIcon {
  return ICONS[platform.toLowerCase()] ?? Globe;
}

export type SocialRow = {
  platform: string;
  url: string;
  username: string;
  order: number;
};

export function Contact({ socials, email }: { socials: SocialRow[]; email: string }) {
  const sorted = [...socials].sort((a, b) => a.order - b.order);

  return (
    <section id="contact" className="scroll-mt-24 px-6 py-28 text-center">
      <div className="mx-auto max-w-2xl">
        <Reveal>
          <p className="text-foreground/50 mb-3 font-mono text-sm tracking-widest uppercase">
            Contact
          </p>
          <h2 className="mb-4 text-3xl font-bold sm:text-4xl">Let&apos;s build something</h2>
          <p className="text-foreground/70 mb-8">
            Have a project, role, or idea in mind? The fastest way to reach me is email.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <a
            href={`mailto:${email}`}
            className="inline-flex items-center gap-2 rounded-full bg-[image:var(--gradient-brand)] px-7 py-3.5 text-sm font-semibold text-white shadow-md transition-opacity hover:opacity-90"
          >
            <Mail className="size-4" aria-hidden /> {email}
          </a>
        </Reveal>

        <Reveal delay={0.15}>
          <ul className="mt-10 flex flex-wrap items-center justify-center gap-3">
            {sorted.map((s) => {
              const Icon = platformIcon(s.platform);
              return (
                <li key={s.platform}>
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${s.platform}: ${s.username}`}
                    className="border-foreground/15 text-foreground/70 hover:text-foreground grid size-11 place-items-center rounded-full border transition-colors hover:border-[var(--brand-violet)]/50"
                  >
                    <Icon className="size-5" aria-hidden />
                  </a>
                </li>
              );
            })}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

export default Contact;
