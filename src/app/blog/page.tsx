import { CardSkeleton } from "@/components/widgets/CardSkeleton";
import { Articles } from "@/database/articles";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

export default function page() {
  return (
    <div className="flex flex-col items-center justify-start w-full scroll-smooth">
      <section id="process" className="max-w-screen-xl flex flex-col mx-auto justify-center items-center pt-40 md:pt-48 pb-16 md:pb-32 w-full px-4">
        <h1 className="text-5xl md:text-8xl flex flex-col font-extralight items-center text-zinc-800 dark:text-zinc-300">
          <span className="text-center">Blog</span>
        </h1>
        <h2 className="text-center mt-4 md:mt-8 mb-12 md:mb-18 text-base md:text-2xl text-zinc-400 w-5/6 md:w-1/2">Get the latest insights on some topics I find attractive.</h2>
        <div className="grid grid-cols-1 smd:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8 md:mt-10 w-full">
          {Articles.map((article, index) => {
            return (
              <Suspense fallback={<CardSkeleton />} key={index}>
                <Link href={`/blog/${article.slug}`} className="cursor-pointer flex flex-col p-10 justify-between gap-8 w-full bg-zinc-800 border border-zinc-500 group">
                  <Image src={article.coverimage} alt={article.title} height={400} width={1000} className="border border-zinc-300" />
                  <div className="flex flex-col gap-2">
                    <p className="text-zinc-500">{new Date(article.createdAt).toDateString()}</p>
                    <h1 className="text-2xl text-zinc-300">{article.title}</h1>
                    <p className="text-zinc-300">{article.introduction}</p>
                  </div>
                  <span className="text-zinc-400 py-1 uppercase text-sm w-fit px-2 border border-zinc-600 bg-zinc-700">{article.category}</span>
                </Link>
              </Suspense>
            )
          })}
        </div>
      </section>
    </div>
  )
}
