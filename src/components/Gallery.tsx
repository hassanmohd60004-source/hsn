"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import Image from "next/image";
import { GalleryImage } from "@/config/wedding";

interface GalleryProps {
  images: GalleryImage[];
}

export default function Gallery({ images }: GalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => {
    setSelectedIndex(index);
  };

  const closeLightbox = () => {
    setSelectedIndex(null);
  };

  const showNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIndex === null) return;
    setSelectedIndex((selectedIndex + 1) % images.length);
  };

  const showPrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIndex === null) return;
    setSelectedIndex((selectedIndex - 1 + images.length) % images.length);
  };

  return (
    <section id="gallery" className="relative py-24 px-6 bg-[#F7F5F2]">
      <div className="max-w-5xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <span className="text-xs text-[#C8A46B] tracking-[0.2em] uppercase font-english">
            Photo Gallery
          </span>
          <h2 className="text-3xl md:text-4xl font-bold font-arabic text-[#1A1A1A]">
            معرض الصور
          </h2>
          <div className="w-12 h-[2px] bg-[#C8A46B] mx-auto mt-2" />
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {images.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -6 }}
              onClick={() => openLightbox(index)}
              className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-[#DFD5C6]/40 shadow-sm cursor-pointer group bg-white"
            >
              {/* Next.js optimized Image */}
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(max-w-700px) 100vw, 300px"
                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-[#1A1A1A]/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                <div className="flex items-center justify-between text-white">
                  <div className="text-right">
                    <p className="text-xs text-[#C8A46B] font-english uppercase tracking-wider">
                      Details
                    </p>
                    <h4 className="text-sm font-bold font-arabic">
                      {image.title || image.alt}
                    </h4>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <ZoomIn className="w-4 h-4 text-white" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Lightbox Modal */}
        <AnimatePresence>
          {selectedIndex !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeLightbox}
              className="fixed inset-0 z-50 bg-[#1A1A1A]/95 flex items-center justify-center p-4"
            >
              {/* Close Button */}
              <button
                onClick={closeLightbox}
                className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer z-50"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Prev Button */}
              <button
                onClick={showPrev}
                className="absolute left-4 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer z-50"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              {/* Next Button */}
              <button
                onClick={showNext}
                className="absolute right-4 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer z-50"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Zoomable Image Container */}
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                onClick={(e) => e.stopPropagation()}
                className="relative max-w-4xl w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border border-white/10"
              >
                <Image
                  src={images[selectedIndex].src}
                  alt={images[selectedIndex].alt}
                  fill
                  sizes="(max-w-1200px) 100vw, 1000px"
                  className="object-contain"
                  priority
                />

                {/* Subtitle inside lightbox */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-center text-white">
                  <p className="text-xs text-[#C8A46B] font-english uppercase tracking-widest mb-1">
                    Photo {selectedIndex + 1} of {images.length}
                  </p>
                  <h3 className="text-lg font-bold font-arabic">
                    {images[selectedIndex].title || images[selectedIndex].alt}
                  </h3>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
