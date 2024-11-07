import { getArticle, getArticleByCategory } from "@/actions/blogs";
import { CardSkeleton } from "@/components/widgets/CardSkeleton";
import SocialAccountsGroup from "@/components/widgets/SocialAccountsGroup";
import { ArrowDownIcon, ArrowUpIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

export const metadata = {
  title: "Blog",
  description: "Get the latest insights on some topics I find attractive.",
  keywords: "Jean Eric Hirwa, hirwajeaneric, Hirwa Jean Eric, Blog, Insights, Software Development, Web Development, Technology, Programming, Coding, Tech, Developer, Web Design, Web Development, Programming, Career",
  openGraph: {
    title: "Blog - Jean Eric Hirwa",
    description: "Get the latest insights on some topics I find attractive.",
    url: "https://hirwajeaneric.netlify.app/blog",
    siteName: "Jean Eric Hirwa - Blog",
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

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "name": "Jean Eric Hirwa - Blog",
  "url": "https://hirwajeaneric.netlify.app/blog",
  "description": "Get the latest insights on some topics I find attractive.",
  "image": "/1718313379119.jpeg",
  "creator": {
    "@type": "Person",
    "name": "Jean Eric Hirwa",
    "url": "https://hirwajeaneric.netlify.app/",
    "image": "/1718313379119.jpeg",
    "sameAs": [
      "https://github.com/hirwajeaneric",
      "https://www.linkedin.com/in/jean-eric-hirwa/",
      "https://medium.com/@hirwajeaneric",
      "https://www.instagram.com/hirwa_jean_eric/"
    ]
  }
}

export default async function page({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const article = await getArticle(slug);
  const relatedArticles = await getArticleByCategory(article?.category || "");

  metadata.title = article?.title || "Blog";
  metadata.description = article?.introduction || "Get the latest insights on some topics I find attractive.";
  metadata.openGraph.title = article?.title || "Blog";
  metadata.openGraph.description = article?.introduction || "Get the latest insights on some topics I find attractive.";
  metadata.openGraph.images = [
    {
      url: article?.coverimage || "1718313379119.jpeg",
      width: 800,
      height: 600,
    },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

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
        <article id="content" className="max-w-screen-md flex flex-col mx-auto justify-center items-start pt-20 md:pt-24 mb-6 w-full px-4">
          <h3 className="text-2xl md:text-4xl font-light text-left mb-6 text-zinc-800 dark:text-zinc-200">
            Your website's navigation should be simple and straightforward
          </h3>
          <p className="text-sm md:text-base">
            Creating a successful website requires more than just a pretty design. While aesthetics are important, a website that engages and retains users must also provide intuitive navigation, compelling visuals, and easy-to-digest content. Here are 10 essential website elements that you should include to keep your visitors engaged.
            Firstly, your website's navigation should be simple and straightforward. Visitors should be able to find what they are looking for easily, without having to navigate through multiple pages. Clear navigation menus, search bars, and well-organized pages are crucial to keeping users engaged and ensuring they return to your site.
          </p>
          <h4 className="text-2xl md:text-3xl font-light text-left mt-8 mb-6 text-zinc-800 dark:text-zinc-200">
            A clear and compelling value proposition
          </h4>
          <p className="text-sm md:text-base mb-4">
            Secondly, make sure that your website has a clear and compelling value proposition. This is the statement that tells visitors what your website is about and what they can expect to get out of it. Your value proposition should be prominently displayed on your homepage and throughout your site, and it should be clear, concise, and easy to understand.
          </p>
          <h4 className="text-2xl md:text-3xl font-light text-left mt-8 mb-6 text-zinc-800 dark:text-zinc-200">
            Ensure that your website loads quickly
          </h4>
          <p className="text-sm md:text-base mb-4">
            Thirdly, ensure that your website loads quickly. Slow-loading pages can quickly turn off visitors, leading them to abandon your site and look elsewhere for what they need. Make sure that your website is optimized for speed, with optimized images and a streamlined codebase.
          </p>
          <h4 className="text-2xl md:text-3xl font-light text-left mt-8 mb-6 text-zinc-800 dark:text-zinc-200">
            Engaging visuals and multimedia content
          </h4>
          <p className="text-sm md:text-base mb-4">
            Fourthly, include engaging visuals and multimedia content on your website. Whether it's high-quality images, videos, or infographics, visual content is an effective way to engage and retain users. But don't just include visuals for the sake of it - make sure that each piece of multimedia content serves a purpose and helps to tell your brand's story.
          </p>

          <div className="flex flex-col items-start justify-between gap-4 bg-zinc-800 border border-zinc-700 p-10 mt-8">
            <h4 className="text-zinc-200 text-3xl font-light">Conclusion</h4>
            <p>
              To sum it up, creating a successful website goes beyond just having a pretty design. It requires thoughtful planning and strategic implementation of key elements that engage and retain users. By including these 10 essential website elements, you can ensure a positive user experience and drive conversions on your website. Remember to always put your users first and continuously improve your website to meet their needs and expectations.
            </p>
            <div className="flex justify-start mt-4 gap-4 items-center">
              <Image src={`/1718313379119.jpeg`} height={60} width={60} className="rounded-full" alt="" />
              <div className="flex flex-col items-start justify-start">
                <h4 className="text-lg">Jean Eric Hirwa</h4>
                <p className="text-base">Software Engineer</p>
              </div>
            </div>
          </div>
          <SocialAccountsGroup />
        </article>
        <section className="flex flex-col w-full max-w-screen-xl items-start justify-between gap-10 mt-10 md:mt-20 mb-20 mx-auto px-4">
          <div className="flex justify-between flex-wrap md:flex-nowrap items-center gap-4 w-full">
            <h3 className="text-2xl md:text-4xl w-full md:w-fit font-light text-center md:text-left text-zinc-800 dark:text-zinc-200">
              Related Articles
            </h3>
            <Link href="/blog" className="flex  w-full md:w-fit items-center justify-center gap-4 group">
              <span className="border border-zinc-800 dark:border-zinc-500 dark:hover:border-zinc-200 p-1 rounded-full bg-zinc-300 dark:bg-zinc-800">
                <ArrowUpIcon className="rotate-45 group-hover:rotate-90 transition-transform duration-300" />
              </span>
              <span className="text-center text-base">
                SEE ALL
              </span>
            </Link>
          </div>
          <div className="grid grid-cols-1 smd:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
            {relatedArticles.map((article, index) => {
              return (
                <Suspense fallback={<CardSkeleton />} key={index}>
                  <Link href={`/blog/${article.slug}`} className="cursor-pointer flex flex-col p-7 md:p-10 justify-between gap-8 w-full bg-zinc-800 border border-zinc-500 group">
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
    </>
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