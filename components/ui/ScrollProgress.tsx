"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/**
 * Fine barre de progression de lecture en haut de page.
 * Détail discret qui signe le soin apporté à l'expérience.
 */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-gradient-to-r from-leaf-dark via-leaf to-leaf-light"
      aria-hidden
    />
  );
}
