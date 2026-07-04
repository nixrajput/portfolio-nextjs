import nextDynamic from "next/dynamic";
import {
  getProfile,
  getProjectsMerged,
  getExperiences,
  getSkills,
  getServices,
  getSocialLinks,
  getFundingLinks,
} from "@/lib/queries";
import { Hero } from "@/components/home/Hero";
import { SiteNav } from "@/components/navbar/SiteNav";
import { Footer } from "@/components/layout/Footer";

// The homepage is DB-driven but its content changes rarely, so use ISR: it is
// statically generated and CDN-cached (fast TTFB), regenerated in the
// background at most once an hour and on demand when the admin saves (via
// revalidatePortfolio). It is prerendered at build time, so the build needs a
// reachable database — provided locally and in CI.
export const revalidate = 3600;

// Below-the-fold sections: lazy-loaded to keep the hero bundle lean.
// Note: These are Server Components — next/dynamic with ssr:true (default)
// performs code-splitting without disabling server rendering.
const About = nextDynamic(() =>
  import("@/components/home/About").then((m) => ({ default: m.About })),
);
const Skills = nextDynamic(() =>
  import("@/components/home/Skills").then((m) => ({ default: m.Skills })),
);
const Experience = nextDynamic(() =>
  import("@/components/home/Experience").then((m) => ({ default: m.Experience })),
);
const Projects = nextDynamic(() =>
  import("@/components/home/Projects").then((m) => ({ default: m.Projects })),
);
const Services = nextDynamic(() =>
  import("@/components/home/Services").then((m) => ({ default: m.Services })),
);
const Support = nextDynamic(() =>
  import("@/components/home/Support").then((m) => ({ default: m.Support })),
);
const TestimonialsSection = nextDynamic(() =>
  import("@/components/sections/TestimonialsSection").then((m) => ({
    default: m.TestimonialsSection,
  })),
);
const Contact = nextDynamic(() =>
  import("@/components/home/Contact").then((m) => ({ default: m.Contact })),
);
const Faq = nextDynamic(() =>
  import("@/components/sections/FaqSection").then((m) => ({ default: m.FaqSection })),
);

export default async function Home() {
  const [profile, projects, experiences, skills, services, socials, funding] = await Promise.all([
    getProfile(),
    getProjectsMerged(),
    getExperiences(),
    getSkills(),
    getServices(),
    getSocialLinks(),
    getFundingLinks(),
  ]);

  const sponsorUrl = funding.find((f) => f.primary)?.url;
  // Earliest 4-digit year across experience periods (freeform text like
  // "Jan 2020 - Present"), used for the hero eyebrow. Undefined if none parse.
  const years = experiences
    .map((e) => e.period.match(/(?:19|20)\d{2}/)?.[0])
    .filter((y): y is string => Boolean(y))
    .map(Number);
  const careerStartYear = years.length ? Math.min(...years) : undefined;
  // Derive contact email from social links (platform = "email") or fall back
  const contactEmail =
    socials.find((s) => s.platform.toLowerCase() === "email")?.url.replace("mailto:", "") ??
    "nkr.nikhil.nkr@gmail.com";

  return (
    <>
      <SiteNav
        location={profile.location}
        availability={profile.availability}
        socials={socials.map((s) => ({ platform: s.platform, url: s.url }))}
      />

      <Hero
        profile={{ name: profile.name, headline: profile.headline, roles: profile.roles }}
        sponsorUrl={sponsorUrl}
        careerStartYear={careerStartYear}
      />

      <About profile={{ bio: profile.bio, stats: profile.stats }} />

      <Skills skills={skills} />

      <Experience experiences={experiences} />

      <Projects projects={projects} />

      <Services services={services} />

      <TestimonialsSection />

      <Support funding={funding} />

      <Faq />

      <Contact socials={socials} email={contactEmail} />

      <Footer socials={socials} />
    </>
  );
}
