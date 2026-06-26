"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";

type Props = {
  index: string;
  label: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  light?: boolean;
  className?: string;
};

/**
 * En-tête de section éditorial : filet fin, index numéroté « (01) — Label »
 * aligné à gauche, grand titre Fraunces qui se révèle derrière un masque, et
 * descriptif décalé en colonne de droite. Rompt avec le sempiternel
 * « eyebrow + titre centré » des templates.
 */
export default function SectionIntro({
  index,
  label,
  title,
  description,
  light = false,
  className,
}: Props) {
  const reduce = useReducedMotion();

  const rise: Variants = {
    hidden: { y: reduce ? 0 : "115%" },
    visible: {
      y: 0,
      transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
    },
  };
  const fade: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <motion.div
      className={cn(className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-90px" }}
    >
      <motion.div
        variants={fade}
        className={cn("hairline", light && "hairline-light")}
      />

      <div className="mt-6 grid gap-x-10 gap-y-7 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <motion.p
            variants={fade}
            className={cn(
              "flex items-center gap-3 font-sans text-xs font-semibold uppercase tracking-widest2",
              light ? "text-leaf-light" : "text-leaf-dark",
            )}
          >
            <span className="tnum tabular-nums">({index})</span>
            <span aria-hidden className="h-px w-6 bg-current opacity-50" />
            {label}
          </motion.p>

          <h2
            className={cn(
              "mt-5 max-w-3xl text-[2.5rem] font-medium leading-[0.98] tracking-[-0.025em] sm:text-[3.25rem] lg:text-[4rem]",
              light ? "text-cream" : "text-forest",
            )}
          >
            <span className="block overflow-hidden pb-[0.12em]">
              <motion.span variants={rise} className="block">
                {title}
              </motion.span>
            </span>
          </h2>
        </div>

        {description && (
          <motion.div
            variants={fade}
            className="lg:col-span-5 lg:self-end lg:pb-2"
          >
            <p
              className={cn(
                "max-w-md text-base leading-relaxed sm:text-lg",
                light ? "text-cream/75" : "text-forest-dark/70",
              )}
            >
              {description}
            </p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
