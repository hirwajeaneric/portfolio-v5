import { getGallery, getWork, getAllWorks } from "@/actions/works";
import { ImageGallery } from "@/components/ui/image-gallery";
import { cn } from "@/lib/utils";
import { ArrowDownIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import BlurFade from "@/components/ui/blur-fade";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

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
    description: work.description || `${work.name} project by Jean Eric Hirwa`,
    openGraph: {
      title: `${work.name} - Project`,
      description: work.description || `${work.name} project by Jean Eric Hirwa`,
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
    work.otherLinks[1]?.link
  ].filter(Boolean).length + 2;

  // Prepare JSON-LD structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "name": work.name,
    "url": `https://www.erichirwa.com/work/${work.slug}`,
    "description": work.description || `${work.name} project by Jean Eric Hirwa`,
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

          {work.description && (
            <h2 className="text-center mt-3 md:mt-6 mb-8 md:mb-18 text-base md:text-2xl text-zinc-400 w-5/6 md:w-1/2">
              {work.description}
            </h2>
          )}

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

            {work.otherLinks[1]?.link && (
              <Link
                href={work.otherLinks[1]?.link}
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

          {(work.deliverable || work.challenge || work.goal || work.result) && (
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
          )}
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

        {/* Technologies Section */}
        {work.technologies && work.technologies.length > 0 && (
          <BlurFade delay={0.25} inView className="w-full mx-auto flex flex-col items-center justify-center">
            <section className="max-w-screen-xl w-full px-4 pt-16 md:pt-24 pb-8 md:pb-16">
              <div className="flex flex-col gap-8 md:gap-12">
                {/* Technologies Header */}
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-3">
                    <div className="h-px w-12 bg-zinc-400 dark:bg-zinc-600"></div>
                    <h3 className="text-sm uppercase tracking-wider text-zinc-500 dark:text-zinc-400 font-semibold">
                      Technologies
                    </h3>
                  </div>
                  <h2 className="text-3xl md:text-4xl lg:text-5xl text-zinc-800 dark:text-zinc-200 font-light">
                    Tech Stack
                  </h2>
                  <p className="text-zinc-600 dark:text-zinc-400 text-base md:text-lg max-w-2xl">
                    Technologies and tools used to build this project.
                  </p>
                </div>

                {/* Technologies Grid */}
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4 md:gap-6">
                  {work.technologies.map((tech, index) => {
                    const IconComponent = tech.icon;
                    return (
                      <BlurFade
                        key={tech.name}
                        delay={0.02 * index}
                        inView
                        className="group"
                      >
                        <div className="relative flex flex-col items-center justify-center p-4 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-900 hover:border-zinc-400 dark:hover:border-zinc-600 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-all duration-300 cursor-default">
                          <IconComponent
                            className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-zinc-700 dark:text-zinc-300 group-hover:scale-110 transition-transform duration-300"
                          />
                          <span className="mt-2 text-[10px] sm:text-xs text-center text-zinc-600 dark:text-zinc-400 group-hover:text-zinc-800 dark:group-hover:text-zinc-200 transition-colors duration-300 line-clamp-2 leading-tight">
                            {tech.name}
                          </span>
                        </div>
                      </BlurFade>
                    );
                  })}
                </div>
              </div>
            </section>
          </BlurFade>
        )}

        {(work.deliverable || work.challenge || work.goal || work.result) && (
          <section className="max-w-screen-xl w-full px-4 pt-16 md:pt-32 pb-8 md:pb-16">
            <div className={cn(
              "grid gap-12 lg:gap-16",
              work.deliverable && (work.challenge || work.goal || work.result)
                ? "grid-cols-1 lg:grid-cols-2"
                : "grid-cols-1"
            )}>
              {/* Deliverables Section */}
              {work.deliverable && (
                <BlurFade delay={0.1} inView>
                  <div className="flex flex-col gap-6 group">
                    <div className="flex items-center gap-3">
                      <div className="h-px w-12 bg-zinc-400 dark:bg-zinc-600 group-hover:w-16 transition-all duration-300"></div>
                      <h3 className="text-sm uppercase tracking-wider text-zinc-500 dark:text-zinc-400 font-semibold">
                        Deliverables
                      </h3>
                    </div>
                    <div className="border border-zinc-300 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-900 p-8 hover:border-zinc-400 dark:hover:border-zinc-600 transition-all duration-300">
                      <p className="text-3xl md:text-4xl text-zinc-800 dark:text-zinc-200 font-light leading-tight">
                        {work.deliverable}
                      </p>
                    </div>
                  </div>
                </BlurFade>
              )}

              {/* Challenge, Goal, Result - Interactive Tabs */}
              {(work.challenge || work.goal || work.result) && (
                <BlurFade delay={0.2} inView>
                  <div className="flex flex-col gap-6">
                    <div className="flex items-center gap-3">
                      <div className="h-px w-12 bg-zinc-400 dark:bg-zinc-600"></div>
                      <h3 className="text-sm uppercase tracking-wider text-zinc-500 dark:text-zinc-400 font-semibold">
                        Project Details
                      </h3>
                    </div>
                    <Tabs
                      defaultValue={
                        work.challenge ? "challenge" :
                          work.goal ? "goal" :
                            "result"
                      }
                      className="w-full"
                    >
                      <TabsList className="w-full justify-start h-auto p-1 bg-zinc-200 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-lg flex-wrap gap-1 mb-4">
                        {work.challenge && (
                          <TabsTrigger
                            value="challenge"
                            className="text-xs sm:text-sm px-4 py-2 data-[state=active]:bg-zinc-100 dark:data-[state=active]:bg-zinc-900 data-[state=active]:text-zinc-900 dark:data-[state=active]:text-zinc-100 transition-all"
                          >
                            Challenge
                          </TabsTrigger>
                        )}
                        {work.goal && (
                          <TabsTrigger
                            value="goal"
                            className="text-xs sm:text-sm px-4 py-2 data-[state=active]:bg-zinc-100 dark:data-[state=active]:bg-zinc-900 data-[state=active]:text-zinc-900 dark:data-[state=active]:text-zinc-100 transition-all"
                          >
                            Goal
                          </TabsTrigger>
                        )}
                        {work.result && (
                          <TabsTrigger
                            value="result"
                            className="text-xs sm:text-sm px-4 py-2 data-[state=active]:bg-zinc-100 dark:data-[state=active]:bg-zinc-900 data-[state=active]:text-zinc-900 dark:data-[state=active]:text-zinc-100 transition-all"
                          >
                            Result
                          </TabsTrigger>
                        )}
                      </TabsList>

                      {work.challenge && (
                        <TabsContent value="challenge" className="mt-0">
                          <MoreProjectDetailsCard
                            title="Challenge"
                            value={work.challenge}
                          />
                        </TabsContent>
                      )}

                      {work.goal && (
                        <TabsContent value="goal" className="mt-0">
                          <MoreProjectDetailsCard
                            title="Goal"
                            value={work.goal}
                          />
                        </TabsContent>
                      )}

                      {work.result && (
                        <TabsContent value="result" className="mt-0">
                          <MoreProjectDetailsCard
                            title="Result"
                            value={work.result}
                          />
                        </TabsContent>
                      )}
                    </Tabs>
                  </div>
                </BlurFade>
              )}
            </div>
          </section>
        )}

        {gallery.length > 0 && (
          <BlurFade delay={0.3} inView className="w-full mx-auto flex flex-col items-center justify-center">
            <section className="max-w-screen-xl w-full px-4 pt-16 md:pt-24 pb-16 md:pb-32">
              <div className="flex flex-col gap-8 md:gap-12">
                {/* Gallery Header */}
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-3">
                    <div className="h-px w-12 bg-zinc-400 dark:bg-zinc-600"></div>
                    <h3 className="text-sm uppercase tracking-wider text-zinc-500 dark:text-zinc-400 font-semibold">
                      Project Gallery
                    </h3>
                  </div>
                  <h2 className="text-3xl md:text-4xl lg:text-5xl text-zinc-800 dark:text-zinc-200 font-light">
                    Visual Showcase
                  </h2>
                  <p className="text-zinc-600 dark:text-zinc-400 text-base md:text-lg max-w-2xl">
                    Explore the visual journey of this project through carefully curated screenshots and design elements.
                  </p>
                </div>

                {/* Gallery Grid */}
                <div className="w-full">
                  <ImageGallery cards={gallery} />
                </div>
              </div>
            </section>
          </BlurFade>
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
    <div className="flex flex-col gap-4 items-start bg-zinc-100 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 p-6 md:p-8 hover:border-zinc-400 dark:hover:border-zinc-600 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-all duration-300 group">
      <div className="flex items-center gap-3 w-full">
        <div className="h-1 w-8 bg-zinc-400 dark:bg-zinc-600 group-hover:w-12 transition-all duration-300"></div>
        <h4 className="text-zinc-800 dark:text-zinc-200 text-xl md:text-2xl font-light uppercase tracking-wide">
          {title}
        </h4>
      </div>
      <p className="text-zinc-600 dark:text-zinc-400 text-base md:text-lg leading-relaxed pl-11">
        {value}
      </p>
    </div>
  );
}