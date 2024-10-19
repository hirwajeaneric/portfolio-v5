import { Iphone15ProBrowserTemplate } from "@/components/widgets/Iphone15ProBrowserTemplate";
import { SafariBrowserTemplate } from "@/components/widgets/SafariBrowserTemplate";
import { cn } from "@/lib/utils";
import { ArrowDownIcon } from "lucide-react";
import Link from "next/link";

type Stats = {
  name: string;
  number: number;
  caracter: string;
}

type Services = {
  category: string;
  title: string;
  image: {
    src: string
    alt: string;
  };
  elements: {
    title: string;
    description: string;
  }[]
}

export default function page() {
  const stats: Stats[] = [
    {
      name: 'Clients',
      number: 10,
      caracter: '+'
    },
    {
      name: 'Projects',
      number: 300,
      caracter: '+'
    },
    {
      name: 'Happy Clients',
      number: 100,
      caracter: '%'
    },
    {
      name: 'Followers',
      number: 100,
      caracter: 'k'
    },
  ];

  const services: Services[] = [
    {
      category: 'Web Design',
      title: 'Transforming Ideas into Tangible Components',
      image: {
        src: 'https://images.pexels.com/photos/196646/pexels-photo-196646.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        alt: 'Blue Pen Beside Black Smartphone on White Paper'
      },
      elements: [
        {
          title: 'Concept',
          description: "I take time to understand your business needs and audience to develop a unique concept for your website. I'll create wireframes that serve as the foundation for your site's design and functionality."
        },
        {
          title: 'UX / Ui Design',
          description: "I'll design a user-friendly interface that is visually appealing and engages your target audience. Your website will be created to meet your brand's needs and goals while ensuring a seamless user experience."
        },
        {
          title: 'Prototype',
          description: "With an interactive prototype, you'll have the ability to test your website's functionality before it goes live. This will ensure that your website's design and user experience are optimized for your audience's needs and preferences."
        }
      ]
    },

  ];

  return (
    <div className="flex flex-col items-center justify-start w-full scroll-smooth">
      <section id="process" className="max-w-screen-xl flex flex-col mx-auto justify-center items-center pt-40 md:pt-48 pb-12 md:pb-20 w-full px-4">
        <h1 className="text-5xl flex flex-col font-extralight items-center text-zinc-800 dark:text-zinc-300">
          <span className="text-center">Software Development</span>
          <em className="pt-serif-regular-italic">& Arts</em>
        </h1>
        <p className="text-center mt-4 md:mt-8 mb-12 md:mb-18 text-lg w-5/6 md:w-1/2">Premium web design, development, and SEO services to help your business stand out</p>
        <Link href="#skills" className="flex items-center justify-center text-zinc-300 gap-4">
          <span className="border border-zinc-800 dark:border-zinc-500 p-3 rounded-full bg-zinc-300 dark:bg-zinc-700">
            <ArrowDownIcon className="" />
          </span>
          <span className="text-center">
            MY SERVICES
          </span>
        </Link>
      </section>
      <section className="px-4 flex justify-between flex-col gap-16 md:gap-24">
        <div className="relative hidden md:block">
          <SafariBrowserTemplate image="https://images.pexels.com/photos/18155963/pexels-photo-18155963/free-photo-of-mechanical-keyboard-on-brown-desk-mat.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" />
        </div>
        <div className="relative md:hidden">
          <Iphone15ProBrowserTemplate image="https://images.pexels.com/photos/26971203/pexels-photo-26971203/free-photo-of-close-up-of-a-keyboard-and-a-wireless-mouse-standing-on-the-desk.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {
            stats.map((stat, index) => (
              <div key={index} className="flex flex-col items-center gap-4 w-full">
                <p className="uppercase md:text-base text-zinc-600 dark:text-zinc-400">{stat.name}</p>
                <p className="text-4xl font-extralight md:text-7xl text-zinc-800 dark:text-zinc-300">{stat.number}{stat.caracter}</p>
              </div>
            ))
          }
        </div>
      </section>
      <section id="services" className="px-4 flex justify-between flex-col gap-16 py-16 md:py-36 max-w-screen-xl">
        {
          services.map((service, index) => (
            <div key={index} className="flex flex-col gap-3 md:gap-6 w-full p-6 md:p-16 bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700">
              <h2 className="uppercase font-semibold text-zinc-800 dark:text-zinc-300">{service.category}</h2>
              <div className="flex flex-col gap-6 md:gap-8 w-full">
                <h3 className="text-3xl md:text-5xl font-light text-zinc-800 dark:text-zinc-300">{service.title}</h3>
                <img className="object-cover w-full h-64 mt-6 md:h-96" src={service.image.src} alt={service.image.alt} />
                <div className="flex flex-col gap-4 w-full">
                  {
                    service.elements.map((el, index) => (
                      <div key={index} className={cn(index+1 === services.length - 1 ? "": "border-b border-zinc-200 dark:border-zinc-700","flex flex-wrap w-full mt-6 pb-8 md:pb-12")}>
                        <h4 className="uppercase mb-4 md:mb-0 text-sm md:text-base w-full md:w-1/4 font-semibold text-zinc-800 dark:text-zinc-300">{el.title}</h4>
                        <p className="text-sm md:text-base w-full md:w-3/4 text-zinc-600 dark:text-zinc-400">{el.description}</p>
                      </div>
                    ))
                  }
                </div>
              </div>
            </div>
          ))
        }
      </section>
    </div>
  )
}
