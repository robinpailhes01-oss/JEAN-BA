import Image from "next/image";
import { Leaf, Award, HeartHandshake } from "lucide-react";
import { SITE } from "@/lib/constants";
import Reveal from "@/components/motion/Reveal";
import Button from "@/components/ui/Button";

const VALUES = [
  {
    icon: Leaf,
    title: "Savoir-faire local",
    text: "Une parfaite connaissance des végétaux et du climat du Gard.",
  },
  {
    icon: Award,
    title: "Travail soigné",
    text: "Des finitions impeccables et des aménagements pensés pour durer.",
  },
  {
    icon: HeartHandshake,
    title: "Proximité & écoute",
    text: "Un interlocuteur unique, à votre écoute du devis jusqu'au suivi.",
  },
];

export default function About() {
  return (
    <section id="a-propos" className="bg-cream py-24 lg:py-32">
      <div className="container-content grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        {/* Image */}
        <Reveal direction="right">
          <div className="relative">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-card">
              <Image
                src="/images/camion-jean-ba.jpg"
                alt={`Le véhicule ${SITE.name} en intervention dans un jardin à ${SITE.city}`}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            {/* Bloc accent superposé */}
            <div className="absolute -bottom-6 -right-4 hidden rounded-2xl bg-forest px-7 py-6 text-cream shadow-card sm:block">
              <p className="font-display text-4xl text-leaf-light">15+</p>
              <p className="mt-1 text-xs uppercase tracking-widest2 text-cream/80">
                ans d&apos;expérience
              </p>
            </div>
          </div>
        </Reveal>

        {/* Texte */}
        <div>
          <Reveal>
            <p className="eyebrow">À propos</p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mt-4 text-3xl font-medium leading-[1.08] tracking-tight text-forest sm:text-4xl lg:text-[2.75rem]">
              Un artisan paysagiste passionné, près de chez vous
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-forest-dark/75">
              <p>
                Installé à {SITE.city}, Jean Ba met son savoir-faire et sa
                passion du végétal au service de vos projets d&apos;extérieur.
                De la petite terrasse au grand jardin, chaque réalisation est
                pensée comme un lieu de vie unique, en harmonie avec son
                environnement.
              </p>
              <p>
                Conception, création, entretien&nbsp;: un accompagnement complet
                et un interlocuteur unique pour donner vie à votre jardin
                d&apos;exception, dans le respect des délais et de votre budget.
              </p>
            </div>
          </Reveal>

          <div className="mt-9 grid gap-5 sm:grid-cols-3">
            {VALUES.map((v, i) => (
              <Reveal key={v.title} delay={0.1 + i * 0.1}>
                <div>
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-leaf/15 text-leaf-dark">
                    <v.icon size={20} />
                  </span>
                  <h3 className="mt-4 font-display text-lg text-forest">
                    {v.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-forest-dark/70">
                    {v.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.3}>
            <div className="mt-10">
              <Button href="/contact" variant="primary">
                Discutons de votre projet
              </Button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
