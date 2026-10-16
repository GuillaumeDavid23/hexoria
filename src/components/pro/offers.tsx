"use client";

import { useRef } from "react";
import { deferInit, gsap, MOTION, onEnter, useGSAP } from "@/components/site/smooth-scroll";

const Check = () => (
  <span className="mt-1 grid size-6 shrink-0 place-items-center rounded-full bg-violet text-white">
    <svg viewBox="0 0 24 24" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="m5 12.5 4.5 4.5L19 7.5" />
    </svg>
  </span>
);

/** Vitrine : le même site sur ordinateur et téléphone. */
function ShowcaseArt() {
  return (
    <div className="relative h-full">
      <div data-o-desk className="absolute inset-y-[6%] left-0 right-[16%] overflow-hidden rounded-xl bg-white shadow-xl ring-1 ring-ink/5">
        <div className="flex gap-1 border-b border-ink/5 bg-mist px-3 py-2">
          <span className="size-2 rounded-full bg-ink/15" />
          <span className="size-2 rounded-full bg-ink/15" />
          <span className="size-2 rounded-full bg-ink/15" />
        </div>
        <div className="flex h-full flex-col gap-2 p-3">
          <div data-o-b className="h-[38%] rounded-lg bg-gradient-to-br from-[#f5c76b] to-[#e5484d]/70" />
          <div className="grid grid-cols-3 gap-2">
            {[0, 1, 2].map((i) => (
              <div key={i} data-o-b className="h-10 rounded-md bg-mist ring-1 ring-ink/5" />
            ))}
          </div>
          <div data-o-b className="h-2 w-2/3 rounded bg-ink/15" />
          <div data-o-b className="h-2 w-1/2 rounded bg-ink/10" />
        </div>
      </div>
      <div data-o-phone className="absolute bottom-0 right-0 aspect-[9/18] w-[28%] overflow-hidden rounded-2xl border-[5px] border-ink bg-white shadow-2xl">
        <div className="h-[35%] bg-gradient-to-br from-[#f5c76b] to-[#e5484d]/70" />
        <div className="space-y-1.5 p-2">
          <div className="h-1.5 w-4/5 rounded bg-ink/20" />
          <div className="h-1.5 w-3/5 rounded bg-ink/10" />
          <div className="mt-2 h-4 rounded-full bg-violet" />
        </div>
      </div>
    </div>
  );
}

