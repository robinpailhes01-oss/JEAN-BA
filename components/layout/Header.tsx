"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, Phone } from "lucide-react";
import { NAV_LINKS, SITE } from "@/lib/constants";
import { cn } from "@/lib/utils";
import Button from "@/components/ui/Button";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Bloque le scroll quand le menu mobile est ouvert
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-smooth",
        scrolled || open
          ? "bg-cream/95 shadow-soft backdrop-blur-md"
          : "bg-transparent",
      )}
    >
      <div
        className={cn(
          "container-content flex items-center justify-between transition-all duration-500 ease-smooth",
          scrolled ? "h-16" : "h-20",
        )}
      >
        <Link
          href="/"
          className="relative z-10 flex items-center"
          aria-label={`${SITE.name} — accueil`}
          onClick={() => setOpen(false)}
        >
          <Image
            src="/images/brand/logo-icon.png"
            alt={SITE.name}
            width={300}
            height={300}
            priority
            quality={100}
            className={cn(
              "w-auto transition-all duration-500 ease-smooth",
              scrolled || open ? "h-10 sm:h-11" : "h-12 sm:h-14",
            )}
          />
        </Link>

        {/* Navigation desktop */}
        <nav className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "link-underline text-sm font-medium transition-colors",
                scrolled ? "text-forest" : "text-white drop-shadow",
              )}
            >
              {link.label}
            </Link>
          ))}
          <Button href="/contact" variant="primary" className="px-6 py-2.5">
            Demander un devis
          </Button>
        </nav>

        {/* Bouton burger mobile */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={open}
          className={cn(
            "relative z-10 flex h-11 w-11 items-center justify-center rounded-full transition-colors lg:hidden",
            scrolled || open ? "text-forest" : "text-white",
          )}
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>
      </header>

      {/* Panneau mobile — HORS du <header> : un ancêtre avec backdrop-blur
          devient le bloc conteneur des enfants fixed, ce qui confinait le
          panneau à la barre du header. z-[45] : au-dessus de la barre du bas
          (z-40), sous le header (z-50) pour garder la croix cliquable. */}
      <div
        className={cn(
          "fixed inset-0 z-[45] flex flex-col bg-cream px-6 pt-24 pb-10 transition-opacity duration-400 ease-smooth lg:hidden",
          open
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0",
        )}
      >
        <nav className="flex flex-col gap-2">
          {NAV_LINKS.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="border-b border-beige py-4 font-display text-2xl text-forest transition-colors hover:text-leaf-dark"
              style={{ transitionDelay: open ? `${i * 40}ms` : "0ms" }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="mt-auto flex flex-col gap-3">
          <Button href="/contact" variant="primary" className="w-full">
            Demander un devis
          </Button>
          <a
            href={`tel:${SITE.phoneHref}`}
            className="flex items-center justify-center gap-2 py-2 text-forest"
          >
            <Phone size={18} /> {SITE.phone}
          </a>
        </div>
      </div>
    </>
  );
}
