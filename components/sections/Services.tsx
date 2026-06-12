import Image from "next/image";
import { Check } from "lucide-react";
import { SERVICES } from "@/lib/constants";
import SectionTitle from "@/components/ui/SectionTitle";
import Reveal from "@/components/motion/Reveal";

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
          {SERVICES.map((service, i) => (
            <Reveal key={service.slug} delay={i * 0.12}>
              <article className="group h-full overflow-hidden rounded-2xl bg-white shadow-soft transition-all duration-500 ease-smooth hover:-translate-y-1.5 hover:shadow-card">
                <div className="relative h-56 overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 ease-smooth group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-forest-dark/40 to-transparent" />
                  <h3 className="absolute bottom-4 left-5 font-display text-2xl text-white drop-shadow">
                    {service.title}
                  </h3>
                </div>

                <div className="flex flex-col p-7">
                  <p className="font-display text-lg text-forest">
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
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
