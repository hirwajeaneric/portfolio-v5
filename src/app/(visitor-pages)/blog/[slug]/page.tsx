import { getArticle, getArticleByCategory } from "@/actions/blogs";
import { sanitizeHtml } from "@/lib/html-sanitizer";
import { CardSkeleton } from "@/components/widgets/CardSkeleton";
import SocialAccountsGroup from "@/components/widgets/SocialAccountsGroup";
import { BlogEngagement } from "@/components/blog/BlogEngagement";
import { PromoBlock } from "@/components/promo/PromoBlock";
import { getPromoAds, getSocialLinks } from "@/lib/db-queries";
import { PromoPlacement } from "@/generated/prisma/enums";
import { ArrowDownIcon, ArrowUpIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { stripHtmlForMeta } from "@/lib/plain-text";

const defaultBlogDescription = "Get the latest insights on some topics I find attractive.";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = await getArticle(slug);
  const description = article?.introduction
    ? stripHtmlForMeta(article.introduction)
    : defaultBlogDescription;

  return {
    title: article?.title || "Blog",
    description,
    openGraph: {
      title: article?.title || "Blog",
      description,
      images: [{ url: article?.coverImageUrl || "1718313379119.jpeg", width: 800, height: 600 }],
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = await getArticle(slug);
  const relatedArticles = await getArticleByCategory(slug);
  const socials = await getSocialLinks();
  const promos = await getPromoAds([PromoPlacement.BLOG_POST]);
  const promo = promos[0];

  if (!article) {
    return <div className="mx-auto max-w-xl py-32 text-center text-zinc-400">Article not found.</div>;
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    name: article.title,
    url: `https://www.erichirwa.com/blog/${slug}`,
    description: article.introduction,
    image: article.coverImageUrl,
    creator: {
      "@type": "Person",
      name: "Jean Eric Hirwa",
      url: "https://www.erichirwa.com/",
      image: "/1718313379119.jpeg",
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="flex flex-col items-center justify-start w-full scroll-smooth bg-zinc-900">
        <section
          id="process"
          className="max-w-screen-xl flex flex-col mx-auto justify-center items-center pt-40 md:pt-48 pb-0 w-full px-4"
        >
          <h1 className="text-4xl md:text-6xl flex flex-col font-extralight text-center text-zinc-300">
            {article.title}
          </h1>
          <h2 className="text-center mt-3 md:mt-6 mb-8 md:mb-18 text-base md:text-2xl text-zinc-300 w-5/6 md:w-1/2">
            {article.introduction}
          </h2>
          <Link href="#content" className="flex text-sm items-center justify-center text-zinc-300 gap-4 mt-3 md:mt-3 mb-8 md:mb-16">
            <span className="border border-zinc-500 p-2 rounded-full bg-zinc-700">
              <ArrowDownIcon className="" />
            </span>
            <span className="text-center">READ MORE</span>
          </Link>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 w-full lg:grid-cols-3 items-center justify-between mb-4">
            <BlogDetailsCard title="DATE" value={new Date(article.createdAt).toDateString()} />
            <BlogDetailsCard title="CATEGORY" value={article.category?.name || ""} />
            <BlogDetailsCard title="READING TIME" value={article.readTime} />
          </div>
          <Image src={article.coverImageUrl} alt={`Image of ${article.title}`} width={2000} height={1000} className="w-full" />
        </section>

        <article
          id="content"
          className="max-w-screen-md flex flex-col mx-auto justify-center items-start pt-20 md:pt-24 mb-6 w-full px-4"
        >
          <div
            className="max-w-none text-sm md:text-base text-zinc-300 leading-relaxed space-y-4 [&_a]:text-blue-400 [&_a]:underline"
            dangerouslySetInnerHTML={{ __html: sanitizeHtml(article.content) }}
          />
          <div className="mt-10 w-full">
            {promo ? (
              <PromoBlock
                kicker={promo.kicker}
                headlineLead={promo.headlineLead}
                headlineEmphasis={promo.headlineEmphasis}
                body={promo.body}
                ctaLabel={promo.ctaLabel}
                ctaUrl={promo.ctaUrl}
              />
            ) : null}
          </div>
          <BlogEngagement slug={slug} />
          <div className="mt-10 w-full">
            <SocialAccountsGroup accounts={socials} />
          </div>
        </article>

        {relatedArticles.length > 0 && <section className="flex flex-col w-full max-w-screen-xl items-start justify-between gap-10 mt-10 md:mt-20 mb-20 mx-auto px-4">
          <div className="flex justify-between flex-wrap md:flex-nowrap items-center gap-4 w-full">
            <h3 className="text-2xl md:text-4xl w-full md:w-fit font-light text-center md:text-left text-zinc-300">
              Related Articles
            </h3>
            <Link href="/blog" className="flex  w-full md:w-fit items-center justify-center gap-4 group">
              <span className="border border-zinc-500 p-1 rounded-full bg-zinc-700">
                <ArrowUpIcon className="rotate-45 group-hover:rotate-90 transition-transform duration-300 text-zinc-300" />
              </span>
              <span className="text-center text-base text-zinc-300">SEE ALL</span>
            </Link>
          </div>
          <div className="grid grid-cols-1 smd:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
            {relatedArticles.map((rel) => (
              <Suspense fallback={<CardSkeleton />} key={rel.id}>
                <Link
                  href={`/blog/${rel.slug}`}
                  className="cursor-pointer flex flex-col p-7 md:p-10 justify-between gap-8 w-full bg-zinc-800 border border-zinc-500 group"
                >
                  <Image
                    src={rel.coverImageUrl}
                    alt={rel.title}
                    height={400}
                    width={1000}
                    className="border border-zinc-300"
                  />
                  <div className="flex flex-col gap-2">
                    <p className="text-zinc-500">{new Date(rel.createdAt).toDateString()}</p>
                    <h1 className="text-2xl text-zinc-300">{rel.title}</h1>
                    <p className="text-zinc-300">{rel.introduction}</p>
                  </div>
                  <span className="text-zinc-400 py-1 uppercase text-sm w-fit px-2 border border-zinc-600 bg-zinc-700">
                    {rel.category?.name ?? "General"}
                  </span>
                </Link>
              </Suspense>
            ))}
          </div>
        </section>}
      </div>
    </>
  );
}

const BlogDetailsCard = ({ title, value }: { title: string; value: string }) => {
  return (
    <div className="flex justify-between gap-4 items-center bg-zinc-800 border border-zinc-700 py-3 px-4">
      <h3 className="text-zinc-500 text-sm">{title}</h3>
      <p className="text-zinc-400">{value}</p>
    </div>
  );
};
