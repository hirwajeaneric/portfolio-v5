interface Services {
    name: string;
    description: string;
    slug: string;
    technologies: string[];
}

export const MyServices: Services[] = [
    {
        name: "Web Development",
        description: "I develop responsive, dynamic, and scalable websites and web applications that meet user needs, using modern web technologies. From front-end interfaces to back-end logic, I focus on delivering optimal performance and a seamless user experience.",
        slug: "web-development",
        technologies: [
            "React", "TypeScript", "JavaScript", "HTML", "CSS", "Node.js", "Express.js", 
            "Next.js", "Prisma", "PostgreSQL", "Firebase", "AWS", "Vercel", "Jest", 
            "Docker", "Git", "Jira", "GitHub", "Figma"
        ]
    },
    {
        name: "DevOps",
        description: "I implement infrastructure as code, continuous integration/continuous deployment (CI/CD) pipelines, and automation processes to optimize the development workflow. By using cloud services and containerization, I ensure reliable, scalable, and secure software deployment.",
        slug: "devops",
        technologies: [
            "Docker", "Kubernetes", "AWS", "Terraform", "Ansible", "Jenkins", "Git", 
            "CI/CD", "Linux", "Bash", "GitHub Actions", "Prometheus", "Grafana"
        ]
    },
    {
        name: "Graphic Design",
        description: "I create visually appealing and professional designs, focusing on brand identity, UI/UX design, and marketing materials. My designs enhance user engagement and effectively communicate ideas through digital mediums.",
        slug: "graphic-design",
        technologies: [
            "Adobe Photoshop", "Adobe Illustrator", "Adobe XD", "Figma", "Sketch", 
            "InDesign", "Canva"
        ]
    }
];
