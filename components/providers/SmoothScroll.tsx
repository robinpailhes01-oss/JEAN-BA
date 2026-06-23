"use client";

import { ReactLenis } from "lenis/react";
import { useReducedMotion } from "framer-motion";

/**
 * Défilement fluide (momentum / inertie) à la Lenis — la signature des sites
 * haut de gamme. Désactivé si l'utilisateur préfère réduire les animations.
 *
 * `anchors` : Lenis gère lui-même les liens d'ancre (#services…) avec un
 * décalage qui compense la hauteur du header fixe.
 */
export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  const reduce = useReducedMotion();

  if (reduce) return <>{children}</>;

  return (
    <ReactLenis
      root
      options={{
        lerp: 0.09,
        duration: 1.15,
        smoothWheel: true,
        anchors: { offset: -90 },
      }}
    >
      {children}
    </ReactLenis>
  );
}
