import {
  FaReact,
  FaNodeJs,
  FaCss3Alt,
  FaGithub,
  FaExternalLinkAlt,
  FaAngular,
} from "react-icons/fa";
import {
  SiTypescript,
  SiMongodb,
  SiNextdotjs,
  SiTailwindcss,
  SiShadcnui,
  SiNestjs,
  SiPostgresql,
  SiRedis,
} from "react-icons/si";

type Technologies = {
  name: string;
  icon: JSX.ElementType;
};

type ProjectLinks = {
  name: string;
  icon: JSX.ElementType;
  link: string;
};

export interface ProjectTypes {
  id: string;
  name: string;
  category:
    | "Design"
    | "Web"
    | "Mobile"
    | "Writings"
    | "Startups"
    | "Software"
    | "Other";
  description?: string;
  deliverable?: string;
  challenge?: string;
  goal?: string;
  result?: string;
  client: string;
  timeline: string;
  link: string;
  gallery: string[];
  image: string;
  technologies: Technologies[];
  type: string;
  otherLinks: ProjectLinks[];
  slug: string;
}

const projects: ProjectTypes[] = [
  {
    id: "1",
    name: "SheCanCODE Bootcamp",
    deliverable: "Website, User Management, Blog CMS, and Course CMS.",
    category: "Web",
    challenge:
      "To create a CMS from scratch to ensure a both cost effective and less error prone system to manage blogs and courses management.",
    goal: "Building SheCanCODE Bootcamps new and improved website that includes a blog CMS, course CMS, automated course application and Job Portal, and more to effectively showcase SheCanCODE's activities, work and story.",
    result:
      "The result is a faster, more secure, and more scalable website that is easier to manage and update. In all corners of the website, I managed to send a message and inform users and visitors what SheCanCODE is and what it stands for.",
    client: "SheCanCode School",
    timeline: "7 weeks",
    slug: "shecancode-bootcamp",
    description: "An better and improved version of SheCanCODE Website.",
    link: "https://www.shecancodeschool.org/",
    image: "/shecancode.png",
    gallery: [
      "/landing.png",
      "/benefits.png",
      "/courses.png",
      "/articles.png",
      "/shecancode.png",
    ],
    technologies: [
      { name: "React", icon: FaReact },
      { name: "TypeScript", icon: SiTypescript },
      { name: "CSS", icon: FaCss3Alt },
    ],
    type: "Web",
    otherLinks: [
      { name: "GitHub", icon: FaGithub, link: "" },
      {
        name: "Live Demo",
        icon: FaExternalLinkAlt,
        link: "https://www.shecancodeschool.org/",
      },
    ],
  },
  {
    name: "Tiny Steps A Day",
    id: "3",
    category: "Web",
    slug: "tiny-steps-a-day",
    deliverable:
      "A web application that helps users build consistency through small daily actions.",
    description:
      "A web application that helps users build consistency through small daily actions.",
    client: "Myself",
    timeline: "1 week",
    link: "https://www.tinystepsaday.com/",
    image: "/tinysteps-4.png",
    technologies: [
      { name: "React", icon: FaReact },
      { name: "Next.js", icon: SiNextdotjs },
      { name: "TypeScript", icon: SiTypescript },
      { name: "Tailwind CSS", icon: SiTailwindcss },
      { name: "Shadcn UI", icon: SiShadcnui },
      { name: "NestJS", icon: SiNestjs },
      { name: "PostgreSQL", icon: SiPostgresql },
      { name: "MongoDB", icon: SiMongodb },
    ],
    gallery: [
      "/tinysteps-1.png",
      "/tinysteps-2.png",
      "/tinysteps-3.png",
      "/tinysteps-4.png",
      "/tinysteps-5.png",
      "/tinysteps-6.png",
      "/tinysteps-7.png",
      "/tinysteps-8.png",
      "/tinysteps-9.png",
    ],
    type: "Web",
    otherLinks: [
      {
        name: "Live Demo",
        icon: FaExternalLinkAlt,
        link: "https://www.tinystepsaday.com/",
      },
    ],
  },
  {
    name: "African Leaders Hub",
    id: "4",
    category: "Web",
    slug: "african-leaders-hub",
    deliverable: "A corporate website for African Leaders Hub",
    description: "A corporate website for African Leaders Hub",
    client: "African Leaders Hub",
    timeline: "1 week",
    link: "https://www.africanleadershub.org",
    image: "/alh-1.png",
    technologies: [
      { name: "React", icon: FaReact },
      { name: "Next.js", icon: SiNextdotjs },
      { name: "TypeScript", icon: SiTypescript },
      { name: "Tailwind CSS", icon: SiTailwindcss },
      { name: "Shadcn UI", icon: SiShadcnui },
    ],
    gallery: ["/alh-1.png", "/alh-2.png", "/alh-3.png", "/alh-4.png"],
    type: "Web",
    otherLinks: [
      {
        name: "Live Demo",
        icon: FaExternalLinkAlt,
        link: "https://www.africanleadershub.org",
      },
    ],
  },
  {
    id: "7",
    name: "Sonarwa Life Insurance Co -  Insurance Management System",
    category: "Software",
    slug: "sonarwa-life-insurance-co-insurance-management-system",
    deliverable: "An insurance management system for Sonarwa Life Insurance Company",
    description: "An insurance management system for Sonarwa Life Insurance Company",
    client: "Sonarwa Life Insurance Company",
    timeline: "Continuous",
    link: "https://apps.sonarwalife.co.rw",
    image: "/sonarwa-1.png",
    technologies: [
      { name: "Angular", icon: FaAngular },
      { name: "TypeScript", icon: SiTypescript },
      { name: "Tailwind CSS", icon: SiTailwindcss },
      { name: "Shadcn UI", icon: SiShadcnui },
      { name: "NestJS", icon: SiNestjs },
      { name: "PostgreSQL", icon: SiPostgresql },
    ],
    gallery: [
      "/sonarwa-1.png",
      "/sonarwa-2.png",
      "/sonarwa-3.png",
      "/sonarwa-4.png",
    ],
    type: "Software",
    otherLinks: [
      {
        name: "Website",
        icon: FaExternalLinkAlt,
        link: "https://apps.sonarwalife.co.rw",
      },
    ],
  },
  {
    name: "CloudSkale",
    id: "5",
    category: "Web",
    slug: "cloudskale",
    deliverable: "A corporate website for CloudSkale",
    client: "CloudSkale",
    timeline: "1 week",
    link: "https://www.cloudskale.com",
    description:
      "CloudSkale is a corporate website for CloudSkale, a company that provides cloud and software development services to businesses.",
    image: "/cloudskale-1.png",
    technologies: [
      { name: "React", icon: FaReact },
      { name: "Next.js", icon: SiNextdotjs },
      { name: "TypeScript", icon: SiTypescript },
    ],
    gallery: [
      "/cloudskale-1.png",
      "/cloudskale-2.png",
      "/cloudskale-3.png",
      "/cloudskale-4.png",
      "/cloudskale-5.png",
    ],
    type: "Web",
    otherLinks: [
      {
        name: "Live Demo",
        icon: FaExternalLinkAlt,
        link: "https://www.cloudskale.com",
      },
    ],
  },
  {
    id: "6",
    name: "EBSDS",
    category: "Web",
    slug: "ebsds",
    deliverable:
      "Electronic Blood Storage and Distribution System",
    description:
      "A platform to connect hospitals to C.P.T.S and vice-versa and to speed up the blood storage and distribution procedure.",
    link: "https://github.com/hirwajeaneric",
    image: "/ebsds-1.png",
    technologies: [
      { name: "React", icon: FaReact },
      { name: "PostgreSQL", icon: SiPostgresql },
      { name: "Node.js", icon: FaNodeJs },
      { name: "Tailwind CSS", icon: SiTailwindcss },
      { name: "Shadcn UI", icon: SiShadcnui },
      { name: "NestJS", icon: SiNestjs },
      { name: "PostgreSQL", icon: SiPostgresql },
      { name: "Redis", icon: SiRedis },
    ],
    type: "Web",
    otherLinks: [
      {
        name: "GitHub",
        icon: FaGithub,
        link: "https://github.com/hirwajeaneric/ebsds",
      },
    ],
    client: "EBSDS",
    timeline: "1 week",
    gallery: [
      "/ebsds-1.png",
      "/ebsds-2.png",
      "/ebsds-3.png",
      "/ebsds-4.png",
      "/ebsds-5.png",
      "/ebsds-6.png",
      "/ebsds-7.png",
      "/ebsds-8.png",
      "/ebsds-9.png",
      "/ebsds-10.png",
      "/ebsds-11.png",
      "/ebsds-12.png",
      "/ebsds-13.png",
      "/ebsds-14.png",
      "/ebsds-15.png",
      "/ebsds-16.png",
      "/ebsds-17.png",
      "/ebsds-18.png",
      "/ebsds-19.png",
      "/ebsds-20.png",
      "/ebsds-21.png",
      "/ebsds-22.png",
      "/ebsds-23.png",
      "/ebsds-24.png",
      "/ebsds-25.png",
      "/ebsds-26.png",
    ],
  },
  // {
  //     id: "3",
  //     name: "Quick Sacco",
  //     category: "Mobile",
  //     slug: "quick-sacco",
  //     deliverable: "Website, User Management, Blog CMS, and Course CMS.",
  //     description: "A mobile app that allows users to manage bank accounts, check balances, and perform transactions.",
  //     link: "https://mobilebankapp.com",
  //     image: "https://images.pexels.com/photos/27059631/pexels-photo-27059631/free-photo-of-decor-in-luxurious-apartment.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", // Replace with stock image URL
  //     technologies: [
  //         { name: "React Native", icon: FaMobileAlt },
  //         { name: "Redux", icon: SiRedux },
  //         { name: "TypeScript", icon: SiTypescript }
  //     ],
  //     type: "Mobile",
  //     otherLinks: [
  //         { name: "GitHub", icon: FaGithub, link: "https://github.com/yourusername/mobile-banking-app" },
  //         { name: "Live Demo", icon: FaExternalLinkAlt, link: "https://mobilebankapp.com" }
  //     ],
  //     challenge: "The challenge was to create a user-friendly mobile application with a clean and intuitive interface.",
  //     goal: "To create a mobile app that allows users to manage bank accounts, check balances, and perform transactions.",
  //     result: "I created a mobile app using React Native and Redux, which allowed users to create, edit, and delete their accounts, check balances, and perform transactions.",
  //     client: "Myself",
  //     timeline: "6 months",
  // },
  // {
  //     id: "5",
  //     name: "Cement Swift",
  //     category: "Web",
  //     slug: "cement-swift",
  //     deliverable: "Website, User Management, Blog CMS, and Course CMS.",
  //     description: "A full-featured blog platform where users can create, edit, and share blog posts.",
  //     link: "https://blogplatform.com",
  //     image: "https://images.pexels.com/photos/27059631/pexels-photo-27059631/free-photo-of-decor-in-luxurious-apartment.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", // Replace with stock image URL
  //     technologies: [
  //         { name: "HTML5", icon: FaHtml5 },
  //         { name: "CSS3", icon: FaCss3Alt },
  //         { name: "Node.js", icon: FaNodeJs }
  //     ],
  //     type: "Full-stack",
  //     otherLinks: [
  //         { name: "GitHub", icon: FaGithub, link: "https://github.com/yourusername/blog-platform" },
  //         { name: "Live Demo", icon: FaExternalLinkAlt, link: "https://blogplatform.com" }
  //     ],
  //     challenge: "The challenge was to create a user-friendly and scalable web application with a clean and intuitive interface.",
  //     goal: "To create a full-featured blog platform where users can create, edit, and share blog posts.",
  //     result: "I created a full-featured blog platform using HTML5, CSS3, and Node.js, which allowed users to create, edit, and share blog posts, implement user authentication, and handle real-time updates.",
  //     client: "Myself",
  //     timeline: "6 months"
  // },
];

export default projects;
