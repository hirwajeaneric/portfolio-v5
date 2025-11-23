interface Services {
    name: string;
    description: string;
    slug: string;
    technologies: string[];
}

export const MyServices: Services[] = [
    {
        name: "Software Development",
        description: "I develop responsive, dynamic, and scalable websites and web applications that meet user needs, using modern web technologies. From front-end interfaces to back-end logic, I focus on delivering optimal performance and a seamless user experience.",
        slug: "software-development",
        technologies: [
            "React", "TypeScript", "JavaScript", "Java", "HTML", "CSS", 
            "NestJS", "Next.js", "Angular", "Spring Boot", "Prisma", "Node.js", "Express.js", "PostgreSQL", "MySQL", "MongoDB", 
            "Firebase", "AWS", "Vercel", "Cloudflare", "Netlify", "Render", "Jest", 
            "Docker", "Git", "Jira", "GitHub", "Figma"
        ]
    },
    {
        name: "DevOps and Cloud Computing",
        description: "I implement infrastructure as code, continuous integration/continuous deployment (CI/CD) pipelines, and automation processes to optimize the development workflow. By using cloud services and containerization, I ensure reliable, scalable, and secure software deployment.",
        slug: "devops-and-cloud-computing",
        technologies: [
            "Docker", "Kubernetes", "AWS", "Terraform", "Ansible", "Jenkins", "Git", 
            "CI/CD", "Linux", "Bash", "GitHub Actions", "Prometheus", "Grafana"
        ]
    },
    {
        name: "Graphic and UI/UX Design",
        description: "I create visually appealing and professional designs, focusing on brand identity, UI/UX design, and marketing materials. My designs enhance user engagement and effectively communicate ideas through digital mediums.",
        slug: "graphic-and-ui-ux-design",
        technologies: [
            "Adobe Photoshop", "Adobe Illustrator", "Adobe XD", "Figma", "Sketch", 
            "InDesign", "Canva"
        ]
    }
];
