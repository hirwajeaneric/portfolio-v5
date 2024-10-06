"use client"

import Link from "next/link";
import ModeToggle from "./ModeToggle";
import { MenuIcon, XIcon } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function Navbar() {
    const [open, setOpen] = useState(false)

    return (
        <header className="flex flex-col z-50 fixed mx-auto w-[92%] justify-between items-center top-6 gap-2">
            <div className="flex items-center justify-between space-x-8 border w-full md:w-fit px-6 py-2 bg-zinc-200 dark:bg-zinc-800 border-zinc-300 dark:border-zinc-700">
                <Link href={'/'} className="font-bold text-xl leading-tight">Jean Eric Hirwa</Link>
                <div className="flex justify-between items-center gap-6">
                    <nav className="justify-between hidden md:flex">
                        <Link href={'/services'} className="px-4">SERVICES</Link>
                        <Link href={'/work'} className="px-4">WORK</Link>
                        <Link href={'/about'} className="px-4">ABOUT</Link>
                        <Link href={'/blog'} className="px-4">BLOG</Link>
                    </nav>
                    <Link href={'/contact'} className="px-4 py-3 bg-background text-foreground dark:bg-zinc-200 dark:text-zinc-800 text-sm">LET&apos;S TALK</Link>
                    <button className="block md:hidden" onClick={() => setOpen(!open)}>
                        {open ? <XIcon /> : <MenuIcon />}
                    </button>
                    <ModeToggle />
                </div>
            </div>
            <div className={cn(open ? "flex animate-in fade-in-80 w-full" : "hidden animate-out fade-out-80","items-center justify-between mx-auto space-x-8 border px-6 py-6 bg-zinc-200 dark:bg-zinc-800 border-zinc-300 dark:border-zinc-700")}>
                <div className="flex flex-col w-full justify-between items-center gap-6">
                    <nav className="flex flex-col justify-between items-center space-y-4">
                        <Link href={'/services'} className="px-4">SERVICES</Link>
                        <Link href={'/work'} className="px-4">WORK</Link>
                        <Link href={'/about'} className="px-4">ABOUT</Link>
                        <Link href={'/blog'} className="px-4">BLOG</Link>
                    </nav>
                    <Link href={'/contact'} className="px-4 py-3 bg-background w-full text-center text-foreground dark:bg-zinc-200 dark:text-zinc-800 text-sm">LET&apos;S TALK</Link>
                </div>
            </div>
        </header>
    )
}
