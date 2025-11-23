import BlurFade from "@/components/ui/blur-fade";
import ProjectDisplayCard from "@/components/widgets/ProjectDisplayCard";
import TestimonialCard from "@/components/widgets/TestimonialCard";
import WorkProcess from "@/components/widgets/WorkProcess";
import projects from "@/database/projects";
import { MyServices } from "@/database/services";
import { SocialAccounts } from "@/database/socialAccounts";
import { Testimonials } from "@/database/testimonials";
import { GitHubLogoIcon, InstagramLogoIcon, LinkedInLogoIcon } from "@radix-ui/react-icons";
import { ArrowDownIcon, ArrowUpIcon } from "lucide-react";
import Link from "next/link";
import { BsMedium } from "react-icons/bs";
import { FaYoutube } from "react-icons/fa6";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import {
    FaReact, FaNodeJs, FaHtml5, FaCss3Alt, FaAws, FaDocker, FaGitAlt, FaGithub,
    FaJava
} from "react-icons/fa";
import {
    SiTypescript, SiJavascript, SiNextdotjs, SiExpress, SiPrisma, SiPostgresql,
    SiFirebase, SiVercel, SiJest, SiJira, SiFigma, SiKubernetes, SiTerraform,
    SiAnsible, SiJenkins, SiLinux, SiShell, SiPrometheus, SiGrafana,
    SiAdobephotoshop, SiAdobeillustrator, SiAdobexd, SiAdobeindesign, SiSketch, SiCanva,
    SiGithubactions, SiGitlab, SiSpringboot, SiNestjs, SiAngular, SiMysql, SiMongodb,
    SiCloudflare, SiNetlify, SiRender
} from "react-icons/si";

const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Jean Eric Hirwa",
    "url": "https://www.erichirwa.com",
    "description": "Jean Eric Hirwa is a software developer with a passion for building things, both digitally and creatively. He enjoys combining his tech skills with his design background to create innovative solutions. Currently, he is working on empowering women through tech at IRO. Outside of work, he loves exploring new ideas, dancing, and diving into a good book or movie.",
    "image": "/1718313379119.jpeg",
    "author": {
        "@type": "WebSite",
        "name": "Jean Eric Hirwa",
        "url": "https://www.erichirwa.com",
        "image": "/1718313379119.jpeg",
        "sameAs": [
            "https://github.com/hirwajeaneric",
            "https://www.linkedin.com/in/jean-eric-hirwa/",
            "https://medium.com/@hirwajeaneric",
            "https://www.instagram.com/hirwa_jean_eric/"
        ]
    }
}

// Technology icons mapping
const technologyIcons: Record<string, { icon: React.ComponentType<{ className?: string }>, category: string }> = {
    // Languages
    "TypeScript": { icon: SiTypescript, category: "Language" },
    "JavaScript": { icon: SiJavascript, category: "Language" },
    "Java": { icon: FaJava, category: "Language" },

    // Frontend
    "HTML": { icon: FaHtml5, category: "Frontend" },
    "CSS": { icon: FaCss3Alt, category: "Frontend" },
    "Next.js": { icon: SiNextdotjs, category: "Frontend" },
    "Angular": { icon: SiAngular, category: "Frontend" },

    // Library
    "React": { icon: FaReact, category: "Library" },

    // Backend
    "Node.js": { icon: FaNodeJs, category: "Backend" },
    "Express.js": { icon: SiExpress, category: "Backend" },
    "NestJS": { icon: SiNestjs, category: "Backend" },
    "Spring Boot": { icon: SiSpringboot, category: "Backend" },

    // Database
    "Prisma": { icon: SiPrisma, category: "Database" },
    "PostgreSQL": { icon: SiPostgresql, category: "Database" },
    "MySQL": { icon: SiMysql, category: "Database" },
    "MongoDB": { icon: SiMongodb, category: "Database" },

    // Cloud & DevOps
    "Firebase": { icon: SiFirebase, category: "Cloud" },
    "AWS": { icon: FaAws, category: "Cloud" },
    "Vercel": { icon: SiVercel, category: "Cloud" },
    "Cloudflare": { icon: SiCloudflare, category: "Cloud" },
    "Netlify": { icon: SiNetlify, category: "Cloud" },
    "Render": { icon: SiRender, category: "Cloud" },
    "Docker": { icon: FaDocker, category: "DevOps" },
    "Kubernetes": { icon: SiKubernetes, category: "DevOps" },
    "Terraform": { icon: SiTerraform, category: "DevOps" },
    "Ansible": { icon: SiAnsible, category: "DevOps" },
    "Jenkins": { icon: SiJenkins, category: "DevOps" },
    "Linux": { icon: SiLinux, category: "DevOps" },
    "Bash": { icon: SiShell, category: "DevOps" },
    "GitHub Actions": { icon: SiGithubactions, category: "DevOps" },
    "CI/CD": { icon: SiGitlab, category: "DevOps" },
    "Prometheus": { icon: SiPrometheus, category: "DevOps" },
    "Grafana": { icon: SiGrafana, category: "DevOps" },

    // Tools
    "Jest": { icon: SiJest, category: "Testing" },
    "Git": { icon: FaGitAlt, category: "Tools" },
    "GitHub": { icon: FaGithub, category: "Tools" },
    "Jira": { icon: SiJira, category: "Tools" },
    "Figma": { icon: SiFigma, category: "Design" },

    // Design Tools
    "Adobe Photoshop": { icon: SiAdobephotoshop, category: "Design" },
    "Adobe Illustrator": { icon: SiAdobeillustrator, category: "Design" },
    "Adobe XD": { icon: SiAdobexd, category: "Design" },
    "InDesign": { icon: SiAdobeindesign, category: "Design" },
    "Sketch": { icon: SiSketch, category: "Design" },
    "Canva": { icon: SiCanva, category: "Design" },
};

