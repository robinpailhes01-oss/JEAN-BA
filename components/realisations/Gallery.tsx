"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { REALISATIONS, CATEGORIES, type Category } from "@/lib/constants";
import { cn } from "@/lib/utils";

export default function Gallery() {
  const [active, setActive] = useState<Category>("Tout");
  const [lightbox, setLightbox] = useState<number | null>(null);

  const filtered =
    active === "Tout"
      ? REALISATIONS
      : REALISATIONS.filter((r) => r.category === active);

  const close = useCallback(() => setLightbox(null), []);
  const next = useCallback(
    () => setLightbox((i) => (i === null ? i : (i + 1) % filtered.length)),
    [filtered.length],
  );
  const prev = useCallback(
    () =>
      setLightbox((i) =>
        i === null ? i : (i - 1 + filtered.length) % filtered.length,
      ),
    [filtered.length],
  );

  // Navigation clavier dans la lightbox
  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [lightbox, close, next, prev]);

  return (
    <>
      {/* Filtres */}
      <div className="flex flex-wrap justify-center gap-2.5">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setActive(cat)}
            className={cn(
              "rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-300 ease-smooth",
              active === cat
                ? "bg-forest text-cream shadow-soft"
                : "bg-white text-forest-dark/70 hover:bg-beige",
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grille masonry */}
      <motion.div
        layout
        className="mt-12 columns-1 gap-5 sm:columns-2 lg:columns-3 [&>*]:mb-5"
      >
        <AnimatePresence mode="popLayout">
          {filtered.map((r, i) => (
            <motion.button
              key={r.src}
              layout
              type="button"
              onClick={() => setLightbox(i)}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="group relative block w-full overflow-hidden rounded-2xl shadow-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-leaf"
            >
              <Image
                src={r.src}
                alt={r.alt}
                width={800}
                height={r.span === "tall" ? 1100 : r.span === "wide" ? 560 : 800}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="w-full object-cover transition-transform duration-[900ms] ease-smooth group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest-dark/70 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <div className="absolute bottom-0 left-0 w-full translate-y-2 p-5 text-left opacity-0 transition-all duration-500 ease-smooth group-hover:translate-y-0 group-hover:opacity-100">
                <p className="text-xs font-semibold uppercase tracking-widest2 text-leaf-light">
                  {r.category}
                </p>
                <p className="mt-1 font-display text-lg text-white">{r.title}</p>
              </div>
            </motion.button>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && filtered[lightbox] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-forest-dark/95 p-4"
            onClick={close}
            role="dialog"
            aria-modal="true"
            aria-label={filtered[lightbox].title}
          >
            <button
              type="button"
              onClick={close}
              aria-label="Fermer"
              className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
            >
              <X size={24} />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              aria-label="Précédent"
              className="absolute left-3 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 sm:left-6"
            >
              <ChevronLeft size={26} />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              aria-label="Suivant"
              className="absolute right-3 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 sm:right-6"
            >
              <ChevronRight size={26} />
            </button>

            <motion.figure
              key={filtered[lightbox].src}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="relative max-h-[85vh] w-full max-w-4xl"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={filtered[lightbox].src}
                alt={filtered[lightbox].alt}
                width={1500}
                height={1000}
                className="mx-auto max-h-[80vh] w-auto rounded-xl object-contain"
              />
              <figcaption className="mt-4 text-center text-cream">
                <span className="text-xs font-semibold uppercase tracking-widest2 text-leaf-light">
                  {filtered[lightbox].category}
                </span>
                <p className="mt-1 font-display text-xl">
                  {filtered[lightbox].title}
                </p>
              </figcaption>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
