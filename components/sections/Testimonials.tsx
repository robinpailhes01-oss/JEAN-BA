import { Star, Quote } from "lucide-react";
import { TESTIMONIALS } from "@/lib/constants";
import SectionTitle from "@/components/ui/SectionTitle";
import Reveal from "@/components/motion/Reveal";

export default function Testimonials() {
  return (
    <section className="bg-beige py-24 lg:py-32">
      <div className="container-content">
        <SectionTitle
          eyebrow="Ils nous font confiance"
          title="La parole à nos clients"
          description="La satisfaction de nos clients est notre plus belle récompense. Voici quelques retours sur nos réalisations dans le Gard."
        />

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.12}>
              <figure className="flex h-full flex-col rounded-2xl border border-forest/5 bg-white p-8 shadow-soft transition-all duration-500 ease-smooth hover:-translate-y-1 hover:shadow-card">
                <Quote
                  size={32}
                  className="text-leaf/30"
                  strokeWidth={1.5}
                  aria-hidden
                />
                <div className="mt-4 flex gap-0.5" aria-label={`${t.rating} étoiles sur 5`}>
                  {Array.from({ length: t.rating }).map((_, s) => (
                    <Star
                      key={s}
                      size={16}
                      className="fill-leaf text-leaf"
                    />
                  ))}
                </div>
                <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-forest-dark/80">
                  “{t.text}”
                </blockquote>
                <figcaption className="mt-6 border-t border-beige pt-4">
                  <p className="font-display text-base text-forest">{t.name}</p>
                  <p className="text-xs text-forest-dark/60">{t.city}</p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