// Get all unique technologies from services
const getAllTechnologies = (): string[] => {
    const allTechs = MyServices.flatMap(service => service.technologies);
    return Array.from(new Set(allTechs));
};

function TechnologyIconsGrid() {
    const technologies = getAllTechnologies();
    const categories = Array.from(new Set(technologies.map(tech => technologyIcons[tech]?.category).filter(Boolean))).sort();

    return (
        <BlurFade delay={0.1} inView className="w-full flex flex-col justify-between items-center">
            <Accordion type="multiple" defaultValue={[categories[0]]} className="w-full border border-zinc-300 dark:border-zinc-700 rounded-lg bg-zinc-100 dark:bg-zinc-900 divide-y divide-zinc-300 dark:divide-zinc-700 min-w-full">
                {categories.map((category) => {
                    const categoryTechs = technologies.filter(tech => technologyIcons[tech]?.category === category);

                    return (
                        <AccordionItem key={category} value={category} className="border-none">
                            <AccordionTrigger className="px-4 sm:px-6 py-3 text-sm sm:text-base font-semibold text-zinc-800 dark:text-zinc-200 hover:no-underline hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors">
                                <span className="uppercase tracking-wider">{category}</span>
                                {/* <span className="text-xs text-zinc-600 dark:text-zinc-400 font-normal normal-case tracking-normal ml-2">
                                    ({categoryTechs.length})
                                </span> */}
                            </AccordionTrigger>
                            <AccordionContent className="px-4 sm:px-6 pb-4 pt-2">
                                <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-3">
                                    {categoryTechs.map((tech, index) => {
                                        const IconComponent = technologyIcons[tech]?.icon;
                                        if (!IconComponent) return null;

                                        return (
                                            <BlurFade
                                                key={tech}
                                                delay={0.02 * index}
                                                inView
                                                className="group"
                                            >
                                                <div className="relative flex flex-col items-center justify-center p-3 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-600 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-all duration-300 cursor-default">
                                                    <IconComponent
                                                        className="w-6 h-6 sm:w-7 sm:h-7 text-zinc-700 dark:text-zinc-300 group-hover:scale-110 transition-transform duration-300"
                                                    />
                                                    <span className="mt-1.5 text-[10px] sm:text-xs text-center text-zinc-600 dark:text-zinc-400 group-hover:text-zinc-800 dark:group-hover:text-zinc-200 transition-colors duration-300 line-clamp-2 leading-tight">
                                                        {tech}
                                                    </span>
                                                </div>
                                            </BlurFade>
                                        );
                                    })}
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    );
                })}
            </Accordion>
        </BlurFade>
    );
}

