import { Testimonal } from "@/database/testimonials"
import Image from "next/image"

type Props = {
  testimonial: Testimonal
}

export default function TestimonialCard({ testimonial }: Props) {
  return (
    <div className="flex flex-col md:text-end border w-full sm:w-[49%] lg:w-[49%] mb-8 border-zinc-800 dark:border-zinc-600 p-8 lg:p-12 bg-zinc-200 dark:bg-zinc-800">
      <Image src={testimonial.logo} height={60} width={60} alt="" />
      <h3 className="text-start text-2xl mt-6 mb-4">{testimonial.title}</h3>
      <p className="text-start">{testimonial.description}</p>
      <div className="flex justify-start mt-8 gap-6 items-center">
        <Image src={`/${testimonial.image}`} height={80} width={80} className="rounded-full" alt="" />
        <div className="flex flex-col items-start justify-start">
          <h4 className="text-lg font-semibold">{testimonial.name}</h4>
          <p>{testimonial.role}</p>
        </div>
      </div>
    </div>
  )
}
