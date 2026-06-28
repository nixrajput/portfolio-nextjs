import { db } from "./client";
import {
  profile,
  projects,
  experiences,
  skills,
  services,
  socialLinks,
  fundingLinks,
} from "./schema";

async function seed() {
  console.log("Seeding database…");

  // --- profile (single row) ---
  await db.insert(profile).values({
    name: "Nikhil Rajput",
    headline: "Software Development Engineer",
    bio: "Full-stack and mobile engineer building fast, reliable products with Flutter, React/Next.js, and Node.js.",
    summary:
      "Nikhil Rajput is a software engineer who builds production-grade mobile and web applications with Flutter, Next.js, and Node.js.",
    stats: { years: 4, repos: 60, stars: 0 },
    roles: ["Software Engineer", "Full-Stack Developer", "Open-Source Contributor"],
    availableForWork: true,
    resumeUrl: process.env.NEXT_PUBLIC_RESUME_LINK ?? null,
    avatarUrl: "/images/Nikhil_new_pp.png",
  });

  // --- projects (curation; featured set per spec) ---
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
      repo: "bus-reservation-system",
      title: "Bus Reservation System",
      tags: ["C++", "OOP", "File Handling"],
    },
  ].map((p, i) => ({
    ...p,
    featured: featuredSet.has(p.repo),
    order: i,
    hidden: false,
  }));
  await db.insert(projects).values(projectRows);

  // --- experiences ---
  await db.insert(experiences).values([
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
  ]);

  // --- skills (flattened from grouped src/data/skills.ts) ---
  const skillGroups: {
    category: string;
    items: { name: string; level: string; iconPath: string }[];
  }[] = [
    {
      category: "Programming Languages",
      items: [
        {
          name: "JavaScript",
          level: "Expert",
          iconPath: "/skills/javascript.svg",
        },
        {
          name: "TypeScript",
          level: "Intermediate",
          iconPath: "/skills/typescript.svg",
        },
        { name: "Dart", level: "Expert", iconPath: "/skills/dart.svg" },
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
        {
          name: "Redux Toolkit",
          level: "Expert",
          iconPath: "/skills/redux.svg",
        },
      ],
    },
    {
      category: "Backend Development",
      items: [
        { name: "Node.js", level: "Expert", iconPath: "/skills/nodejs.svg" },
        {
          name: "Express.js",
          level: "Expert",
          iconPath: "/skills/express.svg",
        },
        {
          name: "Socket.io",
          level: "Intermediate",
          iconPath: "/skills/socket-io.png",
        },
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
        {
          name: "MongoDB",
          level: "Intermediate",
          iconPath: "/skills/mongodb.svg",
        },
        {
          name: "PostgreSQL",
          level: "Intermediate",
          iconPath: "/skills/postgresql.svg",
        },
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
        {
          name: "Firebase",
          level: "Intermediate",
          iconPath: "/skills/firebase.svg",
        },
        {
          name: "Ubuntu",
          level: "Intermediate",
          iconPath: "/skills/ubuntu.png",
        },
      ],
    },
    {
      category: "Nontechnical Skills",
      items: [
        {
          name: "Problem Solving",
          level: "Expert",
          iconPath: "/images/logical-thinking.png",
        },
        {
          name: "Collaboration",
          level: "Expert",
          iconPath: "/images/collaboration.png",
        },
        {
          name: "Analytical Skills",
          level: "Expert",
          iconPath: "/images/analytical-skills.png",
        },
      ],
    },
  ];
  let skillOrder = 0;
  await db.insert(skills).values(
    skillGroups.flatMap((g) =>
      g.items.map((it) => ({
        name: it.name,
        iconPath: it.iconPath,
        category: g.category,
        level: it.level,
        order: skillOrder++,
      })),
    ),
  );

  // --- services ---
  await db.insert(services).values([
    {
      title: "Mobile App Development",
      shortDescription: "I create engaging mobile applications for your audience.",
      description:
        "I create captivating mobile apps from concept to deployment for iOS and Android. Using cutting-edge technologies, I ensure seamless performance, intuitive interfaces, and robust functionality that align with your business goals. Enjoy a flawless user experience and outstanding results.",
      icons: [
        "/skills/socket-io.png",
        "/skills/dart.svg",
        "/skills/flutter.svg",
        "/skills/getx.png",
        "/skills/firebase.svg",
      ],
      order: 0,
    },
    {
      title: "Web Development",
      shortDescription: "I build visually stunning and user-friendly websites.",
      description:
        "I deliver stunning, user-friendly websites to establish your online presence. From simple sites to complex e-commerce platforms, I provide tailored solutions using the latest frameworks and technologies for a seamless, responsive, and SEO-friendly browsing experience. Enhance your online identity with quality.",
      icons: [
        "/skills/redux.svg",
        "/skills/react.svg",
        "/skills/nextjs.png",
        "/skills/html.svg",
        "/skills/css.svg",
      ],
      order: 1,
    },
    {
      title: "Backend Development",
      shortDescription: "I create robust and scalable backend infrastructures.",
      description:
        "I enhance digital applications with robust, scalable backend infrastructures. I develop efficient database structures, APIs, and configure servers for optimal performance, security, and scalability, ensuring your applications handle high traffic and complex data management seamlessly. Rely on strong backend solutions.",
      icons: [
        "/skills/socket-io.png",
        "/skills/docker.png",
        "/skills/nodejs.svg",
        "/skills/express.svg",
        "/skills/aws.svg",
      ],
      order: 2,
    },
    {
      title: "Product Strategy",
      shortDescription: "I define goals, target audiences, and roadmap for success.",
      description:
        "I collaborate to define clear goals, target audiences, and a success roadmap. My expertise in product ideation and market analysis ensures your product meets user needs and aligns with your business strategy for long-term growth and full potential realization. Drive your product's success with strategic planning.",
      icons: [
        "/skills/git.svg",
        "/images/collaboration.png",
        "/images/logical-thinking.png",
        "/images/analytical-skills.png",
        "/skills/ubuntu.png",
      ],
      order: 3,
    },
    {
      title: "DevOps",
      shortDescription: "I streamline development and operations processes.",
      description:
        "I streamline development and operations processes through effective DevOps practices. I implement continuous integration and deployment pipelines, manage cloud infrastructure, and use containerization to ensure efficient, reliable, and scalable software delivery. Improve your workflow with DevOps solutions.",
      icons: [
        "/skills/docker.svg",
        "/skills/kubernetes.svg",
        "/skills/aws.svg",
        "/skills/jenkins.svg",
        "/skills/terraform.svg",
      ],
      order: 4,
    },
    {
      title: "Database Management",
      shortDescription: "I manage and optimize your database systems.",
      description:
        "I manage and optimize your database systems for performance, reliability, and scalability. With expertise in SQL and NoSQL databases, I design schemas, write complex queries, and implement best practices for data integrity and security. Ensure your data is managed effectively and efficiently.",
      icons: [
        "/skills/mysql.svg",
        "/skills/postgresql.svg",
        "/skills/mongodb.svg",
        "/skills/redis.svg",
        "/skills/sqlite.svg",
      ],
      order: 5,
    },
  ]);

  // --- social_links ---
  await db.insert(socialLinks).values([
    {
      platform: "GitHub",
      url: "https://www.github.com/nixrajput",
      username: "nixrajput",
      icon: "github",
      order: 0,
    },
    {
      platform: "LinkedIn",
      url: "https://www.linkedin.com/in/nixrajput",
      username: "nixrajput",
      icon: "linkedin",
      order: 1,
    },
    {
      platform: "Telegram",
      url: "https://telegram.me/nixrajput",
      username: "nixrajput",
      icon: "telegram",
      order: 2,
    },
    {
      platform: "Instagram",
      url: "https://www.instagram.com/nixrajput",
      username: "nixrajput",
      icon: "instagram",
      order: 3,
    },
    {
      platform: "Twitter",
      url: "https://www.twitter.com/nixrajput07",
      username: "nixrajput07",
      icon: "twitter",
      order: 4,
    },
    {
      platform: "Email",
      url: "mailto:nkr.nikhil.nkr@gmail.com",
      username: "nkr.nikhil.nkr@gmail.com",
      icon: "mail",
      order: 5,
    },
  ]);

  // --- funding_links ---
  await db.insert(fundingLinks).values([
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
  ]);

  console.log("Seed complete.");
}

seed()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
