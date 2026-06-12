import Image from "next/image";
import { Phone } from "lucide-react";
import { SITE } from "@/lib/constants";
import Button from "@/components/ui/Button";
import Reveal from "@/components/motion/Reveal";

export default function CtaBand() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/cta-band.jpg"
          alt=""
          aria-hidden
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-forest-dark/80" />
      </div>

      <div className="container-content py-24 text-center text-white lg:py-28">
        <Reveal>
          <h2 className="mx-auto max-w-2xl text-3xl font-medium leading-[1.08] tracking-tight sm:text-4xl lg:text-5xl">
            Un projet de jardin&nbsp;? Parlons-en.
          </h2>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="mx-auto mt-5 max-w-xl text-cream/85">
            Recevez un devis gratuit et sans engagement sous 48&nbsp;h. Nous
            étudions votre projet et vous conseillons les meilleures solutions.
          </p>
        </Reveal>
        <Reveal delay={0.24}>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button href="/contact" variant="primary">
              Demander un devis gratuit
            </Button>
            <Button href={`tel:${SITE.phoneHref}`} variant="outline">
              <Phone size={18} /> {SITE.phone}
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
