import { getArticle } from "@/actions/blogs";
import { ArrowDownIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default async function page({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const article = await getArticle(slug);

  return (
    <div className="flex flex-col items-center justify-start w-full scroll-smooth" >
      <section id="process" className="max-w-screen-xl flex flex-col mx-auto justify-center items-center pt-40 md:pt-48 pb-0 w-full px-4">
        <h1 className="text-4xl md:text-6xl flex flex-col font-extralight text-center text-zinc-800 dark:text-zinc-300">{article?.title}</h1>
        <h2 className="text-center mt-3 md:mt-6 mb-8 md:mb-18 text-base md:text-2xl text-zinc-400 w-5/6 md:w-1/2">{article?.introduction}</h2>
        <Link href="#content" className="flex text-sm items-center justify-center text-zinc-300 gap-4 mt-3 md:mt-3 mb-8 md:mb-16">
          <span className="border border-zinc-800 dark:border-zinc-500 p-2 rounded-full bg-zinc-300 dark:bg-zinc-800">
            <ArrowDownIcon className="" />
          </span>
          <span className="text-center">
            READ MORE
          </span>
        </Link>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 w-full lg:grid-cols-3 items-center justify-between mb-4">
          <BlogDetailsCard title="DATE" value={new Date(article?.createdAt || '').toDateString() || ''} />
          <BlogDetailsCard title="CATEGORY" value={article?.category || ''} />
          <BlogDetailsCard title="READING TIME" value={article?.readTime || ''} />
        </div>
        <Image src={article?.coverimage || ''} alt={`Image of ${article?.title}`} width={2000} height={1000} className="w-full" />
      </section>
      
    </div>
  )
}


const BlogDetailsCard = ({ title, value }: { title: string; value: string }) => {
  return (
    <div className="flex justify-between gap-4 items-center bg-zinc-800 border border-zinc-700 py-3 px-4">
      <h3 className="text-zinc-500 text-sm">{title}</h3>
      <p className="text-zinc-400">{value}</p>
    </div>
  )
}