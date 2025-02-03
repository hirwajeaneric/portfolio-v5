import { SocialAccounts } from "@/database/socialAccounts";
import { GitHubLogoIcon, InstagramLogoIcon, LinkedInLogoIcon } from "@radix-ui/react-icons";
import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";
import { BsMedium } from "react-icons/bs";
import ScrolledSection from "./ScrolledSection";
import { FaYoutube } from "react-icons/fa6";

export default function Footer() {
    return (
        <>
            <section className="flex flex-col mx-auto justify-center items-center w-full pb-24 lg:pb-36">
                <ScrolledSection />
            </section>
            <section id="process" className="max-w-screen-xl flex flex-col mx-auto justify-center items-center w-full px-4 gap-12 mt-2 mb-28 md:mb-36">
                <h3 className="text-lg font-semibold">PROJECT IN MIND?</h3>
                <h4 className="text-6xl md:text-9xl flex flex-col font-extralight items-center text-zinc-800 dark:text-zinc-300">
                    <span className="text-center">Let&apos;s make your</span>
                    <em className="pt-serif-regular-italic"> Website shine</em>
                </h4>
                <p className="text-center text-lg w-5/6 md:w-1/2">Premium web design, development, and SEO services to help your business stand out</p>
                <Link href={'/contact'} className="px-4 py-3 flex items-center justify-between bg-background w-fit text-center text-foreground dark:bg-zinc-200 dark:text-zinc-800 text-sm">
                    <span>GET IN TOUCH</span>
                    <ArrowRightIcon className="ml-2 -rotate-45" />
                </Link>
            </section>
            <footer className="flex flex-col items-center justify-between w-full py-10 px-4">
                <div className="flex flex-col justify-between items-center max-w-screen-xl w-full gap-8">
                    <div className="flex justify-between flex-wrap w-full gap-4">
                        <Link href={'/'} className="font-bold text-xl w-full md:w-fit text-center md:text-left leading-tight">Jean Eric Hirwa</Link>
                        <div className="flex items-start justify-center w-full md:w-fit md:justify-start gap-4">
                            <Link href={'/services'} className="">SERVICES</Link>
                            <Link href={'/work'} className="">WORK</Link>
                            <Link href={'/about'} className="">ABOUT</Link>
                            <Link href={'/blog'} className="">BLOG</Link>
                            <Link href={'/contact'} className="">LET&apos;S TALK</Link>
                        </div>
                    </div>
                    <div className="flex  flex-wrap gap-5 justify-between items-center w-full">
                        <div className="flex justify-center md:justify-start w-full md:w-fit items-start gap-3">
                            {SocialAccounts.map((account, index) => (
                                <Link key={index} target="_blank" href={account.url} className="flex items-center justify-center gap-4">
                                    <span className="border border-zinc-800 dark:border-zinc-500 p-3 rounded-full bg-zinc-300 dark:bg-zinc-800">
                                        {account.name === "Github" && <GitHubLogoIcon className="w-6 h-6" />} 
                                        {account.name === "LinkedIn" && <LinkedInLogoIcon className="w-6 h-6" />} 
                                        {account.name === "Instagram" && <InstagramLogoIcon className="w-6 h-6" />} 
                                        {account.name === "Medium" && <BsMedium className="w-6 h-6" />} 
                                        {account.name === "YouTube" && <FaYoutube className="w-6 h-6" />}
                                    </span>
                                </Link>
                            ))}
                        </div>
                        <p className="text-sm text-muted-foreground text-center md:text-right w-full md:w-fit">&copy; {new Date().getFullYear()} Jean Eric Hirwa. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </>
    )
}
