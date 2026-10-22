"use client";

import { useRef } from "react";
import { deferInit, gsap, MOTION, onEnter, useGSAP } from "@/components/site/smooth-scroll";

const STEPS = [
  { t: "On échange", d: "Votre activité, vos clients, ce que le site doit vous apporter, votre budget. Je pars de vos besoins, pas d'un modèle tout fait." },
  { t: "La maquette", d: "Vous voyez à quoi ressemblera votre site avant le développement, et vous la validez." },
  { t: "Le développement", d: "Vous suivez l'avancement sur une version de test en ligne, et j'intègre vos retours au fil de l'eau." },
  { t: "La mise en ligne", d: "Nom de domaine, HTTPS, référencement de base : votre site est prêt à recevoir ses visiteurs." },
  { t: "Le suivi", d: "Mises à jour, sauvegardes, nouvelles pages ou fonctionnalités : votre site évolue avec vous." },
];

export function Method() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    (context) => {
      return deferInit(() => context.add(() => {
        const mm = gsap.matchMedia();
        mm.add({ fine: MOTION.fine, coarse: MOTION.coarse }, (ctx) => {
          const coarse = ctx.conditions?.coarse;
          // la ligne se trace le long des étapes ; chaque pastille s'allume à son passage
          gsap.fromTo("[data-m-line]", { scaleY: 0 }, { scaleY: 1, ease: "none", scrollTrigger: { trigger: "[data-m-steps]", start: "top 75%", end: "bottom 75%", scrub: true } });
          gsap.utils.toArray<HTMLElement>("[data-m-step]").forEach((el) => {
            const dot = el.querySelector("[data-m-dot]");
            gsap.fromTo(dot, { backgroundColor: "#efe9fd", color: "#5b21b6", scale: 0.85 }, { backgroundColor: "#5b21b6", color: "#ffffff", scale: 1, duration: 0.4, scrollTrigger: { trigger: el, start: "top 75%", toggleActions: "play none none reverse" } });
            gsap.from(el.querySelector("[data-m-body]"), {
              x: 40,
              opacity: 0,
              ...(coarse ? { duration: 1, ease: "expo.out", scrollTrigger: onEnter(el, "top 90%") } : { ease: "none", scrollTrigger: { trigger: el, start: "top 100%", end: "top 78%", scrub: 0.6 } }),
            });
          });
        });
      }));
    },
    { scope: root },
  );

  return (
    <section ref={root} id="methode" data-theme="light" className="bg-white py-[clamp(3rem,7vh,5rem)]">
      <div className="container-x grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-[calc(var(--header-h)+3rem)]">
            <h2 data-scrub="up" className="eyebrow mb-4 flex items-center gap-4 text-violet">
              <span aria-hidden="true" className="h-0.5 w-12 rounded bg-violet" /> Méthode de création de votre site web
            </h2>
            <p data-scrub="up" className="font-display text-[length:var(--step-4)] font-extrabold leading-[0.95] tracking-[-0.03em]">
              Cinq étapes, <span className="text-violet">zéro flou.</span>
            </p>
            <p data-scrub="up" className="mt-5 max-w-[36ch] text-stone">
              Un seul interlocuteur, moi, du premier échange à la mise en ligne, et après.
            </p>
          </div>
        </div>
        <ol data-m-steps className="relative grid gap-[clamp(2rem,6vh,4rem)] lg:col-span-7">
          <span className="absolute bottom-4 left-[1.45rem] top-4 w-1 rounded bg-lilac-100" aria-hidden="true">
            <span data-m-line className="block h-full w-full origin-top rounded bg-violet" />
          </span>
          {STEPS.map((s, i) => (
            <li key={s.t} data-m-step className="relative flex gap-6">
              <span data-m-dot className="relative z-10 grid size-12 shrink-0 place-items-center rounded-full bg-violet font-display font-bold text-white ring-8 ring-white">
                0{i + 1}
              </span>
              <div data-m-body className="pt-1.5">
                <h3 className="font-display text-[length:var(--step-2)] font-bold leading-tight">{s.t}</h3>
                <p className="mt-2 max-w-[48ch] text-stone">{s.d}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
