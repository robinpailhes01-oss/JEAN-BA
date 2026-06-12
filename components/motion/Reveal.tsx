"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
  delay?: number;
  /** Sens du déplacement à l'apparition. */
  direction?: "up" | "down" | "left" | "right" | "none";
  className?: string;
  as?: "div" | "span" | "li";
};

/**
 * Scroll reveal "luxe" : lent (0.7s) et subtil.
 * Les animations SERVENT le contenu — translation discrète + fondu.
 */
export default function Reveal({
  children,
  delay = 0,
  direction = "up",
  className,
  as = "div",
}: Props) {
  const reduce = useReducedMotion();

  const offset = 28;
  const initialOffset = {
    up: { y: offset },
    down: { y: -offset },
    left: { x: offset },
    right: { x: -offset },
    none: {},
  }[direction];

  const variants: Variants = {
    hidden: { opacity: 0, ...(reduce ? {} : initialOffset) },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: 0.7,
        delay,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const MotionTag = motion[as];

  return (
    <MotionTag
      className={cn(className)}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
    >
      {children}
    </MotionTag>
  );
}
