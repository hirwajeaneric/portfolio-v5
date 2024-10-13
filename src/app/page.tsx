import BlurFade from "@/components/ui/blur-fade";
import { IconCloudComponent } from "@/components/widgets/IconCloudComponent";
import ProjectDisplayCard from "@/components/widgets/ProjectDisplayCard";
import TestimonialCard from "@/components/widgets/TestimonialCard";
import WorkProcess from "@/components/widgets/WorkProcess";
import projects from "@/database/projects";
import { MyServices } from "@/database/services";
import { SocialAccounts } from "@/database/socialAccounts";
import { Testimonials } from "@/database/testimonials";
import { GitHubLogoIcon, InstagramLogoIcon, LinkedInLogoIcon } from "@radix-ui/react-icons";
import { ArrowDownIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { BsMedium } from "react-icons/bs";

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
                <BlurFade delay={0.25 * 4} inView>
                    <p className="text-center text-xl text-wrap md:text-2xl mt-4">I design and build software and systems that respond to user needs and vision.</p>
                </BlurFade>
                <BlurFade delay={0.25 * 4} inView>
                    <Link href="#skills" className="flex items-center justify-center gap-4 mt-24">
                        <span className="border border-zinc-800 dark:border-zinc-500 p-3 rounded-full bg-zinc-300 dark:bg-zinc-700">
                            <ArrowDownIcon className="" />
                        </span>
                        <span className="text-center text-lg">
                            MY SERVICES
                        </span>
                    </Link>
                </BlurFade>
            </section>
            <section id="skills" className="max-w-screen-xl flex flex-col mx-auto justify-between items-start w-full px-4">
                <div className="w-full mt-16">
                    <IconCloudComponent />
                </div>
                <div className="flex flex-col gap-8 w-full relative -top-60 -mb-64">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
                        {MyServices.map((service, index) => (
                            <div key={index} className="border border-zinc-800 dark:border-zinc-600 p-8 md:p-12 bg-zinc-200 dark:bg-zinc-800">
                                <span className="text-zinc-600 dark:text-zinc-400">0{index + 1}</span>
                                <h4 className="text-2xl uppercase">{service.name}</h4>
                                <p className="my-4">{service.description}</p>
                                <ul className="flex flex-wrap gap-2">
                                    {service.technologies.map((technology) => (
                                        <li className="text-sm list-inside px-2 py-0 hover:bg-zinc-200 hover:dark:bg-zinc-600 bg-zinc-300 dark:bg-zinc-700" key={technology}>{technology}</li>
                                    ))}
                                </ul>
                                <Link href={'/services#' + service.slug} className="flex items-center justify-start gap-4 mt-4">
                                    <span className="border border-zinc-400 dark:border-zinc-700 p-2 rounded-full bg-zinc-300 dark:bg-zinc-800">
                                        <ArrowDownIcon className="-rotate-90" />
                                    </span>
                                    <span className="text-center text-base">
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
                    <Link href="/work" className="flex items-center justify-center gap-4">
                        <span className="border border-zinc-800 dark:border-zinc-500 p-2 rounded-full bg-zinc-300 dark:bg-zinc-800">
                            <ArrowDownIcon className="-rotate-90" />
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
            </section>
            <section className="max-w-screen-xl flex flex-col mx-auto py-12 lg:py-36 justify-center items-center w-full px-4">
                <div className="gap-4 flex flex-col justify-between items-center">
                    <h3 className="text-6xl md:text-8xl flex flex-col font-extralight items-center text-zinc-800 dark:text-zinc-300">
                        <span className="">What my</span>
                        <em className="pt-serif-regular-italic"> clients say</em>
                    </h3>
                    <p className="text-center text-lg">See what my clients have to say about working with me <br />and the results I helped them achieve</p>
                </div>
                <div className="flex justify-between items-start mt-12 w-full flex-wrap">
                    {Testimonials.map((testimonal, index) => (<TestimonialCard key={index} testimonial={testimonal} />))}
                </div>
            </section>
            <section className="flex flex-col mx-auto justify-center items-center w-full gap-32">
                <div style={jssStyles} className="flex h-screen justify-center md:justify-between items-center w-full flex-wrap">
                    <p className="text-8xl w-full md:w-1/2 text-center md:text-start md:text-9xl mb-0 pt-serif-regular-italic font-light">Jean Eric</p>
                    <p className="text-8xl w-full md:w-1/2 text-center md:text-end md:text-9xl mt-0 font-light">Hirwa</p>
                </div>
                <div className="max-w-screen-xl px-4 flex w-full justify-between items-start flex-wrap gap-8">
                    <h3 className="w-full md:w-[48%] text-4xl md:text-5xl flex flex-col font-extralight text-zinc-800 dark:text-zinc-300">
                        <span className="">A website that leaves</span>
                        <em className="pt-serif-regular-italic">a lasting impression</em>
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
                                    {account.name === "Github" ? <GitHubLogoIcon className="w-6 h-6" /> : account.name === "LinkedIn" ? <LinkedInLogoIcon className="w-6 h-6" /> : account.name === "Instagram" ? <InstagramLogoIcon className="w-6 h-6" /> : <BsMedium className="w-6 h-6" />}
                                </span>
                            </Link>))}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
