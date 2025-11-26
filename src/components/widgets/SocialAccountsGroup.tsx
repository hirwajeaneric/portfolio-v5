import Link from "next/link";
import { GitHubLogoIcon, LinkedInLogoIcon, } from "@radix-ui/react-icons";
import { ArrowDownIcon, ArrowRightIcon } from "lucide-react";
import { FaYoutube } from "react-icons/fa6";
import { FaMedium } from "react-icons/fa";

export default function SocialAccountsGroup() {
    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-5 w-full justify-between">
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
                <Link href={'https://www.youtube.com/@HirwaJeanEric-x9j'} target="_blank" className="flex items-center justify-between gap-4 md:gap-6 w-full p-2 md:p-4 bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 group hover:bg-zinc-300 dark:hover:bg-zinc-700 transition-transform duration-300">
                    <div className="flex items-center">
                        <FaYoutube className="text-zinc-300 w-8 h-8" />
                        <span className="ml-4 text-zinc-300 uppercase">YouTube</span>
                    </div>
                    <ArrowRightIcon className="group-hover:-rotate-45 transition-transform duration-300" />
                </Link>
            </div>
            <div className="flex flex-col gap-3 mt-4 md:gap-6 w-full p-6 md:p-14 bg-gradient-to-r from-zinc-800 to-zinc-900 dark:from-zinc-700 dark:to-zinc-800 border border-zinc-700 dark:border-zinc-600">
                <h2 className="text-zinc-200 uppercase text-sm md:text-base">Personal Growth</h2>
                <h3 className="text-zinc-100 text-2xl md:text-4xl leading-normal md:font-light">Transform Your Life <strong className="text-zinc-200 font-bold">With Eric Hirwa</strong></h3>
                <p className="text-zinc-400 text-sm md:text-base leading-relaxed">
                    Beyond my technical work, I&apos;m passionate about personal growth and helping others transform their lives through science-backed micro-habits. Visit <strong className="text-zinc-200">With Eric Hirwa</strong> for mentorship, life coaching, and guidance designed for high-achievers and everyday people seeking calm, clarity, and purpose.
                </p>
                <Link
                    href="https://with.erichirwa.com"
                    target="_blank"
                    className="flex items-center justify-center gap-2 mt-2 px-6 py-3 bg-zinc-200 dark:bg-zinc-600 text-zinc-900 dark:text-zinc-100 border border-zinc-100 dark:border-zinc-700 hover:bg-zinc-300 dark:hover:bg-zinc-500 transition-colors duration-300 font-medium text-sm md:text-base w-fit"
                >
                    <span>Explore With Eric Hirwa</span>
                    <ArrowDownIcon className="w-4 h-4 rotate-[-90deg]" />
                </Link>
            </div>
        </>
    )
}
