"use client";

import { useEffect, useRef } from "react";
import {
  useInView,
  useMotionValue,
  useReducedMotion,
  animate,
} from "framer-motion";

type Props = {
  value: number;
  suffix?: string;
  duration?: number;
  className?: string;
};

/**
 * Compteur qui s'incrémente quand il entre dans le champ de vision.
 * Donne du poids aux chiffres clés — un réflexe des sites premium.
 */
export default function CountUp({
  value,
  suffix = "",
  duration = 1.6,
  className,
}: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduce = useReducedMotion();
  const mv = useMotionValue(0);

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      if (ref.current) ref.current.textContent = `${value}${suffix}`;
      return;
    }
    const controls = animate(mv, value, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => {
        if (ref.current) {
          ref.current.textContent = `${Math.round(v)}${suffix}`;
        }
      },
    });
    return () => controls.stop();
  }, [inView, value, suffix, duration, reduce, mv]);

  return (
    <span ref={ref} className={className}>
      0{suffix}
    </span>
  );
}
