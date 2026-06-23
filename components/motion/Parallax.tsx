"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
  /** Amplitude du déplacement en px (positif = descend au défilement). */
  amount?: number;
  className?: string;
};

/**
 * Effet de profondeur : l'élément se déplace légèrement à contre-courant du
 * défilement. Subtil — la photo "respire" sans distraire.
 */
export default function Parallax({ children, amount = 60, className }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    reduce ? [0, 0] : [amount, -amount],
  );

  return (
    <div ref={ref} className={cn(className)}>
      <motion.div style={{ y }} className="h-full w-full">
        {children}
      </motion.div>
    </div>
  );
}
