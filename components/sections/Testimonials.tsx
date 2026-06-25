import Image from "next/image";
import { Star, Quote, BadgeCheck } from "lucide-react";
import { TESTIMONIALS, FEATURED_TESTIMONIAL as F } from "@/lib/constants";
import SectionIntro from "@/components/ui/SectionIntro";
import Reveal from "@/components/motion/Reveal";

export default function Testimonials() {
  return (
    <section className="bg-beige py-24 lg:py-32">
      <div className="container-content">
        <SectionIntro
          index="07"
          label="Témoignages"
          title={
            <>
              La parole <span className="accent-italic">à nos clients</span>
            </>
          }
          description="La satisfaction de nos clients est notre plus belle récompense. Quelques retours sur nos réalisations dans le Gard."
        />

        {/* Note agrégée */}
        <Reveal delay={0.1} className="mt-10 flex">
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

        {/* Avis vedette — Virginie (avec photos du chantier) */}
        <Reveal delay={0.12}>
          <figure className="mt-12 grid overflow-hidden rounded-[2rem] border border-forest/5 bg-white shadow-card lg:grid-cols-2">
            {/* Texte */}
            <div className="flex flex-col justify-center p-8 sm:p-10 lg:p-14">
              <div className="flex items-center justify-between">
                <div className="flex gap-0.5" aria-label="5 étoiles sur 5">
                  {Array.from({ length: F.rating }).map((_, s) => (
                    <Star key={s} size={18} className="fill-leaf text-leaf" />
                  ))}
                </div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-leaf/12 px-3 py-1 text-xs font-semibold text-leaf-dark">
                  <BadgeCheck size={14} /> Avis vérifié
                </span>
              </div>

              <Quote
                size={40}
                className="mt-6 text-leaf/20"
                strokeWidth={1.5}
                aria-hidden
              />
              <blockquote className="mt-3 font-display text-xl italic leading-relaxed text-forest sm:text-[1.65rem] sm:leading-[1.5]">
                « {F.text} »
              </blockquote>

              <figcaption className="mt-8 flex items-center gap-3.5">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-leaf/15 font-display text-xl text-leaf-dark">
                  {F.name.charAt(0)}
                </span>
                <span>
                  <span className="block font-display text-lg text-forest">
                    {F.name}
                  </span>
                  <span className="block text-xs uppercase tracking-widest2 text-forest-dark/55">
                    Cliente · {F.date}
                  </span>
                </span>
              </figcaption>
            </div>

            {/* Collage photos du chantier */}
            <div className="grid h-72 grid-cols-2 grid-rows-2 gap-1.5 bg-beige/40 p-1.5 sm:h-96 lg:h-auto">
              <div className="relative row-span-2 overflow-hidden rounded-2xl">
                <Image
                  src={F.images[0].src}
                  alt={F.images[0].alt}
                  fill
                  sizes="(max-width: 1024px) 50vw, 25vw"
                  className="object-cover"
                />
              </div>
              <div className="relative overflow-hidden rounded-2xl">
                <Image
                  src={F.images[1].src}
                  alt={F.images[1].alt}
                  fill
                  sizes="(max-width: 1024px) 50vw, 25vw"
                  className="object-cover"
                />
              </div>
              <div className="relative overflow-hidden rounded-2xl">
                <Image
                  src={F.images[2].src}
                  alt={F.images[2].alt}
                  fill
                  sizes="(max-width: 1024px) 50vw, 25vw"
                  className="object-cover"
                />
              </div>
            </div>
          </figure>
        </Reveal>

        {/* Autres avis */}
        <div className="mt-6 grid gap-6 md:grid-cols-3">
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
