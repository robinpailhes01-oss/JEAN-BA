import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { REALISATIONS } from "@/lib/constants";
import SectionTitle from "@/components/ui/SectionTitle";
import Reveal from "@/components/motion/Reveal";
import Button from "@/components/ui/Button";

export default function RealisationsPreview() {
  const preview = REALISATIONS.slice(0, 6);

  return (
    <section id="realisations" className="bg-beige py-24 lg:py-32">
      <div className="container-content">
        <SectionTitle
          eyebrow="Nos réalisations"
          title="Des extérieurs qui parlent d'eux-mêmes"
          description="Chaque jardin est unique. Découvrez quelques-unes de nos créations dans le Gard, pensées pour durer et sublimer votre lieu de vie."
        />

        <div className="mt-16 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-3">
          {preview.map((r, i) => (
            <Reveal
              key={r.src}
              delay={(i % 3) * 0.1}
              className={i === 0 ? "col-span-2 lg:col-span-2 lg:row-span-2" : ""}
            >
              <figure
                className={`group relative h-full w-full overflow-hidden rounded-2xl shadow-soft ${
                  i === 0 ? "aspect-[4/3] lg:aspect-auto lg:min-h-full" : "aspect-square"
                }`}
              >
                <Image
                  src={r.src}
                  alt={r.alt}
                  fill
                  sizes={i === 0 ? "(max-width: 1024px) 100vw, 66vw" : "(max-width: 1024px) 50vw, 33vw"}
                  className="object-cover transition-transform duration-[900ms] ease-smooth group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest-dark/75 via-forest-dark/0 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-100" />
                <figcaption className="absolute bottom-0 left-0 w-full translate-y-2 p-5 opacity-0 transition-all duration-500 ease-smooth group-hover:translate-y-0 group-hover:opacity-100">
                  <p className="text-xs font-semibold uppercase tracking-widest2 text-leaf-light">
                    {r.category}
                  </p>
                  <p className="mt-1 font-display text-lg text-white">{r.title}</p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2} className="mt-12 flex justify-center">
          <Button href="/realisations" variant="ghost">
            Voir toutes les réalisations
            <ArrowRight size={18} />
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
