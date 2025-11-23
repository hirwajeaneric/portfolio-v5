import SocialAccountsGroup from "@/components/widgets/SocialAccountsGroup";
import { AwardsAndCertificates } from "@/database/awards";
import { ArrowDownIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "About Me",
  description: "Learn more about me, my background, and my journey as a software developer and artist.",
  keywords: "Jean Eric Hirwa, hirwajeaneric, Hirwa Jean Eric, About, Biography, software developer, web developer, web design, software engineer, wordpress developer, artist, tech lead, backend engineer, frontend engineer, full-stack developer, fullstack developer, database engineer, Information Technology, Author, Artist",
  openGraph: {
    title: "About - Jean Eric Hirwa",
    description: "Learn more about me, my background, and my journey as a software developer and artist.",
    url: "https://www.erichirwa.com/about",
    siteName: "Jean Eric Hirwa - About",
    images: [
      {
        url: "1718313379119.jpeg",
        width: 800,
        height: 600,
      },
    ],
    locale: "en-US",
    type: "website",
  }
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Jean Eric Hirwa",
  "url": "https://www.erichirwa.com/",
  "image": "/1718313379119.jpeg",
  "sameAs": [
    "https://github.com/hirwajeaneric",
    "https://www.linkedin.com/in/jean-eric-hirwa/",
    "https://medium.com/@hirwajeaneric",
    "https://www.instagram.com/hirwa_jean_eric/"
  ],
  "jobTitle": "Software Developer",
  "worksFor": {
    "@type": "Organization",
    "name": "Igire Rwanda Organization",
    "url": "https://shecancodeschool.org"
  },
  "description": "I am a software developer with a passion for building things, both digitally and creatively. I enjoy combining my tech skills with his design background to create innovative solutions. Currently, I am working on empowering women through tech at Igire Rwanda Organization.",
}

export default function page() {
  const jssStyles = {
    backgroundImage: `linear-gradient(to bottom, rgba(39, 39, 42, 0), rgba(9, 9, 11, 1)), url("/Jean Eric - Image 1 - 684x1000.png")`,
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    transition: 'background-image 0.3s ease-in-out',
    willChange: 'background-image',
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="flex flex-col w-full flex-wrap justify-center bg-zinc-950 items-center">
        <div className="flex w-full justify-between flex-wrap items-start max-w-screen-xl px-4">
          <div 
            style={jssStyles} 
            className="flex h-[60vh] md:h-screen justify-center w-full md:w-2/5 md:justify-between items-center flex-wrap flex-shrink-0 md:sticky md:top-0 relative md:z-0 bg-center md:bg-left"
          >
          </div>
          <div className="flex flex-col justify-start items-center md:items-start w-full md:w-3/5 pt-0 md:pt-48 pb-12 md:pb-20 relative z-10">
            <h1 className="text-5xl w-full md:text-9xl flex flex-col font-extralight items-center md:items-start text-zinc-800 dark:text-zinc-300">
              <span className="">Jean Eric</span>
              <em className="pt-serif-regular-italic">Hirwa</em>
            </h1>
            <h2 className="mt-4 md:mt-8 mb-12 md:mb-20 text-base md:text-2xl text-center md:text-start leading-relaxed text-zinc-400">Premium web design, development, and SEO services to help your business stand out</h2>
            <Link href="#aboutme" className="flex items-center justify-center text-zinc-300 gap-4">
              <span className="border border-zinc-800 dark:border-zinc-500 p-3 rounded-full bg-zinc-300 dark:bg-zinc-700">
                <ArrowDownIcon className="" />
              </span>
              <span className="text-center">
                ABOUT ME
              </span>
            </Link>
            <div id="aboutme" className="flex flex-col gap-3 mt-16 md:mt-32 md:gap-6 w-full p-6 md:p-14 bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700">
              <h2 className="text-zinc-400 uppercase">Jean Eric Hirwa</h2>
              <h3 className="text-zinc-300 text-4xl leading-normal md:font-light">Your Partner in Bringing Your Web Design Vision to Life</h3>
              <p className="mb-8">
                Jean Eric Hirwa is a passionate, dedicated, and creative web developer with a proven track record of delivering exceptional results. He is known for his ability to design visually stunning websites, develop robust applications, and deliver high-quality content. He is also known for his ability to work well with teams and collaborate effectively to create a successful and engaging online presence.
                <br />
                <br />
                Jean Eric Hirwa is a passionate, dedicated, and creative web developer with a proven track record of delivering exceptional results. He is known for his ability to design visually stunning websites, develop robust applications, and deliver high-quality content. He is also known for his ability to work well with teams and collaborate effectively to create a successful and engaging online presence.
              </p>
              {/* <Image src="/1718313379119.jpeg" alt="Picture of Jean Eric Hirwa" className="bg-black border border-zinc-600" width={684} height={1000} /> */}
            </div>
            <SocialAccountsGroup />
            <div className="flex flex-col gap-3 mt-4 md:gap-6 w-full p-6 md:p-14 bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700">
              <h2 className="text-zinc-300 uppercase">Award & Certificates</h2>
              <div className="flex flex-col w-full">
                {AwardsAndCertificates.map((award, index) => {
                  if (index !== AwardsAndCertificates.length - 1) {
                    return (
                      <div key={index} className="flex items-center justify-between gap-1 md:gap-6 w-full py-4 md:py-6 border-b border-b-zinc-200 dark:border-b-zinc-700">
                        <h4 className="text-zinc-300 text-base md:text-lg">{award.name}</h4>
                        <p className="text-zinc-300 text-sm md:text-base">{award.year}</p>
                      </div>
                    )
                  }
                  return (
                    <div key={index} className="flex items-center justify-between gap-1 md:gap-6 w-full py-4 md:py-6">
                      <h4 className="text-zinc-300 text-base md:text-lg">{award.name}</h4>
                      <p className="text-zinc-300 text-sm md:text-base">{award.year}</p>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
