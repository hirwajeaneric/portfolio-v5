import { FaReact, FaNodeJs, FaCss3Alt, FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import { SiTypescript, SiMongodb } from 'react-icons/si';

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
    gallery: string[];
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
        deliverable: "Website, User Management, Blog CMS, and Course CMS.",
        category: "Web",
        challenge: "To create a CMS from scratch to ensure a both cost effective and less error prone system to manage blogs and courses management.",
        goal: "Building SheCanCODE Bootcamps new and improved website that includes a blog CMS, course CMS, automated course application and Job Portal, and more to effectively showcase SheCanCODE's activities, work and story.",
        result: "The result is a faster, more secure, and more scalable website that is easier to manage and update. In all corners of the website, I managed to send a message and inform users and visitors what SheCanCODE is and what it stands for.",
        client: "SheCanCode School",
        timeline: "7 weeks",
        slug: 'shecancode-bootcamp',
        description: "An better and improved version of SheCanCODE Website.",
        link: "https://shecancodeschool.org",
        image: "/shecancode.png",
        gallery: [
            "/landing.png",
            "/benefits.png",
            "/courses.png",
            "/articles.png",
            "/shecancode.png"
        ],
        technologies: [
            { name: "React", icon: FaReact },
            { name: "TypeScript", icon: SiTypescript },
            { name: "CSS", icon: FaCss3Alt }
        ],
        type: "Web",
        otherLinks: [
            { name: "GitHub", icon: FaGithub, link: "" },
            { name: "Live Demo", icon: FaExternalLinkAlt, link: "https://shecancodeschool.org" }
        ]
    },
    {
        name: "Trash Mark",
        id: "2",
        category: "Web",
        slug: "trash-mark",
        deliverable: "A Trash Management and Reselling Web Based App",
        description: "A Trash Management and Reselling Web Based App under the management of R.E.M.A.",
        challenge: "Creating a system that can both serve two different end users with mostly different goals yet making sure that the system can meet the needs of each of them using one web app. These being just regular citizens and R.E.M.A.",
        goal: "To Build a streamlined and innovative way for citizens to provide information that are valuable for R.E.M.A to manage and monitor the trash (non-desired items) usage and distribution in Rwanda.",
        result: "A 2 part system with a web-based platform where first, users can register, upload all necessary information about the trash that can be sold they possess, a payment system to facilitate transactions, a way for people to order and buy the trash, and finally, a way for R.E.M.A to manage and monitor the trash (non-desired items) usage and distribution in Rwanda using a very user-friendly dashboard interface.",
        client: "Myself",
        timeline: "4 months",
        link: "https://trashmark.onrender.com",
        image: "/t-landing-page.png", // Replace with stock image URL
        technologies: [
            { name: "React", icon: FaReact },
            { name: "Node.js", icon: FaNodeJs },
            { name: "MongoDB", icon: SiMongodb }
        ],
        gallery: [
            "/landing.png",
            "/benefits.png",
            "/courses.png",
            "/articles.png",
            "/shecancode.png"
        ],
        type: "Full-stack",
        otherLinks: [
            { name: "GitHub", icon: FaGithub, link: "https://github.com/hirwajeaneric/TrashMark" },
            { name: "Live Demo", icon: FaExternalLinkAlt, link: "https://trashmark.onrender.com" }
        ]
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
    //     id: "4",
    //     name: "EBSDS",
    //     category: "Web",
    //     slug: "ebsds",
    //     deliverable: "Website, User Management, Blog CMS, and Course CMS.",
    //     description: "A task management web app with task tracking, progress updates, and notifications.",
    //     link: "https://taskmanagerapp.com",
    //     image: "https://images.pexels.com/photos/27059631/pexels-photo-27059631/free-photo-of-decor-in-luxurious-apartment.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", // Replace with stock image URL
    //     technologies: [
    //         { name: "React", icon: FaReact },
    //         { name: "PostgreSQL", icon: SiPostgresql },
    //         { name: "Node.js", icon: FaNodeJs }
    //     ],
    //     type: "Web",
    //     otherLinks: [
    //         { name: "GitHub", icon: FaGithub, link: "https://github.com/yourusername/task-manager" },
    //         { name: "Live Demo", icon: FaExternalLinkAlt, link: "https://taskmanagerapp.com" }
    //     ],
    //     challenge: "The challenge was to create a user-friendly and scalable web application with a clean and intuitive interface.",
    //     goal: "To create a task management web app with task tracking, progress updates, and notifications.",
    //     result: "I created a full-featured blog platform using React, PostgreSQL, and Node.js, which allowed users to create, edit, and share blog posts, track task progress, and receive notifications.",
    //     client: "Myself",
    //     timeline: "6 months"
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