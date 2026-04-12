import ContactForm from "@/components/widgets/forms/ContactForm";
import SocialAccountsGroup from "@/components/widgets/SocialAccountsGroup";
import { PromoBlock } from "@/components/promo/PromoBlock";
import { getPromoAds, getSocialLinks } from "@/lib/db-queries";
import { PromoPlacement } from "@/generated/prisma/enums";

export const metadata = {
  title: "Contact",
  description: "Get in touch with me, and let's discuss how I can help you.",
  keywords: ["contact", "jeanerichirwa", "hirwajeaneric", "Hirwa Jean Eric", "web developer", "portfolio"],
  openGraph: {
    title: "Contact - Jean Eric Hirwa - Portfolio",
    description: "Get in touch with me, and let's discuss how I can help you.",
    url: "https://www.erichirwa.com/contact",
    siteName: "Jean Eric Hirwa - Contact",
    images: [
      {
        url: "1718313379119.jpeg",
        width: 800,
        height: 600,
      },
    ],
    locale: "en-US",
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Jean Eric Hirwa - Contact",
  "url": "https://www.erichirwa.com/contact",
  "description": "Get in touch with me, and let's discuss how I can help you.",
  "image": "/1718313379119.jpeg",
  "creator": {
    "@type": "Person",
    "name": "Jean Eric Hirwa",
    "url": "https://www.erichirwa.com/",
    "image": "/1718313379119.jpeg",
    "sameAs": [
      "https://github.com/hirwajeaneric",
      "https://www.linkedin.com/in/jean-eric-hirwa/",
      "https://medium.com/@hirwajeaneric",
      "https://www.instagram.com/hirwa_jean_eric/"
    ]
  }
}

export default async function ContactPage() {
  const socials = await getSocialLinks();
  const promos = await getPromoAds([PromoPlacement.CONTACT]);
  const promo = promos[0];
  const jssStyles = {
    backgroundImage: `linear-gradient(to bottom, rgba(39, 39, 42, 0), rgba(9, 9, 11, 1)), url("/Jean Eric - Image 1 - 684x1000.png")`,
    backgroundSize: 'contain',
    backgroundPosition: 'left',
    backgroundRepeat: 'no-repeat',
    transition: 'background-image 0.3s ease-in-out',
    willChange: 'background-image',
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="flex flex-col w-full flex-wrap justify-center bg-zinc-950 items-center">
        <div className="flex w-full justify-between flex-wrap items-start max-w-screen-xl px-4">
          <div style={jssStyles} className="hidden md:flex h-screen justify-center w-full md:w-2/5 md:justify-between items-center flex-wrap">
          </div>
          <div className="flex flex-col justify-start items-center md:items-start w-full md:w-3/5 pt-16 md:pt-14 pb-12 md:pb-20">
            <div className="flex flex-col mt-16 md:mt-32 gap-6 w-full p-6 md:p-14 bg-zinc-800 border border-zinc-700">
              <h2 className="text-zinc-300 uppercase">CONTACT</h2>
              <h3 className="text-zinc-300 text-4xl leading-normal md:font-light">Let&apos;s get in touch</h3>
              <ContactForm />
            </div>
            {promo ? (
              <div className="w-full max-w-3xl mt-8">
                <PromoBlock
                  kicker={promo.kicker}
                  headlineLead={promo.headlineLead}
                  headlineEmphasis={promo.headlineEmphasis}
                  body={promo.body}
                  ctaLabel={promo.ctaLabel}
                  ctaUrl={promo.ctaUrl}
                />
              </div>
            ) : null}
            <SocialAccountsGroup accounts={socials} />
          </div>
        </div>
      </section>
    </>
  )
}