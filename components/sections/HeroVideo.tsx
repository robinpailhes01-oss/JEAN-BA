"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Play } from "lucide-react";
import { HERO_VIDEO } from "@/lib/constants";
import { cn } from "@/lib/utils";

/**
 * Vidéo de fond du haut de page. Elle se fond par-dessus la photo une fois la
 * lecture lancée, donc la photo reste le premier affichage et le repli.
 *
 * - Pas de vidéo si l'utilisateur réduit les animations ou économise ses données.
 * - Version allégée sur mobile.
 * - Mise en pause dès que le haut de page n'est plus visible.
 * - Si le navigateur bloque la lecture automatique (mode économie d'énergie de
 *   l'iPhone, par exemple), un bouton permet de la lancer d'un toucher.
 *
 * L'état est porté par un hook : la vidéo vit en arrière-plan, le bouton au
 * premier plan, et les deux doivent le partager.
 */
export function useHeroVideo() {
  const ref = useRef<HTMLVideoElement>(null);
  const [src, setSrc] = useState<string | null>(null);
  const [playing, setPlaying] = useState(false);
  const [blocked, setBlocked] = useState(false);

  useEffect(() => {
    const connection = (
      navigator as Navigator & { connection?: { saveData?: boolean } }
    ).connection;
    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      connection?.saveData
    ) {
      return;
    }
    setSrc(
      window.matchMedia("(max-width: 767px)").matches
        ? HERO_VIDEO.mobile
        : HERO_VIDEO.desktop,
    );
  }, []);

  useEffect(() => {
    const video = ref.current;
    if (!video || !src) return;
    video.muted = true;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => setBlocked(true));
        else video.pause();
      },
      { threshold: 0.05 },
    );
    observer.observe(video);

    // Filet de sécurité : certains navigateurs ne refusent pas explicitement,
    // la lecture ne démarre simplement pas.
    const timer = window.setTimeout(() => {
      if (video.paused) setBlocked(true);
    }, 2500);

    return () => {
      observer.disconnect();
      window.clearTimeout(timer);
    };
  }, [src]);

  const handlePlaying = useCallback(() => {
    setPlaying(true);
    setBlocked(false);
  }, []);

  // Appelé depuis un toucher : le navigateur autorise alors la lecture.
  const start = useCallback(() => {
    ref.current?.play().catch(() => {});
  }, []);

  return { ref, src, playing, blocked, handlePlaying, start };
}

export type HeroVideoController = ReturnType<typeof useHeroVideo>;

export function HeroVideo({ controller }: { controller: HeroVideoController }) {
  const { ref, src, playing, handlePlaying } = controller;
  if (!src) return null;

  return (
    <video
      ref={ref}
      src={src}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      aria-hidden="true"
      tabIndex={-1}
      disablePictureInPicture
      onPlaying={handlePlaying}
      className={cn(
        "absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 motion-reduce:transition-none",
        playing ? "opacity-100" : "opacity-0",
      )}
    />
  );
}

export function HeroVideoPlay({
  controller,
}: {
  controller: HeroVideoController;
}) {
  const { blocked, playing, start } = controller;
  if (!blocked || playing) return null;

  return (
    <button
      type="button"
      onClick={start}
      className="absolute left-1/2 top-[34%] z-40 inline-flex -translate-x-1/2 items-center gap-2.5 whitespace-nowrap rounded-full border border-white/40 bg-forest-dark/55 px-5 py-3 font-sans text-xs font-semibold uppercase tracking-widest2 text-cream backdrop-blur-md transition-colors hover:bg-forest-dark/75 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-leaf-light"
    >
      <Play size={14} className="fill-current" aria-hidden="true" />
      Lancer la vidéo
    </button>
  );
}
