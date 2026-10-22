"use client";

import Link from "next/link";
import { useRef } from "react";
import { deferInit, gsap, MOTION, onEnter, useGSAP } from "@/components/site/smooth-scroll";

// Scores Lighthouse mesurés sur ce site (version ordinateur, audit de production)
const SCORES = [
  { label: "Performance", value: 100 },
  { label: "Accessibilité", value: 100 },
  { label: "Bonnes pratiques", value: 100 },
  { label: "Référencement", value: 100 },
];

const FACTS = ["60 images/s sur téléphone", "Adapté à tous les écrans", "Hébergé et suivi par mes soins"];

/** La meilleure démonstration : le site lui-même, chiffres à l'appui. */
export function Proof() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    (context) => {
      return deferInit(() => context.add(() => {
        const mm = gsap.matchMedia();
        mm.add({ fine: MOTION.fine, coarse: MOTION.coarse }, (ctx) => {
          const coarse = ctx.conditions?.coarse;
          const tl = gsap.timeline({
            defaults: { ease: "none" },
            scrollTrigger: coarse ? onEnter(root.current!, "top 85%") : { trigger: root.current, start: "top 95%", end: "center 65%", scrub: 0.6 },
          });
          tl.from("[data-proof-copy] > *", { y: 40, opacity: 0, duration: 0.5, stagger: 0.08, ease: "expo.out" }, 0)
            .from("[data-score]", { y: 40, opacity: 0, scale: 0.9, duration: 0.4, stagger: 0.08, ease: "expo.out" }, 0.1);
          gsap.utils.toArray<HTMLElement>("[data-score]").forEach((el, i) => {
            const n = el.querySelector<HTMLElement>("[data-score-n]")!;
            const obj = { v: 0 };
            tl.from(el.querySelector("[data-score-arc]"), { drawSVG: "0%", duration: 0.6, ease: "power2.out" }, 0.25 + i * 0.08).to(
              obj,
              { v: Number(n.dataset.scoreN), duration: 0.6, ease: "power2.out", onUpdate: () => (n.textContent = String(Math.round(obj.v))) },
              0.25 + i * 0.08,
            );
          });
        });
      }));
    },
    { scope: root },
  );

  return (
    <section ref={root} data-theme="light" className="bg-mist py-[clamp(3rem,7vh,5rem)]">
      <div className="container-x">
        <div className="relative overflow-hidden rounded-[clamp(1.5rem,3vw,3rem)] bg-white p-[clamp(1.5rem,4.5vw,4.5rem)] ring-1 ring-violet/10">
          <div className="dots absolute inset-0 opacity-60" aria-hidden="true" />
          <div className="relative grid gap-[clamp(2rem,4vw,4rem)] lg:grid-cols-[1.1fr_1fr] lg:items-center">
            <div data-proof-copy>
              <p className="eyebrow mb-4 text-violet">La preuve par l&apos;exemple</p>
              <p className="font-display text-[length:var(--step-3)] font-extrabold leading-[0.98] tracking-[-0.03em]">
                Le site que vous parcourez&nbsp;? <span className="text-violet">Je l&apos;ai conçu et développé moi-même.</span>
              </p>
              <p className="mt-5 max-w-[48ch] text-stone">
                Animations au défilement, adaptation au téléphone, référencement, hébergement&nbsp;: tout ce que vous voyez ici peut être fait pour votre activité.
              </p>
              <ul className="mt-6 flex flex-wrap gap-2">
                {FACTS.map((f) => (
                  <li key={f} className="rounded-full bg-lilac-100 px-4 py-2 text-[length:var(--step--1)] font-semibold text-violet">
                    {f}
                  </li>
                ))}
              </ul>
              <Link href="/" className="mt-8 inline-flex rounded-full px-7 py-4 font-semibold ring-2 ring-ink/15 transition-colors hover:bg-mist">
                Voir le parcours Particuliers →
              </Link>
            </div>

            <figure className="rounded-[clamp(1.25rem,2vw,2rem)] bg-violet-950 p-[clamp(1.25rem,3vw,2.5rem)] text-white shadow-[0_40px_80px_-40px_rgba(28,10,66,.7)]">
              <div className="mb-[clamp(1.25rem,3vh,2rem)] flex items-center gap-2">
                <span className="size-2.5 rounded-full bg-alert/80" />
                <span className="size-2.5 rounded-full bg-warn/80" />
                <span className="size-2.5 rounded-full bg-ok/80" />
                <span className="ml-2 text-sm text-white/50">Google Lighthouse · hexoria.fr</span>
              </div>
              <div className="grid grid-cols-2 gap-[clamp(1rem,2.5vw,2rem)] sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
                {SCORES.map((s) => (
                  <div key={s.label} data-score className="flex flex-col items-center text-center">
                    <span className="relative grid size-[clamp(4.5rem,8vw,6.5rem)] place-items-center">
                      <svg viewBox="0 0 36 36" className="absolute inset-0 size-full -rotate-90" aria-hidden="true">
                        <circle cx="18" cy="18" r="15.5" fill="#16a34a" fillOpacity="0.12" stroke="#16a34a" strokeOpacity="0.2" strokeWidth="3" />
                        <circle data-score-arc cx="18" cy="18" r="15.5" fill="none" stroke="#22c55e" strokeWidth="3" strokeLinecap="round" />
                      </svg>
                      <span data-score-n={s.value} className="font-display text-[clamp(1.4rem,2.4vw,2rem)] font-extrabold text-[#4ade80]">
                        {s.value}
                      </span>
                    </span>
                    <span className="mt-3 text-[length:var(--step--1)] font-semibold text-white/80">{s.label}</span>
                  </div>
                ))}
              </div>
              <figcaption className="mt-[clamp(1.25rem,3vh,2rem)] border-t border-white/10 pt-4 text-sm text-white/50">
                Scores mesurés sur ce site, version ordinateur.
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}
