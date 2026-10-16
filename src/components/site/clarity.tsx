"use client";

import { useRef } from "react";
import { site } from "@/content/site";
import { gsap, MOTION, onEnter, SplitText, useGSAP } from "./smooth-scroll";

const PROMISES = [
  { from: 99, value: 0, unit: "", label: "jargon technique. Des mots simples, et des explications que vous gardez." },
  { from: 9, value: 1, unit: "", label: `seul interlocuteur : ${site.person}, du premier appel jusqu'à la fin.` },
  { from: 0, value: 3, unit: "", label: "domaines : dépannage, installation et sauvegarde." },
];

export function Clarity() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      const split = SplitText.create("[data-manifesto]", { type: "words", wordsClass: "word" });
      const counters = gsap.utils.toArray<HTMLElement>("[data-count]");

      // Le texte s'allume mot à mot, puis les engagements arrivent ; « 99 » jargon tombe à 0.
      mm.add({ fine: MOTION.fine, coarse: MOTION.coarse }, (ctx) => {
        const coarse = ctx.conditions?.coarse;
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: coarse ? onEnter(root.current!, "top 65%") : { trigger: root.current, start: "top 75%", end: "center 45%", scrub: 0.6 },
        });
        tl.fromTo(split.words, { opacity: 0.12 }, { opacity: 1, duration: 0.5, ease: "power1.out", stagger: { amount: 1.4 } }, 0);
        gsap.utils.toArray<HTMLElement>("[data-promise]").forEach((el, i) => {
          const at = 0.9 + i * 0.3;
          const c = counters[i];
          const obj = { v: Number(c.dataset.from) };
          tl.fromTo(el, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, ease: "expo.out" }, at).to(
            obj,
            { v: Number(c.dataset.count), duration: 1.6, ease: "power3.out", onUpdate: () => (c.textContent = String(Math.round(obj.v))) },
            at,
          );
        });
      });

      return () => split.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} id="clarte" data-scene data-theme="dark" className="relative overflow-hidden bg-violet-950 text-white">
      <div className="dots absolute inset-0 opacity-40 [filter:invert(1)]" aria-hidden="true" />
      <div className="absolute -right-[20vw] -top-[20vw] size-[60vw] rounded-full bg-[radial-gradient(circle,rgba(154,107,242,.35)_0%,rgba(154,107,242,0)_65%)]" aria-hidden="true" />
      <div className="container-x relative grid min-h-svh content-center gap-[clamp(2.5rem,7vh,6rem)] py-[calc(var(--header-h)+2rem)]">
        <div>
          <h2 className="eyebrow mb-[clamp(1rem,4vh,3rem)] flex items-center gap-4 text-lilac">
            <span aria-hidden="true" className="h-0.5 w-12 rounded bg-lilac" /> L&apos;informatique, simplement
          </h2>
          <p data-manifesto className="max-w-[26ch] font-display text-[clamp(1.9rem,min(1rem+3.2vw,6.8vh),6rem)] font-bold leading-[1.05] tracking-[-0.02em]">
            Ordinateur, téléphone, imprimante, Wi-Fi&nbsp;: la technologie ne devrait pas vous compliquer la vie. {site.person} vient chez vous, règle le problème et prend le temps de tout vous
            expliquer, à votre rythme.
          </p>
        </div>

        <dl className="grid gap-x-[clamp(1.5rem,3vw,4rem)] gap-y-8 sm:grid-cols-3">
          {PROMISES.map((p) => (
            <div data-promise key={p.label} className="border-t-2 border-white/15 pt-5">
              <dt className="font-display text-[clamp(3rem,min(1rem+5vw,12vh),8rem)] font-extrabold leading-none text-lilac">
                <span data-count={p.value} data-from={p.from}>
                  {p.value}
                </span>
              </dt>
              <dd className="mt-3 max-w-[30ch] text-[length:var(--step-0)] leading-snug text-white/80">{p.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
