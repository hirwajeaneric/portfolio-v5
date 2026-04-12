import { Iphone15ProBrowserTemplate } from "@/components/widgets/Iphone15ProBrowserTemplate";
import { SafariBrowserTemplate } from "@/components/widgets/SafariBrowserTemplate";
import { getAllServices, getSiteStatistics } from "@/lib/db-queries";
import { cn } from "@/lib/utils";
import { ArrowDownIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Services",
  description:
    "Explore my services and see how I can help you bring your ideas to life. From software development to mentorship.",
  keywords:
    "Jean Eric Hirwa, Services, Software Development, DevOps, Mentorship, Web Development",
  openGraph: {
    title: "Services - Jean Eric Hirwa",
    description:
      "Explore my services and see how I can help you bring your ideas to life. From software development to mentorship.",
    url: "https://www.erichirwa.com/services",
    siteName: "Jean Eric Hirwa - Services",
    images: [{ url: "1718313379119.jpeg", width: 800, height: 600 }],
    locale: "en-US",
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "CreativeWork",
  name: "Services",
  url: "https://www.erichirwa.com/services",
  description: "Explore my services and see how I can help you bring your ideas to life.",
  image: "/1718313379119.jpeg",
  creator: {
    "@type": "Person",
    name: "Jean Eric Hirwa",
    url: "https://www.erichirwa.com/services",
    image: "/1718313379119.jpeg",
    sameAs: [
      "https://github.com/hirwajeaneric",
      "https://www.linkedin.com/in/jean-eric-hirwa/",
      "https://medium.com/@hirwajeaneric",
      "https://www.instagram.com/hirwa_jean_eric/",
    ],
  },
};

export default async function ServicesPage() {
  const servicesList = await getAllServices();
  const stats = await getSiteStatistics();

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="flex flex-col items-center justify-start w-full scroll-smooth bg-zinc-900">
        <section
          id="process"
          className="max-w-screen-xl flex flex-col mx-auto justify-center items-center pt-40 md:pt-48 pb-12 md:pb-20 w-full px-4"
        >
          <h1 className="text-5xl md:text-8xl flex flex-col font-extralight items-center text-zinc-300">
            <span className="text-center">Software Development</span>
            <em className="pt-serif-regular-italic">& Consultancy</em>
          </h1>
          <h2 className="text-center mt-4 md:mt-8 mb-12 md:mb-18 text-base md:text-2xl text-zinc-300 w-5/6 md:w-1/2">
            Premium software development, devops, mentorship, and digital arts services to help your business stand out.
          </h2>
          <Link href="#services" className="flex items-center justify-center text-zinc-300 gap-4">
            <span className="border border-zinc-800 dark:border-zinc-500 p-3 rounded-full bg-zinc-800 hover:bg-zinc-700 transition-all duration-300">
              <ArrowDownIcon className="text-zinc-300 hover:text-zinc-900 transition-all duration-300" />
            </span>
            <span className="text-center text-zinc-300">MY SERVICES</span>
          </Link>
        </section>
        <section className="px-4 flex justify-between flex-col gap-16 md:gap-24 max-w-screen-xl w-full">
          <div className="relative hidden md:block bg-zinc-800 dark:bg-zinc-700">
            <SafariBrowserTemplate image="https://images.pexels.com/photos/18155963/pexels-photo-18155963/free-photo-of-mechanical-keyboard-on-brown-desk-mat.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" />
          </div>
          <div className="relative md:hidden bg-zinc-800 dark:bg-zinc-700">
            <Iphone15ProBrowserTemplate image="https://images.pexels.com/photos/26971203/pexels-photo-26971203/free-photo-of-close-up-of-a-keyboard-and-a-wireless-mouse-standing-on-the-desk.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.id} className="flex flex-col items-center gap-4 w-full">
                <p className="uppercase md:text-base text-zinc-300">{stat.label}</p>
                <p className="text-4xl font-extralight md:text-7xl text-zinc-300 text-nowrap">{stat.value}</p>
              </div>
            ))}
          </div>
        </section>
        <section id="services" className="px-4 flex justify-between flex-col py-16 md:py-36 max-w-screen-xl w-full">
          {servicesList.map((service) => (
            <div id={service.slug} key={service.id} className="pt-20 md:pt-8 scroll-mt-28">
              <div className="flex flex-col gap-3 md:gap-6 w-full p-6 md:p-16 bg-zinc-800 dark:bg-zinc-700 border border-zinc-700">
                <h2 className="uppercase font-semibold text-zinc-300 tracking-wide">
                  {service.slug.replace(/-/g, " ")}
                </h2>
                <div className="flex flex-col gap-6 md:gap-8 w-full">
                  <h3 className="text-3xl md:text-5xl font-light text-zinc-300">{service.name}</h3>
                  <Image
                    className="object-cover w-full mt-6"
                    src={service.heroImageUrl}
                    alt={service.name}
                    width={1000}
                    height={1000}
                  />
                  <p className="text-zinc-300 text-base">{service.shortDescription}</p>
                  <div className="flex flex-col gap-4 w-full">
                    {service.sections.map((el, index) => {
                      const isLast = index === service.sections.length - 1;
                      return (
                        <div
                          key={el.id}
                          className={cn(
                            "flex flex-wrap w-full mt-4 md:mt-8",
                            !isLast && "border-b border-zinc-700 pb-4 md:pb-8"
                          )}
                        >
                          <h4 className="uppercase mb-2 md:mb-0 text-sm md:text-base w-full md:w-1/4 font-semibold text-zinc-300">
                            {el.title}
                          </h4>
                          <p className="text-sm md:text-base w-full md:w-3/4 text-zinc-300">
                            {el.description}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </section>
      </div>
    </>
  );
}
