import { Check, PencilRuler, Sprout, Scissors } from "lucide-react";
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
    <section id="services" className="bg-cream py-24 lg:py-32">
      <div className="container-content">
        <SectionTitle
          eyebrow="Nos savoir-faire"
          title="De l'idée au jardin entretenu"
          description="Trois métiers complémentaires pour accompagner votre projet d'extérieur du premier croquis jusqu'à son entretien au fil des saisons."
        />

        <div className="mt-16 grid gap-7 md:grid-cols-3">
          {SERVICES.map((service, i) => {
            const Icon = ICONS[service.slug] ?? Sprout;
            return (
              <Reveal key={service.slug} delay={i * 0.12}>
                <article className="group flex h-full flex-col rounded-2xl border border-forest/5 bg-white p-8 shadow-soft transition-all duration-500 ease-smooth hover:-translate-y-1.5 hover:shadow-card">
                  <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-leaf/12 text-leaf-dark transition-colors duration-500 ease-smooth group-hover:bg-leaf group-hover:text-white">
                    <Icon size={30} strokeWidth={1.5} />
                  </span>

                  <h3 className="mt-6 font-display text-2xl text-forest">
                    {service.title}
                  </h3>
                  <p className="mt-2 font-display text-lg text-leaf-dark">
                    {service.short}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-forest-dark/70">
                    {service.description}
                  </p>

                  <ul className="mt-6 space-y-2.5">
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
