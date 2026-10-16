"use client";

import { useRef } from "react";
import { deferInit, gsap, MOTION, onEnter, SplitText, useGSAP } from "@/components/site/smooth-scroll";

const ROW_A = ["Symfony", "PHP", "Doctrine", "API", "PostgreSQL", "Docker", "Linux", "VPS", "HTTPS"];
const ROW_B = ["React", "React Native", "Next.js", "TypeScript", "Tailwind CSS", "GSAP", "Accessibilité", "SEO technique"];

const PILLARS = [
  { k: "Back-end & métier", t: "Mon socle. La logique métier, les comptes, les données et le back-office : solide et pensé pour durer.", tech: "Symfony · PHP · Doctrine · API" },
  { k: "Interfaces web", t: "Des pages rapides, lisibles sur tous les écrans, avec des animations qui donnent envie de lire.", tech: "React · Next.js · TypeScript · Tailwind" },
  { k: "Applications mobiles", t: "Une application iOS et Android à partir d'une même base de code, reliée à votre back-office.", tech: "React Native" },
  { k: "Mise en ligne", t: "Base de données, hébergement, nom de domaine, HTTPS, déploiement et suivi.", tech: "PostgreSQL · Docker · Linux · VPS" },
];

export function Skills() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    (context) => {
      return deferInit(() => context.add(() => {
        const mm = gsap.matchMedia();
        mm.add({ fine: MOTION.fine, coarse: MOTION.coarse }, (ctx) => {
          const coarse = ctx.conditions?.coarse;
          // les deux bandeaux glissent en sens contraire au rythme du défilement
          const band = { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true };
          gsap.fromTo("[data-row-a]", { xPercent: 0 }, { xPercent: -30, ease: "none", scrollTrigger: band });
          gsap.fromTo("[data-row-b]", { xPercent: -30 }, { xPercent: 0, ease: "none", scrollTrigger: band });

          const split = SplitText.create("[data-skills-lead]", { type: "words", aria: "none" });
          const tl = gsap.timeline({
            defaults: { ease: "none" },
            scrollTrigger: coarse ? onEnter("[data-skills-lead]", "top 70%") : { trigger: "[data-skills-lead]", start: "top 85%", end: "bottom 45%", scrub: 0.6 },
          });
          tl.fromTo(split.words, { opacity: 0.4 }, { opacity: 1, stagger: { amount: 1 }, duration: 0.4 });
          gsap.from("[data-pillar]", {
            y: 60,
            opacity: 0,
            stagger: 0.1,
            ...(coarse ? { duration: 1, ease: "expo.out", scrollTrigger: onEnter("[data-pillars]") } : { ease: "none", scrollTrigger: { trigger: "[data-pillars]", start: "top 100%", end: "top 75%", scrub: 0.6 } }),
          });
          return () => split.revert();
        });
      }));
    },
    { scope: root },
  );

  const row = (items: string[], attr: object, outline = false) => (
    <div className="overflow-hidden" aria-hidden="true">
      <div {...attr} className="flex w-max gap-6 whitespace-nowrap py-2 font-display text-[clamp(1.8rem,min(5vw,10vh),5rem)] font-extrabold leading-none tracking-tight">
        {[...items, ...items, ...items].map((t, i) => (
          <span key={i} className={`flex items-center gap-6 ${outline ? "text-transparent [-webkit-text-stroke:1.5px_rgba(201,182,251,.7)]" : "text-white"}`}>
            {t} <span className="size-3 rounded-full bg-lilac" />
          </span>
        ))}
      </div>
    </div>
  );

  return (
    <section ref={root} id="competences" data-scene data-theme="dark" className="overflow-hidden bg-violet-950 py-[clamp(4rem,10vh,7rem)] text-white">
      <div className="container-x">
        <p className="eyebrow mb-4 flex items-center gap-4 text-lilac">
          <span aria-hidden="true" className="h-0.5 w-12 rounded bg-lilac" /> Compétences
        </p>
        <h2 data-skills-lead className="max-w-[26ch] font-display text-[clamp(1.7rem,min(0.9rem+2.7vw,6vh),4.6rem)] font-bold leading-[1.05] tracking-[-0.02em]">
          Symfony et PHP pour le cœur métier, React et React Native pour le web et le mobile&nbsp;: je maîtrise toute la chaîne, sans intermédiaire.
        </h2>
      </div>

      <div className="my-[clamp(2.5rem,8vh,6rem)] -rotate-2 space-y-2">
        {row(ROW_A, { "data-row-a": "" })}
        {row(ROW_B, { "data-row-b": "" }, true)}
      </div>

      <div data-pillars className="container-x grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {PILLARS.map((p, i) => (
          <div key={p.k} data-pillar className="flex flex-col rounded-[clamp(1.25rem,2vw,2rem)] bg-white/[0.05] p-[clamp(1.25rem,2vw,2rem)] ring-1 ring-white/10">
            <span className="font-display text-[length:var(--step-2)] font-extrabold text-lilac/40">0{i + 1}</span>
            <h3 className="mt-2 font-display text-[length:var(--step-1)] font-bold">{p.k}</h3>
            <p className="mt-2 text-[length:var(--step--1)] leading-relaxed text-white/75">{p.t}</p>
            <p className="mt-auto pt-5 text-[0.85rem] font-semibold text-lilac">{p.tech}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
