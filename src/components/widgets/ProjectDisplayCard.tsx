import { ProjectTypes } from "@/database/projects";
import Link from "next/link";

export default function ProjectDisplayCard({ project }: { project: ProjectTypes }) {

  const styles = {
    backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.2)), url(${project.image})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    transition: 'background-image 0.3s ease-in-out',
    willChange: 'background-image',
  }

  return (
    <div style={styles} className="aspect-video w-full md:w-[48%] mb-4 md:mb-8 lg:w-[48%] flex flex-col justify-end border border-zinc-800 dark:border-zinc-600">
      <div className="dark:bg-zinc-800 bg-zinc-300 px-3 md:px-4 py-2 md:py-3 m-2 md:m-4 flex justify-between text-center items-center border border-zinc-800 dark:border-zinc-600">
        <h3 className="capitalize text-lg text-left md:text-xl">{project.name}</h3>
        <Link href={`work/${project.slug}`} className="hover:underline text-nowrap">Read More</Link>
      </div>
    </div>
  )
}