export default function page() {
    const jssStyles = {
        backgroundImage: `linear-gradient(to bottom, rgba(39, 39, 42, 0), rgba(9, 9, 11, 1)), url("/Jean Eric - Image 1 - 684x1000.png")`,
        backgroundSize: 'contain',
        backgroundAttachment: 'fixed',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        transition: 'background-image 0.3s ease-in-out',
        willChange: 'background-image',
    };

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

            <div className="flex flex-col items-center justify-start w-full scroll-smooth">
                <section id="home" className="flex flex-col mx-auto justify-center items-center w-full pt-48 pb-36 px-4" style={jssStyles}>
                    <BlurFade delay={0.25} className="mt-80" inView>
                        <h1 className="text-center z-40">
                            <span className="text-primary mb-10 text-2xl md:text-4xl block">
                                Hello, I&apos;m
                            </span>
                            <span className="text-primary text-4xl md:text-6xl block">
                                Jean Eric Hirwa
                            </span>
                        </h1>
                    </BlurFade>
                    <BlurFade delay={0.25 * 2} inView>
                        <h2 className="text-center text-3xl md:text-5xl mt-10">A Full Stack Software Developer</h2>
                    </BlurFade>
                    <BlurFade delay={0.25 * 2} inView>
                        <h3 className="text-center text-xl text-wrap md:text-2xl mt-4">I design and build software and systems that respond to user needs and vision.</h3>
                    </BlurFade>
                    <BlurFade delay={0.25 * 2} inView>
                        <Link href="#skills" className="flex items-center justify-center gap-4 mt-24">
                            <span className="border-2 border-zinc-800 dark:border-zinc-400 dark:hover:border-zinc-200 p-3 rounded-full ">
                                <ArrowDownIcon className="hover:-rotate-90 transition-transform duration-300" />
                            </span>
                            <span className="text-center text-lg">
                                MY SERVICES
                            </span>
                        </Link>
                    </BlurFade>
                </section>
                <section id="skills" className="max-w-screen-xl flex flex-col mx-auto justify-between items-start w-full px-4 pt-24">
                    <div className="flex flex-col gap-8 w-full">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
                            {MyServices.map((service, index) => (
                                <div key={index} className="border border-zinc-800 flex flex-col justify-between dark:border-zinc-600 p-8 md:p-12 bg-zinc-200 dark:bg-zinc-800">
                                    <div>
                                        <span className="text-zinc-600 dark:text-zinc-400">0{index + 1}</span>
                                        <h4 className="text-2xl uppercase">{service.name}</h4>
                                        <p className="my-4 text-zinc-400">{service.description}</p>
                                        <ul className="flex flex-wrap gap-2">
                                            {service.technologies.map((technology) => (
                                                <li className="text-sm list-inside px-2 py-0 text-zinc-200 hover:bg-zinc-200 hover:dark:bg-zinc-600 bg-zinc-300 dark:bg-zinc-700" key={technology}>{technology}</li>
                                            ))}
                                        </ul>
                                    </div>
                                    <Link href={'/services#' + service.slug} className="flex items-center justify-start gap-4 mt-12 group">
                                        <span className="border border-zinc-400 dark:border-zinc-700 dark:hover:border-zinc-200 p-2 rounded-full bg-zinc-300 dark:bg-zinc-800">
                                            <ArrowUpIcon className="rotate-45 group-hover:rotate-90 transition-transform duration-300" />
                                        </span>
                                        <span className="text-sm">
                                            ABOUT {service.name.toUpperCase()}
                                        </span>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
                <section id="works" className="max-w-screen-xl flex flex-col mx-auto justify-start items-start w-full pt-32 pb-12 lg:pb-32 px-4">
                    <div className="flex justify-between items-center w-full ">
                        <h3 className="text-3xl md:text-4xl text-zinc-800 dark:text-zinc-300">Selected Work</h3>
                        <Link href="/work" className="flex items-center justify-center gap-4 group">
                            <span className="border border-zinc-800 dark:border-zinc-500 dark:hover:border-zinc-200 p-2 rounded-full bg-zinc-300 dark:bg-zinc-800">
                                <ArrowUpIcon className="rotate-45 group-hover:rotate-90 transition-transform duration-300" />
                            </span>
                            <span className="text-center text-base md:text-xl">
                                SEE ALL
                            </span>
                        </Link>
                    </div>
                    <div className="flex flex-wrap gap-4 mt-10 w-full justify-between">
                        {projects.map((project) => <ProjectDisplayCard key={project.name} project={project} />) || <>No projects found</>}
                    </div>
                </section>
                <section id="process" className="max-w-screen-xl flex flex-col mx-auto justify-center items-center w-full px-4">
                    <h3 className="text-lg font-semibold">THE PROCESS</h3>
                    <h4 className="text-6xl md:text-8xl flex flex-col font-extralight items-center text-zinc-800 dark:text-zinc-300">
                        <span className="text-center">Your next project</span>
                        <em className="pt-serif-regular-italic"> in 5 steps</em>
                    </h4>
                    <div className="flex flex-col justify-between items-center gap-8">
                        <span className="border border-zinc-800 mt-8 dark:border-zinc-600 p-4 rounded-full bg-zinc-300 dark:bg-zinc-800">
                            <ArrowDownIcon className="" />
                        </span>
                        <WorkProcess />
                    </div>
                    <BlurFade delay={0.1} inView className="w-full">
                        <div className="flex flex-col gap-12 w-full mt-12">
                            <div className="flex justify-between items-center w-full flex-wrap gap-4">
                                <h3 className="text-3xl md:text-4xl text-zinc-800 dark:text-zinc-300">Technologies I work With</h3>
                                <Link href="/services" className="flex items-center justify-center gap-4 group">
                                    <span className="border border-zinc-800 dark:border-zinc-500 dark:hover:border-zinc-200 p-2 rounded-full bg-zinc-300 dark:bg-zinc-800">
                                        <ArrowUpIcon className="rotate-45 group-hover:rotate-90 transition-transform duration-300" />
                                    </span>
                                    <span className="text-center text-base md:text-xl">
                                        CHECK SERVICES
                                    </span>
                                </Link>
                            </div>
                            <TechnologyIconsGrid />
                        </div>
                    </BlurFade>
                </section>
                <section className="max-w-screen-xl flex flex-col mx-auto py-12 lg:py-36 justify-center items-center w-full px-4">
                    <div className="gap-4 flex flex-col justify-between items-center">
                        <h3 className="text-6xl md:text-8xl flex flex-col font-extralight items-center text-zinc-800 dark:text-zinc-300">
                            <span className="">What my</span>
                            <em className="pt-serif-regular-italic"> clients say</em>
                        </h3>
                        <p className="text-center text-lg">See what my clients have to say about working with me <br />and the results I helped them achieve.</p>
                    </div>
                    <div className="flex justify-between items-start mt-12 w-full flex-wrap">
                        {Testimonials.map((testimonal, index) => (<TestimonialCard key={index} testimonial={testimonal} />))}
                    </div>
                </section>
                <section className="flex flex-col mx-auto justify-center items-center w-full gap-32 pb-32">
                    <div style={jssStyles} className="flex h-screen justify-center md:justify-between items-center w-full flex-wrap">
                        <p className="text-8xl w-full md:w-1/2 text-center md:text-start md:text-9xl mb-0 pt-serif-regular-italic font-light">Jean Eric</p>
                        <p className="text-8xl w-full md:w-1/2 text-center md:text-end md:text-9xl mt-0 font-light">Hirwa</p>
                    </div>
                    <div className="max-w-screen-xl px-4 flex w-full justify-between items-start flex-wrap md:flex-nowrap gap-8">
                        <h3 className="w-full md:w-[48%] text-4xl md:text-5xl flex flex-col font-extralight text-zinc-800 dark:text-zinc-300">
                            <span className="">Let&apos; build a solution that</span>
                            <em className="pt-serif-regular-italic">leaves a lasting impression</em>
                        </h3>
                        <div className="w-full md:w-[48%] flex flex-col justify-start items-start gap-8">
                            <p className="text-lg">
                                Hi, I&apos;m Jean Eric.
                                I&apos;m a software developer with a passion for building things, both digitally and creatively.
                                I enjoy combining my tech skills with my design background to create innovative solutions.
                                Currently, I&apos;m working on empowering women through tech at IRO. Outside of work, I love exploring new ideas, dancing, and diving into a good book or movie.
                            </p>
                            <div className="flex justify-start items-start gap-3">
                                {SocialAccounts.map((account, index) => (<Link key={index} target="_blank" href={account.url} className="flex items-center justify-center gap-4">
                                    <span className="border border-zinc-800 dark:border-zinc-500 p-3 rounded-full bg-zinc-300 dark:bg-zinc-800">
                                        {account.name === "Github" && <GitHubLogoIcon className="w-6 h-6" />}
                                        {account.name === "LinkedIn" && <LinkedInLogoIcon className="w-6 h-6" />}
                                        {account.name === "Instagram" && <InstagramLogoIcon className="w-6 h-6" />}
                                        {account.name === "Medium" && <BsMedium className="w-6 h-6" />}
                                        {account.name === "YouTube" && <FaYoutube className="w-6 h-6" />}
                                    </span>
                                </Link>))}
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}
