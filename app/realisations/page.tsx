import type { Metadata } from "next";
import PageHeader from "@/components/ui/PageHeader";
import Gallery from "@/components/realisations/Gallery";
import CtaBand from "@/components/sections/CtaBand";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Réalisations — Nos jardins et aménagements",
  description: `Découvrez les réalisations de ${SITE.name}, paysagiste à ${SITE.city} : créations de jardins, terrasses, piscines et entretien dans le ${SITE.department}.`,
  alternates: { canonical: `${SITE.url}/realisations` },
};

export default function RealisationsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Portfolio"
        title="Nos réalisations"
        description={`Un aperçu de nos créations et aménagements paysagers à ${SITE.city} et dans tout le ${SITE.department}. Cliquez sur une photo pour l'agrandir.`}
      />

      <section className="bg-cream py-20 lg:py-24">
        <div className="container-content">
          <Gallery />
        </div>
      </section>

      <CtaBand />
    </>
  );
}
