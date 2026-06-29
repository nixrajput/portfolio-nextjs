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
  faqs,
  testimonials,
} from "./schema";
import { requireEnv } from "@/lib/env";

// ---------------------------------------------------------------------------
// Seed data — the initial content inserted only on a fresh (empty) database.
// Assembled into SEED_DATA and inserted once by seed(); later content changes
// are made in the admin panel or the DB, not by re-running the seed.
// ---------------------------------------------------------------------------

const taglineRows = [
  { text: "Rise above limits", active: true, order: 0 },
  { text: "Think, build, and ship", active: true, order: 1 },
];

// avatarUrl is validated as a full http(s) URL, so seed it as an absolute URL
// pointing at the bundled asset on whatever site this database serves.
// NEXT_PUBLIC_SITE_URL is always set (no fallback) — fail loudly if it isn't.
const SITE_ORIGIN = requireEnv("NEXT_PUBLIC_SITE_URL").replace(/\/$/, "");
const seededAvatarUrl = `${SITE_ORIGIN}/images/nikhil.png`;

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
  avatarUrl: seededAvatarUrl,
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

const faqRows = [
  {
    question: "Who is Nikhil Rajput?",
    answer:
      "Nikhil Rajput is a Software Development Engineer and AI Lead from India who builds fast, reliable web and mobile products. He is the founder of NixLab and an active open-source contributor.",
    order: 0,
  },
  {
    question: "What does Nikhil build?",
    answer:
      "He builds full-stack web applications, mobile apps, REST and GraphQL APIs, and open-source libraries - with a focus on performance, developer experience, and maintainability.",
    order: 1,
  },
  {
    question: "What is Nikhil's tech stack?",
    answer:
      "TypeScript and JavaScript on the front end (React, Next.js) and back end (Node.js, Express), Flutter and Dart for cross-platform mobile, and PostgreSQL and MongoDB for data persistence.",
    order: 2,
  },
  {
    question: "Is Nikhil available for collaboration?",
    answer:
      "Yes - Nikhil is open to open-source collaboration, freelance engagements, and advisory roles. He is not actively job-seeking but is happy to discuss interesting projects. The fastest way to reach him is through the contact section on this site.",
    order: 3,
  },
  {
    question: "How can I contact Nikhil?",
    answer:
      "Email is the fastest way - use the email link in the Contact section. You can also reach him on GitHub at github.com/nixrajput, LinkedIn, and X (Twitter); the social links are in the footer.",
    order: 4,
  },
];

