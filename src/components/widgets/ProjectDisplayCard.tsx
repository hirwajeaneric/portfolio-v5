import { ProjectTypes } from "@/database/projects";
import { ArrowUpIcon } from "lucide-react";
import Link from "next/link";

export default function ProjectDisplayCard({ project }: { project: ProjectTypes }) {
  const styles = {
    backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.3)), url(${project.image})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    transition: 'background-image 0.3s ease-in-out',
    willChange: 'background-image',
  };

  return (
    <>
      {/* Mobile version  */}
      <Link href={`work/${project.slug}`}
        style={styles}
        className="aspect-video w-full md:w-[48%] mb-4 md:mb-8 lg:w-[48%] flex md:hidden flex-col justify-end border border-zinc-800 dark:border-zinc-600 group"
      >
        <div className="dark:bg-zinc-800 bg-zinc-300 px-3 md:px-4 py-2 md:py-3 m-2 md:m-4 flex justify-between text-center items-center border border-zinc-800 dark:border-zinc-600">
          <h3 className="capitalize text-lg text-left md:text-xl">{project.name}</h3>
          <span className="hover:underline text-nowrap uppercase text-zinc-300 text-sm">{project.category}</span>
        </div>
      </Link>

      {/* Desktop version  */}
      <div
        style={styles}
        className="relative aspect-video w-full md:w-[48%] mb-4 md:mb-8 lg:w-[48%] hidden md:flex flex-col justify-end border border-zinc-800 dark:border-zinc-600 group"
      >
        <Link
          href={`work/${project.slug}`}
          className="hidden group-hover:flex absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border border-zinc-700 dark:border-zinc-500 p-2 w-fit rounded-full bg-zinc-300 dark:bg-zinc-800"
        >
          <ArrowUpIcon className="rotate-45 hover:rotate-90 transition-transform duration-300 text-zinc-300" />
        </Link>
        <div className="dark:bg-zinc-800 bg-zinc-300 px-3 md:px-4 py-2 md:py-3 m-2 md:m-4 flex justify-between text-center items-center border border-zinc-800 dark:border-zinc-600">
          <h3 className="capitalize text-lg text-left md:text-xl">{project.name}</h3>
          <span className="hover:underline text-nowrap uppercase text-zinc-300 text-sm">{project.category}</span>
        </div>
      </div>
    </>
  );
}
