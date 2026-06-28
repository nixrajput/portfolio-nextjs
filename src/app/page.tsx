import dynamic from "next/dynamic";
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
import { FloatingNavbar } from "@/components/navbar/FloatingNavbar";
import { Footer } from "@/components/layout/Footer";

// Below-the-fold sections: lazy-loaded to keep the hero bundle lean.
// Note: These are Server Components — next/dynamic with ssr:true (default)
// performs code-splitting without disabling server rendering.
const About = dynamic(() => import("@/components/home/About").then((m) => ({ default: m.About })));
const Skills = dynamic(() =>
  import("@/components/home/Skills").then((m) => ({ default: m.Skills })),
);
const Experience = dynamic(() =>
  import("@/components/home/Experience").then((m) => ({ default: m.Experience })),
);
const Projects = dynamic(() =>
  import("@/components/home/Projects").then((m) => ({ default: m.Projects })),
);
const Services = dynamic(() =>
  import("@/components/home/Services").then((m) => ({ default: m.Services })),
);
const Support = dynamic(() =>
  import("@/components/home/Support").then((m) => ({ default: m.Support })),
);
const TestimonialsSection = dynamic(() =>
  import("@/components/sections/TestimonialsSection").then((m) => ({
    default: m.TestimonialsSection,
  })),
);
const Contact = dynamic(() =>
  import("@/components/home/Contact").then((m) => ({ default: m.Contact })),
);
const Faq = dynamic(() => import("@/components/sections/Faq").then((m) => ({ default: m.Faq })));

export default async function Home() {
  const [profile, projects, experiences, skills, services, socials, funding, tagline] =
    await Promise.all([
      getProfile(),
      getProjectsMerged(),
      getExperiences(),
      getSkills(),
      getServices(),
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
      <FloatingNavbar resumeUrl={profile.resumeUrl ?? undefined} sponsorUrl={sponsorUrl} />

      <Hero
        profile={{
          name: profile.name,
          roles: profile.roles,
          avatarUrl: profile.avatarUrl ?? "/images/nikhil.png",
          resumeUrl: profile.resumeUrl ?? undefined,
        }}
        sponsorUrl={sponsorUrl}
        tagline={tagline}
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
