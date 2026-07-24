import type { Metadata } from "next";
import PageHeader from "@/components/ui/PageHeader";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Mentions légales",
  description: `Mentions légales du site ${SITE.name}.`,
  robots: { index: false, follow: true },
  alternates: { canonical: `${SITE.url}/mentions-legales` },
};

export default function MentionsLegalesPage() {
  return (
    <>
      <PageHeader title="Mentions légales" />
      <article className="bg-cream py-16 lg:py-20">
        <div className="container-content prose-content mx-auto max-w-3xl space-y-8 text-forest-dark/80">
          <Section title="Éditeur du site">
            <p>
              <strong>{SITE.legalName}</strong>
              <br />
              {SITE.legal.status}
              <br />
              Représentant&nbsp;: {SITE.legal.director}
              <br />
              SIRET&nbsp;: {SITE.legal.siret}
              <br />
              Adresse&nbsp;: {SITE.address.street}, {SITE.address.postalCode}{" "}
              {SITE.address.city}
              <br />
              Téléphone&nbsp;: {SITE.phone}
              <br />
              E-mail&nbsp;: {SITE.email}
            </p>
          </Section>

          <Section title="Hébergement">
            <p>
              Ce site est hébergé par <strong>Vercel Inc.</strong>
              <br />
              340 S Lemon Ave #4133, Walnut, CA 91789, États-Unis
              <br />
              <a href="https://vercel.com" className="text-leaf-dark link-underline">
                vercel.com
              </a>
            </p>
          </Section>

          <Section title="Propriété intellectuelle">
            <p>
              L&apos;ensemble des contenus présents sur ce site (textes, logo,
              identité visuelle) est la propriété de {SITE.legalName}, sauf
              mention contraire. Toute reproduction sans autorisation est
              interdite. Les photographies d&apos;illustration sont issues de
              banques d&apos;images libres de droits et seront progressivement
              remplacées par les réalisations de l&apos;entreprise.
            </p>
          </Section>

          <Section title="Responsabilité">
            <p>
              {SITE.legalName} s&apos;efforce d&apos;assurer l&apos;exactitude
              des informations diffusées sur ce site mais ne saurait être tenue
              responsable des erreurs ou omissions. Les informations sont
              fournies à titre indicatif et sont susceptibles d&apos;évoluer.
            </p>
          </Section>

          <Section title="Données personnelles">
            <p>
              Le traitement des données collectées via le formulaire de contact
              est détaillé dans notre{" "}
              <a
                href="/politique-confidentialite"
                className="text-leaf-dark link-underline"
              >
                politique de confidentialité
              </a>
              .
            </p>
          </Section>
        </div>
      </article>
    </>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2 className="font-display text-2xl text-forest">{title}</h2>
      <div className="mt-3 space-y-3 leading-relaxed">{children}</div>
    </section>
  );
}
