import { SocialAccounts } from "@/database/socialAccounts";
import { GitHubLogoIcon, InstagramLogoIcon, LinkedInLogoIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { BsMedium } from "react-icons/bs";

export default function Footer() {
    return (
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
                        {SocialAccounts.map((account, index) => (<Link key={index} target="_blank" href={account.url} className="flex items-center justify-center gap-4">
                            <span className="border border-zinc-800 dark:border-zinc-500 p-3 rounded-full bg-zinc-300 dark:bg-zinc-800">
                                {account.name === "Github" ? <GitHubLogoIcon className="w-6 h-6" /> : account.name === "LinkedIn" ? <LinkedInLogoIcon className="w-6 h-6" /> : account.name === "Instagram" ? <InstagramLogoIcon className="w-6 h-6" /> : <BsMedium className="w-6 h-6" />}
                            </span>
                        </Link>))}
                    </div>
                    <p className="text-sm text-muted-foreground text-center md:text-right w-full md:w-fit">&copy; {new Date().getFullYear()} Jean Eric Hirwa. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}
