import type { Metadata } from "next";
import PageHeader from "@/components/ui/PageHeader";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description: `Politique de confidentialité et gestion des données personnelles du site ${SITE.name}.`,
  robots: { index: false, follow: true },
  alternates: { canonical: `${SITE.url}/politique-confidentialite` },
};

export default function PolitiqueConfidentialitePage() {
  return (
    <>
      <PageHeader title="Politique de confidentialité" />
      <article className="bg-cream py-16 lg:py-20">
        <div className="container-content mx-auto max-w-3xl space-y-8 text-forest-dark/80">
          <Section title="Responsable du traitement">
            <p>
              Les données collectées sur ce site sont traitées par{" "}
              {SITE.legalName}, joignable à l&apos;adresse {SITE.email}.
            </p>
          </Section>

          <Section title="Données collectées">
            <p>
              Via le formulaire de contact, nous collectons&nbsp;: votre nom,
              votre adresse e-mail, votre numéro de téléphone, le type de projet
              et le contenu de votre message. Ces données sont strictement
              nécessaires au traitement de votre demande de devis.
            </p>
          </Section>

          <Section title="Finalité et base légale">
            <p>
              Vos données sont utilisées uniquement pour répondre à votre
              demande et établir un éventuel devis. La base légale est votre
              consentement, recueilli lors de l&apos;envoi du formulaire.
            </p>
          </Section>

          <Section title="Durée de conservation">
            <p>
              Vos données sont conservées le temps nécessaire au traitement de
              votre demande, puis archivées ou supprimées dans un délai maximum
              de 3 ans à compter de notre dernier contact.
            </p>
          </Section>

          <Section title="Destinataires">
            <p>
              Vos données ne sont ni vendues ni cédées à des tiers. Elles sont
              transmises uniquement aux outils techniques nécessaires à
              l&apos;envoi des e-mails (service Resend) et à l&apos;hébergement
              du site (Vercel).
            </p>
          </Section>

          <Section title="Vos droits">
            <p>
              Conformément au RGPD, vous disposez d&apos;un droit d&apos;accès,
              de rectification, d&apos;effacement et d&apos;opposition sur vos
              données. Pour exercer ces droits, écrivez-nous à {SITE.email}. Vous
              pouvez également introduire une réclamation auprès de la CNIL
              (www.cnil.fr).
            </p>
          </Section>

          <Section title="Cookies">
            <p>
              Ce site n&apos;utilise pas de cookies de suivi publicitaire. Seuls
              des cookies strictement techniques peuvent être déposés pour le bon
              fonctionnement du site. Si un outil de mesure d&apos;audience est
              ajouté ultérieurement, cette politique sera mise à jour et un
              bandeau de consentement sera affiché.
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
