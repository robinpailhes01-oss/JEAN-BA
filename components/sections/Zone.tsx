import { MapPin } from "lucide-react";
import { SITE, COMMUNES } from "@/lib/constants";
import Reveal from "@/components/motion/Reveal";

export default function Zone() {
  return (
    <section className="grain relative overflow-hidden bg-forest py-24 text-cream lg:py-28">
      {/* Motif décoratif subtil */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, #FAF6EF 1px, transparent 0)",
          backgroundSize: "32px 32px",
        }}
      />
      {/* Halo lumineux */}
      <div className="pointer-events-none absolute -left-32 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-leaf/20 blur-[120px]" />

      <div className="container-content relative">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <div>
            <Reveal>
              <p className="flex items-center gap-3 font-sans text-xs font-semibold uppercase tracking-widest2 text-leaf-light">
                <span className="tnum">(06)</span>
                <span aria-hidden className="h-px w-6 bg-leaf-light/60" />
                Zone d&apos;intervention
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="mt-5 text-[2.5rem] font-medium leading-[0.98] tracking-[-0.025em] sm:text-5xl">
                À {SITE.city}, dans le {SITE.department} et{" "}
                <span className="accent-italic-light">l&apos;Hérault</span>
              </h2>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-5 max-w-md leading-relaxed text-cream/80">
                Basés à {SITE.city}, nous intervenons dans un large rayon autour
                de la ville pour la conception, la création et l&apos;entretien
                de vos espaces extérieurs. Votre commune n&apos;est pas dans la
                liste&nbsp;? Contactez-nous, nous nous déplaçons volontiers.
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.2} direction="left">
            <ul className="flex flex-wrap gap-2.5">
              {COMMUNES.slice(0, 9).map((commune) => (
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
      </div>

      {/* Bandeau défilant des communes */}
      <div className="group relative mt-16 flex overflow-hidden mask-fade-r">
        <div className="flex w-max shrink-0 animate-marquee items-center group-hover:[animation-play-state:paused] motion-reduce:animate-none">
          {[...COMMUNES, ...COMMUNES].map((commune, i) => (
            <span
              key={i}
              className="flex items-center gap-3 px-6 font-display text-2xl text-cream/40 sm:text-3xl"
            >
              {commune}
              <MapPin size={16} className="text-leaf/60" />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
