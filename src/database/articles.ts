export interface Article {
    id: string;
    title: string;
    introduction: string;
    coverimage: string;
    slug: string;
    category: string;
    content: string;
    createdAt: string;
    updatedAt: string;
    readTime: string;
}

export interface Category {
    id: string;
    name: string;
    slug: string;
}

export const Categories: Category[] = [
    {
        id: "1",
        name: "Web Design",
        slug: "web-design",
    },
    {
        id: "2",
        name: "Front-end",
        slug: "front-end"
    },
    {
        id: "3",
        name: "Back-end",
        slug: "back-end"
    },
    {
        id: "4",
        name: "UI/UX",
        slug: "ui-ux"
    },
    {
        id: "5",
        name: "Software Engineering",
        slug: "software-engineering"
    },
    {
        id: "6",
        name: "DevOps",
        slug: "devops"
    }
];

export const Articles: Article[] = [
    {
        id: "1",
        title: "How to use Tailwind CSS",
        introduction: 'Learn how to create an impressive website using Framer with our step-by-step guide',
        coverimage: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
        slug: "how-to-use-tailwind-css",
        category: "Web Design",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc ut aliquam aliquam, nunc nisl aliquet nisl, eget aliquam nisl nisl sit amet nisl. Sed euismod, nunc ut aliquam aliquam, nunc nisl aliquet nisl, eget aliquam nisl nisl sit amet nisl.",
        createdAt: "2024-01-01",
        updatedAt: "2024-01-01",
        readTime: "5 min"
    },
    {
        id: "2",
        title: "How to Get Started in The Software Engineering Career",
        introduction: 'Learn how to create an impressive website using Framer with our step-by-step guide',
        coverimage: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
        slug: "how-to-get-started-in-the-software-engineering-career",
        category: "Back-end",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc ut aliquam aliquam, nunc nisl aliquet nisl, eget aliquam nisl nisl sit amet nisl. Sed euismod, nunc ut aliquam aliquam, nunc nisl aliquet nisl, eget aliquam nisl nisl sit amet nisl.",
        createdAt: "2024-01-01",
        updatedAt: "2024-01-01",
        readTime: "5 min"
    },
    {
        id: "3",
        title: "How to use Tailwind CSS",
        introduction: 'Learn how to create an impressive website using Framer with our step-by-step guide',
        coverimage: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
        slug: "how-to-use-tailwind-css",
        category: "Web Design",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc ut aliquam aliquam, nunc nisl aliquet nisl, eget aliquam nisl nisl sit amet nisl. Sed euismod, nunc ut aliquam aliquam, nunc nisl aliquet nisl, eget aliquam nisl nisl sit amet nisl.",
        createdAt: "2024-01-01",
        updatedAt: "2024-01-01",
        readTime: "5 min"
    },
    {
        id: "4",
        title: "How to Get Started in The Software Engineering Career",
        introduction: 'Learn how to create an impressive website using Framer with our step-by-step guide',
        coverimage: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
        slug: "how-to-get-started-in-the-software-engineering-career",
        category: "Back-end",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc ut aliquam aliquam, nunc nisl aliquet nisl, eget aliquam nisl nisl sit amet nisl. Sed euismod, nunc ut aliquam aliquam, nunc nisl aliquet nisl, eget aliquam nisl nisl sit amet nisl.",
        createdAt: "2024-01-01",
        updatedAt: "2024-01-01",
        readTime: "5 min"
    },
    {
        id: "5",
        title: "How to use Tailwind CSS",
        introduction: 'Learn how to create an impressive website using Framer with our step-by-step guide',
        coverimage: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
        slug: "how-to-use-tailwind-css",
        category: "Web Design",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc ut aliquam aliquam, nunc nisl aliquet nisl, eget aliquam nisl nisl sit amet nisl. Sed euismod, nunc ut aliquam aliquam, nunc nisl aliquet nisl, eget aliquam nisl nisl sit amet nisl.",
        createdAt: "2024-01-01",
        updatedAt: "2024-01-01",
        readTime: "5 min"
    },
    {
        id: "6",
        title: "How to Get Started in The Software Engineering Career",
        introduction: 'Learn how to create an impressive website using Framer with our step-by-step guide',
        coverimage: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
        slug: "how-to-get-started-in-the-software-engineering-career",
        category: "Back-end",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc ut aliquam aliquam, nunc nisl aliquet nisl, eget aliquam nisl nisl sit amet nisl. Sed euismod, nunc ut aliquam aliquam, nunc nisl aliquet nisl, eget aliquam nisl nisl sit amet nisl.",
        createdAt: "2024-01-01",
        updatedAt: "2024-01-01",
        readTime: "5 min"
    },
    {
        id: "7",
        title: "How to use Tailwind CSS",
        introduction: 'Learn how to create an impressive website using Framer with our step-by-step guide',
        coverimage: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
        slug: "how-to-use-tailwind-css",
        category: "Web Design",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc ut aliquam aliquam, nunc nisl aliquet nisl, eget aliquam nisl nisl sit amet nisl. Sed euismod, nunc ut aliquam aliquam, nunc nisl aliquet nisl, eget aliquam nisl nisl sit amet nisl.",
        createdAt: "2024-01-01",
        updatedAt: "2024-01-01",
        readTime: "5 min"
    },
    {
        id: "8",
        title: "How to Get Started in The Software Engineering Career",
        introduction: 'Learn how to create an impressive website using Framer with our step-by-step guide',
        coverimage: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
        slug: "how-to-get-started-in-the-software-engineering-career",
        category: "Back-end",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc ut aliquam aliquam, nunc nisl aliquet nisl, eget aliquam nisl nisl sit amet nisl. Sed euismod, nunc ut aliquam aliquam, nunc nisl aliquet nisl, eget aliquam nisl nisl sit amet nisl.",
        createdAt: "2024-01-01",
        updatedAt: "2024-01-01",
        readTime: "5 min"
    }
];