"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Gallery } from "@/database/galleries";

export const LayoutGrid = ({ cards }: { cards: Gallery[] }) => {
    const [selected, setSelected] = useState<Gallery | null>(null);
    const [lastSelected, setLastSelected] = useState<Gallery | null>(null);

    const handleClick = (card: Gallery) => {
        setLastSelected(selected);
        setSelected(card);
    };

    const handleOutsideClick = () => {
        setLastSelected(selected);
        setSelected(null);
    };

    return (
        <div className="w-full h-full grid grid-cols-1 md:grid-cols-2 mx-auto gap-4 relative">
            {cards.map((card, i) => (
                <div key={i} className={"col-span-1 border border-zinc-500"}>
                    <motion.div
                        onClick={() => handleClick(card)}
                        className={cn(
                            "col-span-1 relative overflow-hidden h-auto",
                            selected?.id === card.id
                                ? " cursor-pointer absolute inset-0 h-1/2 w-full md:w-1/2 m-auto z-50 flex justify-center items-center flex-wrap flex-col"
                                : lastSelected?.id === card.id
                                    ? "z-40 bg-white h-full w-full"
                                    : "bg-white  h-full w-full"
                        )}
                        layoutId={`card-${card.id}`}
                    >
                        {selected?.id === card.id && <SelectedGallery selected={selected} />}
                        <ImageComponent card={card} />
                    </motion.div>
                </div>
            ))}
            <motion.div
                onClick={handleOutsideClick}
                className={cn(
                    "absolute h-full w-full left-0 top-0 bg-black opacity-0 z-10",
                    selected?.id ? "pointer-events-auto" : "pointer-events-none"
                )}
                animate={{ opacity: selected?.id ? 0.3 : 0 }}
            />
        </div>
    );
};

const ImageComponent = ({ card }: { card: Gallery }) => {
    return (
        <motion.img
            layoutId={`image-${card.id}-image`}
            src={card.thumbnail}
            height="500"
            width="500"
            className={cn(
                "object-cover object-top absolute inset-0 h-full w-full transition duration-200"
            )}
            alt="thumbnail"
        />
    );
};

const SelectedGallery = ({ selected }: { selected: Gallery | null }) => {
    return (
        <div className="bg-transparent h-full w-full flex border border-zinc-500 flex-col justify-end shadow-2xl relative z-[60]">
            <motion.div
                initial={{
                    opacity: 0,
                }}
                animate={{
                    opacity: 0.6,
                }}
                className="absolute inset-0 h-full w-full bg-black opacity-60 z-10"
            />
            <motion.div
                layoutId={`content-${selected?.id}`}
                initial={{
                    opacity: 0,
                    y: 100,
                }}
                animate={{
                    opacity: 1,
                    y: 0,
                }}
                exit={{
                    opacity: 0,
                    y: 100,
                }}
                transition={{
                    duration: 0.3,
                    ease: "easeInOut",
                }}
                className="relative px-8 pb-4 z-[70]"
            >
                <div>
                    <p className="md:text-2xl text-xl font-semibold text-white">
                        {selected?.name}
                    </p>
                    <p className="font-normal text-base text-white"></p>
                    <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
                        {selected?.description}
                    </p>
                </div>
            </motion.div>
        </div>
    );
};
