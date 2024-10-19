import { GitHubLogoIcon, InstagramLogoIcon, LinkedInLogoIcon } from "@radix-ui/react-icons";
import { ArrowDownIcon, ArrowRightIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FaMedium } from "react-icons/fa6";

export default function page() {
  const jssStyles = {
    backgroundImage: `linear-gradient(to bottom, rgba(39, 39, 42, 0), rgba(9, 9, 11, 1)), url("/Jean Eric - Image 1 - 684x1000.png")`,
    backgroundSize: 'contain',
    backgroundPosition: 'left',
    backgroundRepeat: 'no-repeat',
    transition: 'background-image 0.3s ease-in-out',
    willChange: 'background-image',
  };

  return (
    <section className="flex flex-col w-full flex-wrap justify-center bg-zinc-950 items-center">
      <div className="flex w-full justify-between flex-wrap items-start max-w-screen-xl px-4">
        <div style={jssStyles} className="flex h-screen justify-center w-full md:w-2/5 md:justify-between items-center flex-wrap">
        </div>
        <div className="flex flex-col justify-start items-center md:items-start w-full md:w-3/5 pt-0 md:pt-48 pb-12 md:pb-20">
          <h1 className="text-5xl w-full md:text-9xl flex flex-col font-extralight items-center md:items-start text-zinc-800 dark:text-zinc-300">
            <span className="">Jean Eric</span>
            <em className="pt-serif-regular-italic">Hirwa</em>
          </h1>
          <p className="mt-4 md:mt-8 mb-12 md:mb-20 text-base md:text-2xl text-center md:text-start leading-relaxed text-zinc-300">Premium web design, development, and SEO services to help your business stand out</p>
          <Link href="#services" className="flex items-center justify-center text-zinc-300 gap-4">
            <span className="border border-zinc-800 dark:border-zinc-500 p-3 rounded-full bg-zinc-300 dark:bg-zinc-700">
              <ArrowDownIcon className="" />
            </span>
            <span className="text-center">
              ABOUT ME
            </span>
          </Link>
          <div className="flex flex-col gap-3 mt-16 md:mt-32 md:gap-6 w-full p-6 md:p-16 bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700">
            <h2 className="text-zinc-300 uppercase">Jean Eric Hirwa</h2>
            <h3 className="text-zinc-300 text-4xl leading-normal md:font-light">Your Partner in Bringing Your Web Design Vision to Life</h3>
            <p className="mb-8">
              Jean Eric Hirwa is a passionate, dedicated, and creative web developer with a proven track record of delivering exceptional results. He is known for his ability to design visually stunning websites, develop robust applications, and deliver high-quality content. He is also known for his ability to work well with teams and collaborate effectively to create a successful and engaging online presence.
              <br />
              <br />
              Jean Eric Hirwa is a passionate, dedicated, and creative web developer with a proven track record of delivering exceptional results. He is known for his ability to design visually stunning websites, develop robust applications, and deliver high-quality content. He is also known for his ability to work well with teams and collaborate effectively to create a successful and engaging online presence.
            </p>
            <Image src="/1718313379119.jpeg" alt="Picture of Jean Eric Hirwa" className="bg-black border border-zinc-600" width={684} height={1000} />
          </div>
          <div className="grid grid-cols-3 gap-4 mt-5 w-full justify-between">
            <Link href={'https://github.com/hirwajeaneric'} target="_blank" className="flex items-center justify-between gap-4 md:gap-6 w-full p-2 md:p-4 bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700">
              <div className="flex items-center">
                <InstagramLogoIcon className="text-zinc-300 w-8 h-8" />
                <span className="ml-4 text-zinc-300 uppercase">Instagram</span>
              </div>
              <ArrowRightIcon />
            </Link>
            <Link href={'https://www.linkedin.com/in/jean-eric-hirwa'} target="_blank" className="flex items-center justify-between gap-4 md:gap-6 w-full p-2 md:p-4 bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700">
              <div className="flex items-center">
                <LinkedInLogoIcon className="text-zinc-300 w-8 h-8" />
                <span className="ml-4 text-zinc-300 uppercase">LinkedIn</span>
              </div>
              <ArrowRightIcon />
            </Link>
            <Link href={'https://github.com/hirwajeaneric'} target="_blank" className="flex items-center justify-between gap-4 md:gap-6 w-full p-2 md:p-4 bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700">
              <div className="flex items-center">
                <GitHubLogoIcon className="text-zinc-300 w-8 h-8" />
                <span className="ml-4 text-zinc-300 uppercase">GitHub</span>
              </div>
              <ArrowRightIcon />
            </Link>
            <Link href={'https://medium.com/@hirwajeaneric'} target="_blank" className="flex items-center justify-between gap-4 md:gap-6 w-full p-2 md:p-4 bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700">
              <div className="flex items-center">
                <FaMedium className="text-zinc-300 w-8 h-8" />
                <span className="ml-4 text-zinc-300 uppercase">Medium</span>
              </div>
              <ArrowRightIcon />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
