"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useMotionValueEvent,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import { Check, PencilRuler, Sprout, Scissors } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { SERVICES } from "@/lib/constants";

const ICONS: Record<string, LucideIcon> = {
  conception: PencilRuler,
  creation: Sprout,
  entretien: Scissors,
};

const IMAGES: Record<string, { src: string; alt: string }> = {
  conception: {
    src: "/images/realisations/jardin-avant.jpg",
    alt: "Terrain avant aménagement — l'étude commence ici",
  },
  creation: {
    src: "/images/realisations/piscine-apres.jpg",
    alt: "Aménagement réalisé : plage de piscine",
  },
  entretien: {
    src: "/images/realisations/olivier-nuage-apres.jpg",
    alt: "Olivier taillé en nuage, entretien soigné",
  },
};

const STEPS = SERVICES.map((s) => ({ ...s, icon: ICONS[s.slug], img: IMAGES[s.slug] }));

export default function Approche() {
  return (
    <section id="services" className="bg-cream">
      <StickyDesktop />
      <StackedMobile />
    </section>
  );
}

/* ------------------------------ Desktop : pin ------------------------------ */

function StickyDesktop() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const idx = Math.min(STEPS.length - 1, Math.floor(v * STEPS.length));
    setActive(idx);
  });

  return (
    <div
      ref={ref}
      className="relative hidden lg:block"
      style={{ height: `${STEPS.length * 100}vh` }}
    >
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <div className="container-content w-full">
          {/* En-tête */}
          <div className="flex items-end justify-between">
            <p className="flex items-center gap-3 font-sans text-xs font-semibold uppercase tracking-widest2 text-leaf-dark">
              <span className="tnum">(02)</span>
              <span aria-hidden className="h-px w-6 bg-current opacity-50" />
              Notre approche
            </p>
            <p className="font-display text-sm italic text-forest-dark/50">
              De l&apos;idée au jardin entretenu
            </p>
          </div>
          <div className="hairline mt-6" />

          <div className="mt-12 grid grid-cols-12 items-center gap-12">
            {/* Texte — étapes superposées en fondu */}
            <div className="relative col-span-6 min-h-[26rem]">
              {STEPS.map((step, i) => {
                const Icon = step.icon;
                return (
                  <motion.div
                    key={step.slug}
                    className="absolute inset-0"
                    initial={false}
                    animate={{
                      opacity: i === active ? 1 : 0,
                      y: i === active ? 0 : 24,
                      filter: i === active ? "blur(0px)" : "blur(6px)",
                      pointerEvents: i === active ? "auto" : "none",
                    }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <div className="flex items-center gap-5">
                      <span className="font-display text-[6rem] font-medium leading-none text-forest/10">
                        0{i + 1}
                      </span>
                      <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-leaf/12 text-leaf-dark">
                        {Icon && <Icon size={26} strokeWidth={1.5} />}
                      </span>
                    </div>

                    <h3 className="mt-7 font-display text-5xl font-medium tracking-[-0.02em] text-forest">
                      {step.title}
                    </h3>
                    <p className="mt-3 font-display text-xl italic text-leaf-dark">
                      {step.short}
                    </p>
                    <p className="mt-5 max-w-md text-base leading-relaxed text-forest-dark/70">
                      {step.description}
                    </p>

                    <ul className="mt-7 grid max-w-md grid-cols-2 gap-x-6 gap-y-2.5">
                      {step.features.map((f) => (
                        <li
                          key={f}
                          className="flex items-start gap-2.5 text-sm text-forest-dark/80"
                        >
                          <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-leaf/15 text-leaf-dark">
                            <Check size={12} strokeWidth={3} />
                          </span>
                          {f}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                );
              })}
            </div>

            {/* Visuel — images superposées en fondu */}
            <div className="col-span-6">
              <div className="relative ml-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-[2rem] shadow-card">
                {STEPS.map((step, i) => (
                  <motion.div
                    key={step.slug}
                    className="absolute inset-0"
                    initial={false}
                    animate={{
                      opacity: i === active ? 1 : 0,
                      scale: i === active ? 1 : 1.06,
                    }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Image
                      src={step.img.src}
                      alt={step.img.alt}
                      fill
                      sizes="40vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-forest-dark/40 to-transparent" />
                  </motion.div>
                ))}
                {/* Étiquette d'étape sur l'image */}
                <div className="absolute bottom-5 left-5 flex items-center gap-2 rounded-full bg-cream/90 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest2 text-forest backdrop-blur">
                  Étape {active + 1} / {STEPS.length}
                </div>
              </div>
            </div>
          </div>

          {/* Rail de progression */}
          <div className="mt-14 flex items-center gap-6">
            {STEPS.map((step, i) => (
              <button
                key={step.slug}
                type="button"
                onClick={() => {
                  const el = ref.current;
                  if (!el) return;
                  const top =
                    el.offsetTop + (el.offsetHeight / STEPS.length) * (i + 0.5);
                  window.scrollTo({ top, behavior: "smooth" });
                }}
                className={`flex items-center gap-2.5 text-sm transition-colors ${
                  i === active
                    ? "text-forest"
                    : "text-forest-dark/40 hover:text-forest-dark/70"
                }`}
              >
                <span className="tnum font-display text-base">0{i + 1}</span>
                <span className="font-medium">{step.title}</span>
              </button>
            ))}
            <div className="relative ml-4 h-px flex-1 overflow-hidden bg-forest/15">
              <motion.div
                style={{ scaleX: progress }}
                className="absolute inset-0 origin-left bg-leaf"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------ Mobile : stack ----------------------------- */

function StackedMobile() {
  const reduce = useReducedMotion();
  return (
    <div className="container-content py-20 lg:hidden">
      <p className="flex items-center gap-3 font-sans text-xs font-semibold uppercase tracking-widest2 text-leaf-dark">
        <span className="tnum">(02)</span>
        <span aria-hidden className="h-px w-6 bg-current opacity-50" />
        Notre approche
      </p>
      <h2 className="mt-5 font-display text-4xl font-medium leading-[1] tracking-[-0.02em] text-forest">
        De l&apos;idée au jardin entretenu
      </h2>

      <div className="mt-12 space-y-14">
        {STEPS.map((step, i) => {
          const Icon = step.icon;
          return (
            <motion.div
              key={step.slug}
              initial={{ opacity: 0, y: reduce ? 0 : 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-card">
                <Image
                  src={step.img.src}
                  alt={step.img.alt}
                  fill
                  sizes="100vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest-dark/45 to-transparent" />
                <span className="absolute left-4 top-4 font-display text-5xl font-medium text-cream/90">
                  0{i + 1}
                </span>
              </div>
              <div className="mt-5 flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-leaf/12 text-leaf-dark">
                  {Icon && <Icon size={22} strokeWidth={1.5} />}
                </span>
                <h3 className="font-display text-3xl font-medium tracking-[-0.02em] text-forest">
                  {step.title}
                </h3>
              </div>
              <p className="mt-3 font-display text-lg italic text-leaf-dark">
                {step.short}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-forest-dark/70">
                {step.description}
              </p>
              <ul className="mt-5 space-y-2.5">
                {step.features.map((f) => (
                  <li
                    key={f}
                    className="flex items-start gap-2.5 text-sm text-forest-dark/80"
                  >
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-leaf/15 text-leaf-dark">
                      <Check size={12} strokeWidth={3} />
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
