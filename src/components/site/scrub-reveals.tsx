"use client";

import { deferInit, gsap, MOTION, onEnter, useGSAP } from "./smooth-scroll";

/**
 * Entrées des blocs marqués [data-scrub] (up | left | right | scale), terminées avant que le bloc dépasse le bas de l'écran (≈ 80 %).
 * - Souris : l'animation avance quand on descend et recule quand on remonte.
 * - Tactile : l'animation se joue une fois, sur la durée, quand le bloc entre dans l'écran
 *   (le défilement par lancers rend un scrub saccadé et prématuré).
 * Sans JS ou en mouvement réduit : rien n'est masqué.
 */
export function ScrubReveals() {
  useGSAP((context) => {
    return deferInit(() => context.add(() => {
      const mm = gsap.matchMedia();
      mm.add({ fine: MOTION.fine, coarse: MOTION.coarse }, (ctx) => {
        const coarse = ctx.conditions?.coarse;
        gsap.utils.toArray<HTMLElement>("[data-scrub]").forEach((el) => {
          const v = el.dataset.scrub;
          const from =
            v === "left" ? { x: -60, opacity: 0 } : v === "right" ? { x: 60, opacity: 0 } : v === "scale" ? { scale: 0.92, opacity: 0, y: 30 } : { y: 50, opacity: 0 };
          const to = { x: 0, y: 0, scale: 1, opacity: 1 };
          if (coarse) gsap.fromTo(el, from, { ...to, duration: 1.1, ease: "expo.out", scrollTrigger: onEnter(el) });
          else gsap.fromTo(el, from, { ...to, ease: "none", scrollTrigger: { trigger: el, start: "top 100%", end: "top 80%", scrub: 0.6 } });
        });
      });
    }));
  });
  return null;
}
