"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&q=80&w=1600";

export default function StudioGallery({ images = [], title = "Studio" }) {
  const gallery = useMemo(() => {
    const unique = Array.from(
      new Set((images || []).filter((image) => typeof image === "string" && image))
    );

    return unique.length > 0 ? unique : [FALLBACK_IMAGE];
  }, [images]);

  const [activeIndex, setActiveIndex] = useState(0);
  const currentIndex = Math.min(activeIndex, gallery.length - 1);
  const currentImage = gallery[currentIndex];

  const goTo = (direction) => {
    setActiveIndex(
      (current) => (current + direction + gallery.length) % gallery.length
    );
  };

  return (
    <div className="mb-10 overflow-hidden rounded-3xl border border-slate-800/80 bg-slate-900 shadow-2xl">
      <div className="relative h-[480px] w-full md:h-[540px]">
        <Image
          width={1600}
          height={900}
          src={currentImage}
          alt={`${title} photo ${currentIndex + 1}`}
          className="h-full w-full object-cover"
          unoptimized={currentImage.startsWith("data:")}
        />

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#090d14]/80 via-transparent to-black/30" />

        {gallery.length > 1 && (
          <>
            <button
              type="button"
              onClick={() => goTo(-1)}
              aria-label="Previous photo"
              className="absolute left-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/45 text-white backdrop-blur-sm transition hover:bg-black/65"
            >
              <IconChevronLeft size={20} />
            </button>

            <button
              type="button"
              onClick={() => goTo(1)}
              aria-label="Next photo"
              className="absolute right-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/45 text-white backdrop-blur-sm transition hover:bg-black/65"
            >
              <IconChevronRight size={20} />
            </button>

            <span className="absolute bottom-4 right-4 rounded-full border border-white/20 bg-black/55 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
              {currentIndex + 1} / {gallery.length}
            </span>
          </>
        )}
      </div>

      {gallery.length > 1 && (
        <div className="grid grid-cols-4 gap-3 p-3 sm:grid-cols-6 md:grid-cols-8">
          {gallery.map((image, index) => (
            <button
              key={`${image.slice(0, 32)}-${index}`}
              type="button"
              onClick={() => setActiveIndex(index)}
              aria-label={`View photo ${index + 1}`}
              className={`relative aspect-[4/3] overflow-hidden rounded-lg border transition ${
                index === currentIndex
                  ? "border-amber-400"
                  : "border-white/10 opacity-70 hover:opacity-100"
              }`}
            >
              <Image
                src={image}
                alt=""
                fill
                sizes="120px"
                className="object-cover"
                unoptimized={image.startsWith("data:")}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
