import { getGallery, getWork } from "@/actions/works";
import { LayoutGrid } from "@/components/ui/layout-grid";
import { ArrowDownIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default async function page({ params }: { params: { slug: string } }) {
  const { slug } = params;

  const work = await getWork(slug);
  if (!work) return null;
  const gallery = await getGallery(work.id);

  return (
    <div className="flex flex-col items-center justify-start w-full scroll-smooth" >
      <section id="process" className="max-w-screen-xl flex flex-col mx-auto justify-center items-center pt-40 md:pt-48 pb-0 w-full px-4">
        <h1 className="text-5xl md:text-7xl flex flex-col font-extralight text-center text-zinc-800 dark:text-zinc-300">{work?.name}</h1>
        <h2 className="text-center mt-3 md:mt-6 mb-8 md:mb-18 text-base md:text-2xl text-zinc-400 w-5/6 md:w-1/2">{work?.description}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full md:w-3/4 py-3 items-center justify-between">
          <ProjectInfoCard title="CLIENT" value={work?.client || ''} />
          <ProjectInfoCard title="TIMELINE" value={work?.timeline || ''} />
          <ProjectInfoCard title="CATEGORY" value={work?.category || ''} />
          <ProjectInfoCard title="LINK" value={work?.link || ''} />
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
            <div className="h-screen w-full">
              <LayoutGrid cards={gallery} />
            </div>
          </section>
        </>
      }
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

const MoreProjectDetailsCard = ({ title, value }: { title: string, value: string }) => {
  return (
    <div className="flex flex-col gap-2 items-start bg-zinc-800 border border-zinc-700 p-10">
      <h4 className="text-zinc-200 text-2xl font-light">{title}</h4>
      <p className="text-zinc-400 text-lg">{value}</p>
    </div>
  )
}