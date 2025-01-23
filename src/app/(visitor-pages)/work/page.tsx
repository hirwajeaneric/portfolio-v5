import ProjectDisplayCard from "@/components/widgets/ProjectDisplayCard";
import projects from "@/database/projects";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "CreativeWork",
  "name": "Jean Eric Hirwa - Projects",
  "url": "https://www.erichirwa.com/work",
  "description": "Explore my projects and see how I've applied my skills and creativity to create innovative solutions.",
  "image": "/1718313379119.jpeg",
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
}

export const metadata = {
  title: "Projects",
  description: "Explore my projects and see how I've applied my skills and creativity to create innovative solutions.",
  keywords: "Jean Eric Hirwa, hirwajeaneric, Hirwa Jean Eric, Projects, Works, Portfolio, software developer, web developer, web design, software engineer, wordpress developer, artist, tech lead, backend engineer, frontend engineer, full-stack developer, fullstack developer, database engineer, Information Technology, Author, Artist",
  openGraph: {
    title: "Projects - Jean Eric Hirwa",
    description: "Explore my projects and see how I've applied my skills and creativity to create innovative solutions.",
    url: "https://www.erichirwa.com/work",
    siteName: "Jean Eric Hirwa - Projects",
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

export default function page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="flex flex-col items-center justify-start w-full scroll-smooth">
        <section id="process" className="max-w-screen-xl flex flex-col mx-auto justify-center items-center pt-40 md:pt-48 pb-16 md:pb-32 w-full px-4">
          <h1 className="text-5xl md:text-8xl flex flex-col font-extralight items-center text-zinc-800 dark:text-zinc-300">
            <span className="text-center">Work</span>
          </h1>
          <h2 className="text-center mt-4 md:mt-8 mb-12 md:mb-18 text-base md:text-2xl text-zinc-400 w-5/6 md:w-1/2">Premium web design, development, and SEO services to help your business stand out</h2>
          <div className="flex flex-wrap gap-4 md:mt-10 w-full justify-between">
            {projects.map((project) => <ProjectDisplayCard key={project.name} project={project} />) || <>No projects found</>}
          </div>
        </section>
      </div>
    </>
  )
}
