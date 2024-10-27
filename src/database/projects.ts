import { FaReact, FaNodeJs, FaGithub, FaExternalLinkAlt, FaMobileAlt, FaCss3Alt, FaHtml5 } from 'react-icons/fa';
import { SiTypescript, SiMongodb, SiPostgresql, SiRedux } from 'react-icons/si';

type Technologies = {
    name: string,
    icon: JSX.ElementType,
}

type ProjectLinks = {
    name: string,
    icon: JSX.ElementType,
    link: string
}

export interface ProjectTypes {
    id: string;
    name: string;
    category: "Design" | "Web" | "Mobile" | "Writings" | "Startups" | "Software" | "Other";
    description: string;
    deliverable: string;
    challenge: string;
    goal: string;
    result: string;
    client: string;
    timeline: string;
    link: string;
    image: string;
    technologies: Technologies[];
    type: string;
    otherLinks: ProjectLinks[];
    slug: string
};

const projects: ProjectTypes[] = [
    {
        id: "1",
        name: "SheCanCODE Bootcamp",
        category: "Web",
        challenge: "The challenge was to create a personal portfolio website using React, TypeScript, and CSS.",
        goal: "To create a portfolio showcasing my projects and skills.",
        result: "I created a responsive and mobile-friendly website using React, TypeScript, and CSS.",
        client: "SheCanCode School",
        deliverable: "Website, User Management, Blog CMS, and Course CMS.",
        timeline: "10 weeks",
        slug: 'shecancode-bootcamp',
        description: "A personal portfolio showcasing projects and skills using React, TypeScript, and CSS.",
        link: "shecancodeschool.org",
        image: "/shecancode.png",
        technologies: [
            { name: "React", icon: FaReact },
            { name: "TypeScript", icon: SiTypescript },
            { name: "CSS", icon: FaCss3Alt }
        ],
        type: "Web",
        otherLinks: [
            { name: "GitHub", icon: FaGithub, link: "https://github.com/yourusername/portfolio" },
            { name: "Live Demo", icon: FaExternalLinkAlt, link: "https://yourportfolio.com" }
        ]
    },
    {
        name: "Trash Mark",
        id: "2",
        category: "Web",
        slug: "trash-mark",
        deliverable: "Website, User Management, Blog CMS, and Course CMS.",
        description: "A mobile app that helps users manage their trash and recycling schedules.",
        challenge: "The challenge was to create a user-friendly mobile application with a clean and intuitive interface.",
        goal: "To create a mobile app that allows users to manage their trash and recycling schedules.",
        result: "I created a mobile app using React Native and Redux, which allowed users to add, edit, and delete their schedules.",
        client: "Myself",
        timeline: "6 months",
        link: "https://ecommerceapp.com",
        image: "https://images.pexels.com/photos/27059631/pexels-photo-27059631/free-photo-of-decor-in-luxurious-apartment.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", // Replace with stock image URL
        technologies: [
            { name: "React", icon: FaReact },
            { name: "Node.js", icon: FaNodeJs },
            { name: "MongoDB", icon: SiMongodb }
        ],
        type: "Full-stack",
        otherLinks: [
            { name: "GitHub", icon: FaGithub, link: "https://github.com/yourusername/ecommerce-app" },
            { name: "Live Demo", icon: FaExternalLinkAlt, link: "https://ecommerceapp.com" }
        ]
    },
    {
        id: "3",
        name: "Quick Sacco",
        category: "Mobile",
        slug: "quick-sacco",
        deliverable: "Website, User Management, Blog CMS, and Course CMS.",
        description: "A mobile app that allows users to manage bank accounts, check balances, and perform transactions.",
        link: "https://mobilebankapp.com",
        image: "https://images.pexels.com/photos/27059631/pexels-photo-27059631/free-photo-of-decor-in-luxurious-apartment.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", // Replace with stock image URL
        technologies: [
            { name: "React Native", icon: FaMobileAlt },
            { name: "Redux", icon: SiRedux },
            { name: "TypeScript", icon: SiTypescript }
        ],
        type: "Mobile",
        otherLinks: [
            { name: "GitHub", icon: FaGithub, link: "https://github.com/yourusername/mobile-banking-app" },
            { name: "Live Demo", icon: FaExternalLinkAlt, link: "https://mobilebankapp.com" }
        ],
        challenge: "The challenge was to create a user-friendly mobile application with a clean and intuitive interface.",
        goal: "To create a mobile app that allows users to manage bank accounts, check balances, and perform transactions.",
        result: "I created a mobile app using React Native and Redux, which allowed users to create, edit, and delete their accounts, check balances, and perform transactions.",
        client: "Myself",
        timeline: "6 months",
    },
    {
        id: "4",
        name: "EBSDS",
        category: "Web",
        slug: "ebsds",
        deliverable: "Website, User Management, Blog CMS, and Course CMS.",
        description: "A task management web app with task tracking, progress updates, and notifications.",
        link: "https://taskmanagerapp.com",
        image: "https://images.pexels.com/photos/27059631/pexels-photo-27059631/free-photo-of-decor-in-luxurious-apartment.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", // Replace with stock image URL
        technologies: [
            { name: "React", icon: FaReact },
            { name: "PostgreSQL", icon: SiPostgresql },
            { name: "Node.js", icon: FaNodeJs }
        ],
        type: "Web",
        otherLinks: [
            { name: "GitHub", icon: FaGithub, link: "https://github.com/yourusername/task-manager" },
            { name: "Live Demo", icon: FaExternalLinkAlt, link: "https://taskmanagerapp.com" }
        ],
        challenge: "The challenge was to create a user-friendly and scalable web application with a clean and intuitive interface.",
        goal: "To create a task management web app with task tracking, progress updates, and notifications.",
        result: "I created a full-featured blog platform using React, PostgreSQL, and Node.js, which allowed users to create, edit, and share blog posts, track task progress, and receive notifications.",
        client: "Myself",
        timeline: "6 months"
    },
    {
        id: "5",
        name: "Cement Swift",
        category: "Web",
        slug: "cement-swift",
        deliverable: "Website, User Management, Blog CMS, and Course CMS.",
        description: "A full-featured blog platform where users can create, edit, and share blog posts.",
        link: "https://blogplatform.com",
        image: "https://images.pexels.com/photos/27059631/pexels-photo-27059631/free-photo-of-decor-in-luxurious-apartment.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", // Replace with stock image URL
        technologies: [
            { name: "HTML5", icon: FaHtml5 },
            { name: "CSS3", icon: FaCss3Alt },
            { name: "Node.js", icon: FaNodeJs }
        ],
        type: "Full-stack",
        otherLinks: [
            { name: "GitHub", icon: FaGithub, link: "https://github.com/yourusername/blog-platform" },
            { name: "Live Demo", icon: FaExternalLinkAlt, link: "https://blogplatform.com" }
        ],
        challenge: "The challenge was to create a user-friendly and scalable web application with a clean and intuitive interface.",
        goal: "To create a full-featured blog platform where users can create, edit, and share blog posts.",
        result: "I created a full-featured blog platform using HTML5, CSS3, and Node.js, which allowed users to create, edit, and share blog posts, implement user authentication, and handle real-time updates.",
        client: "Aime Yves Ngirimana",
        timeline: "6 months"
    }
];

export default projects;