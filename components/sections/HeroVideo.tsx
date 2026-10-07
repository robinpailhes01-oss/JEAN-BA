"use client";

import { useEffect, useRef, useState } from "react";
import { HERO_VIDEO } from "@/lib/constants";
import { cn } from "@/lib/utils";

/**
 * Vidéo de fond du haut de page. Elle se fond par-dessus la photo une fois la
 * lecture lancée, donc la photo reste le premier affichage et le repli.
 *
 * - Pas de vidéo si l'utilisateur réduit les animations ou économise ses données.
 * - Version allégée sur mobile.
 * - Mise en pause dès que le haut de page n'est plus visible.
 */
export default function HeroVideo() {
  const ref = useRef<HTMLVideoElement>(null);
  const [src, setSrc] = useState<string | null>(null);
  const [playing, setPlaying] = useState(false);

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
        if (entry.isIntersecting) video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0.05 },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, [src]);

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
      onPlaying={() => setPlaying(true)}
      className={cn(
        "absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 motion-reduce:transition-none",
        playing ? "opacity-100" : "opacity-0",
      )}
    />
  );
}
