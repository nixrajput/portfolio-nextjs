import { createHash } from "node:crypto";
import { desc } from "drizzle-orm";
import { db } from "./client";
import {
  profile,
  projects,
  experiences,
  skills,
  services,
  socialLinks,
  fundingLinks,
  taglines,
  seedHistory,
} from "./schema";

// ---------------------------------------------------------------------------
// Seed data — the single source of truth for content tables. Everything below
// is assembled into SEED_DATA, hashed, and only re-applied when the hash
// differs from the most recent seed_history row (see seed()).
// ---------------------------------------------------------------------------

const taglineRows = [
  { text: "Rise above limits", active: true, order: 0 },
  { text: "Think, build, and ship", active: true, order: 1 },
];

const profileRow = {
  name: "Nikhil Rajput",
  headline: "Software Development Engineer",
  bio: "Nikhil Rajput is a Software Development Engineer and AI Lead who builds fast, reliable products across web and mobile. He works full-stack - crafting polished front-ends with React and Next.js, mobile apps with Flutter, and robust back-ends with Node.js - with a growing focus on applied AI.\n\nBeyond his day-to-day engineering, he is an active open-source contributor, maintaining libraries and tools that other developers rely on. He cares about clean architecture, thoughtful UX, and shipping work that lasts.",
  summary:
    "Nikhil Rajput is a software engineer who builds production-grade mobile and web applications with Flutter, Next.js, and Node.js.",
  stats: { years: 4, repos: 60, stars: 0 },
  roles: ["Software Development Engineer", "Full Stack Developer", "Open Source Contributor"],
  // Resume URL lives in the DB only — set it via the admin panel.
  resumeUrl: null,
  avatarUrl: "/images/nikhil.png",
};

const featuredSet = new Set([
  "social-media-app-flutter",
  "flutter_carousel_widget",
  "get_time_ago",
  "social-media-api-nodejs",
  "ecommerce-mern",
  "siphon",
]);
const projectRows: (typeof projects.$inferInsert)[] = [
  {
    repo: "social-media-app-flutter",
    title: "Social Media App",
    tags: ["Flutter", "Dart", "GetX", "Hive"],
  },
  {
    repo: "flutter_carousel_widget",
    title: "Flutter Carousel Widget",
    tags: ["Flutter", "Dart", "Carousel"],
  },
  {
    repo: "get_time_ago",
    title: "GetTimeAgo",
    tags: ["Dart", "DateTime", "Formatting"],
  },
  {
    repo: "social-media-api-nodejs",
    title: "Social Media API",
    tags: ["Node.js", "Express.js", "MongoDB", "WebSocket"],
  },
  {
    repo: "ecommerce-mern",
    title: "E-commerce App",
    tags: ["React.js", "Redux", "Material UI", "Stripe"],
  },
  { repo: "siphon", title: "Siphon", tags: ["TypeScript", "CLI"] },
  {
    repo: "video-calling-app-flutter",
    title: "Video Calling App",
    tags: ["Flutter", "Dart", "GetX", "Agora SDK"],
  },
  {
    repo: "grocery-list-maker-flutter",
    title: "Grocery List Maker App",
    tags: ["Flutter", "Dart", "BLoC", "PDF", "Hive"],
  },
  {
    repo: "ecommerce-api-nodejs",
    title: "E-commerce API",
    tags: ["Node.js", "Express.js", "MongoDB", "Stripe"],
  },
  {
    repo: "bus-reservation-system-cpp",
    title: "Bus Reservation System",
    tags: ["C++", "OOP", "File Handling"],
  },
].map((p, i) => ({
  ...p,
  featured: featuredSet.has(p.repo),
  order: i,
  hidden: false,
}));

const experienceRows = [
  {
    role: "Software Development Engineer",
    org: "StarApps Studio",
    period: "Jul 2024 – Present",
    location: "Pune, India",
    isCurrent: true,
    description: [
      "Currently working on developing innovative software solutions.",
      "Contributing to large-scale projects with a focus on performance optimization.",
      "Collaborating closely with cross-functional teams to ensure product quality.",
      "Adhering to clean code practices and modern development techniques.",
    ],
    order: 0,
  },
  {
    role: "Full Stack Developer",
    org: "Merito",
    period: "Feb 2023 – Jul 2024",
    location: "Pune, India",
    isCurrent: false,
    description: [
      "Developed over 5 web applications with seamless backend API integration.",
      "Streamlined workflows by eliminating redundant data, boosting efficiency.",
      "Improved website loading time by 80% through image optimization, minimizing main-thread work, and implementing SEO strategies.",
      "Resolved 100+ bugs and conducted thorough code reviews.",
      "Demonstrated expertise in both backend and frontend development.",
    ],
    order: 1,
  },
  {
    role: "Full Stack Development Intern",
    org: "TECHOX LLP",
    period: "May 2021 – Jul 2022",
    location: "Remote",
    isCurrent: false,
    description: [
      "Revamped and enhanced 3+ mobile apps using Flutter.",
      "Deployed RESTful APIs for seamless app-server integration.",
      "Integrated Google AdMob to effectively monetize applications.",
      "Contributed to boosting app functionality and revenue generation.",
    ],
    order: 2,
  },
  {
    role: "Web Development Intern",
    org: "Career Corner Education Pvt Ltd",
    period: "Jul 2021 – Nov 2021",
    location: "Remote",
    isCurrent: false,
    description: [
      "Spearheaded website development and enhancements for company portals.",
      "Prioritized clean, reusable code with modern tech stacks.",
      "Efficiently managed multiple tasks with minimal supervision.",
      "Collaborated with senior team members to meet and exceed project goals.",
    ],
    order: 3,
  },
];

