"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, SplitText, DrawSVGPlugin, MorphSVGPlugin, ScrambleTextPlugin, useGSAP);
// mobile : la barre d'adresse qui apparaît/disparaît ne doit pas recalculer (et faire sauter) les animations
ScrollTrigger.config({ ignoreMobileResize: true });

/**
 * Conditions pour gsap.matchMedia() : la même scène s'anime différemment selon l'appareil.
 * - fine   : souris / pavé tactile → animations asservies au défilement (scrub), réversibles.
 * - coarse : écran tactile → le défilement natif va par à-coups (lancer, inertie) ; une animation
 *            asservie saute et semble partir trop tôt. On joue donc chaque entrée UNE fois, sur
 *            la durée, quand l'élément est réellement visible (≈ 15 % dans l'écran).
 * - reduce : mouvement réduit → rien n'est masqué ni animé.
 */
export const MOTION = {
  fine: "(prefers-reduced-motion: no-preference) and (hover: hover)",
  coarse: "(prefers-reduced-motion: no-preference) and (hover: none)",
  reduce: "(prefers-reduced-motion: reduce)",
} as const;

/** Lissage du scrub : court au tactile pour coller au doigt, plus doux à la molette. */
export const scrubFor = (coarse: boolean | undefined) => (coarse ? 0.2 : 0.6);

/** Déclencheur « jouer une fois à l'entrée » (tactile). */
export const onEnter = (trigger: Element | string, start = "top 85%") => ({ trigger, start, once: true });

/**
 * Préparation différée des animations hors écran : chaque section est mise en place à son tour,
 * quand le navigateur est libre, pour ne pas bloquer l'affichage et les premiers gestes (mobile).
 * L'ordre d'appel (ordre du document) est conservé, puis les déclencheurs sont recalculés.
 */
const queue: { fn: () => void; off: boolean }[] = [];
let pending = false;
const idle = (cb: () => void) =>
  typeof window.requestIdleCallback === "function" ? window.requestIdleCallback(cb, { timeout: 900 }) : setTimeout(cb, 120);
function drain() {
  const job = queue.shift();
  if (job && !job.off) job.fn();
  if (queue.length) idle(drain);
  else {
    pending = false;
    ScrollTrigger.sort();
    ScrollTrigger.refresh();
  }
}
/** Renvoie une fonction d'annulation : à retourner depuis useGSAP (démontage, double rendu de dev). */
export function deferInit(fn: () => void) {
  const job = { fn, off: false };
  queue.push(job);
  if (!pending) {
    pending = true;
    idle(drain);
  }
  return () => {
    job.off = true;
  };
}

const LenisContext = createContext<Lenis | null>(null);
export const useLenis = () => useContext(LenisContext);

const easeOut = (t: number) => 1 - Math.pow(1 - t, 4);

const headerH = () => document.querySelector("header")?.getBoundingClientRect().height ?? 0;

/** Position de départ d'une scène (un élément épinglé est mesuré via son pin-spacer). */
function sceneTop(el: HTMLElement) {
  const box = el.parentElement?.classList.contains("pin-spacer") ? el.parentElement : el;
  // le défilement s'arrête sous l'en-tête fixe pour les sections non épinglées
  const offset = el.dataset.scene === undefined && el.id !== "top" ? headerH() : 0;
  return box.getBoundingClientRect().top + window.scrollY - offset;
}

/**
 * Défilement libre et fluide.
 * - Molette / pavé tactile : inertie douce (Lenis), sans étape imposée ni verrou :
 *   on s'arrête où l'on veut et on inverse le sens immédiatement.
 * - Tactile : défilement natif du téléphone.
 * - Clavier (flèches, Espace, Page suivante…) : comportement natif du navigateur.
 * - Mouvement réduit : défilement natif, sans lissage.
 * Les animations GSAP ScrollTrigger suivent la position de scroll (dans les deux sens).
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const instance = new Lenis({ lerp: 0.08, wheelMultiplier: 0.65, smoothWheel: true, syncTouch: false });
    instance.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => instance.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    // eslint-disable-next-line react-hooks/set-state-in-effect -- instance externe créée au montage
    setLenis(instance);
    return () => {
      gsap.ticker.remove(tick);
      instance.destroy();
    };
  }, []);

  useEffect(() => {
    // Recalcul une fois les polices et images chargées. Les sections épinglées ajoutent
    // de la hauteur à la page après le premier rendu : une URL avec ancre (/#cordee)
    // est donc recalée sur sa section une fois cette mise en page terminée.
    let anchored = false;
    const alignHash = () => {
      const id = decodeURIComponent(window.location.hash.slice(1));
      const el = id && document.getElementById(id);
      if (!el || anchored) return;
      anchored = true;
      window.scrollTo({ top: sceneTop(el), behavior: "auto" });
    };
    const refresh = () => {
      ScrollTrigger.refresh();
      alignHash();
    };
    document.fonts?.ready.then(refresh);
    window.addEventListener("load", refresh);
    const t = window.setTimeout(refresh, 600);
    return () => {
      window.removeEventListener("load", refresh);
      window.clearTimeout(t);
    };
  }, []);

  return <LenisContext value={lenis}>{children}</LenisContext>;
}

/** Aller au début d'une scène (menu, boutons) — interruptible à tout moment par l'utilisateur. */
export function scrollToId(lenis: Lenis | null, id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const top = sceneTop(el);
  if (lenis) lenis.scrollTo(top, { duration: 1.2, easing: easeOut });
  else window.scrollTo({ top, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  history.replaceState(null, "", id === "top" ? window.location.pathname : `#${id}`);
}

export { gsap, ScrollTrigger, SplitText, useGSAP };