// Demo testimonials covering every case (pending/approved/rejected, featured,
// complete vs sparse details, a duplicate email). Seeded ONLY into an empty
// testimonials table so real user submissions are never wiped.
const testimonialRows: (typeof testimonials.$inferInsert)[] = [
  {
    name: "Aarav Mehta",
    email: "aarav.mehta@example.com",
    relationship: "College friend & hackathon teammate",
    content:
      "Nikhil is the most driven person I studied with. We built our first hackathon project together and he carried the team - clean architecture, calm under pressure, and genuinely fun to work with.",
    status: "approved",
    featured: true,
    order: 0,
    linkedinUrl: "https://www.linkedin.com/in/aaravmehta",
    githubUrl: "https://github.com/aaravmehta",
    websiteUrl: "https://aarav.dev",
  },
  {
    name: "Priya Sharma",
    email: "priya.sharma@example.com",
    relationship: "Engineering Manager at Merito",
    content:
      "I managed Nikhil for over a year. He consistently shipped polished features ahead of schedule and raised the quality bar for the whole team. A rare mix of speed and craft.",
    status: "approved",
    featured: true,
    order: 1,
    linkedinUrl: "https://www.linkedin.com/in/priyasharma",
  },
  {
    name: "Rahul Verma",
    email: "rahul.verma@example.com",
    relationship: "Open-source collaborator",
    content:
      "We maintain a Flutter package together. Nikhil's reviews are thorough and kind, and his docs are the reason new contributors actually stick around.",
    status: "approved",
    featured: false,
    order: 2,
    githubUrl: "https://github.com/rahulverma",
    xUrl: "https://x.com/rahulverma",
  },
  {
    name: "Dr. Anjali Rao",
    email: "anjali.rao@example.com",
    relationship: "Professor, Computer Science",
    content:
      "Nikhil was among the most curious students I taught. He asked the questions the rest of the class was afraid to, and he always followed through with working code.",
    status: "approved",
    featured: false,
    order: 3,
  },
  {
    name: "Sofia Almeida",
    email: "sofia.almeida@example.com",
    relationship: "Product designer, freelance project",
    content:
      "Handing designs to Nikhil felt effortless. He respected the details, asked the right questions, and the final build looked better than the mockups.",
    status: "pending",
    featured: false,
    order: 4,
    instagramUrl: "https://instagram.com/sofia.designs",
    websiteUrl: "https://sofiaalmeida.design",
  },
  {
    name: "Karan Singh",
    email: "karan.singh@example.com",
    relationship: "Former teammate",
    content: "Dependable, sharp, and a great teammate. Would work with him again in a heartbeat.",
    status: "pending",
    featured: false,
    order: 5,
  },
  {
    // Duplicate email of Aarav above — exercises the admin duplicate flag.
    name: "Aarav Mehta",
    email: "aarav.mehta@example.com",
    relationship: "College friend",
    content:
      "Adding a second note because I forgot to mention - he also mentored three juniors on our team and they all credit him for their growth.",
    status: "pending",
    featured: false,
    order: 6,
  },
  {
    name: "Spammy McSpamface",
    email: "spam@example.com",
    relationship: "n/a",
    content:
      "Check out my amazing crypto deals at this totally legit link, definitely not spam at all friend.",
    status: "rejected",
    featured: false,
    order: 7,
  },
];

// Everything the seed writes, inserted only on a fresh (empty) database.
const SEED_DATA = {
  taglines: taglineRows,
  profile: profileRow,
  projects: projectRows,
  experiences: experienceRows,
  skills: skillRows,
  services: serviceRows,
  socialLinks: socialLinkRows,
  fundingLinks: fundingLinkRows,
  faqs: faqRows,
};

/**
 * Seed-if-empty: insert the canonical content ONLY when the database has no
 * profile row (a fresh first deploy). It never wipes or overwrites, so any
 * later edits — in the admin panel or directly in the DB — are preserved.
 * Subsequent content changes are made manually, not by re-running the seed.
 */
async function seed() {
  const [existing] = await db.select({ id: profile.id }).from(profile).limit(1);
  if (existing) {
    console.log("Database already has content; skipping seed.");
    return;
  }

  console.log("Empty database; seeding content tables…");

  await db.transaction(async (tx) => {
    await tx.insert(taglines).values(SEED_DATA.taglines);
    await tx.insert(profile).values(SEED_DATA.profile);
    await tx.insert(projects).values(SEED_DATA.projects);
    await tx.insert(experiences).values(SEED_DATA.experiences);
    await tx.insert(skills).values(SEED_DATA.skills);
    await tx.insert(services).values(SEED_DATA.services);
    await tx.insert(socialLinks).values(SEED_DATA.socialLinks);
    await tx.insert(fundingLinks).values(SEED_DATA.fundingLinks);
    await tx.insert(faqs).values(SEED_DATA.faqs);
  });

  console.log("Seed complete.");
}

/**
 * Seed demo testimonials for LOCAL UI testing only. These are fabricated, so
 * they must never reach production — skipped when NODE_ENV is "production".
 * Seeds only when the table is empty so real submissions are never wiped.
 */
async function seedDemoTestimonials() {
  if (process.env.NODE_ENV === "production") {
    console.log("Production environment; skipping demo testimonials.");
    return;
  }
  const existing = await db.select({ id: testimonials.id }).from(testimonials).limit(1);
  if (existing.length > 0) {
    console.log("Testimonials already present; skipping demo seed.");
    return;
  }
  await db.insert(testimonials).values(testimonialRows);
  console.log(`Seeded ${testimonialRows.length} demo testimonials (local only).`);
}

seed()
  .then(() => seedDemoTestimonials())
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
