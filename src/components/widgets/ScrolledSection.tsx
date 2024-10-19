import { VelocityScroll } from "@/components/ui/scroll-based-velocity";
 
export default function ScrolledSection() {
  return (
    <VelocityScroll
      text="- LET'S TALK"
      default_velocity={5}
      className="font-display bg-zinc-800 border border-zinc-500 text-center text-2xl tracking-[-0.02em] text-black drop-shadow-sm dark:text-white md:text-6xl md:leading-[5rem] "
    />
  );
}