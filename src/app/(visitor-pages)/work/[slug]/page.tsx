import { getGallery, getWork, getAllWorks } from "@/actions/works";
import { LayoutGrid } from "@/components/ui/layout-grid";
import { cn } from "@/lib/utils";
import { ArrowDownIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";

// Generate static params for all works
export async function generateStaticParams() {
  const works = await getAllWorks();
  return works.map((work) => ({
    slug: work.slug
  }));
}

// Dynamic metadata generation
export async function generateMetadata({ 
  params 
}: { 
  params: { slug: string } 
}): Promise<Metadata> {
  const work = await getWork(params.slug);
  
  if (!work) {
    return {
      title: 'Work Not Found',
      description: 'The requested work could not be found'
    };
  }

  return {
    title: `${work.name} - ${work.category} Project`,
    description: work.description,
    openGraph: {
      title: `${work.name} - Project`,
      description: work.description,
      images: [{ 
        url: work.image, 
        width: 800, 
        height: 600 
      }],
      url: `https://www.erichirwa.com/work/${work.slug}`
    }
  };
}

export default async function WorkDetailPage({ 
  params 
}: { 
  params: { slug: string } 
}) {
  const work = await getWork(params.slug);
  
  // Early return if work is not found
  if (!work) {
    return <div className="container mx-auto py-20 text-center">Project Not Found</div>;
  }

  const gallery = await getGallery(work.id);
  
  // Dynamically calculate available links
  const availableLinks = [
    work.otherLinks[0].link,
    work.otherLinks[1].link
  ].filter(Boolean).length + 2;

  // Prepare JSON-LD structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "name": work.name,
    "url": `https://www.erichirwa.com/work/${work.slug}`,
    "description": work.description,
    "image": work.image,
    "creator": {
      "@type": "Person",
      "name": "Jean Eric Hirwa",
      "url": "https://www.erichirwa.com",
      "image": "/1718313379119.jpeg",
      "sameAs": [
        "https://github.com/hirwajeaneric",
        "https://www.linkedin.com/in/jean-eric-hirwa/",
        "https://medium.com/@hirwajeaneric",
        "https://www.instagram.com/hirwa_jean_eric/"
      ]
    }
  };

  return (
    <>
      <script 
        type="application/ld+json" 
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} 
      />

      <div className="flex flex-col items-center justify-start w-full scroll-smooth">
        <section className="max-w-screen-xl flex flex-col mx-auto justify-center items-center pt-40 md:pt-48 pb-0 w-full px-4">
          <h1 className="text-5xl md:text-7xl flex flex-col font-extralight text-center text-zinc-800 dark:text-zinc-300">
            {work.name}
          </h1>
          
          <h2 className="text-center mt-3 md:mt-6 mb-8 md:mb-18 text-base md:text-2xl text-zinc-400 w-5/6 md:w-1/2">
            {work.description}
          </h2>
          
          <div 
            className={cn(
              availableLinks === 3 ? "lg:grid-cols-3" : 
              availableLinks === 4 ? "lg:grid-cols-4" : "lg:grid-cols-2", 
              "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4 w-full md:w-3/4 py-3 items-center justify-between"
            )}
          >
            <ProjectInfoCard title="TIMELINE" value={work.timeline || 'N/A'} />
            <ProjectInfoCard title="CATEGORY" value={work.category || 'N/A'} />
            
            {work.otherLinks[0].link && (
              <Link 
                href={work.otherLinks[0].link} 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <ProjectInfoCard 
                  title="SOURCE CODE" 
                  value={work.otherLinks[0].name || 'Unavailable'} 
                  isLink 
                />
              </Link>
            )}
            
            {work.otherLinks[1].link && (
              <Link 
                href={work.otherLinks[1].link} 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <ProjectInfoCard 
                  title="LIVE DEMO" 
                  value={work.name || 'Unavailable'} 
                  isLink 
                />
              </Link>
            )}
          </div>
          
          <Link 
            href="#details" 
            className="flex text-sm items-center justify-center text-zinc-300 gap-4 mt-5 md:mt-10"
          >
            <span className="border border-zinc-800 dark:border-zinc-500 p-2 rounded-full bg-zinc-300 dark:bg-zinc-800">
              <ArrowDownIcon />
            </span>
            <span className="text-center">
              MORE DETAILS
            </span>
          </Link>
        </section>

        <section 
          id="details" 
          className="max-w-screen-xl flex flex-col mx-auto justify-center items-center w-full px-4 pt-8 md:pt-16"
        >
          <Image 
            src={work.image || ''} 
            alt={`Image of ${work.name}`} 
            width={2000} 
            height={1000} 
            className="w-full" 
          />
        </section>

        <section className="max-w-screen-xl grid grid-cols-1 gap-20 md:grid-cols-2 w-full px-4 pt-16 md:pt-32 pb-8 md:pb-16">
          <div className="flex flex-col gap-4">
            <h3 className="text-xl text-zinc-400">Deliverables</h3>
            <p className="text-4xl text-zinc-300 font-light">
              {work.deliverable || 'No specific deliverables'}
            </p>
          </div>
          
          <div className="flex flex-col gap-4">
            <MoreProjectDetailsCard title="Challenge" value={work.challenge || 'N/A'} />
            <MoreProjectDetailsCard title="Goal" value={work.goal || 'N/A'} />
            <MoreProjectDetailsCard title="Result" value={work.result || 'N/A'} />
          </div>
        </section>

        {gallery.length > 0 && (
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
        )}
      </div>
    </>
  );
}

// Components remain the same as in the original code
const ProjectInfoCard = ({ title, value, isLink }: { title: string, value: string, isLink?: boolean }) => {
  return (
    <div 
      className={cn(
        isLink ? "border border-zinc-300" : "border border-zinc-700", 
        "flex flex-col gap-1 items-center bg-zinc-800 py-3 px-4"
      )}
    >
      <h3 className="text-zinc-500">{title}</h3>
      <p className="uppercase text-sm text-center font-bold text-zinc-200">
        {value}
      </p>
    </div>
  );
}

const MoreProjectDetailsCard = ({ title, value }: { title: string, value: string }) => {
  return (
    <div className="flex flex-col gap-2 items-start bg-zinc-800 border border-zinc-700 p-10">
      <h4 className="text-zinc-200 text-2xl font-light">{title}</h4>
      <p className="text-zinc-400 text-lg">{value}</p>
    </div>
  );
}