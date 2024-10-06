import { ArrowDownIcon } from "lucide-react";
import Image from "next/image";

export default function page() {
    return (
        <div className="flex flex-col items-center justify-start w-full">
            <section id="home" className="max-w-screen-xl flex flex-col mx-auto justify-center items-center w-full py-48">
                <h1 className="text-center">
                    <span className="text-primary mb-10 text-4xl block">
                        Hello, I&apos;m
                    </span>
                    <span className="text-primary text-6xl block">
                        Jean Eric Hirwa
                    </span>
                </h1>
                <h2 className="text-center text-5xl mt-10">A Full Stack Software Developer</h2>
                <p className="text-center text-2xl mt-4">I design and build software and systems that respond to user needs and vision.</p>
                <a href="#services" className="flex items-center justify-center gap-4 mt-24">
                    <span className="border border-zinc-800 dark:border-zinc-300 p-3 rounded-full bg-zinc-300 dark:bg-zinc-800">
                        <ArrowDownIcon className="" />
                    </span>
                    <span className="text-center text-xl">
                        See my work
                    </span>
                </a>
            </section>
            <section id="services" className="max-w-screen-xl flex flex-col mx-auto justify-center items-center w-full py-48">

            </section>
        </div>
    )
}
