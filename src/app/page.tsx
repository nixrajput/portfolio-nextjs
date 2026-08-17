import nextDynamic from "next/dynamic";
import {
  getProfile,
  getProjectsMerged,
  getExperiences,
  getSkills,
  getServices,
  getSocialLinks,
  getFundingLinks,
  getRandomTagline,
} from "@/lib/queries";
import { Hero } from "@/components/home/Hero";
import { SiteNav } from "@/components/navbar/SiteNav";
import { Footer } from "@/components/layout/Footer";

// ISR: prerendered at build time, so the build needs a reachable database.
// 60s not 3600s because a cached page runs no server code, so this window decides how soon a
// load can notice the 24h GitHub TTL expired - at 3600 the real interval became ~25h.
export const revalidate = 60;

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
  // Profile gates everything and feeds the always-on Hero, so it loads first.
  // A section is visible unless its key is explicitly false.
  const profile = await getProfile();
  const vis = profile.sectionVisibility;
  const show = (id: string) => vis[id] !== false;

  // Fetch only the data for VISIBLE sections - a hidden section runs no query
  // (and its component chunk never loads via the gated dynamic import below).
  // Socials + funding are shared (nav/footer + hero sponsor), so always load.
  const [projects, experiences, skills, services, socials, funding, tagline] = await Promise.all([
    show("projects") ? getProjectsMerged() : Promise.resolve([]),
    show("experience") ? getExperiences() : Promise.resolve([]),
    show("skills") ? getSkills() : Promise.resolve([]),
    show("services") ? getServices() : Promise.resolve([]),
    getSocialLinks(),
    getFundingLinks(),
    getRandomTagline(),
  ]);

  const sponsorUrl = funding.find((f) => f.primary)?.url;
  // Derive contact email from social links (platform = "email") or fall back
  const contactEmail =
    socials.find((s) => s.platform.toLowerCase() === "email")?.url.replace("mailto:", "") ??
    "nkr.nikhil.nkr@gmail.com";

  return (
    <>
      <SiteNav
        tagline={tagline}
        socials={socials.map((s) => ({ platform: s.platform, url: s.url }))}
        hidden={Object.entries(vis)
          .filter(([, v]) => v === false)
          .map(([k]) => k)}
      />

      <Hero
        profile={{ name: profile.name, roles: profile.roles }}
        sponsorUrl={sponsorUrl}
        heroTagline={profile.heroTagline}
      />

      {show("about") && (
        <About
          profile={{
            bio: profile.bio,
            stats: profile.stats,
            name: profile.name,
            avatarUrl: profile.avatarUrl,
          }}
        />
      )}

      {show("skills") && <Skills skills={skills} />}

      {show("experience") && <Experience experiences={experiences} />}

      {show("projects") && <Projects projects={projects} />}

      {show("services") && <Services services={services} />}

      {show("testimonials") && <TestimonialsSection />}

      {show("support") && <Support funding={funding} />}

      {show("faq") && <Faq />}

      {show("contact") && <Contact socials={socials} email={contactEmail} />}

      <Footer socials={socials} />
    </>
  );
}
