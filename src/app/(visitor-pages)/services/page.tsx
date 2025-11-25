import { Iphone15ProBrowserTemplate } from "@/components/widgets/Iphone15ProBrowserTemplate";
import { SafariBrowserTemplate } from "@/components/widgets/SafariBrowserTemplate";
import { stats } from "@/database/stats";
import { cn } from "@/lib/utils";
import { ArrowDownIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import slugify from "react-slugify";

export const metadata = {
  title: "Services",
  description: "Explore my services and see how I can help you bring your ideas to life. From graphic design to web development, I've got you covered.",
  keywords: "Jean Eric Hirwa, Services, Graphic Design, Cloud Computing, Database Management, Software as a Service, Sofware Testing, Continuous Integration, Continuous Deployment, Website Optimization, Web Development, UI/UX Design, Branding, Mobile App Development, E-commerce Solutions, Content Creation, Social Media Management, Search Engine Optimization, Website Maintenance, Website Hosting, Website Security, Website Performance Optimization, Website Analytics, Website Backup and Recovery, Website Migration, Website Customization, Website Testing, Website Accessibility, Website Localization, Website Internationalization, ",
  openGraph: {
    title: "Services - Jean Eric Hirwa",
    description: "Explore my services and see how I can help you bring your ideas to life. From graphic design to web development, I've got you covered.",
    url: "https://www.erichirwa.com/services",
    siteName: "Jean Eric Hirwa - Services",
    images: [
      {
        url: "1718313379119.jpeg",
        width: 800,
        height: 600,
      },
    ],
    locale: "en-US",
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "CreativeWork",
  "name": "Services",
  "url": "https://www.erichirwa.com/services",
  "description": "Explore my services and see how I can help you bring your ideas to life. From graphic design to web development, I've got you covered.",
  "image": "/1718313379119.jpeg",
  "creator": {
    "@type": "Person",
    "name": "Jean Eric Hirwa",
    "url": "https://www.erichirwa.com/services",
    "image": "/1718313379119.jpeg",
    "sameAs": [
      "https://github.com/hirwajeaneric",
      "https://www.linkedin.com/in/jean-eric-hirwa/",
      "https://medium.com/@hirwajeaneric",
      "https://www.instagram.com/hirwa_jean_eric/"
    ]
  }
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
  const services: Services[] = [
    {
      category: 'Software Development',
      title: 'Creating Solutions that Drive Results',
      image: {
        src: 'https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        alt: 'Code on computer screen showing software development'
      },
      elements: [
        {
          title: 'Front-End Development',
          description: "I'll create a visually appealing and user-friendly interface that engages your target audience. Your website will be optimized for search engines and designed to meet your brand's needs and goals."
        },
        {
          title: 'Back-End Development',
          description: "I'll create a secure and scalable back-end system that powers your website. Your website will be optimized for search engines and designed to meet your brand's needs and goals."
        },
        {
          title: 'Testing and Deployment',
          description: "I'll test your website to ensure that it is working correctly and meets your brand's needs and goals. I'll deploy your website to a live server and provide you with ongoing support and maintenance."
        }
      ]
    },
    {
      category: 'DevOps and Cloud Computing',
      title: 'Automating Your Infrastructure',
      image: {
        src: 'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        alt: 'Cloud computing and infrastructure visualization'
      },
      elements: [
        {
          title: 'Infrastructure as Code',
          description: "I'll automate your infrastructure using tools like Terraform, AWS CloudFormation, or Azure Resource Manager. This will help you create, update, and manage your infrastructure in a more efficient and automated way."
        },
        {
          title: 'Continuous Integration and Deployment',
          description: "I'll automate your continuous integration and deployment process using tools like Jenkins, GitLab CI/CD, or GitHub Actions. This will help you streamline your development workflow and reduce the risk of errors."
        },
        {
          title: 'Cloud Computing',
          description: "I'll provide you with cloud computing services like AWS, Azure, or Google Cloud Platform. These services will help you scale your applications, manage your data, and secure your infrastructure."
        },
        {
          title: 'Backup and Disaster Recovery',
          description: "I'll provide you with backup and disaster recovery services like AWS Backup, Azure Backup, or Google Cloud Backup. These services will help you protect your data and applications in the event of a disaster."
        },
        {
          title: 'Monitoring and Logging',
          description: "I'll provide you with monitoring and logging services like AWS CloudWatch, Azure Monitor, or Google Cloud Monitoring. These services will help you monitor your applications, infrastructure, and services to ensure they are running smoothly."
        },
        {
          title: 'Security',
          description: "I'll provide you with security services like AWS Identity and Access Management (IAM), Azure Active Directory, or Google Cloud Identity and Access Management (IAM). These services will help you manage and protect your applications, infrastructure, and services."
        },
        {
          title: 'DevOps Best Practices',
          description: "I'll provide you with DevOps best practices, such as continuous integration, continuous delivery, and continuous deployment, to help you streamline your development workflow and reduce the risk of errors."
        }
      ]
    },
    {
      category: 'Mentorship and Life Coaching',
      title: 'Personal Growth Through Science-Backed Micro-Habits',
      image: {
        src: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        alt: 'Mentorship and life coaching session with personal growth focus'
      },
      elements: [
        {
          title: 'One-on-One Mentoring',
          description: "I provide personalized mentoring sessions focused on building sustainable micro-habits tailored to your goals. Through structured sessions, I help you develop positive habits, achieve personal goals, and improve your overall well-being."
        },
        {
          title: 'Habit Formation Coaching',
          description: "I guide you through the process of forming science-backed micro-habits that compound over time to create significant life changes. Learn how to build habits that stick and transform your daily routine."
        },
        {
          title: 'Personal Growth Packages',
          description: "I offer structured packages designed for different levels of transformation - from reset and clarity sessions to deep transformation programs and year-long mentorship. Each package is designed to meet you where you are in your journey."
        },
        {
          title: 'Goal Setting & Achievement',
          description: "I help you set meaningful goals and create actionable plans to achieve them. Through regular check-ins and personalized guidance, I support you in making consistent progress toward your aspirations."
        },
        {
          title: 'Mindfulness & Mental Clarity',
          description: "I provide guidance on developing mindfulness practices and achieving mental clarity. Learn techniques to manage stress, improve focus, and cultivate a sense of calm and purpose in your daily life."
        },
        {
          title: 'Accountability & Support',
          description: "I offer ongoing accountability and support between sessions through voice notes, tracking systems, and regular check-ins. This ensures you stay on track and make continuous progress toward your goals."
        }
      ]
    },
    {
      category: 'Consultancy',
      title: 'Training and Workshops',
      image: {
        src: 'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        alt: 'Black Smartphone on White Paper'
      },
      elements: [
        {
          title: 'Coding Trainings',
          description: "I provide software development trainings for individuals and companies. These trainings will cover a wide range of topics, including web development, mobile app development, and data science. Your software development training will be optimized for search engines and designed to meet your brand's needs and goals."
        },
        {
          title: 'Workshops',
          description: "I provide workshops on a wide range of topics, including web development, mobile app development, and data science. Your workshops will be optimized for search engines and designed to meet your brand's needs and goals."
        },
      ]
    },
    {
      category: 'Graphic and UI/UX Design',
      title: 'Delivering Messages Through Visual Communication',
      image: {
        src: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        alt: 'Design tools and creative workspace for UI/UX design'
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
        },
        {
          title: 'Logo Design',
          description: "I'll create a visually appealing and unique logo for your business. Your logo will be optimized for search engines and designed to meet your brand's needs and goals."
        },
        {
          title: 'Brand Guidelines',
          description: "I'll create a comprehensive brand guidelines that outlines your brand's values, colors, fonts, and other visual elements. Your brand guidelines will be optimized for search engines and designed to meet your brand's needs and goals."
        },
        {
          title: 'Marketing Materials',
          description: "I'll create promotional materials such as posters, banners, and logos for your brand. These materials will help you promote your website and increase your brand's visibility."
        }
      ]
    },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="flex flex-col items-center justify-start w-full scroll-smooth">
        <section id="process" className="max-w-screen-xl flex flex-col mx-auto justify-center items-center pt-40 md:pt-48 pb-12 md:pb-20 w-full px-4">
          <h1 className="text-5xl md:text-8xl flex flex-col font-extralight items-center text-zinc-800 dark:text-zinc-300">
            <span className="text-center">Software Development</span>
            <em className="pt-serif-regular-italic">& Consultancy</em>
          </h1>
          <h2 className="text-center mt-4 md:mt-8 mb-12 md:mb-18 text-base md:text-2xl text-zinc-400 w-5/6 md:w-1/2">Premium software development, devops, mentorship, and digital arts services to help your business stand out.</h2>
          <Link href="#services" className="flex items-center justify-center text-zinc-300 gap-4">
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
        <section id="services" className="px-4 flex justify-between flex-col py-16 md:py-36 max-w-screen-xl">
          {
            services.map((service, index) => (
              <div id={slugify(service.category)} key={index} className="pt-20 md:pt-8">
                <div className="flex flex-col gap-3 md:gap-6 w-full p-6 md:p-16 bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700">
                  <h2 className="uppercase font-semibold text-zinc-800 dark:text-zinc-300">{slugify(service.category)}</h2>
                  <div className="flex flex-col gap-6 md:gap-8 w-full">
                    <h3 className="text-3xl md:text-5xl font-light text-zinc-800 dark:text-zinc-300">{service.title}</h3>
                    <Image className="object-cover w-full mt-6" src={service.image.src} alt={service.image.alt} width={1000} height={1000} />
                    <div className="flex flex-col gap-4 w-full">
                      {
                        service.elements.map((el, index) => {
                          if (index !== service.elements.length - 1) {
                            return (
                              <div key={index} className={cn("border-b border-zinc-200 dark:border-zinc-700 flex flex-wrap w-full mt-4 md:mt-8 pb-4 md:pb-8")}>
                                <h4 className="uppercase mb-2 md:mb-0 text-sm md:text-base w-full md:w-1/4 font-semibold text-zinc-800 dark:text-zinc-300">{el.title}</h4>
                                <p className="text-sm md:text-base w-full md:w-3/4 text-zinc-600 dark:text-zinc-400">{el.description}</p>
                              </div>
                            )
                          }
                          return (
                            <div key={index} className={cn("flex flex-wrap w-full mt-4 md:mt-8")}>
                              <h4 className="uppercase mb-2 md:mb-0 text-sm md:text-base w-full md:w-1/4 font-semibold text-zinc-800 dark:text-zinc-300">{el.title}</h4>
                              <p className="text-sm md:text-base w-full md:w-3/4 text-zinc-600 dark:text-zinc-400">{el.description}</p>
                            </div>
                          )
                        })
                      }
                    </div>
                  </div>
                </div>
              </div>
            ))
          }
        </section>
      </div>
    </>
  )
}