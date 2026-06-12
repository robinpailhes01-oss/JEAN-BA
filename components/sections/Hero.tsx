"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Button from "@/components/ui/Button";
import { SITE } from "@/lib/constants";

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Parallax : l'image descend doucement, le contenu remonte (subtil = luxe)
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "18%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "-12%"]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 1], [1, 1.4]);

  return (
    <section
      ref={ref}
      className="relative flex h-[100svh] min-h-[600px] items-center justify-center overflow-hidden"
    >
      <motion.div style={{ y: imageY }} className="absolute inset-0 -z-10 scale-110">
        <Image
          src="/images/hero.jpg"
          alt="Jardin méditerranéen d'exception réalisé par Jean Ba Paysagiste à Nîmes"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        {/* Overlay vert forêt pour faire ressortir le texte et habiller la marque */}
        <motion.div
          style={{ opacity: overlayOpacity }}
          className="absolute inset-0 bg-gradient-to-b from-forest-dark/70 via-forest-dark/40 to-forest-dark/80"
        />
      </motion.div>

      <motion.div
        style={{ y: contentY }}
        className="container-content flex flex-col items-center text-center text-white"
      >
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="font-sans text-xs font-semibold uppercase tracking-widest2 text-leaf-light drop-shadow"
        >
          Paysagiste à {SITE.city} · {SITE.department}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          className="mt-5 max-w-4xl text-4xl leading-[1.1] drop-shadow-md sm:text-6xl lg:text-7xl"
        >
          {SITE.tagline}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 max-w-xl text-base text-cream/90 drop-shadow sm:text-lg"
        >
          Conception, création et entretien de jardins et aménagements
          extérieurs à {SITE.city} et dans tout le {SITE.department}.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.36, ease: [0.22, 1, 0.36, 1] }}
          className="mt-9 flex flex-col gap-3 sm:flex-row"
        >
          <Button href="/contact" variant="primary">
            Demander un devis gratuit
          </Button>
          <Button href="/realisations" variant="outline">
            Voir nos réalisations
          </Button>
        </motion.div>
      </motion.div>

      {/* Indicateur de scroll */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/80"
      >
        <ChevronDown className="animate-bounce" size={28} />
      </motion.div>
    </section>
  );
}