// Skills are authored grouped by category, then flattened to rows with a
// running order so the Skills section renders them grouped and in sequence.
const skillGroups: {
  category: string;
  items: { name: string; level: string; iconPath: string }[];
}[] = [
  {
    category: "Programming Languages",
    items: [
      { name: "JavaScript", level: "Expert", iconPath: "/skills/javascript.svg" },
      { name: "TypeScript", level: "Intermediate", iconPath: "/skills/typescript.svg" },
      { name: "Dart", level: "Expert", iconPath: "/skills/dart.svg" },
      { name: "Ruby", level: "Intermediate", iconPath: "/skills/ruby.png" },
    ],
  },
  {
    category: "Frontend Development",
    items: [
      { name: "Next.js", level: "Expert", iconPath: "/skills/nextjs.png" },
      { name: "React.js", level: "Expert", iconPath: "/skills/react.svg" },
      { name: "HTML", level: "Expert", iconPath: "/skills/html.svg" },
      { name: "CSS", level: "Intermediate", iconPath: "/skills/css.svg" },
      { name: "SASS", level: "Intermediate", iconPath: "/skills/sass.svg" },
      { name: "Redux Toolkit", level: "Expert", iconPath: "/skills/redux.svg" },
    ],
  },
  {
    category: "Backend Development",
    items: [
      { name: "Node.js", level: "Expert", iconPath: "/skills/nodejs.svg" },
      { name: "Express.js", level: "Expert", iconPath: "/skills/express.svg" },
      { name: "Ruby on Rails", level: "Intermediate", iconPath: "/skills/rails.png" },
      { name: "Socket.io", level: "Intermediate", iconPath: "/skills/socket-io.png" },
    ],
  },
  {
    category: "Mobile App Development",
    items: [
      { name: "Flutter", level: "Expert", iconPath: "/skills/flutter.svg" },
      { name: "GetX", level: "Expert", iconPath: "/skills/getx.png" },
    ],
  },
  {
    category: "Database Management",
    items: [
      { name: "MongoDB", level: "Intermediate", iconPath: "/skills/mongodb.svg" },
      { name: "PostgreSQL", level: "Intermediate", iconPath: "/skills/postgresql.svg" },
      { name: "MySQL", level: "Beginner", iconPath: "/skills/mysql.svg" },
    ],
  },
  {
    category: "DevOps/VCS",
    items: [
      { name: "Docker", level: "Beginner", iconPath: "/skills/docker.png" },
      { name: "AWS", level: "Intermediate", iconPath: "/skills/aws.svg" },
      { name: "Git", level: "Expert", iconPath: "/skills/git.svg" },
      { name: "GitHub", level: "Expert", iconPath: "/skills/github.svg" },
    ],
  },
  {
    category: "Miscellaneous",
    items: [
      { name: "Firebase", level: "Intermediate", iconPath: "/skills/firebase.svg" },
      { name: "Ubuntu", level: "Intermediate", iconPath: "/skills/ubuntu.png" },
    ],
  },
  {
    category: "Nontechnical Skills",
    items: [
      { name: "Problem Solving", level: "Expert", iconPath: "/images/logical-thinking.png" },
      { name: "Collaboration", level: "Expert", iconPath: "/images/collaboration.png" },
      { name: "Analytical Skills", level: "Expert", iconPath: "/images/analytical-skills.png" },
    ],
  },
];
const skillRows = skillGroups.flatMap((g, gi) =>
  g.items.map((it, ii) => ({
    name: it.name,
    iconPath: it.iconPath,
    category: g.category,
    level: it.level,
    // category index * 100 + item index keeps groups contiguous and ordered.
    order: gi * 100 + ii,
  })),
);

