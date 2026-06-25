"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
  className?: string;
  /** Sens du dévoilement. */
  from?: "bottom" | "left";
};

/**
 * Dévoilement d'image « rideau » : l'image se découvre derrière un masque
 * (clip-path) tandis qu'elle se dézoome légèrement. Geste éditorial signature.
 */
export default function RevealImage({
  children,
  className,
  from = "bottom",
}: Props) {
  const reduce = useReducedMotion();

  const hidden =
    from === "left" ? "inset(0 100% 0 0)" : "inset(100% 0 0 0)";

  return (
    <motion.div
      className={cn("relative overflow-hidden", className)}
      initial={reduce ? undefined : { clipPath: hidden }}
      whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.div
        className="h-full w-full"
        initial={reduce ? undefined : { scale: 1.18 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
