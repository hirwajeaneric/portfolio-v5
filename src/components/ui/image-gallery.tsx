"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Gallery } from "@/database/galleries";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Image from "next/image";

interface ImageGalleryProps {
  cards: Gallery[];
}

export const ImageGallery = ({ cards }: ImageGalleryProps) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen || selectedIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
        document.body.style.overflow = "unset";
        setTimeout(() => setSelectedIndex(null), 300);
      } else if (e.key === "ArrowLeft") {
        setSelectedIndex((prev) => {
          if (prev === null) return null;
          return (prev - 1 + cards.length) % cards.length;
        });
      } else if (e.key === "ArrowRight") {
        setSelectedIndex((prev) => {
          if (prev === null) return null;
          return (prev + 1) % cards.length;
        });
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, selectedIndex, cards.length]);

  const handleOpen = (index: number) => {
    setSelectedIndex(index);
    setIsOpen(true);
    document.body.style.overflow = "hidden";
  };

  const handleClose = () => {
    setIsOpen(false);
    document.body.style.overflow = "unset";
    setTimeout(() => setSelectedIndex(null), 300);
  };

  const handleNext = () => {
    setSelectedIndex((prev) => {
      if (prev === null) return null;
      return (prev + 1) % cards.length;
    });
  };

  const handlePrevious = () => {
    setSelectedIndex((prev) => {
      if (prev === null) return null;
      return (prev - 1 + cards.length) % cards.length;
    });
  };

  if (cards.length === 0) return null;

  return (
    <>
      {/* Gallery Grid */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {cards.map((card, index) => (
          <motion.div
            key={card.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.4 }}
            className="group relative aspect-video overflow-hidden rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-900 cursor-pointer"
            onClick={() => handleOpen(index)}
          >
            <Image
              src={card.thumbnail}
              alt={card.name || `Gallery image ${index + 1}`}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-110"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
            {/* Overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            {/* Image info on hover - only show if name or description exists */}
            {(card.name || card.description) && (
              <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                {card.name && (
                  <h4 className="text-white font-semibold text-sm md:text-base mb-1">
                    {card.name}
                  </h4>
                )}
                {card.description && (
                  <p className="text-zinc-300 text-xs md:text-sm line-clamp-2">
                    {card.description}
                  </p>
                )}
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Modal/Dialog - Rendered via Portal */}
      {mounted &&
        createPortal(
          <AnimatePresence>
            {isOpen && selectedIndex !== null && (
              <>
                {/* Backdrop */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="fixed inset-0 z-[9999] bg-black/90 backdrop-blur-sm"
                  onClick={handleClose}
                />

                {/* Modal Content */}
                <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 pointer-events-none">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    className="relative w-full max-w-6xl h-[70vh] max-h-[70vh] flex flex-col pointer-events-auto"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {/* Close Button */}
                    <button
                      onClick={handleClose}
                      className="absolute -top-12 right-0 z-10 p-2 rounded-full border border-zinc-300 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-900 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors duration-200 group"
                      aria-label="Close gallery"
                    >
                      <X className="w-5 h-5 text-zinc-800 dark:text-zinc-200 group-hover:rotate-90 transition-transform duration-200" />
                    </button>

                    {/* Image Container - Fixed height */}
                    <div className="relative w-full flex-1 min-h-0 rounded-lg overflow-hidden border border-zinc-300 dark:border-zinc-700 bg-zinc-900">
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={selectedIndex}
                          initial={{ opacity: 0, x: 100 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -100 }}
                          transition={{ duration: 0.3 }}
                          className="absolute inset-0 w-full h-full"
                        >
                          <Image
                            src={cards[selectedIndex].thumbnail}
                            alt={cards[selectedIndex].name || `Gallery image ${selectedIndex + 1}`}
                            fill
                            className="object-contain"
                            priority
                            sizes="90vw"
                          />
                        </motion.div>
                      </AnimatePresence>

                      {/* Navigation Arrows */}
                      {cards.length > 1 && (
                        <>
                          <button
                            onClick={handlePrevious}
                            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full border border-zinc-300 dark:border-zinc-700 bg-zinc-100/90 dark:bg-zinc-900/90 backdrop-blur-sm hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-all duration-200 group z-10"
                            aria-label="Previous image"
                          >
                            <ChevronLeft className="w-6 h-6 text-zinc-800 dark:text-zinc-200 group-hover:scale-110 transition-transform duration-200" />
                          </button>
                          <button
                            onClick={handleNext}
                            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full border border-zinc-300 dark:border-zinc-700 bg-zinc-100/90 dark:bg-zinc-900/90 backdrop-blur-sm hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-all duration-200 group z-10"
                            aria-label="Next image"
                          >
                            <ChevronRight className="w-6 h-6 text-zinc-800 dark:text-zinc-200 group-hover:scale-110 transition-transform duration-200" />
                          </button>
                        </>
                      )}
                    </div>

                    {/* Image Info - Fixed height to prevent shifting */}
                    <div className="mt-4 flex items-start justify-between min-h-[80px] flex-shrink-0">
                      <div className="flex-1 pr-4">
                        {cards[selectedIndex].name ? (
                          <h3 className="text-xl md:text-2xl font-semibold text-zinc-800 dark:text-zinc-200 mb-1">
                            {cards[selectedIndex].name}
                          </h3>
                        ) : (
                          <h3 className="text-xl md:text-2xl font-semibold text-zinc-800 dark:text-zinc-200 mb-1">
                            Gallery Image {selectedIndex + 1}
                          </h3>
                        )}
                        {cards[selectedIndex].description && (
                          <p className="text-zinc-600 dark:text-zinc-400 text-sm md:text-base line-clamp-2">
                            {cards[selectedIndex].description}
                          </p>
                        )}
                      </div>
                      {/* Image Counter */}
                      <div className="ml-4 px-4 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-900 flex-shrink-0">
                        <span className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
                          {selectedIndex + 1} / {cards.length}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </>
            )}
          </AnimatePresence>,
          document.body
        )}
    </>
  );
};

