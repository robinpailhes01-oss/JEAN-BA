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
import { ArrowRight } from "lucide-react";
import Button from "@/components/ui/Button";
import { SITE } from "@/lib/constants";

const TRUST = [
  "+15 ans d'expérience",
  "Devis gratuit sous 48 h",
  "Artisan local",
];

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "20%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "-10%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  const container: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
  };
  const line: Variants = {
    hidden: { y: reduce ? 0 : "115%" },
    visible: {
      y: 0,
      transition: { duration: 1, ease: [0.16, 1, 0.3, 1] },
    },
  };
  const fade: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : 18 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section
      ref={ref}
      className="relative flex h-[100svh] min-h-[660px] flex-col overflow-hidden text-cream"
    >
      {/* Fond photo — Ken Burns + parallax */}
      <motion.div style={{ y: imageY }} className="absolute inset-0 -z-10">
        <div className="absolute inset-0 animate-kenburns motion-reduce:animate-none">
          <Image
            src="/images/hero.jpg"
            alt="Olivier taillé en nuage dans un jardin sur-mesure réalisé par Jean Ba Paysagiste à Nîmes"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-forest-dark/85 via-forest-dark/35 to-forest-dark/55" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_120%,rgba(20,38,8,0.7),transparent_60%)]" />
      </motion.div>
      <div className="grain pointer-events-none absolute inset-0 -z-10" />

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        variants={container}
        initial="hidden"
        animate="visible"
        className="relative flex flex-1 flex-col"
      >
        {/* Barre méta haute */}
        <div className="container-content pt-28 lg:pt-32">
          <motion.div variants={fade} className="hairline-light" />
          <motion.div
            variants={fade}
            className="flex items-center justify-between py-4 font-sans text-[0.7rem] font-semibold uppercase tracking-widest2 text-cream/80"
          >
            <span>Jardin &amp; aménagement extérieur</span>
            <span className="hidden sm:block">Savoir-faire artisanal</span>
            <span>
              {SITE.city} · {SITE.department}
            </span>
          </motion.div>
        </div>

        <div className="flex-1" />

        {/* Bloc titre éditorial */}
        <div className="container-content pb-10">
          <motion.p
            variants={fade}
            className="flex items-center gap-3 font-sans text-xs font-semibold uppercase tracking-widest2 text-leaf-light"
          >
            <span className="tnum">(01)</span>
            <span aria-hidden className="h-px w-7 bg-leaf-light/60" />
            Paysagiste créateur
          </motion.p>

          <div className="mt-6 grid items-end gap-y-9 lg:grid-cols-12 lg:gap-x-10">
            <h1 className="col-span-8 text-[3.1rem] font-medium leading-[0.9] tracking-[-0.03em] drop-shadow-[0_2px_30px_rgba(0,0,0,0.4)] sm:text-7xl lg:text-[6.3rem]">
              <span className="block overflow-hidden">
                <motion.span variants={line} className="block">
                  Créateur de jardins
                </motion.span>
              </span>
              <span className="block overflow-hidden">
                <motion.span
                  variants={line}
                  className="block italic text-leaf-light"
                  style={{ fontVariationSettings: '"SOFT" 60' }}
                >
                  sur-mesure
                </motion.span>
              </span>
            </h1>

            <motion.div variants={fade} className="lg:col-span-4 lg:pb-3">
              <p className="max-w-sm text-base leading-relaxed text-cream/85 sm:text-lg">
                De la conception à l&apos;entretien, nous dessinons des
                extérieurs qui vous ressemblent — pensés pour durer.
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
                <Button href="/contact" variant="primary" className="shadow-glow">
                  Demander un devis
                  <ArrowRight size={18} />
                </Button>
                <Button href="/realisations" variant="outline">
                  Voir nos réalisations
                </Button>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Barre méta basse — confiance + scroll */}
        <div className="container-content pb-7">
          <motion.div variants={fade} className="hairline-light" />
          <motion.div
            variants={fade}
            className="flex items-center justify-between pt-4"
          >
            <ul className="flex flex-wrap items-center gap-x-5 gap-y-1 text-xs font-medium text-cream/75">
              {TRUST.map((t, i) => (
                <li key={t} className="flex items-center gap-5">
                  {i > 0 && (
                    <span
                      aria-hidden
                      className="hidden h-1 w-1 rounded-full bg-leaf-light/70 sm:block"
                    />
                  )}
                  {t}
                </li>
              ))}
            </ul>
            <a
              href="#services"
              className="group hidden items-center gap-2 text-xs font-semibold uppercase tracking-widest2 text-cream/70 transition-colors hover:text-white sm:flex"
            >
              Découvrir
              <span className="flex h-8 w-5 justify-center rounded-full border border-white/40 pt-1.5">
                <span className="h-1.5 w-1 animate-float rounded-full bg-leaf-light" />
              </span>
            </a>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
