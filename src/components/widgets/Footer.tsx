import Link from "next/link";
import { FaInstagram } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";

export default function Footer() {
    return (
        <footer className="flex flex-col items-center justify-between w-full py-10">
            <div className="flex flex-col justify-between items-center max-w-screen-xl w-full gap-8 p-4">
                <div className="flex justify-between w-full">
                    <Link href={'/'} className="font-bold text-xl leading-tight">Jean Eric Hirwa</Link>
                    <div className="">
                        <Link href={'/services'} className="px-4">SERVICES</Link>
                        <Link href={'/work'} className="px-4">WORK</Link>
                        <Link href={'/about'} className="px-4">ABOUT</Link>
                        <Link href={'/blog'} className="px-4">BLOG</Link>
                        <Link href={'/contact'} className="px-4">LET&apos;S TALK</Link>
                    </div>
                </div>
                <div className="flex justify-between items-center w-full">
                    <div className="flex justify-between items-center gap-4">
                        <Link href={'https://www.instagram.com/hirwa_jean_eric/'} target="_blank" rel="noopener noreferrer"><FaInstagram className="h-6 w-6" /></Link>
                        <Link href={'https://github.com/hirwajeaneric'} target="_blank" rel="noopener noreferrer"><FaGithub className="h-6 w-6" /></Link>
                    </div>
                    <p className="text-sm text-muted-foreground">© 2023 Jean Eric Hirwa. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}
