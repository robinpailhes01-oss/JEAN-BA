"use client";

import { Phone } from "lucide-react";
import Link from "next/link";
import { SITE } from "@/lib/constants";

/**
 * Barre d'action fixe en bas d'écran sur mobile.
 * Click-to-call + devis : essentiel pour un artisan local (trafic mobile).
 */
export default function MobileCta() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 border-t border-beige bg-cream/95 backdrop-blur-md lg:hidden">
      <a
        href={`tel:${SITE.phoneHref}`}
        className="flex items-center justify-center gap-2 py-4 text-sm font-semibold text-forest transition-colors active:bg-beige"
      >
        <Phone size={18} className="text-leaf-dark" />
        Appeler
      </a>
      <Link
        href="/contact"
        className="flex items-center justify-center gap-2 bg-leaf py-4 text-sm font-semibold text-white transition-colors active:bg-leaf-dark"
      >
        Demander un devis
      </Link>
    </div>
  );
}
