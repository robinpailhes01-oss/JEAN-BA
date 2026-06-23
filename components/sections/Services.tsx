import { Check, PencilRuler, Sprout, Scissors, ArrowUpRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { SERVICES } from "@/lib/constants";
import SectionTitle from "@/components/ui/SectionTitle";
import Reveal from "@/components/motion/Reveal";

const ICONS: Record<string, LucideIcon> = {
  conception: PencilRuler,
  creation: Sprout,
  entretien: Scissors,
};

export default function Services() {
  return (
    <section id="services" className="relative bg-cream py-24 lg:py-32">
      <div className="container-content">
        <SectionTitle
          eyebrow="Nos savoir-faire"
          title="De l'idée au jardin entretenu"
          description="Trois métiers complémentaires pour accompagner votre projet d'extérieur, du premier croquis jusqu'à son entretien au fil des saisons."
        />

        <div className="mt-16 grid gap-7 md:grid-cols-3">
          {SERVICES.map((service, i) => {
            const Icon = ICONS[service.slug] ?? Sprout;
            return (
              <Reveal key={service.slug} delay={i * 0.12}>
                <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-forest/5 bg-white p-8 shadow-soft transition-all duration-500 ease-out-expo hover:-translate-y-2 hover:border-leaf/30 hover:shadow-lift">
                  {/* Filet d'accent qui se déploie au survol */}
                  <span className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-leaf-dark via-leaf to-leaf-light transition-transform duration-500 ease-out-expo group-hover:scale-x-100" />

                  <div className="flex items-start justify-between">
                    <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-leaf/12 text-leaf-dark transition-all duration-500 ease-out-expo group-hover:-rotate-6 group-hover:bg-leaf group-hover:text-white">
                      <Icon size={30} strokeWidth={1.5} />
                    </span>
                    <span className="font-display text-5xl leading-none text-forest/[0.08] transition-colors duration-500 group-hover:text-leaf/20">
                      0{i + 1}
                    </span>
                  </div>

                  <h3 className="mt-7 flex items-center gap-1.5 font-display text-2xl text-forest">
                    {service.title}
                    <ArrowUpRight
                      size={20}
                      className="-translate-x-1 text-leaf opacity-0 transition-all duration-500 ease-out-expo group-hover:translate-x-0 group-hover:opacity-100"
                    />
                  </h3>
                  <p className="mt-2 font-display text-lg text-leaf-dark">
                    {service.short}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-forest-dark/70">
                    {service.description}
                  </p>

                  <ul className="mt-6 space-y-2.5 border-t border-beige/70 pt-6">
                    {service.features.map((f) => (
                      <li
                        key={f}
                        className="flex items-start gap-2.5 text-sm text-forest-dark/80"
                      >
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-leaf/15 text-leaf-dark">
                          <Check size={13} strokeWidth={3} />
                        </span>
                        {f}
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
