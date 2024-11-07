import { getGallery, getWork } from "@/actions/works";
import { LayoutGrid } from "@/components/ui/layout-grid";
import { cn } from "@/lib/utils";
import { ArrowDownIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Work",
  description: "Explore my work and see how I can help you bring your ideas to life. From graphic design to web development, I've got you covered.",
  keywords: "Jean Eric Hirwa, Work, Graphic Design, Cloud Computing, Database Management, Software as a Service, Sofware Testing, Continuous Integration, Continuous Deployment, Website Optimization, Web Development, UI/UX Design, Branding, Mobile App Development, E-commerce Solutions, Content Creation, Social Media Management, Search Engine Optimization, Website Maintenance, Website Hosting, Website Security, Website Performance Optimization, Website Analytics, Website Backup and Recovery, Website Migration, Website Customization, Website Testing, Website Accessibility, Website Localization, Website Internationalization, ",
  openGraph: {
    title: "Work - Jean Eric Hirwa",
    description: "Explore my work and see how I can help you bring your ideas to life. From graphic design to web development, I've got you covered.",
    url: "https://hirwajeaneric.netlify.app/work",
    siteName: "Jean Eric Hirwa - Work",
    images: [
      {
        url: "/1718313379119.jpeg",
        width: 800,
        height: 600,
      },
    ]
  }
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "CreativeWork",
  "name": "Work",
  "url": "https://hirwajeaneric.netlify.app/work",
  "description": "Explore my work and see how I can help you bring your ideas to life. From graphic design to web development, I've got you covered.",
  "image": "/1718313379119.jpeg",
  "creator": {
    "@type": "Person",
    "name": "Jean Eric Hirwa",
    "url": "https://hirwajeaneric.netlify.app/work",
    "image": "/1718313379119.jpeg",
    "sameAs": [
      "https://github.com/hirwajeaneric",
      "https://www.linkedin.com/in/jean-eric-hirwa/",
      "https://medium.com/@hirwajeaneric",
      "https://www.instagram.com/hirwa_jean_eric/",
    ]
  }
}

export default async function page({ params }: { params: { slug: string } }) {
  const { slug } = params;

  const work = await getWork(slug);
  if (!work) return null;
  const gallery = await getGallery(work.id);
  var availableLinks = 2;
  if (work.otherLinks[0].link) availableLinks++;
  if (work.otherLinks[1].link) availableLinks++;

  metadata.title = `${work?.name} - ${work?.category} Project`;
  metadata.description = `${work?.description}`;
  metadata.openGraph.title = `${work?.name} - Project`;
  metadata.openGraph.description = `${work?.description}`;
  metadata.openGraph.images[0].url = work?.image;
  metadata.openGraph.url = `https://hirwajeaneric.netlify.app/work/${work?.slug}`;
  metadata.openGraph.siteName = "Jean Eric Hirwa - Work";

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="flex flex-col items-center justify-start w-full scroll-smooth" >
        <section id="process" className="max-w-screen-xl flex flex-col mx-auto justify-center items-center pt-40 md:pt-48 pb-0 w-full px-4">
          <h1 className="text-5xl md:text-7xl flex flex-col font-extralight text-center text-zinc-800 dark:text-zinc-300">{work?.name}</h1>
          <h2 className="text-center mt-3 md:mt-6 mb-8 md:mb-18 text-base md:text-2xl text-zinc-400 w-5/6 md:w-1/2">{work?.description}</h2>
          <div className={cn(availableLinks === 3 ? "lg:grid-cols-3" : availableLinks === 4 ? "lg:grid-cols-4" : "lg:grid-cols-2", "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4 w-full md:w-3/4 py-3 items-center justify-between")}>
            <ProjectInfoCard title="TIMELINE" value={work?.timeline || ''} />
            <ProjectInfoCard title="CATEGORY" value={work?.category || ''} />
            {work?.otherLinks[0].link &&
              <Link href={work?.otherLinks[0].link || ''} target="_blank" rel="noopener noreferrer">
                <ProjectInfoCard title="SOURCE CODE" value={work?.otherLinks[0].name || 'Unavailable'} isLink />
              </Link>
            }
            {work?.otherLinks[1].link &&
              <Link href={work?.otherLinks[1].link || ''} target="_blank" rel="noopener noreferrer">
                <ProjectInfoCard title="LIVE DEMO" value={work?.name || 'Unavailable'} isLink />
              </Link>
            }
          </div>
          <Link href="#details" className="flex text-sm items-center justify-center text-zinc-300 gap-4 mt-5 md:mt-10">
            <span className="border border-zinc-800 dark:border-zinc-500 p-2 rounded-full bg-zinc-300 dark:bg-zinc-800">
              <ArrowDownIcon className="" />
            </span>
            <span className="text-center">
              MORE DETAILS
            </span>
          </Link>
        </section>
        <section id="details" className="max-w-screen-xl flex flex-col mx-auto justify-center items-center w-full px-4 pt-8 md:pt-16">
          <Image src={work?.image || ''} alt={`Image of ${work?.name}`} width={2000} height={1000} className="w-full" />
        </section>
        <section className="max-w-screen-xl grid grid-cols-1 gap-20 md:grid-cols-2 w-full px-4 pt-16 md:pt-32 pb-8 md:pb-16">
          <div className="flex flex-col gap-4">
            <h3 className="text-xl text-zinc-400">Deliverables</h3>
            <p className="text-4xl text-zinc-300 font-light">{work?.deliverable || ''}</p>
          </div>
          <div className="flex flex-col gap-4">
            <MoreProjectDetailsCard title="Challenge" value={work?.challenge || ''} />
            <MoreProjectDetailsCard title="Goal" value={work?.goal || ''} />
            <MoreProjectDetailsCard title="Result" value={work?.result || ''} />
          </div>
        </section>
        {gallery.length > 0 &&
          <>
            <div className="w-full flex justify-start items-start max-w-screen-xl px-4">
              <h3 className="text-4xl text-zinc-300 my-2 md:my-10">Gallery</h3>
            </div>
            <section className="w-screen p-4 gap-10 mb-16 md:mb-32">
              <div className="w-full">
                <LayoutGrid cards={gallery} />
              </div>
            </section>
          </>
        }
      </div>
    </>
  )
}
const ProjectInfoCard = ({ title, value, isLink }: { title: string, value: string, isLink?: boolean }) => {
  return (
    <div className={cn(isLink ? "border border-zinc-300" : "border border-zinc-700", "flex flex-col gap-1 items-center bg-zinc-800 py-3 px-4")}>
      <h3 className="text-zinc-500">{title}</h3>
      <p className="uppercase text-sm text-center font-bold text-zinc-200">{value}</p>
    </div>
  )
}

const MoreProjectDetailsCard = ({ title, value }: { title: string, value: string }) => {
  return (
    <div className="flex flex-col gap-2 items-start bg-zinc-800 border border-zinc-700 p-10">
      <h4 className="text-zinc-200 text-2xl font-light">{title}</h4>
      <p className="text-zinc-400 text-lg">{value}</p>
    </div>
  )
}