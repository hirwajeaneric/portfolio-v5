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
        <div className="w-full max-w-screen-2xl h-full grid grid-cols-1 md:grid-cols-2 mx-auto gap-4 md:gap-6 relative">
            {cards.map((card, i) => (
                <div key={i} className={cn(
                    "col-span-1 h-72 md:h-80 lg:h-96 border border-zinc-300 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-900",
                    "hover:border-zinc-400 dark:hover:border-zinc-600 transition-all duration-300",
                    "group cursor-pointer overflow-hidden"
                )}>
                    <motion.div
                        onClick={() => handleClick(card)}
                        className={cn(
                            "col-span-1 relative overflow-hidden h-full w-full",
                            selected?.id === card.id
                                ? "cursor-pointer absolute h-72 md:h-80 lg:h-96 w-full md:w-1/2 m-auto z-50 flex justify-center items-center flex-wrap flex-col"
                                : lastSelected?.id === card.id
                                    ? "z-40 h-full w-full"
                                    : "h-full w-full"
                        )}
                        layoutId={`card-${card.id}`}
                        whileHover={{ scale: selected?.id === card.id ? 1 : 1.02 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                    >
                        {selected?.id === card.id && <SelectedGallery selected={selected} />}
                        <ImageComponent card={card} />
                        {selected?.id !== card.id && (
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
                        )}
                    </motion.div>
                </div>
            ))}
            <motion.div
                onClick={handleOutsideClick}
                className={cn(
                    "absolute h-full w-full left-0 top-0 bg-black opacity-0 z-10",
                    selected?.id ? "pointer-events-auto" : "pointer-events-none"
                )}
                animate={{ opacity: selected?.id ? 0.5 : 0 }}
                transition={{ duration: 0.3 }}
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
                "object-cover object-center absolute inset-0 h-full w-full transition-all duration-300",
                "group-hover:scale-105"
            )}
            alt={card.name || "Gallery thumbnail"}
        />
    );
};

const SelectedGallery = ({ selected }: { selected: Gallery | null }) => {
    return (
        <div className="bg-transparent h-full w-full flex border border-zinc-300 dark:border-zinc-600 flex-col justify-end shadow-2xl relative z-[60] rounded-lg overflow-hidden">
            <motion.div
                initial={{
                    opacity: 0,
                }}
                animate={{
                    opacity: 0.7,
                }}
                className="absolute inset-0 h-full w-full bg-gradient-to-t from-black via-black/80 to-black/40 z-10"
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
                className="relative px-6 md:px-8 pb-6 md:pb-8 z-[70]"
            >
                <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-3">
                        <div className="h-px w-8 bg-white/60"></div>
                        <p className="md:text-2xl text-xl font-semibold text-white">
                            {selected?.name}
                        </p>
                    </div>
                    {selected?.description && (
                        <p className="font-normal text-sm md:text-base my-2 max-w-lg text-zinc-200 leading-relaxed">
                            {selected?.description}
                        </p>
                    )}
                </div>
            </motion.div>
        </div>
    );
};
