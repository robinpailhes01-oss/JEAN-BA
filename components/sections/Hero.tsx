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
            alt="Piscine, terrasse en bois et oliviers sculptés — jardin contemporain réalisé par Jean Ba Paysagiste à Nîmes"
            fill
            priority
            sizes="100vw"
            className="object-cover [object-position:30%_75%] lg:[object-position:center_58%]"
          />
        </div>
        {/* Scrims ciblés — on assombrit seulement là où il y a du texte (bas
            pour le titre, fine bande haute pour le menu) et on laisse éclater
            le cœur de la photo. Plus lumineux, toujours lisible. */}
        {/* Voile global léger pour unifier les tons */}
        <div className="absolute inset-0 bg-forest-dark/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-forest-dark/95 from-0% via-forest-dark/30 via-[40%] to-transparent to-[68%]" />
        <div className="absolute inset-0 bg-gradient-to-b from-forest-dark/60 from-0% to-transparent to-[28%]" />
        <div className="absolute inset-0 bg-[radial-gradient(125%_90%_at_50%_42%,transparent_55%,rgba(12,26,5,0.38)_100%)]" />
        {/* Vignette centrale mobile — assombrit la zone de l'eyebrow */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent from-[28%] via-forest-dark/30 via-[52%] to-transparent to-[72%] lg:hidden" />
      </motion.div>
      <div className="grain pointer-events-none absolute inset-0 -z-10" />

      {/* Filet d'encadrement intérieur — touche éditoriale "premium" */}
      <div className="pointer-events-none absolute inset-3 z-30 rounded-[1.4rem] border border-white/15 sm:inset-5 sm:rounded-[2rem]" />

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        variants={container}
        initial="hidden"
        animate="visible"
        className="relative flex flex-1 flex-col"
      >
        {/* Barre méta haute — desktop uniquement (épuré sur mobile) */}
        <div className="container-content hidden pt-32 lg:block">
          <motion.div variants={fade} className="hairline-light" />
          <motion.div
            variants={fade}
            className="flex items-center justify-between py-4 font-sans text-[0.7rem] font-semibold uppercase tracking-widest2 text-cream/85 drop-shadow-[0_1px_12px_rgba(0,0,0,0.8)]"
          >
            <span>Jardin &amp; aménagement extérieur</span>
            <span>Savoir-faire artisanal</span>
            <span>
              {SITE.city} · {SITE.department}
            </span>
          </motion.div>
        </div>

        <div className="flex-1" />

        {/* Bloc titre — anchré en bas, dégagé de la barre fixe sur mobile */}
        <div className="container-content pb-28 lg:pb-10">
          <motion.p
            variants={fade}
            className="flex items-center gap-3 font-sans text-[0.7rem] font-semibold uppercase tracking-widest2 text-cream/85 drop-shadow-[0_1px_14px_rgba(0,0,0,0.8)] sm:text-xs"
          >
            <span className="tnum">(01)</span>
            <span aria-hidden className="h-px w-7 bg-cream/40" />
            Paysagiste créateur
          </motion.p>

          <div className="mt-5 grid items-end gap-y-8 lg:mt-6 lg:grid-cols-12 lg:gap-x-10">
            <h1 className="col-span-8 text-[2.55rem] font-medium leading-[0.93] tracking-[-0.03em] drop-shadow-[0_2px_40px_rgba(0,0,0,0.65)] sm:text-7xl lg:text-[6.3rem] lg:leading-[0.9]">
              <span className="block overflow-hidden">
                <motion.span variants={line} className="block">
                  Créateur de jardins
                </motion.span>
              </span>
              <span className="block overflow-hidden pb-[0.1em]">
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
              <p className="max-w-md text-base leading-relaxed text-cream drop-shadow-[0_1px_12px_rgba(0,0,0,0.5)] sm:text-lg">
                De la conception à l&apos;entretien, nous dessinons des
                extérieurs qui vous ressemblent — pensés pour durer.
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
                {/* Desktop : deux CTA */}
                <Button
                  href="/contact"
                  variant="primary"
                  className="hidden shadow-glow lg:inline-flex"
                >
                  Demander un devis
                  <ArrowRight size={18} />
                </Button>
                <Button
                  href="/realisations"
                  variant="outline"
                  className="hidden lg:inline-flex"
                >
                  Voir nos réalisations
                </Button>
                {/* Mobile / tablette : un seul CTA (le devis est dans la barre fixe) */}
                <Button
                  href="/realisations"
                  variant="primary"
                  className="shadow-glow lg:hidden"
                >
                  Voir nos réalisations
                  <ArrowRight size={18} />
                </Button>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Barre méta basse — confiance + scroll (desktop uniquement) */}
        <div className="container-content hidden pb-7 lg:block">
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
                      className="h-1 w-1 rounded-full bg-leaf-light/70"
                    />
                  )}
                  {t}
                </li>
              ))}
            </ul>
            <a
              href="#services"
              className="group flex items-center gap-2 text-xs font-semibold uppercase tracking-widest2 text-cream/70 transition-colors hover:text-white"
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
