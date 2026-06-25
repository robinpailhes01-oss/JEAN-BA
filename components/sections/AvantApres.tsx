import SectionIntro from "@/components/ui/SectionIntro";
import Reveal from "@/components/motion/Reveal";
import BeforeAfter from "@/components/ui/BeforeAfter";

const PAIRS = [
  {
    title: "Taille d'olivier en nuage",
    before: {
      src: "/images/realisations/olivier-nuage-avant.jpg",
      alt: "Olivier touffu avant la taille en nuage",
    },
    after: {
      src: "/images/realisations/olivier-nuage-apres.jpg",
      alt: "Olivier après une taille en nuage soignée",
    },
  },
  {
    title: "Création de plage de piscine",
    before: {
      src: "/images/realisations/piscine-avant.jpg",
      alt: "Contour de piscine avant aménagement",
    },
    after: {
      src: "/images/realisations/piscine-apres.jpg",
      alt: "Plage de piscine carrelée après aménagement",
    },
  },
  {
    title: "Remise en état & entretien de jardin",
    before: {
      src: "/images/realisations/jardin-avant.jpg",
      alt: "Jardin avant entretien",
    },
    after: {
      src: "/images/realisations/jardin-apres.jpg",
      alt: "Jardin après tonte et remise en état",
    },
  },
];

export default function AvantApres() {
  return (
    <section className="grain relative overflow-hidden bg-forest py-24 text-cream lg:py-32">
      {/* Motif décoratif subtil */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, #FAF6EF 1px, transparent 0)",
          backgroundSize: "32px 32px",
        }}
      />
      {/* Halos lumineux */}
      <div className="pointer-events-none absolute -right-20 top-0 h-80 w-80 rounded-full bg-leaf/15 blur-[120px]" />
      <div className="pointer-events-none absolute -left-20 bottom-0 h-80 w-80 rounded-full bg-leaf/10 blur-[120px]" />
      <div className="container-content relative">
        <SectionIntro
          light
          index="04"
          label="Avant / Après"
          title={
            <>
              La transformation,{" "}
              <span className="accent-italic-light">en un geste</span>
            </>
          }
          description="Glissez le curseur sur chaque photo pour découvrir le travail réalisé sur les extérieurs de nos clients dans le Gard."
        />

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {PAIRS.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.1}>
              <figure>
                <BeforeAfter before={p.before} after={p.after} />
                <figcaption className="mt-4 text-center font-display text-lg text-white">
                  {p.title}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
