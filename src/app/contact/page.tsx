import { AwardsAndCertificates } from "@/database/awards";
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
        <div style={jssStyles} className="hidden md:flex h-screen justify-center w-full md:w-2/5 md:justify-between items-center flex-wrap">
        </div>
        <div className="flex flex-col justify-start items-center md:items-start w-full md:w-3/5 pt-16 md:pt-14 pb-12 md:pb-20">
          <div className="flex flex-col mt-16 md:mt-32 gap-6 w-full p-6 md:p-14 bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700">
            <h2 className="text-zinc-400 uppercase">CONTACT</h2>
            <h3 className="text-zinc-300 text-4xl leading-normal md:font-light">Let&apos;s get in touch</h3>
            <form action="">
              <input type="text" name="name" id="name" placeholder="Name" className="w-full p-2 md:p-4 bg-zinc-100 dark:bg-zinc-700 rounded-sm" />
              <input type="email" name="email" id="email" placeholder="Email" className="w-full p-2 md:p-4 bg-zinc-100 dark:bg-zinc-700 rounded-sm mt-4" />
              <textarea name="message" id="message" placeholder="Message" rows={4} className="w-full p-2 md:p-4 bg-zinc-100 dark:bg-zinc-700 rounded-sm mt-4" />
              <button type="submit" className="w-full p-2 md:p-4 bg-zinc-300 rounded-sm mt-4 text-black text-base md:text-xl font-semibold">Send Message</button>
            </form>
          </div>
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
              <ArrowRightIcon className="group-hover:-rotate-45 transition-transform duration-300"  />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}