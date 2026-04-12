import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import bcrypt from "bcrypt";
import {
  AwardKind,
  BlogStatus,
  ProjectCategory,
  PromoPlacement,
} from "../src/generated/prisma/enums";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter: new PrismaPg(pool) });

const iconCloudSlugs = [
  "typescript",
  "javascript",
  "dart",
  "java",
  "react",
  "flutter",
  "android",
  "html5",
  "css3",
  "nodedotjs",
  "express",
  "nextdotjs",
  "prisma",
  "amazonaws",
  "postgresql",
  "firebase",
  "nginx",
  "vercel",
  "testinglibrary",
  "jest",
  "cypress",
  "docker",
  "git",
  "jira",
  "github",
  "gitlab",
  "visualstudiocode",
  "androidstudio",
  "sonarqube",
  "figma",
];

async function main() {
  const adminEmail = process.env.SEED_ADMIN_EMAIL || "admin@example.com";
  const adminPassword = process.env.SEED_ADMIN_PASSWORD || "ChangeMe123!";
  const hash = await bcrypt.hash(adminPassword, 12);

  await prisma.user.upsert({
    where: { email: adminEmail },
    create: {
      email: adminEmail,
      name: "Site Admin",
      password: hash,
      role: "ADMIN",
      active: true,
    },
    update: {},
  });

  await prisma.siteSettings.upsert({
    where: { id: "default" },
    create: {
      id: "default",
      siteName: "Jean Eric Hirwa",
      socialLinks: [
        { name: "Github", url: "https://github.com/hirwajeaneric" },
        { name: "LinkedIn", url: "https://www.linkedin.com/in/jean-eric-hirwa" },
        { name: "Instagram", url: "https://www.instagram.com/hirwa_jean_eric" },
        { name: "Medium", url: "https://medium.com/@hirwajeaneric" },
        { name: "YouTube", url: "https://www.youtube.com/@HirwaJeanEric-x9j" },
      ],
      iconCloudSlugs: iconCloudSlugs,
    },
    update: {
      socialLinks: [
        { name: "Github", url: "https://github.com/hirwajeaneric" },
        { name: "LinkedIn", url: "https://www.linkedin.com/in/jean-eric-hirwa" },
        { name: "Instagram", url: "https://www.instagram.com/hirwa_jean_eric" },
        { name: "Medium", url: "https://medium.com/@hirwajeaneric" },
        { name: "YouTube", url: "https://www.youtube.com/@HirwaJeanEric-x9j" },
      ],
      iconCloudSlugs: iconCloudSlugs,
    },
  });

  await prisma.promoAd.deleteMany({});
  await prisma.promoAd.create({
    data: {
      placements: [
        PromoPlacement.HOME,
        PromoPlacement.ABOUT,
        PromoPlacement.CONTACT,
        PromoPlacement.BLOG_POST,
      ],
      kicker: "PERSONAL GROWTH",
      headlineLead: "Transform Your Life ",
      headlineEmphasis: "With Eric Hirwa",
      body: `Beyond my technical work, I'm passionate about personal growth and helping others transform their lives through science-backed micro-habits. Visit **With Eric Hirwa** for mentorship, life coaching, and guidance designed for high-achievers and everyday people seeking calm, clarity, and purpose.`,
      ctaLabel: "Explore With Eric Hirwa",
      ctaUrl: "https://with.erichirwa.com",
      active: true,
      priority: 10,
    },
  });

  await prisma.siteStatistic.deleteMany({});
  await prisma.siteStatistic.createMany({
    data: [
      { label: "Clients", value: "23+", sortOrder: 0 },
      { label: "Projects", value: "25+", sortOrder: 1 },
      { label: "Happy Clients", value: "96%", sortOrder: 2 },
      { label: "Experience", value: `${new Date().getFullYear() - 2021} Years`, sortOrder: 3 },
    ],
  });

  const categories = [
    { name: "Web Design", slug: "web-design" },
    { name: "Front-end", slug: "front-end" },
    { name: "Back-end", slug: "back-end" },
  ];
  for (const c of categories) {
    await prisma.blogCategory.upsert({
      where: { slug: c.slug },
      create: c,
      update: { name: c.name },
    });
  }

  const catWeb = await prisma.blogCategory.findUniqueOrThrow({ where: { slug: "web-design" } });
  const catBack = await prisma.blogCategory.findUniqueOrThrow({ where: { slug: "back-end" } });

  await prisma.blogPost.deleteMany({});
  await prisma.blogPost.createMany({
    data: [
      {
        title: "How to use Tailwind CSS",
        slug: "how-to-use-tailwind-css",
        introduction:
          "Learn how to create an impressive website using modern CSS utility workflows with our step-by-step guide.",
        content: "<p>Practical patterns for layout, typography, and responsive design with Tailwind CSS.</p>",
        coverImageUrl:
          "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1470&q=80",
        readTime: "5 min",
        status: BlogStatus.PUBLISHED,
        categoryId: catWeb.id,
      },
      {
        title: "How to Get Started in The Software Engineering Career",
        slug: "how-to-get-started-in-the-software-engineering-career",
        introduction: "A roadmap for building fundamentals, shipping projects, and growing your career.",
        content: "<p>Focus on problem solving, collaboration, and continuous learning.</p>",
        coverImageUrl:
          "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1470&q=80",
        readTime: "8 min",
        status: BlogStatus.PUBLISHED,
        categoryId: catBack.id,
      },
    ],
  });

  const techRows = [
    { slug: "react", name: "React", category: "Library", iconKey: "react", sortOrder: 0 },
    { slug: "typescript", name: "TypeScript", category: "Language", iconKey: "typescript", sortOrder: 1 },
    { slug: "nextjs", name: "Next.js", category: "Frontend", iconKey: "nextjs", sortOrder: 2 },
    { slug: "tailwind", name: "Tailwind CSS", category: "Frontend", iconKey: "tailwind", sortOrder: 3 },
    { slug: "nodejs", name: "Node.js", category: "Backend", iconKey: "nodejs", sortOrder: 4 },
    { slug: "postgresql", name: "PostgreSQL", category: "Database", iconKey: "postgresql", sortOrder: 5 },
  ];
  await prisma.technology.deleteMany({});
  await prisma.technology.createMany({ data: techRows });

  await prisma.service.deleteMany({});
  const svcSoft = await prisma.service.create({
    data: {
      name: "Software Development",
      slug: "software-development",
      shortDescription:
        "I develop responsive, dynamic, and scalable websites and web applications that meet user needs, using modern web technologies.",
      heroImageUrl:
        "https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      showOnHome: true,
      homeSortOrder: 0,
      technologies: ["React", "TypeScript", "Next.js", "Node.js", "PostgreSQL"],
    },
  });
  await prisma.serviceSection.createMany({
    data: [
      {
        serviceId: svcSoft.id,
        title: "Front-End Development",
        description:
          "I'll create a visually appealing and user-friendly interface that engages your target audience.",
        sortOrder: 0,
      },
      {
        serviceId: svcSoft.id,
        title: "Back-End Development",
        description: "I'll create a secure and scalable back-end system that powers your website.",
        sortOrder: 1,
      },
    ],
  });

  const svcDevops = await prisma.service.create({
    data: {
      name: "DevOps and Cloud Computing",
      slug: "devops-and-cloud-computing",
      shortDescription:
        "I implement infrastructure as code, CI/CD pipelines, and automation processes to optimize the development workflow.",
      heroImageUrl:
        "https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      showOnHome: true,
      homeSortOrder: 1,
      technologies: ["Docker", "AWS", "Terraform", "GitHub Actions", "Linux"],
    },
  });
  await prisma.serviceSection.createMany({
    data: [
      {
        serviceId: svcDevops.id,
        title: "Infrastructure as Code",
        description: "Automate infrastructure using Terraform and cloud-native tooling.",
        sortOrder: 0,
      },
      {
        serviceId: svcDevops.id,
        title: "CI/CD",
        description: "Streamline delivery with GitHub Actions, GitLab CI, or Jenkins.",
        sortOrder: 1,
      },
    ],
  });

  const svcCoach = await prisma.service.create({
    data: {
      name: "Mentorship and Life Coaching",
      slug: "mentorship-and-life-coaching",
      shortDescription:
        "Personal growth mentoring and life coaching focused on science-backed micro-habits for lasting transformation.",
      heroImageUrl:
        "https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      showOnHome: true,
      homeSortOrder: 2,
      technologies: [
        "Personal Growth",
        "Micro-Habits",
        "Life Coaching",
        "Mindfulness",
        "Goal Setting",
      ],
    },
  });
  await prisma.serviceSection.create({
    data: {
      serviceId: svcCoach.id,
      title: "Habit design",
      description: "Build systems that fit real life—not willpower alone.",
      sortOrder: 0,
    },
  });

  await prisma.project.deleteMany({});
  await prisma.project.create({
    data: {
      name: "SheCanCODE Bootcamp",
      slug: "shecancode-bootcamp",
      category: ProjectCategory.Web,
      description: "An improved version of SheCanCODE Website.",
      deliverable: "Website, User Management, Blog CMS, and Course CMS.",
      challenge:
        "To create a CMS from scratch to ensure a both cost effective and less error prone system to manage blogs and courses management.",
      goal: "Building SheCanCODE Bootcamps new and improved website that includes a blog CMS, course CMS, automated course application and Job Portal.",
      result:
        "The result is a faster, more secure, and more scalable website that is easier to manage and update.",
      client: "SheCanCode School",
      timeline: "7 weeks",
      link: "https://www.shecancodeschool.org/",
      imageUrl: "/shecancode.png",
      typeLabel: "Web",
      technologies: [
        { name: "React", iconKey: "react" },
        { name: "TypeScript", iconKey: "typescript" },
        { name: "CSS", iconKey: "css" },
      ],
      otherLinks: [
        { name: "GitHub", link: "", iconKey: "github" },
        { name: "Live Demo", link: "https://www.shecancodeschool.org/", iconKey: "demo" },
      ],
      gallery: ["/landing.png", "/benefits.png", "/courses.png", "/articles.png", "/shecancode.png"],
      sortOrder: 0,
    },
  });
  await prisma.project.create({
    data: {
      name: "Tiny Steps A Day",
      slug: "tiny-steps-a-day",
      category: ProjectCategory.Web,
      description: "A web application that helps users build consistency through small daily actions.",
      client: "Myself",
      timeline: "1 week",
      link: "https://www.tinystepsaday.com/",
      imageUrl: "/tinysteps-4.png",
      typeLabel: "Web",
      technologies: [
        { name: "React", iconKey: "react" },
        { name: "Next.js", iconKey: "nextjs" },
        { name: "TypeScript", iconKey: "typescript" },
        { name: "Tailwind CSS", iconKey: "tailwind" },
        { name: "NestJS", iconKey: "nestjs" },
        { name: "PostgreSQL", iconKey: "postgresql" },
        { name: "MongoDB", iconKey: "mongodb" },
      ],
      otherLinks: [{ name: "Live Demo", link: "https://www.tinystepsaday.com/", iconKey: "demo" }],
      gallery: [
        "/tinysteps-1.png",
        "/tinysteps-2.png",
        "/tinysteps-3.png",
        "/tinysteps-4.png",
        "/tinysteps-5.png",
      ],
      sortOrder: 1,
    },
  });
  await prisma.project.create({
    data: {
      name: "African Leaders Hub",
      slug: "african-leaders-hub",
      category: ProjectCategory.Web,
      description: "A corporate website for African Leaders Hub",
      client: "African Leaders Hub",
      timeline: "1 week",
      link: "https://www.africanleadershub.org",
      imageUrl: "/alh-1.png",
      typeLabel: "Web",
      technologies: [
        { name: "React", iconKey: "react" },
        { name: "Next.js", iconKey: "nextjs" },
        { name: "TypeScript", iconKey: "typescript" },
        { name: "Tailwind CSS", iconKey: "tailwind" },
      ],
      otherLinks: [{ name: "Live Demo", link: "https://www.africanleadershub.org", iconKey: "demo" }],
      gallery: ["/alh-1.png", "/alh-2.png", "/alh-3.png", "/alh-4.png"],
      sortOrder: 2,
    },
  });

  await prisma.testimonial.deleteMany({});
  await prisma.testimonial.createMany({
    data: [
      {
        headline: "It was a great experience to work with Eric as a team leader",
        quote:
          "I was honored to have worked on a number of projects with Eric. He is a great team leader and a great person to work with.",
        authorName: "Stella Impuhwe",
        authorRole: "Backend Software Developer",
        companyLogoUrl: "/IRO.jpg",
        avatarUrl: "/stella.jpeg",
        sortOrder: 0,
      },
      {
        headline: "I love the way Eric approaches projects",
        quote:
          "It doesn't take you long to realize that Eric is not just a software developer. He is an artist with a very imaginative mind.",
        authorName: "Ntirushwa Kelly Brice",
        authorRole: "Frontend Software Developer",
        companyLogoUrl: "/SheCanCODE Logo.jpeg",
        avatarUrl: "/kelly.jpeg",
        sortOrder: 1,
      },
    ],
  });

  await prisma.award.deleteMany({});
  await prisma.award.createMany({
    data: [
      {
        kind: AwardKind.CERTIFICATE,
        title: "Bachelor of Science in Information Technology - Software Engineering",
        issuedAt: new Date("2023-01-01"),
        sortOrder: 0,
      },
      {
        kind: AwardKind.CERTIFICATE,
        title: "Create REST APIs with Spring and Java Skill Path",
        description:
          "Learned Java, HTTP, REST, CRUD, and built a web API with the Spring framework.",
        issuedAt: new Date("2024-01-01"),
        sortOrder: 1,
      },
      {
        kind: AwardKind.CERTIFICATE,
        title: "Learn JavaScript",
        issuedAt: new Date("2024-01-01"),
        sortOrder: 2,
      },
      {
        kind: AwardKind.CERTIFICATE,
        title: "EF SET English Certificate 74/100 (C2 Proficient)",
        issuedAt: new Date("2023-01-01"),
        sortOrder: 3,
      },
    ],
  });

  await prisma.experience.deleteMany({});
  await prisma.experience.create({
    data: {
      company: "Igire Rwanda Organization (IRO)",
      title: "Software Developer / Tech Lead",
      location: "Kigali, Rwanda",
      startDate: "2021",
      endDate: null,
      current: true,
      bullets: [
        "Leading engineering initiatives for education and empowerment programs.",
        "Shipping production web applications with modern TypeScript stacks.",
      ],
      sortOrder: 0,
    },
  });

  console.log("Seed complete. Admin:", adminEmail, "| Password:", adminPassword);
}

main()
  .then(async () => {
    await prisma.$disconnect();
    await pool.end();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    await pool.end();
    process.exit(1);
  });
