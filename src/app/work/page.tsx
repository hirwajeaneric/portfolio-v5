import ProjectDisplayCard from "@/components/widgets/ProjectDisplayCard";
import projects from "@/database/projects";

export default function page() {
  return (
    <div className="flex flex-col items-center justify-start w-full scroll-smooth">
      <section id="process" className="max-w-screen-xl flex flex-col mx-auto justify-center items-center pt-40 md:pt-48 pb-16 md:pb-32 w-full px-4">
        <h1 className="text-5xl md:text-8xl flex flex-col font-extralight items-center text-zinc-800 dark:text-zinc-300">
          <span className="text-center">Work</span>
        </h1>
        <p className="text-center mt-4 md:mt-8 mb-12 md:mb-18 text-lg w-5/6 md:w-1/2">Premium web design, development, and SEO services to help your business stand out</p>
        <div className="flex flex-wrap gap-4 mt-10 w-full justify-between">
          {projects.map((project) => <ProjectDisplayCard key={project.name} project={project} />) || <>No projects found</>}
        </div>
      </section>
    </div>
  )
}
