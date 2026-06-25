import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { REALISATIONS } from "@/lib/constants";
import SectionIntro from "@/components/ui/SectionIntro";
import Reveal from "@/components/motion/Reveal";
import RevealImage from "@/components/motion/RevealImage";
import Button from "@/components/ui/Button";

// Rythme éditorial : tailles variées plutôt qu'une grille régulière
const LAYOUT = [
  "col-span-2 lg:col-span-7 aspect-[4/3] lg:aspect-[3/2]",
  "col-span-1 lg:col-span-5 aspect-square lg:aspect-[3/2]",
  "col-span-1 lg:col-span-4 aspect-square",
  "col-span-1 lg:col-span-4 aspect-square",
  "col-span-1 lg:col-span-4 aspect-square",
];

export default function RealisationsPreview() {
  const preview = REALISATIONS.slice(0, 5);

  return (
    <section id="realisations" className="bg-beige py-24 lg:py-32">
      <div className="container-content">
        <SectionIntro
          index="03"
          label="Réalisations"
          title={
            <>
              Des extérieurs qui parlent{" "}
              <span className="accent-italic">d&apos;eux-mêmes</span>
            </>
          }
          description="Chaque jardin est unique. Un aperçu de nos créations dans le Gard, pensées pour durer et sublimer votre lieu de vie."
        />

        <div className="mt-16 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-12">
          {preview.map((r, i) => (
            <Reveal key={r.src} delay={(i % 2) * 0.08} className={LAYOUT[i]}>
              <figure className="group relative h-full w-full">
                <RevealImage className="h-full w-full rounded-2xl shadow-soft">
                  <Image
                    src={r.src}
                    alt={r.alt}
                    fill
                    sizes={
                      i === 0
                        ? "(max-width: 1024px) 100vw, 58vw"
                        : "(max-width: 1024px) 50vw, 40vw"
                    }
                    className="object-cover transition-transform duration-[1100ms] ease-out-expo group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-forest-dark/80 via-forest-dark/0 to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-100" />
                  <figcaption className="absolute bottom-0 left-0 w-full translate-y-2 p-6 opacity-0 transition-all duration-500 ease-out-expo group-hover:translate-y-0 group-hover:opacity-100">
                    <p className="text-[0.7rem] font-semibold uppercase tracking-widest2 text-leaf-light">
                      {r.category}
                    </p>
                    <p className="mt-1 font-display text-xl text-white">
                      {r.title}
                    </p>
                  </figcaption>
                </RevealImage>
              </figure>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1} className="mt-12 flex justify-center">
          <Button href="/realisations" variant="ghost">
            Voir toutes les réalisations
            <ArrowRight size={18} />
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
