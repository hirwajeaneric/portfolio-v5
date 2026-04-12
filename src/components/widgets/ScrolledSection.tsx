import { VelocityScroll } from "@/components/ui/scroll-based-velocity";
 
export default function ScrolledSection() {
  return (
    <VelocityScroll
      text="+ LET'S TALK"
      default_velocity={5}
      className="font-display bg-zinc-800 border border-zinc-500 py-4 md:py-0 text-center text-base tracking-[-0.02em] text-zinc-300 drop-shadow-sm dark:text-white md:leading-[5rem] "
    />
  );
}