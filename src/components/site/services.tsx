"use client";

import { useRef, type ReactNode } from "react";
import { gsap, MOTION, onEnter, useGSAP } from "./smooth-scroll";

const Check = ({ className = "size-4" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="m5 12.5 4.5 4.5L19 7.5" />
  </svg>
);

/* ---------- Illustrations animées (pilotées par data-*) ---------- */

/** Dépannage : la jauge passe de « ça rame » à « ça file », les alertes disparaissent. */
function RepairArt() {
  return (
    <div className="relative grid h-full place-items-center">
      <div className="relative w-[min(100%,26rem)] rounded-2xl bg-ink p-2.5 shadow-2xl">
        <div className="relative aspect-[16/10] overflow-hidden rounded-lg bg-white">
          <div className="flex items-center gap-1.5 border-b border-ink/5 bg-mist px-3 py-1.5">
            <span className="size-2 rounded-full bg-alert/80" />
            <span className="size-2 rounded-full bg-warn/80" />
            <span className="size-2 rounded-full bg-ink/15" />
          </div>
          <svg viewBox="0 0 200 120" className="absolute inset-x-0 bottom-1 mx-auto h-[82%]">
            <defs>
              <linearGradient id="gauge" x1="0" x2="1">
                <stop offset="0" stopColor="#e5484d" />
                <stop offset="0.5" stopColor="#f59e0b" />
                <stop offset="1" stopColor="#5b21b6" />
              </linearGradient>
            </defs>
            <path d="M30 100a70 70 0 0 1 140 0" fill="none" stroke="#efe9fd" strokeWidth="16" strokeLinecap="round" />
            <path data-gauge d="M30 100a70 70 0 0 1 140 0" fill="none" stroke="url(#gauge)" strokeWidth="16" strokeLinecap="round" />
            <g data-needle>
              <path d="M100 100 L100 46" stroke="#16131f" strokeWidth="5" strokeLinecap="round" />
              <circle cx="100" cy="100" r="8" fill="#16131f" />
            </g>
          </svg>
          <div className="absolute inset-x-0 top-[17%] text-center font-display text-[clamp(0.9rem,1.6vw,1.4rem)] font-bold">
            <span data-slow className="absolute inset-x-0 text-alert">Ça rame…</span>
            <span data-fast className="absolute inset-x-0 text-violet opacity-0">Ça file&nbsp;!</span>
          </div>
        </div>
      </div>
      {["Erreur inattendue", "Stockage plein", "Imprimante hors ligne"].map((t, i) => (
        <div
          key={t}
          data-popup
          className="absolute flex items-center gap-2 rounded-xl bg-white px-3 py-2 text-[clamp(0.75rem,1vw,0.9rem)] font-semibold shadow-xl ring-1 ring-alert/30"
          style={{ left: ["2%", "58%", "8%"][i], top: ["8%", "14%", "74%"][i], rotate: `${[-5, 4, 3][i]}deg` }}
        >
          <span className="size-2.5 rounded-full bg-alert" /> {t}
        </div>
      ))}
    </div>
  );
}

/** Installation : le Wi-Fi capte, l'imprimante sort sa page, l'ordinateur s'allume. */
function SetupArt() {
  const tile = "relative grid min-h-0 place-items-center rounded-2xl bg-white shadow-xl ring-1 ring-ink/5";
  return (
    <div className="grid h-full grid-cols-3 grid-rows-[1fr_1fr] gap-[clamp(0.6rem,1.6vw,1.25rem)]">
      <div data-tile className={`${tile} col-span-3`}>
        <svg viewBox="0 0 120 70" className="h-[55%] max-h-32" fill="none" stroke="#5b21b6" strokeWidth="7" strokeLinecap="round">
          <path data-wave d="M38 40a32 32 0 0 1 44 0" />
          <path data-wave d="M24 27a52 52 0 0 1 72 0" />
          <path data-wave d="M10 14a72 72 0 0 1 100 0" />
          <circle cx="60" cy="56" r="6" fill="#5b21b6" stroke="none" />
        </svg>
        <span data-tile-ok className="absolute right-3 top-3 flex items-center gap-1.5 rounded-full bg-ok/10 px-3 py-1 text-sm font-bold text-ok">
          <Check /> Wi-Fi connecté
        </span>
      </div>
      <div data-tile className={tile}>
        <div className="relative mb-6 w-[min(70%,8rem)]">
          <div data-paper className="absolute inset-x-[16%] bottom-[40%] h-[90%] rounded-sm bg-white shadow ring-1 ring-ink/10">
            <div className="mx-auto mt-[22%] h-1 w-2/3 rounded bg-ink/15" />
            <div className="mx-auto mt-2 h-1 w-1/2 rounded bg-ink/15" />
            <div className="mx-auto mt-2 h-1 w-3/5 rounded bg-violet/40" />
          </div>
          <div className="relative h-14 rounded-xl bg-violet shadow-lg sm:h-16">
            <div className="absolute inset-x-[14%] top-3 h-1.5 rounded bg-violet-900" />
            <div className="absolute bottom-3 right-4 size-2 rounded-full bg-lilac" />
          </div>
        </div>
        <span className="absolute bottom-3 text-sm font-semibold text-stone">Imprimante</span>
      </div>
      <div data-tile className={tile}>
        <div className="relative mb-6 w-[min(72%,9rem)]">
          <div className="aspect-[16/10] overflow-hidden rounded-md border-4 border-ink bg-ink">
            <div data-screen className="grid size-full place-items-center bg-gradient-to-br from-violet-400 to-violet opacity-0">
              <span className="size-3 rounded-full bg-white/90" />
            </div>
          </div>
          <div className="mx-auto h-2 w-[115%] -translate-x-[6.5%] rounded-b-lg bg-ink/80" />
        </div>
        <span className="absolute bottom-3 text-sm font-semibold text-stone">Ordinateur</span>
      </div>
      <div data-tile className={tile}>
        <div data-phone className="relative mb-6 aspect-[9/16] w-[min(34%,3.6rem)] rounded-xl border-4 border-ink bg-ink">
          <div data-phone-screen className="size-full rounded-md bg-gradient-to-b from-violet-400 to-violet opacity-0" />
          <span className="absolute left-1/2 top-1 h-1 w-1/3 -translate-x-1/2 rounded-full bg-ink" />
        </div>
        <span className="absolute bottom-3 text-sm font-semibold text-stone">Téléphone</span>
      </div>
    </div>
  );
}

/** Sauvegarde : les photos et documents passent de l'ordinateur au disque, la barre se remplit. */
function BackupArt() {
  const files = ["#c9b6fb", "#9a6bf2", "#f59e0b", "#5b21b6", "#e5484d", "#16a34a"];
  return (
    <div className="relative flex h-full flex-col justify-center gap-[clamp(1rem,3vh,2rem)]">
      <div className="relative flex items-center justify-between gap-4">
        <div className="relative z-10 grid w-[44%] grid-cols-3 gap-2 rounded-2xl bg-white p-3 shadow-xl ring-1 ring-ink/5">
          {files.map((c, i) => (
            <div key={i} className="relative aspect-square overflow-hidden rounded-lg" style={{ background: `${c}33` }}>
              <div data-file className="absolute inset-0 grid place-items-center rounded-lg" style={{ background: c }}>
                {i % 3 === 2 ? (
                  <span className="h-1/2 w-2/5 rounded-sm bg-white/90" />
                ) : (
                  <svg viewBox="0 0 24 24" className="size-3/5" fill="#fff" aria-hidden="true">
                    <circle cx="8" cy="8" r="2.5" />
                    <path d="M3 19l6-7 4 4 3-3 5 6z" />
                  </svg>
                )}
              </div>
            </div>
          ))}
          <span className="col-span-3 pt-1 text-center text-sm font-semibold text-stone">Mes photos</span>
        </div>
        <svg viewBox="0 0 100 20" className="h-6 flex-1" aria-hidden="true">
          <path d="M2 10H92" stroke="#5b21b6" strokeWidth="3" strokeDasharray="4 6" strokeLinecap="round" />
          <path d="M86 4l8 6-8 6" fill="none" stroke="#5b21b6" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <div data-disk className="relative z-10 grid w-[30%] place-items-center gap-2 rounded-2xl bg-ink p-4 text-white shadow-xl">
          <svg viewBox="0 0 24 24" className="size-[45%]" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
            <rect x="4" y="3" width="16" height="18" rx="3" />
            <circle cx="12" cy="11" r="4" />
            <path d="M8 18h.01" strokeWidth="3" strokeLinecap="round" />
          </svg>
          <span className="text-center text-xs font-semibold text-white/70">Disque de sauvegarde</span>
        </div>
      </div>
      <div className="rounded-2xl bg-white p-4 shadow-xl ring-1 ring-ink/5">
        <div className="mb-2 flex justify-between text-sm font-semibold">
          <span>Copie en cours</span>
          <span>
            <span data-pct>0</span> %
          </span>
        </div>
        <div className="h-3 overflow-hidden rounded-full bg-lilac-100">
          <div data-bar className="h-full origin-left rounded-full bg-violet" />
        </div>
        <p data-done className="mt-3 flex items-center gap-2 font-bold text-ok opacity-0">
          <Check /> Vos souvenirs sont à l&apos;abri.
        </p>
      </div>
    </div>
  );
}

type Service = { n: string; title: string; text: string; items: string[]; art: ReactNode; kind: "repair" | "setup" | "backup"; tone: string };

const SERVICES: Service[] = [
  {
    n: "01",
    kind: "repair",
    title: "Dépannage",
    text: "Ordinateur lent, téléphone capricieux, messages d'erreur, problèmes de connexion.",
    items: ["Ordinateur ou téléphone qui rame", "Messages d'erreur qui reviennent", "Wi-Fi ou Internet qui coupe", "Imprimante qui n'imprime plus"],
    art: <RepairArt />,
    tone: "bg-white",
  },
  {
    n: "02",
    kind: "setup",
    title: "Installation",
    text: "Nouvel ordinateur, téléphone, imprimante, Wi-Fi, appareils connectés : on règle ça ensemble.",
    items: ["Ordinateur, tablette ou téléphone neuf", "Imprimante et scanner", "Box Internet et Wi-Fi", "Appareils connectés : télévision, enceinte…", "Prise en main, pas à pas"],
    art: <SetupArt />,
    tone: "bg-lilac-100",
  },
  {
    n: "03",
    kind: "backup",
    title: "Sauvegarde",
    text: "Vos photos et documents, copiés sur un autre support.",
    items: ["Photos du téléphone et de l'ordinateur", "Documents importants (papiers, factures…)", "Copie sur disque dur externe ou clé USB", "Pour ne rien perdre en cas de panne"],
    art: <BackupArt />,
    tone: "bg-[#e3d8fb]",
  },
];

export function Services() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add({ fine: MOTION.fine, coarse: MOTION.coarse }, (ctx) => {
        const coarse = ctx.conditions?.coarse;
        const cards = gsap.utils.toArray<HTMLElement>("[data-service]");

        // Pile de cartes (grand écran) : la carte suivante vient se poser sur la précédente, qui recule
        if (!coarse && window.matchMedia("(min-width: 64rem)").matches) {
          cards.forEach((card, i) => {
            const next = cards[i + 1];
            if (!next) return;
            gsap.fromTo(card.firstElementChild, { scale: 1, filter: "brightness(1)" }, {
              scale: 0.93,
              filter: "brightness(0.94)",
              ease: "none",
              scrollTrigger: { trigger: next, start: "top bottom", end: "top top+=120", scrub: true },
            });
          });
        }

        // Chaque illustration s'anime à l'arrivée de sa carte
        cards.forEach((card) => {
          const q = gsap.utils.selector(card);
          const st = coarse
            ? onEnter(card, "top 60%")
            : { trigger: card, start: "top 75%", end: "top top+=100", scrub: 0.6 };
          const tl = gsap.timeline({ defaults: { ease: "none" }, scrollTrigger: st });
          tl.from(q("[data-copy] > *"), { y: 40, opacity: 0, duration: 0.5, stagger: 0.06, ease: "expo.out" }, 0);

          switch (card.dataset.service) {
            case "repair": {
              tl.fromTo(q("[data-needle]"), { rotate: -78, svgOrigin: "100 100" }, { rotate: 70, svgOrigin: "100 100", duration: 1, ease: "power2.inOut" }, 0.2)
                .fromTo(q("[data-gauge]"), { drawSVG: "0% 8%" }, { drawSVG: "0% 100%", duration: 1, ease: "power2.inOut" }, 0.2)
                .from(q("[data-popup]"), { scale: 0.6, opacity: 0, duration: 0.25, stagger: 0.08, ease: "back.out(2)" }, 0)
                .to(q("[data-popup]"), { scale: 0.4, opacity: 0, y: -30, duration: 0.3, stagger: 0.12, ease: "power2.in" }, 0.6)
                .to(q("[data-slow]"), { opacity: 0, duration: 0.15 }, 0.9)
                .to(q("[data-fast]"), { opacity: 1, duration: 0.15 }, 0.95);
              break;
            }
            case "setup": {
              tl.from(q("[data-tile]"), { y: 50, opacity: 0, scale: 0.92, duration: 0.5, stagger: 0.1, ease: "expo.out" }, 0)
                .from(q("[data-wave]"), { drawSVG: "50% 50%", opacity: 0, duration: 0.3, stagger: 0.15 }, 0.35)
                .from(q("[data-tile-ok]"), { scale: 0, opacity: 0, duration: 0.2, ease: "back.out(2)" }, 0.85)
                .fromTo(q("[data-paper]"), { yPercent: 70 }, { yPercent: -10, duration: 0.6, ease: "power1.inOut" }, 0.5)
                .to(q("[data-screen]"), { opacity: 1, duration: 0.3 }, 0.7)
                .to(q("[data-phone-screen]"), { opacity: 1, duration: 0.3 }, 0.8)
                .fromTo(q("[data-phone]"), { rotate: 0 }, { rotate: 8, duration: 0.05, yoyo: true, repeat: 5 }, 0.55);
              break;
            }
            case "backup": {
              const pct = q("[data-pct]")[0];
              const obj = { v: 0 };
              tl.to(q("[data-file]"), { x: () => 220, y: -10, scale: 0.3, opacity: 0, duration: 0.45, stagger: 0.08, ease: "power2.in" }, 0.2)
                .fromTo(q("[data-bar]"), { scaleX: 0 }, { scaleX: 1, duration: 0.8 }, 0.2)
                .to(obj, { v: 100, duration: 0.8, onUpdate: () => (pct.textContent = String(Math.round(obj.v))) }, 0.2)
                .fromTo(q("[data-disk]"), { scale: 1 }, { scale: 1.06, duration: 0.1, yoyo: true, repeat: 3 }, 0.6)
                .to(q("[data-done]"), { opacity: 1, duration: 0.15 }, 1);
              break;
            }
          }
        });
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} id="services" data-theme="light" className="relative bg-mist pb-[4vh]">
      <div className="container-x pb-[clamp(2rem,6vh,5rem)] pt-[clamp(5rem,14vh,10rem)]">
        <p data-scrub="up" className="eyebrow mb-4 flex items-center gap-4 text-violet">
          <span aria-hidden="true" className="h-0.5 w-12 rounded bg-violet" /> Services
        </p>
        <h2 data-scrub="up" className="max-w-[18ch] font-display text-[length:var(--step-4)] font-extrabold leading-[0.95] tracking-[-0.03em] text-balance">
          Trois façons de vous <span className="text-violet">simplifier la vie.</span>
        </h2>
      </div>

      <div className="container-x">
        {SERVICES.map((s, i) => (
          <article
            key={s.n}
            data-service={s.kind}
            className="relative mb-[4vh] lg:sticky"
            style={{ top: `calc(var(--header-h) + ${0.5 + i * 0.5}rem)` }}
          >
            <div className={`origin-top overflow-hidden rounded-[clamp(1.5rem,3vw,3rem)] ${s.tone} shadow-[0_40px_80px_-50px_rgba(28,10,66,.5)] ring-1 ring-ink/5`}>
              <div className="grid gap-6 p-[clamp(1.25rem,4vw,4.5rem)] lg:min-h-[min(78svh,46rem)] lg:grid-cols-2 lg:items-center lg:gap-[clamp(2rem,5vw,6rem)]">
                <div data-copy>
                  <p className="font-display text-[clamp(3rem,min(2rem+4vw,12vh),7rem)] font-extrabold leading-none text-violet/25">{s.n}</p>
                  <h3 className="mt-2 font-display text-[length:var(--step-3)] font-extrabold leading-none tracking-tight">{s.title}</h3>
                  <p className="mt-4 max-w-[32ch] text-[length:var(--step-1)] font-medium leading-snug">{s.text}</p>
                  <ul className="mt-6 grid gap-2.5">
                    {s.items.map((it) => (
                      <li key={it} className="flex items-start gap-3 text-[length:var(--step-0)] text-stone">
                        <span className="mt-1 grid size-6 shrink-0 place-items-center rounded-full bg-violet text-white">
                          <Check className="size-3.5" />
                        </span>
                        {it}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="h-[clamp(16rem,42svh,30rem)] lg:h-[min(60svh,34rem)]" aria-hidden="true">
                  {s.art}
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
