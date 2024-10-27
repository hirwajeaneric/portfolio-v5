import Link from "next/link";
import { GitHubLogoIcon, InstagramLogoIcon, LinkedInLogoIcon } from "@radix-ui/react-icons";
import { ArrowRightIcon } from "lucide-react";
import { FaMedium } from "react-icons/fa";

export default function SocialAccountsGroup() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-5 w-full justify-between">
            <Link href={'https://github.com/hirwajeaneric'} target="_blank" className="flex items-center justify-between gap-4 md:gap-6 w-full p-2 md:p-4 bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 group hover:bg-zinc-300 dark:hover:bg-zinc-700 transition-transform duration-300">
                <div className="flex items-center">
                    <InstagramLogoIcon className="text-zinc-300 w-8 h-8" />
                    <span className="ml-4 text-zinc-300 uppercase">Instagram</span>
                </div>
                <ArrowRightIcon className="group-hover:-rotate-45 transition-transform duration-300" />
            </Link>
            <Link href={'https://www.linkedin.com/in/jean-eric-hirwa'} target="_blank" className="flex items-center justify-between gap-4 md:gap-6 w-full p-2 md:p-4 bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 group hover:bg-zinc-300 dark:hover:bg-zinc-700 transition-transform duration-300">
                <div className="flex items-center">
                    <LinkedInLogoIcon className="text-zinc-300 w-8 h-8" />
                    <span className="ml-4 text-zinc-300 uppercase">LinkedIn</span>
                </div>
                <ArrowRightIcon className="group-hover:-rotate-45 transition-transform duration-300" />
            </Link>
            <Link href={'https://github.com/hirwajeaneric'} target="_blank" className="flex items-center justify-between gap-4 md:gap-6 w-full p-2 md:p-4 bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 group hover:bg-zinc-300 dark:hover:bg-zinc-700 transition-transform duration-300">
                <div className="flex items-center">
                    <GitHubLogoIcon className="text-zinc-300 w-8 h-8" />
                    <span className="ml-4 text-zinc-300 uppercase">GitHub</span>
                </div>
                <ArrowRightIcon className="group-hover:-rotate-45 transition-transform duration-300" />
            </Link>
            <Link href={'https://medium.com/@hirwajeaneric'} target="_blank" className="flex items-center justify-between gap-4 md:gap-6 w-full p-2 md:p-4 bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 group hover:bg-zinc-300 dark:hover:bg-zinc-700 transition-transform duration-300">
                <div className="flex items-center">
                    <FaMedium className="text-zinc-300 w-8 h-8" />
                    <span className="ml-4 text-zinc-300 uppercase">Medium</span>
                </div>
                <ArrowRightIcon className="group-hover:-rotate-45 transition-transform duration-300" />
            </Link>
        </div>
    )
}
