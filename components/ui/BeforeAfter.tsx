"use client";

import { useRef, useState, useCallback } from "react";
import Image from "next/image";
import { MoveHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

type Img = { src: string; alt: string };

type Props = {
  before: Img;
  after: Img;
  className?: string;
};

/**
 * Slider avant/après : l'image "après" sert de fond, l'image "avant" est
 * révélée par un curseur déplaçable (souris, tactile, clavier).
 */
export default function BeforeAfter({ before, after, className }: Props) {
  const [pos, setPos] = useState(50);
  const ref = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const setFromClientX = useCallback((clientX: number) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const p = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.max(0, Math.min(100, p)));
  }, []);

  return (
    <div
      ref={ref}
      className={cn(
        "group relative aspect-[3/4] w-full cursor-ew-resize select-none overflow-hidden rounded-2xl shadow-card",
        className,
      )}
      onPointerDown={(e) => {
        dragging.current = true;
        e.currentTarget.setPointerCapture?.(e.pointerId);
        setFromClientX(e.clientX);
      }}
      onPointerMove={(e) => {
        if (dragging.current) setFromClientX(e.clientX);
      }}
      onPointerUp={() => {
        dragging.current = false;
      }}
      onPointerCancel={() => {
        dragging.current = false;
      }}
    >
      {/* APRÈS — image de fond */}
      <Image
        src={after.src}
        alt={after.alt}
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        className="object-cover"
      />

      {/* AVANT — révélée de la gauche jusqu'au curseur */}
      <div
        className="absolute inset-0"
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
      >
        <Image
          src={before.src}
          alt={before.alt}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
        />
      </div>

      {/* Étiquettes */}
      <span className="pointer-events-none absolute left-3 top-3 rounded-full bg-forest-dark/70 px-3 py-1 text-xs font-semibold uppercase tracking-widest2 text-white backdrop-blur-sm">
        Avant
      </span>
      <span className="pointer-events-none absolute right-3 top-3 rounded-full bg-leaf/90 px-3 py-1 text-xs font-semibold uppercase tracking-widest2 text-white backdrop-blur-sm">
        Après
      </span>

      {/* Ligne + poignée */}
      <div
        className="pointer-events-none absolute inset-y-0 z-10 w-0.5 bg-white/90 shadow-[0_0_12px_rgba(0,0,0,0.35)]"
        style={{ left: `${pos}%`, transform: "translateX(-50%)" }}
      >
        <div className="absolute top-1/2 left-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-forest shadow-card transition-transform duration-300 group-hover:scale-110">
          <MoveHorizontal size={20} />
        </div>
      </div>

      {/* Contrôle accessible (clavier) */}
      <input
        type="range"
        min={0}
        max={100}
        value={pos}
        onChange={(e) => setPos(Number(e.target.value))}
        aria-label={`Comparer avant et après : ${after.alt}`}
        className="sr-only"
      />
    </div>
  );
}
