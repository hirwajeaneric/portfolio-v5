import SocialAccountsGroup from "@/components/widgets/SocialAccountsGroup";

export const metadata = {
  title: "Contact",
  description: "Get in touch with me, and let's discuss how I can help you.",
  keywords: ["contact", "jeanerichirwa", "hirwajeaneric", "Hirwa Jean Eric", "web developer", "portfolio"],
  openGraph: {
    openGraph: {
      title: "Contact - Jean Eric Hirwa - Portfolio",
      description: "Get in touch with me, and let's discuss how I can help you.",
      url: "https://hirwajeaneric.netlify.app/contact",
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
    }
  }
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Jean Eric Hirwa - Contact",
  "url": "https://hirwajeaneric.netlify.app/contact",
  "description": "Get in touch with me, and let's discuss how I can help you.",
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

export default function page() {
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
            <div className="flex flex-col mt-16 md:mt-32 gap-6 w-full p-6 md:p-14 bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700">
              <h2 className="text-zinc-400 uppercase">CONTACT</h2>
              <h3 className="text-zinc-300 text-4xl leading-normal md:font-light">Let&apos;s get in touch</h3>
              <form action="">
                <input type="text" name="name" id="name" placeholder="Name" className="w-full p-2 md:p-4 bg-zinc-100 dark:bg-zinc-700 rounded-sm" />
                <input type="email" name="email" id="email" placeholder="Email" className="w-full p-2 md:p-4 bg-zinc-100 dark:bg-zinc-700 rounded-sm mt-4" />
                <textarea name="message" id="message" placeholder="Message" rows={4} className="w-full p-2 md:p-4 bg-zinc-100 dark:bg-zinc-700 rounded-sm mt-4" />
                <button type="submit" className="w-full p-2 md:p-4 bg-zinc-300 rounded-sm mt-4 text-black text-base md:text-xl font-semibold">Send Message</button>
              </form>
            </div>
            <SocialAccountsGroup />
          </div>
        </div>
      </section>
    </>
  )
}