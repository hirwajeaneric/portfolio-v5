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
    name: string,
    category: "Design" | "Web" | "Mobile" | "Writings" | "Startups" | "Software" | "Other",
    description: string,
    link: string,
    image: string,
    technologies: Technologies[],
    type: string,
    otherLinks: ProjectLinks[],
    slug: string
};

const projects: ProjectTypes[] = [
    {
        name: "SheCanCODE Bootcamp",
        category: "Web",
        slug: 'shecancode-bootcamp',
        description: "A personal portfolio showcasing projects and skills using React, TypeScript, and CSS.",
        link: "https://www.shecancodeschool.org/",
        image: "/shecancode.png",
        technologies: [
            { name: "React", icon: FaReact },
            { name: "TypeScript", icon: SiTypescript  },
            { name: "CSS", icon: FaCss3Alt  }
        ],
        type: "Web",
        otherLinks: [
            { name: "GitHub", icon: FaGithub , link: "https://github.com/yourusername/portfolio" },
            { name: "Live Demo", icon: FaExternalLinkAlt , link: "https://yourportfolio.com" }
        ]
    },
    {
        name: "Trash Mark",
        category: "Web",
        slug: "trash-mark",
        description: "A full-stack e-commerce application with product listings, cart functionality, and payment integration.",
        link: "https://ecommerceapp.com",
        image: "https://images.pexels.com/photos/27059631/pexels-photo-27059631/free-photo-of-decor-in-luxurious-apartment.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", // Replace with stock image URL
        technologies: [
            { name: "React", icon: FaReact  },
            { name: "Node.js", icon: FaNodeJs  },
            { name: "MongoDB", icon: SiMongodb  }
        ],
        type: "Full-stack",
        otherLinks: [
            { name: "GitHub", icon: FaGithub , link: "https://github.com/yourusername/ecommerce-app" },
            { name: "Live Demo", icon: FaExternalLinkAlt , link: "https://ecommerceapp.com" }
        ]
    },
    {
        name: "Quick Sacco",
        category: "Mobile",
        slug: "quick-sacco",
        description: "A mobile app that allows users to manage bank accounts, check balances, and perform transactions.",
        link: "https://mobilebankapp.com",
        image: "https://images.pexels.com/photos/27059631/pexels-photo-27059631/free-photo-of-decor-in-luxurious-apartment.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", // Replace with stock image URL
        technologies: [
            { name: "React Native", icon: FaMobileAlt  },
            { name: "Redux", icon: SiRedux  },
            { name: "TypeScript", icon: SiTypescript  }
        ],
        type: "Mobile",
        otherLinks: [
            { name: "GitHub", icon: FaGithub , link: "https://github.com/yourusername/mobile-banking-app" },
            { name: "Live Demo", icon: FaExternalLinkAlt , link: "https://mobilebankapp.com" }
        ]
    },
    {
        name: "EBSDS",
        category: "Web",
        slug: "ebsds",
        description: "A task management web app with task tracking, progress updates, and notifications.",
        link: "https://taskmanagerapp.com",
        image: "https://images.pexels.com/photos/27059631/pexels-photo-27059631/free-photo-of-decor-in-luxurious-apartment.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", // Replace with stock image URL
        technologies: [
            { name: "React", icon: FaReact  },
            { name: "PostgreSQL", icon: SiPostgresql  },
            { name: "Node.js", icon: FaNodeJs  }
        ],
        type: "Web",
        otherLinks: [
            { name: "GitHub", icon: FaGithub , link: "https://github.com/yourusername/task-manager" },
            { name: "Live Demo", icon: FaExternalLinkAlt , link: "https://taskmanagerapp.com" }
        ]
    },
    {
        name: "Cement Swift",
        category: "Web",
        slug: "cement-swift",
        description: "A full-featured blog platform where users can create, edit, and share blog posts.",
        link: "https://blogplatform.com",
        image: "https://images.pexels.com/photos/27059631/pexels-photo-27059631/free-photo-of-decor-in-luxurious-apartment.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", // Replace with stock image URL
        technologies: [
            { name: "HTML5", icon: FaHtml5  },
            { name: "CSS3", icon: FaCss3Alt  },
            { name: "Node.js", icon: FaNodeJs  }
        ],
        type: "Full-stack",
        otherLinks: [
            { name: "GitHub", icon: FaGithub , link: "https://github.com/yourusername/blog-platform" },
            { name: "Live Demo", icon: FaExternalLinkAlt , link: "https://blogplatform.com" }
        ]
    }
];

export default projects;