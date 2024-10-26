import { getWork } from "@/actions/works";
import { ArrowDownIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default async function page({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const work = await getWork(slug);

  return (
    <div className="flex flex-col items-center justify-start w-full scroll-smooth" >
      <section id="process" className="max-w-screen-xl flex flex-col mx-auto justify-center items-center pt-40 md:pt-48 pb-20 md:pb-16 w-full px-4">
        <h1 className="text-5xl md:text-8xl flex flex-col font-extralight text-center text-zinc-800 dark:text-zinc-300">{work?.name}</h1>
        <h2 className="text-center mt-4 md:mt-8 mb-8 md:mb-18 text-base md:text-2xl text-zinc-400 w-5/6 md:w-1/2">{work?.description}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full md:w-3/4 py-3 items-center justify-between">
          <ProjectInfoCard title="CLIENT" value={work?.client || ''} />
          <ProjectInfoCard title="TIMELINE" value={work?.timeline || ''} />
          <ProjectInfoCard title="CATEGORY" value={work?.category || ''} />
          <ProjectInfoCard title="LINK" value={work?.link || ''} />
        </div>
        <Link href="#details" className="flex items-center justify-center text-zinc-300 gap-4 mt-10">
          <span className="border border-zinc-800 dark:border-zinc-500 p-2 rounded-full bg-zinc-300 dark:bg-zinc-800">
            <ArrowDownIcon className="" />
          </span>
          <span className="text-center">
            MORE DETAILS
          </span>
        </Link>
      </section>
      <section id="details" className="max-w-screen-xl flex flex-col mx-auto justify-center items-center w-full px-4">
        <Image src={work?.image || ''} alt={`Image of ${work?.name}`} width={2000} height={1000} className="w-full" />
      </section>
      <section>
        
      </section>
    </div>
  )
}
const ProjectInfoCard = ({ title, value }: { title: string, value: string }) => {
  return (
    <div className="flex flex-col gap-1 items-center bg-zinc-800 border border-zinc-700 py-3 px-4">
      <h3 className="text-zinc-500">{title}</h3>
      <p className="uppercase text-sm text-center font-bold text-zinc-200">{value}</p>
    </div>
  )
}