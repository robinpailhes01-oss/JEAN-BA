import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { MapPin, Phone, ArrowRight, CheckCircle2 } from "lucide-react";
import { COMMUNES, SITE, SERVICES } from "@/lib/constants";
import Button from "@/components/ui/Button";

function slugify(s: string) {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

const COMMUNE_MAP = Object.fromEntries(
  COMMUNES.map((c) => [slugify(c), c])
);

type Props = { params: Promise<{ commune: string }> };

export async function generateStaticParams() {
  return COMMUNES.map((c) => ({ commune: slugify(c) }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { commune: slug } = await params;
  const name = COMMUNE_MAP[slug];
  if (!name) return {};
  return {
    title: `Paysagiste à ${name} — ${SITE.name}`,
    description: `Jean Ba Paysagiste intervient à ${name} pour la conception, la création et l'entretien de jardins et espaces extérieurs. Devis gratuit sous 48 h, sans engagement.`,
    alternates: { canonical: `${SITE.url}/zones/${slug}` },
  };
}

export default async function CommunePage({ params }: Props) {
  const { commune: slug } = await params;
  const communeName = COMMUNE_MAP[slug];
  if (!communeName) notFound();

  const nearby = COMMUNES.filter((c) => c !== communeName).slice(0, 6);

  return (
    <main>
      {/* Hero local */}
      <section className="bg-forest py-24 text-cream lg:py-32">
        <div className="container-content">
          <p className="flex items-center gap-2 font-sans text-xs font-semibold uppercase tracking-widest2 text-leaf-light">
            <MapPin size={14} />
            Zone d&apos;intervention
          </p>
          <h1 className="mt-5 max-w-3xl text-[2.6rem] font-medium leading-[0.95] tracking-[-0.025em] sm:text-6xl lg:text-7xl">
            Paysagiste à{" "}
            <span className="italic text-leaf-light">{communeName}</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-cream/80">
            Jean Ba Paysagiste intervient à {communeName} et dans les communes
            voisines pour la conception, la création et l&apos;entretien de vos
            espaces extérieurs. Devis gratuit sous 48 h, sans engagement.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button href="/contact" variant="primary">
              Devis gratuit à {communeName}
              <ArrowRight size={18} />
            </Button>
            <Button href={`tel:${SITE.phoneHref}`} variant="outline">
              <Phone size={16} />
              {SITE.phone}
            </Button>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="bg-cream py-20 lg:py-28">
        <div className="container-content">
          <h2 className="max-w-xl text-[2rem] font-medium leading-tight tracking-[-0.02em] text-forest sm:text-4xl">
            Nos services à {communeName}
          </h2>
          <p className="mt-4 max-w-lg text-base leading-relaxed text-forest-dark/70">
            Que ce soit pour créer un jardin de toutes pièces ou en assurer
            l&apos;entretien au fil des saisons, Jean Ba vous accompagne à
            {" "}{communeName} avec le soin d&apos;un artisan local.
          </p>

          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {SERVICES.map((s) => (
              <div
                key={s.slug}
                className="rounded-2xl border border-forest/5 bg-white p-8 shadow-soft"
              >
                <h3 className="font-display text-xl text-forest">{s.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-forest-dark/70">
                  {s.description}
                </p>
                <ul className="mt-5 space-y-2">
                  {s.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-forest-dark/80">
                      <CheckCircle2 size={15} className="mt-0.5 shrink-0 text-leaf" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Communes proches */}
      <section className="border-t border-forest/5 bg-beige py-14">
        <div className="container-content">
          <p className="text-sm font-semibold uppercase tracking-widest2 text-forest-dark/50">
            Nous intervenons aussi à
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {nearby.map((c) => (
              <Link
                key={c}
                href={`/zones/${slugify(c)}`}
                className="flex items-center gap-1.5 rounded-full border border-forest/10 bg-white px-4 py-2 text-sm text-forest transition-colors hover:border-leaf hover:bg-leaf/10"
              >
                <MapPin size={12} className="text-leaf" />
                {c}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-forest py-20 text-center text-cream">
        <div className="container-content">
          <h2 className="text-3xl font-medium tracking-[-0.02em] sm:text-4xl">
            Un projet à {communeName} ?
          </h2>
          <p className="mx-auto mt-4 max-w-md text-cream/75">
            Contactez-nous pour une visite gratuite et un devis sous 48 h.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button href="/contact" variant="primary">
              Demander un devis gratuit
              <ArrowRight size={18} />
            </Button>
            <Button href={`tel:${SITE.phoneHref}`} variant="outline">
              <Phone size={16} />
              {SITE.phone}
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
