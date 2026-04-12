import { ArrowUpIcon } from "lucide-react";
import Link from "next/link";

export type ProjectCardData = {
  name: string;
  slug: string;
  category: string;
  image: string;
};

export default function ProjectDisplayCard({ project }: { project: ProjectCardData }) {
  const styles = {
    backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.3)), url(${project.image})`,
    backgroundSize: "cover" as const,
    backgroundPosition: "center" as const,
    transition: "background-image 0.3s ease-in-out",
    willChange: "background-image" as const,
  };

  return (
    <>
      <Link
        href={`work/${project.slug}`}
        style={styles}
        className="aspect-video w-full md:w-[48%] mb-4 md:mb-8 lg:w-[48%] flex md:hidden flex-col justify-end border border-zinc-600 hover:border-zinc-200 transition-all duration-300 group"
      >
        <div className="bg-zinc-800 px-3 md:px-4 py-2 md:py-3 m-2 md:m-4 flex justify-between text-center items-center border border-zinc-600 hover:bg-zinc-700 hover:border-zinc-200 transition-all duration-300">
          <h3 className="text-lg text-left md:text-xl text-zinc-300">{project.name}</h3>
          <span className="text-nowrap uppercase text-zinc-300 text-sm group-hover:text-zinc-900 transition-all duration-300">{project.category}</span>
        </div>
      </Link>

      <div
        style={styles}
        className="relative aspect-video w-full md:w-[48%] mb-4 md:mb-8 lg:w-[48%] hidden md:flex flex-col justify-end border border-zinc-800 dark:border-zinc-600 group"
      >
        <Link
          href={`work/${project.slug}`}
          className="hidden group-hover:flex absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border border-zinc-500 p-2 w-fit rounded-full bg-zinc-800 transition-all duration-300"
        >
          <ArrowUpIcon className="rotate-45 hover:rotate-90 transition-transform duration-300 text-zinc-300" />
        </Link>
        <div className="bg-zinc-800 px-3 md:px-4 py-2 md:py-3 m-2 md:m-4 flex justify-between text-center items-center border border-zinc-600 transition-all duration-300">
          <h3 className="capitalize text-lg text-left md:text-xl text-zinc-300">{project.name}</h3>
          <span className="text-nowrap uppercase text-zinc-300 text-sm transition-all duration-300">{project.category}</span>
        </div>
      </div>
    </>
  );
}
