import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin, Instagram, Facebook, Linkedin } from "lucide-react";
import { SITE, NAV_LINKS } from "@/lib/constants";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-forest-dark text-cream/80">
      <div className="container-content grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-4">
        {/* Marque */}
        <div className="lg:col-span-1">
          <Image
            src="/images/brand/logo-signature.png"
            alt={SITE.name}
            width={723}
            height={276}
            className="h-12 w-auto brightness-0 invert"
          />
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-cream/70">
            {SITE.tagline}. Paysagiste à {SITE.city} et dans tout le {SITE.department}.
          </p>
          <div className="mt-6 flex gap-3">
            <a
              href={SITE.socials.instagram}
              aria-label="Instagram"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-cream/20 transition-colors hover:border-leaf hover:bg-leaf hover:text-white"
            >
              <Instagram size={18} />
            </a>
            <a
              href={SITE.socials.facebook}
              aria-label="Facebook"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-cream/20 transition-colors hover:border-leaf hover:bg-leaf hover:text-white"
            >
              <Facebook size={18} />
            </a>
            <a
              href={SITE.socials.linkedin}
              aria-label="LinkedIn"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-cream/20 transition-colors hover:border-leaf hover:bg-leaf hover:text-white"
            >
              <Linkedin size={18} />
            </a>
          </div>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="font-display text-lg text-white">Navigation</h3>
          <ul className="mt-5 space-y-3 text-sm">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="link-underline transition-colors hover:text-leaf-light"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="font-display text-lg text-white">Contact</h3>
          <ul className="mt-5 space-y-4 text-sm">
            <li>
              <a
                href={`tel:${SITE.phoneHref}`}
                className="flex items-start gap-3 transition-colors hover:text-leaf-light"
              >
                <Phone size={18} className="mt-0.5 shrink-0 text-leaf" />
                {SITE.phone}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${SITE.email}`}
                className="flex items-start gap-3 transition-colors hover:text-leaf-light"
              >
                <Mail size={18} className="mt-0.5 shrink-0 text-leaf" />
                {SITE.email}
              </a>
            </li>
            <li className="flex items-start gap-3">
              <MapPin size={18} className="mt-0.5 shrink-0 text-leaf" />
              <span>
                {SITE.city} et alentours
                <br />
                {SITE.department} ({SITE.departmentCode})
              </span>
            </li>
            <li className="text-cream/60">{SITE.hours}</li>
          </ul>
        </div>

        {/* Légal */}
        <div>
          <h3 className="font-display text-lg text-white">Informations</h3>
          <ul className="mt-5 space-y-3 text-sm">
            <li>
              <Link
                href="/mentions-legales"
                className="link-underline transition-colors hover:text-leaf-light"
              >
                Mentions légales
              </Link>
            </li>
            <li>
              <Link
                href="/politique-confidentialite"
                className="link-underline transition-colors hover:text-leaf-light"
              >
                Politique de confidentialité
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="link-underline transition-colors hover:text-leaf-light"
              >
                Demander un devis
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-cream/10">
        <div className="container-content flex flex-col items-center justify-between gap-3 py-6 text-xs text-cream/50 sm:flex-row">
          <p>
            © {year} {SITE.legalName}. Tous droits réservés.
          </p>
          <p>
            {SITE.services} — {SITE.city}, {SITE.region}
          </p>
        </div>
      </div>
    </footer>
  );
}
