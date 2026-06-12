import { MapPin } from "lucide-react";
import { SITE, COMMUNES } from "@/lib/constants";
import Reveal from "@/components/motion/Reveal";

export default function Zone() {
  return (
    <section className="relative overflow-hidden bg-forest py-24 text-cream lg:py-28">
      {/* Motif décoratif subtil */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, #FAF6EF 1px, transparent 0)",
          backgroundSize: "32px 32px",
        }}
      />
      <div className="container-content relative grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:items-center">
        <div>
          <Reveal>
            <p className="eyebrow text-leaf-light">Zone d&apos;intervention</p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mt-4 text-3xl font-medium leading-[1.08] tracking-tight sm:text-4xl lg:text-[2.75rem]">
              À {SITE.city} et dans tout le {SITE.department}
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-5 max-w-md leading-relaxed text-cream/80">
              Basés à {SITE.city}, nous intervenons dans un large rayon autour de
              la ville pour la conception, la création et l&apos;entretien de vos
              espaces extérieurs. Votre commune n&apos;est pas dans la liste&nbsp;?
              Contactez-nous, nous nous déplaçons volontiers.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.2} direction="left">
          <ul className="flex flex-wrap gap-2.5">
            {COMMUNES.map((commune) => (
              <li
                key={commune}
                className="flex items-center gap-1.5 rounded-full border border-cream/15 bg-cream/5 px-4 py-2 text-sm text-cream/90 transition-colors hover:border-leaf hover:bg-leaf/15"
              >
                <MapPin size={13} className="text-leaf-light" />
                {commune}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
