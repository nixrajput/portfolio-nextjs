import { Reveal } from "@/components/motion/Reveal";
import { WordReveal } from "./WordReveal";

export type AboutProfile = {
  bio: string;
  stats: { years: number; repos: number; stars: number };
};

function Stat({ value, label }: { value: number; label: string }) {
  return (
    <div className="text-center">
      <div className="gradient-text text-4xl font-bold sm:text-5xl">
        {value}
        {value >= 100 ? "+" : ""}
      </div>
      <div className="text-foreground/60 mt-1 text-sm">{label}</div>
    </div>
  );
}

export function About({ profile }: { profile: AboutProfile }) {
  return (
    <section id="about" className="scroll-mt-24 px-6 py-28">
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <p className="text-foreground/50 mb-8 font-mono text-sm tracking-widest uppercase">
            About
          </p>
        </Reveal>

        <WordReveal
          text={profile.bio}
          className="text-foreground text-2xl leading-relaxed font-medium text-balance sm:text-3xl"
        />

        <div className="mt-16 grid grid-cols-3 gap-6">
          <Stat value={profile.stats.years} label="Years building" />
          <Stat value={profile.stats.repos} label="Public repos" />
          <Stat value={profile.stats.stars} label="GitHub stars" />
        </div>
      </div>
    </section>
  );
}

export default About;