/** Application : un tableau de bord dont les courbes se remplissent. */
function AppArt() {
  const bars = [38, 62, 48, 80, 66, 92, 74];
  return (
    <div className="grid h-full grid-cols-[22%_1fr] overflow-hidden rounded-xl bg-white shadow-xl ring-1 ring-ink/5">
      <div className="space-y-2 bg-violet-950 p-3">
        <span className="mb-3 block h-3 w-3/4 rounded bg-white/80" />
        {[0, 1, 2, 3].map((i) => (
          <span key={i} className={`block h-2 rounded ${i === 1 ? "w-full bg-lilac" : "w-4/5 bg-white/20"}`} />
        ))}
      </div>
      <div className="flex flex-col gap-2.5 p-3">
        <div className="grid grid-cols-3 gap-2">
          {["Devis", "Clients", "CA"].map((k, i) => (
            <div key={k} data-o-kpi className="rounded-lg bg-mist p-2 ring-1 ring-ink/5">
              <span className="block text-[0.6rem] font-semibold text-stone">{k}</span>
              <span className="font-display text-sm font-bold text-violet">{["24", "138", "+18 %"][i]}</span>
            </div>
          ))}
        </div>
        <div className="flex flex-1 items-end gap-[4%] rounded-lg bg-mist p-2 ring-1 ring-ink/5">
          {bars.map((h, i) => (
            <span key={i} data-o-bar className="flex-1 origin-bottom rounded-t bg-violet" style={{ height: `${h}%`, opacity: 0.45 + i * 0.08 }} />
          ))}
        </div>
        <div className="space-y-1.5">
          {[0, 1].map((i) => (
            <div key={i} data-o-row className="flex items-center gap-2 rounded-md bg-mist px-2 py-1.5">
              <span className="size-3 rounded-full bg-lilac" />
              <span className="h-1.5 flex-1 rounded bg-ink/15" />
              <span className="rounded-full bg-ok/15 px-1.5 text-[0.55rem] font-bold text-ok">Validé</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const OFFERS = [
  {
    key: "vitrine",
    tag: "Site vitrine",
    title: "Présentez votre activité, soyez trouvé.",
    text: "Commerce, artisan, profession libérale, association : un site clair et soigné qui donne envie de vous contacter.",
    items: ["Design sur mesure, adapté au téléphone", "Référencement local sur Google", "Formulaire de contact ou prise de rendez-vous", "Nom de domaine, HTTPS et mise en ligne"],
    art: <ShowcaseArt />,
  },
  {
    key: "app",
    tag: "Application web, mobile & SaaS",
    title: "Un outil métier taillé pour vous.",
    text: "Quand un tableur ne suffit plus : une application qui colle à votre façon de travailler, sur ordinateur comme sur téléphone.",
    items: ["Espace client et back-office", "Devis, réservations, suivi, tableaux de bord", "Application mobile iOS et Android", "Hébergement, sauvegardes et évolutions"],
    art: <AppArt />,
  },
];

const ALSO = ["Refonte d'un site existant", "Hébergement & maintenance", "Animations et effets au défilement", "Dépannage informatique pour votre entreprise"];

export function Offers() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    (context) => {
      return deferInit(() => context.add(() => {
        const mm = gsap.matchMedia();
        mm.add({ fine: MOTION.fine, coarse: MOTION.coarse }, (ctx) => {
          const coarse = ctx.conditions?.coarse;
          gsap.utils.toArray<HTMLElement>("[data-offer]").forEach((card, i) => {
            const q = gsap.utils.selector(card);
            const tl = gsap.timeline({
              defaults: { ease: "none" },
              scrollTrigger: coarse ? onEnter(card, "top 75%") : { trigger: card, start: "top 100%", end: "top 40%", scrub: 0.6 },
            });
            tl.from(card, { y: 80, opacity: 0, rotate: i ? 2 : -2, duration: 0.25, ease: "expo.out" }, 0);
            if (card.dataset.offer === "vitrine") {
              tl.from(q("[data-o-desk]"), { x: -40, opacity: 0, duration: 0.4 }, 0.2)
                .from(q("[data-o-b]"), { y: 14, opacity: 0, duration: 0.2, stagger: 0.05 }, 0.35)
                .from(q("[data-o-phone]"), { y: 60, rotate: 8, opacity: 0, duration: 0.4, ease: "back.out(1.6)" }, 0.5);
            } else {
              tl.from(q("[data-o-kpi]"), { y: 14, opacity: 0, duration: 0.2, stagger: 0.06 }, 0.25)
                .from(q("[data-o-bar]"), { scaleY: 0, duration: 0.35, stagger: 0.04, ease: "power2.out" }, 0.35)
                .from(q("[data-o-row]"), { x: 30, opacity: 0, duration: 0.2, stagger: 0.08 }, 0.6);
            }
          });
        });
      }));
    },
    { scope: root },
  );

  return (
    <section ref={root} id="offres" data-theme="light" className="bg-mist py-[clamp(4rem,10vh,7rem)]">
      <div className="container-x">
        <p data-scrub="up" className="eyebrow mb-4 flex items-center gap-4 text-violet">
          <span aria-hidden="true" className="h-0.5 w-12 rounded bg-violet" /> Offres
        </p>
        <h2 data-scrub="up" className="max-w-[18ch] font-display text-[length:var(--step-4)] font-extrabold leading-[0.95] tracking-[-0.03em] text-balance">
          Du site vitrine <span className="text-violet">à l&apos;application.</span>
        </h2>

        <div className="mt-[clamp(2.5rem,7vh,5rem)] grid gap-6 lg:grid-cols-2">
          {OFFERS.map((o) => (
            <article key={o.key} data-offer={o.key} className="flex flex-col overflow-hidden rounded-[clamp(1.5rem,3vw,2.75rem)] bg-white shadow-[0_40px_80px_-50px_rgba(28,10,66,.5)] ring-1 ring-ink/5">
              <div className="h-[clamp(14rem,32svh,22rem)] bg-lilac-100 p-[clamp(1rem,2.5vw,2rem)]" aria-hidden="true">
                {o.art}
              </div>
              <div className="flex flex-1 flex-col p-[clamp(1.25rem,3vw,3rem)]">
                <p className="eyebrow text-violet">{o.tag}</p>
                <h3 className="mt-3 font-display text-[length:var(--step-2)] font-extrabold leading-[1.05] tracking-tight">{o.title}</h3>
                <p className="mt-3 text-stone">{o.text}</p>
                <ul className="mt-6 grid gap-2.5">
                  {o.items.map((it) => (
                    <li key={it} className="flex items-start gap-3">
                      <Check /> {it}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>

        <div data-scrub="up" className="mt-8 flex flex-wrap items-center gap-3">
          <span className="mr-2 font-display text-[length:var(--step-1)] font-bold">Et aussi&nbsp;:</span>
          {ALSO.map((a) => (
            <span key={a} className="rounded-full bg-white px-4 py-2 text-[length:var(--step--1)] font-semibold ring-1 ring-violet/15">
              {a}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
