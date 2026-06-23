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

        {/* Note agrégée */}
        <Reveal delay={0.1} className="mt-8 flex justify-center">
          <div className="inline-flex items-center gap-3 rounded-full border border-forest/10 bg-white px-5 py-2.5 shadow-soft">
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, s) => (
                <Star key={s} size={16} className="fill-leaf text-leaf" />
              ))}
            </div>
            <span className="text-sm font-semibold text-forest">5,0 / 5</span>
            <span className="text-sm text-forest-dark/60">
              · clients satisfaits dans le Gard
            </span>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.12}>
              <figure className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-forest/5 bg-white p-8 shadow-soft transition-all duration-500 ease-out-expo hover:-translate-y-1.5 hover:shadow-lift">
                <Quote
                  size={44}
                  className="absolute -top-1 right-5 text-leaf/10 transition-colors duration-500 group-hover:text-leaf/20"
                  strokeWidth={1.5}
                  aria-hidden
                />
                <div
                  className="flex gap-0.5"
                  aria-label={`${t.rating} étoiles sur 5`}
                >
                  {Array.from({ length: t.rating }).map((_, s) => (
                    <Star key={s} size={16} className="fill-leaf text-leaf" />
                  ))}
                </div>
                <blockquote className="mt-5 flex-1 font-display text-lg leading-relaxed text-forest-dark/85">
                  « {t.text} »
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3 border-t border-beige pt-5">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-leaf/15 font-display text-lg text-leaf-dark">
                    {t.name.charAt(0)}
                  </span>
                  <span>
                    <span className="block font-display text-base text-forest">
                      {t.name}
                    </span>
                    <span className="block text-xs text-forest-dark/60">
                      {t.city}
                    </span>
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
