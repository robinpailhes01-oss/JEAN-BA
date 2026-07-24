import type { Metadata } from "next";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";
import ContactForm from "@/components/contact/ContactForm";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Contact — Demandez votre devis gratuit",
  description: `Contactez ${SITE.name}, paysagiste à ${SITE.city}. Devis gratuit sous 48 h pour la création et l'entretien de votre jardin dans le ${SITE.department}.`,
  alternates: { canonical: `${SITE.url}/contact` },
};

const INFOS = [
  {
    icon: Phone,
    label: "Téléphone",
    value: SITE.phone,
    href: `tel:${SITE.phoneHref}`,
  },
  {
    icon: Mail,
    label: "E-mail",
    value: SITE.email,
    href: `mailto:${SITE.email}`,
  },
  {
    icon: MapPin,
    label: "Zone d'intervention",
    value: `${SITE.city}, le ${SITE.department} et l'Hérault — entre Montpellier et Nîmes`,
  },
  {
    icon: Clock,
    label: "Horaires",
    value: SITE.hours,
  },
];

export default function ContactPage() {
  const mapSrc = `https://maps.google.com/maps?q=${encodeURIComponent(
    `${SITE.city}, ${SITE.region}, France`,
  )}&z=11&output=embed`;

  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Parlons de votre projet"
        description={`Un projet de jardin, de terrasse ou besoin d'un entretien régulier ? Décrivez-nous votre besoin, nous vous répondons sous 48 h avec un devis gratuit.`}
      />

      <section className="bg-cream py-20 lg:py-24">
        <div className="container-content grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          {/* Colonne infos */}
          <div>
            <h2 className="font-display text-2xl text-forest">
              Nos coordonnées
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-forest-dark/70">
              N&apos;hésitez pas à nous appeler directement&nbsp;: pour un
              artisan local, rien ne vaut un échange de vive voix.
            </p>

            <ul className="mt-8 space-y-5">
              {INFOS.map((info) => (
                <li key={info.label} className="flex items-start gap-4">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-leaf/15 text-leaf-dark">
                    <info.icon size={20} />
                  </span>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest2 text-forest-dark/50">
                      {info.label}
                    </p>
                    {info.href ? (
                      <a
                        href={info.href}
                        className="link-underline font-display text-lg text-forest"
                      >
                        {info.value}
                      </a>
                    ) : (
                      <p className="font-display text-lg text-forest">
                        {info.value}
                      </p>
                    )}
                  </div>
                </li>
              ))}
            </ul>

            {/* Carte */}
            <div className="mt-8 overflow-hidden rounded-2xl shadow-soft">
              <iframe
                title={`Zone d'intervention de ${SITE.name} autour de ${SITE.city}`}
                src={mapSrc}
                width="100%"
                height="280"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="block border-0"
              />
            </div>
          </div>

          {/* Colonne formulaire */}
          <div>
            <h2 className="mb-6 font-display text-2xl text-forest">
              Demande de devis gratuit
            </h2>
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
