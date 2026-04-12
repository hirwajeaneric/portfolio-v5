import Safari from "@/components/ui/safari";

type Props = {
    image: string,
}

export function SafariBrowserTemplate({ image }: Props) {
    return (
        <Safari
            url="magicui.design"
            className="size-full bg-zinc-800"
            src={image || ""}
        />
    );
}
