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
import { Section, SectionHeading } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";

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
    <Section id="contact" className="scroll-mt-24">
      <div className="mx-auto max-w-2xl text-center">
        <Reveal>
          <SectionHeading eyebrow="Contact" title="Let's build something" className="mb-4" />
          <p className="text-foreground/70 mb-8">
            Have a project, role, or idea in mind? The fastest way to reach me is email.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <Button
            href={`mailto:${email}`}
            variant="primary"
            size="lg"
            leftIcon={<Mail className="size-4" aria-hidden />}
          >
            {email}
          </Button>
        </Reveal>

        <Reveal delay={0.15}>
          <ul className="mt-10 flex flex-wrap items-center justify-center gap-3">
            {sorted.map((s) => {
              const Icon = platformIcon(s.platform);
              return (
                <li key={s.platform}>
                  <a
                    href={s.url}
                    aria-label={`${s.platform}: ${s.username}`}
                    className="border-border text-muted hover:text-foreground hover:border-foreground/30 hover:bg-surface-2 focus-visible:ring-ring grid size-11 place-items-center rounded-full border transition-colors focus-visible:ring-2 focus-visible:outline-none motion-safe:transition-transform motion-safe:hover:scale-105"
                  >
                    <Icon className="size-5" aria-hidden />
                  </a>
                </li>
              );
            })}
          </ul>
        </Reveal>
      </div>
    </Section>
  );
}

export default Contact;
