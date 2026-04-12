import Link from "next/link";
import { ArrowRight } from "lucide-react";

export type PromoBlockProps = {
  kicker: string;
  headlineLead: string;
  headlineEmphasis: string;
  body: string;
  ctaLabel: string;
  ctaUrl: string;
};

/** Renders body with **segments** as bold (simple markdown subset). */
function RichBody({ text }: { text: string }) {
  const parts = text.split(/\*\*(.+?)\*\*/g);
  return (
    <p className="text-zinc-400 text-sm md:text-base leading-relaxed">
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <strong key={i} className="text-zinc-200">
            {part}
          </strong>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </p>
  );
}

export function PromoBlock({ kicker, headlineLead, headlineEmphasis, body, ctaLabel, ctaUrl }: PromoBlockProps) {
  return (
    <section className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-6 py-8 md:px-10 md:py-10 text-left shadow-sm">
      <p className="text-xs md:text-sm uppercase tracking-widest text-zinc-300 mb-3">{kicker}</p>
      <h2 className="text-2xl md:text-4xl font-extralight text-zinc-300 leading-tight mb-4">
        {headlineLead}
        <strong className="font-semibold text-zinc-300"> {headlineEmphasis}</strong>
      </h2>
      <RichBody text={body} />
      <Link
        href={ctaUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 mt-6 px-5 py-3 bg-zinc-600 hover:bg-zinc-500 text-zinc-50 text-sm font-medium transition-colors rounded-full border border-zinc-500"
      >
        {ctaLabel}
        <ArrowRight className="h-4 w-4" />
      </Link>
    </section>
  );
}
