"use client"

import Link from "next/link";
import { MenuIcon, XIcon } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";


export default function Navbar() {
    const [open, setOpen] = useState(false)
    const pathname = usePathname();
    
    return (
        <header className="flex flex-col z-40 fixed mx-auto w-[92%] justify-between items-center top-6 gap-2">
            <div className="flex cursor-pointer items-center justify-between space-x-8 border w-full md:w-fit px-4 py-2 bg-zinc-200 dark:bg-zinc-800 border-zinc-400 dark:border-zinc-600">
                <Link href={'/'} onClick={() => setOpen(false)} className="font-bold text-xl leading-tight text-nowrap">Jean Eric Hirwa</Link>
                <div className="flex justify-between items-center gap-6">
                    <nav className="justify-between hidden md:flex gap-6 text-sm">
                        <Link href={'/services'} className={cn(pathname === "/services" ? "border-b border-zinc-800 dark:border-zinc-300" : "", "hover:border-b border-zinc-800 dark:border-zinc-300")}>SERVICES</Link>
                        <Link href={'/work'} className={cn(pathname === "/work" ? "border-b border-zinc-800 dark:border-zinc-300" : "", "hover:border-b border-zinc-800 dark:border-zinc-300")}>WORK</Link>
                        <Link href={'/about'} className={cn(pathname === "/about" ? "border-b border-zinc-800 dark:border-zinc-300" : "", "hover:border-b border-zinc-800 dark:border-zinc-300")}>ABOUT</Link>
                        <Link href={'/blog'} className={cn(pathname === "/blog" ? "border-b border-zinc-800 dark:border-zinc-300" : "", "hover:border-b border-zinc-800 dark:border-zinc-300")}>BLOG</Link>
                    </nav>
                    <Link href={'/contact'} className="px-4 py-3 bg-background text-foreground dark:bg-zinc-200 dark:text-zinc-800 text-nowrap text-sm">LET&apos;S TALK</Link>
                    <button className="block md:hidden" onClick={() => setOpen(!open)}>
                        {open ? <XIcon /> : <MenuIcon />}
                    </button>
                    {/* <ModeToggle /> */}
                </div>
            </div>
            <div className={cn(open ? "flex animate-in fade-in-80 w-full" : "hidden animate-out fade-out-80", "items-center justify-between mx-auto space-x-8 border px-6 py-6 bg-zinc-200 dark:bg-zinc-800 border-zinc-400 dark:border-zinc-600")}>
                <div className="flex flex-col w-full justify-between items-center gap-6">
                    <nav className="flex flex-col justify-between items-center space-y-4">
                        <Link href={'/services'} onClick={() => setOpen(false)} className={cn(pathname === "/services" ? "border-b border-zinc-800 dark:border-zinc-300" : "", "hover:border-b border-zinc-800 dark:border-zinc-300")}>SERVICES</Link>
                        <Link href={'/work'} onClick={() => setOpen(false)} className={cn(pathname === "/work" ? "border-b border-zinc-800 dark:border-zinc-300" : "", "hover:border-b border-zinc-800 dark:border-zinc-300")}>WORK</Link>
                        <Link href={'/about'} onClick={() => setOpen(false)} className={cn(pathname === "/about" ? "border-b border-zinc-800 dark:border-zinc-300" : "", "hover:border-b border-zinc-800 dark:border-zinc-300")}>ABOUT</Link>
                        <Link href={'/blog'} onClick={() => setOpen(false)} className={cn(pathname === "/blog" ? "border-b border-zinc-800 dark:border-zinc-300" : "", "hover:border-b border-zinc-800 dark:border-zinc-300")}>BLOG</Link>
                    </nav>
                    <Link href={'/contact'} onClick={() => setOpen(false)} className="px-4 py-3 bg-background w-full text-center text-foreground dark:bg-zinc-200 dark:text-zinc-800 text-sm">LET&apos;S TALK</Link>
                </div>
            </div>
        </header>
    )
}
