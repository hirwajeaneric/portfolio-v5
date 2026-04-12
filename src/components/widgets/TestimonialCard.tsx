import Image from "next/image";

export type TestimonialView = {
  companyLogoUrl?: string | null;
  headline?: string | null;
  quote: string;
  avatarUrl?: string | null;
  authorName: string;
  authorRole?: string | null;
};

type Props = {
  testimonial: TestimonialView;
};

export default function TestimonialCard({ testimonial }: Props) {
  return (
    <div className="flex flex-col md:text-end border w-full sm:w-[49%] lg:w-[49%] mb-8 border-zinc-600 hover:border-zinc-200 transition-all duration-300 p-8 lg:p-12 bg-zinc-800">
      {testimonial.companyLogoUrl ? (
        <Image src={testimonial.companyLogoUrl} height={60} width={60} alt="" className="object-contain" />
      ) : null}
      {testimonial.headline ? <h3 className="text-start text-2xl mt-6 mb-4 text-zinc-300">{testimonial.headline}</h3> : null}
      <p className="text-start text-zinc-300">{testimonial.quote}</p>
      <div className="flex justify-start mt-8 gap-4 items-center">
        {testimonial.avatarUrl ? (
          <Image
            src={testimonial.avatarUrl.startsWith("/") ? testimonial.avatarUrl : `/${testimonial.avatarUrl}`}
            height={60}
            width={60}
            className="rounded-full"
            alt=""
          />
        ) : null}
        <div className="flex flex-col items-start justify-start">
          <h4 className="text-lg font-semibold text-zinc-300">{testimonial.authorName}</h4>
          {testimonial.authorRole ? <p className="text-zinc-300">{testimonial.authorRole}</p> : null}
        </div>
      </div>
    </div>
  );
}
