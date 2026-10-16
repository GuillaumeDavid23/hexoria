"use client";

import { useRef, type ReactNode } from "react";
import { deferInit, gsap, MOTION, onEnter, useGSAP } from "./smooth-scroll";

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
        <svg viewBox="0 -12 120 82" className="-mt-6 h-[46%] max-h-36 sm:mt-0 sm:h-[60%]" fill="none" stroke="#5b21b6" strokeWidth="7" strokeLinecap="round">
          <path data-wave d="M38 40a32 32 0 0 1 44 0" />
          <path data-wave d="M24 27a52 52 0 0 1 72 0" />
          <path data-wave d="M10 14a72 72 0 0 1 100 0" />
          <circle cx="60" cy="56" r="6" fill="#5b21b6" stroke="none" />
        </svg>
        <span data-tile-ok className="absolute bottom-2 left-1/2 flex -translate-x-1/2 items-center gap-1.5 whitespace-nowrap rounded-full bg-ok/10 px-3 py-1 text-sm font-bold text-ok sm:bottom-auto sm:left-auto sm:right-3 sm:top-3 sm:translate-x-0">
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

/** Événement : un faire-part en ligne se compose sur le téléphone, puis les invités répondent. */
function EventArt() {
  return (
    <div className="relative grid h-full place-items-center">
      <div data-ev-phone className="relative aspect-[9/18.5] h-[94%] max-h-[30rem] rounded-[2.2rem] border-[7px] border-ink bg-ink shadow-2xl">
        <div className="relative size-full overflow-hidden rounded-[1.6rem] bg-[#fbf8f3]">
          <span className="absolute left-1/2 top-1.5 z-10 h-4 w-1/3 -translate-x-1/2 rounded-full bg-ink" />
          <div data-ev-cover className="relative h-[42%] bg-gradient-to-br from-[#e9d5c3] via-[#d9b8c4] to-[#9a6bf2]">
            <svg viewBox="0 0 100 60" className="absolute inset-0 size-full opacity-60" aria-hidden="true">
              <path data-ev-flourish d="M10 48C25 30 35 52 50 34S78 22 90 40" fill="none" stroke="#fff" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
            <p data-ev-names className="absolute inset-x-0 bottom-[18%] text-center font-display text-[clamp(1.05rem,1.6vw,1.4rem)] font-bold text-white drop-shadow">
              Julie &amp; Thomas
            </p>
          </div>
          <div className="space-y-2.5 p-3 text-center">
            <p data-ev-line className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-stone">Samedi 12 juin</p>
            <div data-ev-line className="flex justify-center gap-1.5">
              {[["42", "jours"], ["08", "h"], ["15", "min"]].map(([v, u]) => (
                <span key={u} className="w-11 rounded-lg bg-white py-1 shadow-sm ring-1 ring-ink/5">
                  <span className="block font-display text-sm font-bold text-violet">{v}</span>
                  <span className="block text-[0.55rem] text-stone">{u}</span>
                </span>
              ))}
            </div>
            <div data-ev-line className="flex justify-center gap-1.5 text-[0.6rem] font-semibold text-stone">
              <span className="rounded-full bg-white px-2 py-1 ring-1 ring-ink/5">Programme</span>
              <span className="rounded-full bg-white px-2 py-1 ring-1 ring-ink/5">Accès</span>
              <span className="rounded-full bg-white px-2 py-1 ring-1 ring-ink/5">Photos</span>
            </div>
            <div data-ev-line className="relative mx-auto h-8 w-[85%]">
              <span data-ev-btn className="absolute inset-0 grid place-items-center rounded-full bg-violet text-[0.72rem] font-bold text-white">Je confirme ma présence</span>
              <span data-ev-ok className="absolute inset-0 grid place-items-center rounded-full bg-ok text-[0.72rem] font-bold text-white opacity-0">✓ Présence confirmée</span>
            </div>
          </div>
        </div>
      </div>
      {["Marie : « On sera là ! »", "Paul : 2 personnes", "Lucie : « Trop beau ! »"].map((t, i) => (
        <div
          key={t}
          data-ev-reply
          className="absolute rounded-2xl bg-white px-3 py-2 text-[clamp(0.72rem,0.95vw,0.88rem)] font-semibold shadow-xl ring-1 ring-ink/5"
          style={{ left: ["0%", "62%", "4%"][i], top: ["18%", "46%", "72%"][i], rotate: `${[-4, 3, -2][i]}deg` }}
        >
          <span className="mr-1.5 inline-block size-2 rounded-full bg-ok" />
          {t}
        </div>
      ))}
    </div>
  );
}

type Service = { n: string; title: string; text: string; items: string[]; art: ReactNode; kind: "repair" | "setup" | "backup" | "event"; tone: string };

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
  {
    n: "04",
    kind: "event",
    title: "Un site pour votre événement",
    text: "Mariage, anniversaire, baptême, fête de famille : un site à votre image, à partager avec vos invités.",
    items: ["Infos pratiques, programme et plan d'accès", "Confirmation de présence en ligne", "Galerie pour partager les photos après la fête", "Une adresse simple à envoyer par SMS"],
    art: <EventArt />,
    tone: "bg-[#f6efe6]",
  },
];