const serviceRows = [
  {
    title: "Mobile App Development",
    shortDescription: "I create engaging mobile applications for your audience.",
    description:
      "I create captivating mobile apps from concept to deployment for iOS and Android. Using cutting-edge technologies, I ensure seamless performance, intuitive interfaces, and robust functionality that align with your business goals. Enjoy a flawless user experience and outstanding results.",
    order: 0,
  },
  {
    title: "Web Development",
    shortDescription: "I build visually stunning and user-friendly websites.",
    description:
      "I deliver stunning, user-friendly websites to establish your online presence. From simple sites to complex e-commerce platforms, I provide tailored solutions using the latest frameworks and technologies for a seamless, responsive, and SEO-friendly browsing experience. Enhance your online identity with quality.",
    order: 1,
  },
  {
    title: "Backend Development",
    shortDescription: "I create robust and scalable backend infrastructures.",
    description:
      "I enhance digital applications with robust, scalable backend infrastructures. I develop efficient database structures, APIs, and configure servers for optimal performance, security, and scalability, ensuring your applications handle high traffic and complex data management seamlessly. Rely on strong backend solutions.",
    order: 2,
  },
  {
    title: "Product Strategy",
    shortDescription: "I define goals, target audiences, and roadmap for success.",
    description:
      "I collaborate to define clear goals, target audiences, and a success roadmap. My expertise in product ideation and market analysis ensures your product meets user needs and aligns with your business strategy for long-term growth and full potential realization. Drive your product's success with strategic planning.",
    order: 3,
  },
  {
    title: "DevOps",
    shortDescription: "I streamline development and operations processes.",
    description:
      "I streamline development and operations processes through effective DevOps practices. I implement continuous integration and deployment pipelines, manage cloud infrastructure, and use containerization to ensure efficient, reliable, and scalable software delivery. Improve your workflow with DevOps solutions.",
    order: 4,
  },
  {
    title: "Database Management",
    shortDescription: "I manage and optimize your database systems.",
    description:
      "I manage and optimize your database systems for performance, reliability, and scalability. With expertise in SQL and NoSQL databases, I design schemas, write complex queries, and implement best practices for data integrity and security. Ensure your data is managed effectively and efficiently.",
    order: 5,
  },
];

const socialLinkRows = [
  {
    platform: "GitHub",
    url: "https://www.github.com/nixrajput",
    username: "nixrajput",
    order: 0,
  },
  {
    platform: "LinkedIn",
    url: "https://www.linkedin.com/in/nixrajput",
    username: "nixrajput",
    order: 1,
  },
  {
    platform: "Telegram",
    url: "https://telegram.me/nixrajput",
    username: "nixrajput",
    order: 2,
  },
  {
    platform: "Instagram",
    url: "https://www.instagram.com/nixrajput",
    username: "nixrajput",
    order: 3,
  },
  {
    platform: "Email",
    url: "mailto:nkr.nikhil.nkr@gmail.com",
    username: "nkr.nikhil.nkr@gmail.com",
    order: 4,
  },
  {
    platform: "x",
    url: "https://x.com/nixrajput07",
    username: "nixrajput07",
    order: 5,
  },
];

const fundingLinkRows = [
  {
    label: "GitHub Sponsors",
    url: "https://github.com/sponsors/nixrajput",
    primary: true,
    order: 0,
  },
  {
    label: "Ko-fi",
    url: "https://ko-fi.com/nixrajput",
    primary: false,
    order: 1,
  },
  {
    label: "Buy Me a Coffee",
    url: "https://buymeacoffee.com/nixrajput",
    primary: false,
    order: 2,
  },
];

// Everything the seed writes, in one object — the hash of this is what gates a
// reseed. Adding/changing any value changes the checksum and triggers a reseed.
const SEED_DATA = {
  taglines: taglineRows,
  profile: profileRow,
  projects: projectRows,
  experiences: experienceRows,
  skills: skillRows,
  services: serviceRows,
  socialLinks: socialLinkRows,
  fundingLinks: fundingLinkRows,
};

function seedChecksum(): string {
  return createHash("sha256").update(JSON.stringify(SEED_DATA)).digest("hex");
}

async function seed() {
  const checksum = seedChecksum();

  // Checksum gate: reseed only when the data hash differs from the most recent
  // applied seed. Between content changes, admin-panel edits to these tables
  // survive (we never touch them); a changed seed.ts re-applies the canonical
  // content. Testimonials and auth tables are never seeded here.
  const [latest] = await db
    .select({ checksum: seedHistory.checksum })
    .from(seedHistory)
    .orderBy(desc(seedHistory.id))
    .limit(1);

  if (latest?.checksum === checksum) {
    console.log("Seed unchanged (checksum match); skipping.");
    return;
  }

  console.log("Seed checksum changed; reseeding content tables…");

  // Wipe + re-insert + record history atomically so a failure can never leave
  // the content tables empty or the history out of sync with the data.
  await db.transaction(async (tx) => {
    await tx.delete(fundingLinks);
    await tx.delete(socialLinks);
    await tx.delete(services);
    await tx.delete(skills);
    await tx.delete(experiences);
    await tx.delete(projects);
    await tx.delete(taglines);
    await tx.delete(profile);

    await tx.insert(taglines).values(SEED_DATA.taglines);
    await tx.insert(profile).values(SEED_DATA.profile);
    await tx.insert(projects).values(SEED_DATA.projects);
    await tx.insert(experiences).values(SEED_DATA.experiences);
    await tx.insert(skills).values(SEED_DATA.skills);
    await tx.insert(services).values(SEED_DATA.services);
    await tx.insert(socialLinks).values(SEED_DATA.socialLinks);
    await tx.insert(fundingLinks).values(SEED_DATA.fundingLinks);

    await tx.insert(seedHistory).values({ checksum });
  });

  console.log("Seed complete.");
}

seed()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
