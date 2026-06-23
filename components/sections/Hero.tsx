"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import { ArrowRight, Phone, Sparkles } from "lucide-react";
import Button from "@/components/ui/Button";
import { SITE } from "@/lib/constants";

const HEADLINE = ["Créateur", "de", "jardins", "d'exception"];

const TRUST = [
  "+15 ans d'expérience",
  "Devis gratuit sous 48 h",
  "Artisan local · Nîmes & Gard",
];

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Parallax : l'image descend, le contenu remonte, le tout se fond au défilement
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "22%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "-14%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const container: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.09, delayChildren: 0.15 } },
  };
  const item: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] },
    },
  };
  const word: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : "110%" },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section
      ref={ref}
      className="relative flex h-[100svh] min-h-[640px] items-center justify-center overflow-hidden"
    >
      {/* Fond photo — Ken Burns + parallax */}
      <motion.div style={{ y: imageY }} className="absolute inset-0 -z-10">
        <div className="absolute inset-0 animate-kenburns motion-reduce:animate-none">
          <Image
            src="/images/hero.jpg"
            alt="Olivier taillé en nuage dans un jardin d'exception réalisé par Jean Ba Paysagiste à Nîmes"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>
        {/* Dégradés étagés : lisibilité du texte + profondeur cinématographique */}
        <div className="absolute inset-0 bg-gradient-to-b from-forest-dark/70 via-forest-dark/35 to-forest-dark/80" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(20,38,8,0.55)_100%)]" />
      </motion.div>

      {/* Grain de film sur toute la scène */}
      <div className="grain pointer-events-none absolute inset-0 -z-10" />

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        variants={container}
        initial="hidden"
        animate="visible"
        className="container-content flex flex-col items-center text-center text-white"
      >
        {/* Eyebrow */}
        <motion.p
          variants={item}
          className="flex items-center gap-2.5 rounded-full border border-white/20 bg-white/5 px-4 py-1.5 font-sans text-[0.7rem] font-semibold uppercase tracking-widest2 text-cream backdrop-blur-sm"
        >
          <Sparkles size={13} className="text-leaf-light" />
          Paysagiste à {SITE.city} · {SITE.department}
        </motion.p>

        {/* Titre — révélation mot à mot */}
        <h1 className="mt-7 max-w-4xl text-[2.6rem] font-medium leading-[1.02] tracking-[-0.02em] drop-shadow-[0_2px_24px_rgba(0,0,0,0.35)] sm:text-6xl lg:text-[5rem]">
          {HEADLINE.map((w, i) => (
            <span key={i} className="inline-block overflow-hidden align-bottom">
              <motion.span variants={word} className="inline-block">
                {w}
                {i < HEADLINE.length - 1 && " "}
              </motion.span>
            </span>
          ))}
        </h1>

        {/* Sous-titre */}
        <motion.p
          variants={item}
          className="mt-7 max-w-xl text-base leading-relaxed text-cream/90 drop-shadow sm:text-lg"
        >
          De la conception à l&apos;entretien, nous dessinons des extérieurs qui
          vous ressemblent — pensés pour durer, vécus au quotidien.
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={item}
          className="mt-9 flex flex-col gap-3 sm:flex-row"
        >
          <Button href="/contact" variant="primary" className="shadow-glow">
            Demander un devis gratuit
            <ArrowRight size={18} />
          </Button>
          <Button href="/realisations" variant="outline">
            Voir nos réalisations
          </Button>
        </motion.div>

        {/* Bandeau de confiance */}
        <motion.ul
          variants={item}
          className="mt-12 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-medium text-cream/80"
        >
          {TRUST.map((t, i) => (
            <li key={t} className="flex items-center gap-6">
              {i > 0 && (
                <span aria-hidden className="hidden h-1 w-1 rounded-full bg-leaf-light/70 sm:block" />
              )}
              {t}
            </li>
          ))}
        </motion.ul>
      </motion.div>

      {/* Appel d'action de défilement */}
      <motion.a
        href="#services"
        aria-label="Découvrir nos services"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1 }}
        className="group absolute bottom-7 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-white/70 transition-colors hover:text-white"
      >
        <span className="text-[0.65rem] font-semibold uppercase tracking-widest2">
          Découvrir
        </span>
        <span className="flex h-9 w-5 justify-center rounded-full border border-white/40 pt-1.5">
          <span className="h-1.5 w-1 animate-float rounded-full bg-leaf-light" />
        </span>
      </motion.a>
    </section>
  );
}