export function Services() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    (context) => {
      return deferInit(() => context.add(() => {
        const mm = gsap.matchMedia();
        mm.add({ fine: MOTION.fine, coarse: MOTION.coarse }, (ctx) => {
          const coarse = ctx.conditions?.coarse;
          const cards = gsap.utils.toArray<HTMLElement>("[data-service]");

          // Pile de cartes (grand écran assez haut ; sinon défilement normal pour tout lire) : la carte suivante vient se poser sur la précédente, qui recule
          if (!coarse && window.matchMedia("(min-width: 64rem)").matches && !window.matchMedia("(max-height: 820px) and (min-aspect-ratio: 1/1)").matches) {
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

          cards.forEach((card) => {
            const q = gsap.utils.selector(card);
            const art = card.querySelector<HTMLElement>("[data-art]")!;
            // 1. le texte apparaît dès l'arrivée de la carte
            gsap.from(q("[data-copy] > *"), {
              y: 30,
              opacity: 0,
              stagger: 0.05,
              ...(coarse
                ? { duration: 0.9, ease: "expo.out", scrollTrigger: onEnter(card, "top 80%") }
                : { ease: "none", scrollTrigger: { trigger: card, start: "top 95%", end: "top 70%", scrub: 0.6 } }),
            });
            // 2. l'illustration ne s'anime que lorsqu'elle est réellement visible :
            //    téléphone → quand le centre de l'illustration (sous le texte) atteint le milieu de l'écran ;
            //    grand écran → idem, centre de l'illustration au milieu de l'écran.
            // Grand écran : jouée d'un trait (≈ 1,4 s) quand le centre de l'illustration passe le milieu de l'écran,
            // rejouée à l'envers si l'on remonte (un scrub n'aurait presque pas de course : la carte se pose juste après).
            const st = coarse
              ? onEnter(art, "center 55%")
              : { trigger: art, start: "center 55%", toggleActions: "play none none reverse" };
            const tl = gsap.timeline({ defaults: { ease: "none" }, scrollTrigger: st });
            tl.timeScale(0.8); // ≈ 1,4 s : le temps de voir la jauge monter, la page sortir, la copie se faire

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
              case "event": {
                tl.from(q("[data-ev-phone]"), { y: 60, rotate: -6, opacity: 0, duration: 0.45, ease: "expo.out" }, 0)
                  .from(q("[data-ev-cover]"), { scaleY: 0, transformOrigin: "top", duration: 0.3 }, 0.2)
                  .from(q("[data-ev-flourish]"), { drawSVG: "0%", duration: 0.35 }, 0.3)
                  .from(q("[data-ev-names]"), { y: 14, opacity: 0, duration: 0.2 }, 0.4)
                  .from(q("[data-ev-line]"), { y: 16, opacity: 0, duration: 0.2, stagger: 0.07 }, 0.45)
                  .to(q("[data-ev-btn]"), { opacity: 0, duration: 0.08 }, 0.8)
                  .to(q("[data-ev-ok]"), { opacity: 1, duration: 0.08 }, 0.8)
                  .from(q("[data-ev-reply]"), { scale: 0.5, opacity: 0, y: 20, duration: 0.2, stagger: 0.08, ease: "back.out(2)" }, 0.82);
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
      }));
    },
    { scope: root },
  );

  return (
    <section ref={root} id="services" data-theme="light" className="relative bg-mist pb-[clamp(1.5rem,4vh,3rem)]">
      <div className="container-x pb-[clamp(1rem,3vh,2.25rem)] pt-[clamp(3rem,7vh,5rem)]">
        <h2 data-scrub="up" className="eyebrow mb-4 flex items-center gap-4 text-violet">
          <span aria-hidden="true" className="h-0.5 w-12 rounded bg-violet" /> Dépannage, installation et sauvegarde à domicile
        </h2>
        <p data-scrub="up" className="max-w-[18ch] font-display text-[length:var(--step-4)] font-extrabold leading-[0.95] tracking-[-0.03em] text-balance">
          Quatre façons de vous <span className="text-violet">simplifier la vie.</span>
        </p>
      </div>

      <div className="container-x">
        {SERVICES.map((s, i) => (
          <article
            key={s.n}
            data-service={s.kind}
            className="relative mb-[4vh] last:mb-0 lg:sticky lg:top-[var(--stick-top)] short:static"
            // décalage d'empilement réservé au grand écran (en position relative, « top » décalerait la carte)
            style={{ "--stick-top": `calc(var(--header-h) + ${0.5 + i * 0.5}rem)` } as React.CSSProperties}
          >
            <div className={`origin-top overflow-hidden rounded-[clamp(1.5rem,3vw,3rem)] ${s.tone} shadow-[0_40px_80px_-50px_rgba(28,10,66,.5)] ring-1 ring-ink/5`}>
              <div className="grid gap-6 p-[clamp(1.25rem,3.2vw,3.25rem)] lg:min-h-[min(72svh,42rem)] lg:grid-cols-2 lg:items-center lg:gap-[clamp(2rem,5vw,6rem)]">
                <div data-copy>
                  <p className="font-display text-[clamp(2.25rem,min(1.4rem+2.6vw,8vh),4.75rem)] font-extrabold leading-none text-violet/25">{s.n}</p>
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
                <div data-art className="h-[clamp(14rem,34svh,24rem)] lg:h-[min(60svh,34rem)]" aria-hidden="true">
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
