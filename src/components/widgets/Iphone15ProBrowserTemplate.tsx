import Iphone15Pro from "@/components/ui/iphone-15-pro";

type Props = {
  image: string
}

export function Iphone15ProBrowserTemplate({ image }: Props) {
  return (
      <Iphone15Pro
        className="size-full"
        src={image || "https://via.placeholder.com/430x880"}
      />
  );
}
