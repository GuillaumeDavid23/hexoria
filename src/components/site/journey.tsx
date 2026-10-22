"use client";

import { useRef, type ReactNode } from "react";
import { site, telHref } from "@/content/site";
import { PhoneIcon } from "./header";
import { deferInit, gsap, MOTION, onEnter, useGSAP } from "./smooth-scroll";

const icon = (d: ReactNode) => (
  <svg viewBox="0 0 48 48" className="size-full" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {d}
  </svg>
);

const STEPS = [
  {
    title: "Vous m'appelez",
    text: "Vous me décrivez votre souci avec vos mots. Pas besoin de connaître les termes techniques.",
    icon: icon(
      <>
        <path d="M14 6h20a3 3 0 0 1 3 3v30a3 3 0 0 1-3 3H14a3 3 0 0 1-3-3V9a3 3 0 0 1 3-3Z" />
        <path d="M21 37h6" />
        <path data-ring d="M41 14a10 10 0 0 1 0 12M44.5 10a16 16 0 0 1 0 20" />
      </>,
    ),
  },
  {
    title: "On fixe un rendez-vous",
    text: "Ensemble, au moment qui vous convient.",
    icon: icon(
      <>
        <rect x="6" y="10" width="36" height="32" rx="4" />
        <path d="M6 19h36M16 6v8M32 6v8" />
        <path data-tick d="m18 30 4.5 4.5L31 26" />
      </>,
    ),
  },
  {
    title: "Je viens chez vous",
    text: "J'interviens sur place, avec votre matériel, dans votre environnement.",
    icon: icon(
      <>
        <path d="M6 22 24 7l18 15" />
        <path d="M11 19v22h26V19" />
        <path data-tick d="M20 41V30h8v11" />
      </>,
    ),
  },
  {
    title: "Je vous explique tout",
    text: "Ce qui n'allait pas, ce que j'ai fait, et les bons réflexes pour la suite.",
    icon: icon(
      <>
        <path d="M8 10h32a3 3 0 0 1 3 3v18a3 3 0 0 1-3 3H22l-9 7v-7H8a3 3 0 0 1-3-3V13a3 3 0 0 1 3-3Z" />
        <path data-tick d="M14 20h20M14 26h12" />
      </>,
    ),
  },
];

/**
 * Le déroulement en quatre étapes, reliées par un câble qui se branche à la fin.
 * - Grand écran (souris, variante hz:) : écran épinglé, la rangée défile horizontalement au rythme du scroll.
 * - Téléphone / tablette : liste verticale, le câble se remplit le long des étapes.
 */
export function Journey() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    (context) => {
      return deferInit(() => context.add(() => {
        const mm = gsap.matchMedia();
        const pin = root.current!.querySelector<HTMLElement>("[data-pin]")!;
        const track = root.current!.querySelector<HTMLElement>("[data-track]")!;
        const distance = () => Math.max(0, track.scrollWidth - window.innerWidth);

        mm.add(`(min-width: 64rem) and ${MOTION.fine}`, () => {
          gsap.set("[data-plug]", { x: -60 });
          gsap.set("[data-led]", { fill: "#cbd5e1" });
          const tl = gsap.timeline({
            defaults: { ease: "none" },
            scrollTrigger: { trigger: pin, start: "top top", end: () => `+=${distance() + window.innerHeight * 0.4}`, scrub: 0.5, pin: true, pinType: "transform", invalidateOnRefresh: true },
          });
          tl.to(track, { x: () => -distance(), duration: 1 }, 0)
            .fromTo("[data-wire]", { scaleX: 0 }, { scaleX: 1, duration: 1 }, 0)
            .to("[data-plug]", { x: 62, duration: 0.12, ease: "power3.in" }, 1)
            .to("[data-led]", { fill: "#16a34a", duration: 0.04 }, 1.1)
            .to("[data-socket-glow]", { opacity: 1, duration: 0.12 }, 1.05)
            .to("[data-connected]", { opacity: 1, y: 0, duration: 0.12 }, 1.08)
            .to({}, { duration: 0.15 });
          gsap.utils.toArray<HTMLElement>("[data-step]").forEach((el, i) => {
            tl.from(el.querySelectorAll("[data-ring], [data-tick]"), { drawSVG: "0%", duration: 0.12 }, 0.08 + i * 0.22);
            tl.fromTo(el.querySelector("[data-dot]"), { backgroundColor: "#efe9fd", scale: 0.7 }, { backgroundColor: "#5b21b6", scale: 1, duration: 0.06 }, 0.08 + i * 0.22);
          });
          gsap.from("[data-step]", { y: 80, opacity: 0, ease: "none", stagger: 0.05, scrollTrigger: { trigger: pin, start: "top 95%", end: "top 40%", scrub: 0.6 } });
        });

        mm.add(`(max-width: 63.999rem), (hover: none)`, () => {
          if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
          gsap.fromTo("[data-vwire]", { scaleY: 0 }, { scaleY: 1, ease: "none", scrollTrigger: { trigger: "[data-steps]", start: "top 85%", end: "bottom 75%", scrub: true } });
          gsap.utils.toArray<HTMLElement>("[data-step]").forEach((el) => {
            const tl = gsap.timeline({ scrollTrigger: onEnter(el, "top 88%") });
            tl.from(el, { y: 50, opacity: 0, duration: 1, ease: "expo.out" })
              .from(el.querySelectorAll("[data-ring], [data-tick]"), { drawSVG: "0%", duration: 0.8, ease: "power2.out" }, 0.3)
              .fromTo(el.querySelector("[data-dot]"), { backgroundColor: "#efe9fd" }, { backgroundColor: "#5b21b6", duration: 0.4 }, 0.2);
          });
          gsap.set("[data-plug]", { x: -60 });
            gsap.set("[data-led]", { fill: "#cbd5e1" });
          gsap.timeline({ scrollTrigger: onEnter("[data-finale]", "top 90%") })
            .to("[data-plug]", { x: 62, duration: 0.7, ease: "power3.in" })
            .to("[data-plug]", { x: 59, duration: 0.1, yoyo: true, repeat: 1, ease: "power1.out" })
            .to("[data-led]", { fill: "#16a34a", duration: 0.2 }, 0.75)
            .to("[data-socket-glow]", { opacity: 1, duration: 0.5 }, 0.7)
            .to("[data-connected]", { opacity: 1, y: 0, duration: 0.6, ease: "expo.out" }, 0.8);
        });
      }));
    },
    { scope: root },
  );

  return (
    <section ref={root} id="deroulement" data-scene data-theme="light" className="bg-white">
      <div data-pin className="relative flex flex-col overflow-hidden pb-[clamp(3rem,8vh,5rem)] pt-[calc(var(--header-h)+clamp(2rem,6vh,4rem))] hz:h-[var(--scene-h)] hz:justify-center hz:pb-0">
        <div className="dots absolute inset-0 opacity-60" aria-hidden="true" />
        <div data-track className="relative flex flex-col gap-10 hz:w-max hz:flex-row hz:items-stretch hz:gap-[clamp(1.5rem,3vw,4rem)] hz:px-[var(--gutter)]">
          {/* Intro */}
          <div className="px-[var(--gutter)] hz:flex hz:w-[min(34vw,40rem)] hz:shrink-0 hz:flex-col hz:justify-center hz:px-0">
            <h2 className="eyebrow mb-4 flex items-center gap-4 text-violet">
              <span aria-hidden="true" className="h-0.5 w-12 rounded bg-violet" /> Comment se passe un dépannage informatique à domicile
            </h2>
            <p className="font-display text-[length:var(--step-4)] font-extrabold leading-[0.95] tracking-[-0.03em] text-balance">
              Simple, <span className="text-violet">du début à la fin.</span>
            </p>
            <p className="mt-5 max-w-[36ch] text-stone">Quatre étapes, aucune mauvaise surprise. Vous savez toujours ce qui se passe.</p>
          </div>

          {/* Étapes */}
          <ol data-steps className="relative grid gap-5 px-[var(--gutter)] pl-[calc(var(--gutter)+2.5rem)] hz:contents">
            <span className="absolute bottom-6 left-[calc(var(--gutter)+0.7rem)] top-6 w-1 rounded bg-lilac-100 hz:hidden" aria-hidden="true">
              <span data-vwire className="block h-full w-full origin-top rounded bg-violet" />
            </span>
            {STEPS.map((s, i) => (
              <li
                key={s.title}
                data-step
                className="relative flex flex-col rounded-[clamp(1.25rem,2vw,2.25rem)] bg-mist p-[clamp(1.25rem,2.4vw,2.75rem)] ring-1 ring-violet/10 hz:h-[min(62svh,36rem)] hz:w-[min(27vw,30rem)] hz:min-w-[300px] hz:shrink-0"
              >
                <span data-dot className="absolute -left-[2.35rem] top-8 size-5 rounded-full bg-violet ring-4 ring-white hz:hidden" aria-hidden="true" />
                <div className="flex items-start justify-between">
                  <span className="size-[clamp(3.25rem,5vw,5.5rem)] text-violet">{s.icon}</span>
                  <span className="font-display text-[clamp(2.5rem,4vw,5rem)] font-extrabold leading-none text-violet/20">0{i + 1}</span>
                </div>
                <h3 className="mt-6 font-display text-[length:var(--step-2)] font-bold leading-[1.05] tracking-tight hz:mt-auto">{s.title}</h3>
                <p className="mt-3 text-stone">{s.text}</p>
              </li>
            ))}
          </ol>

          {/* Fin du câble : la prise se branche */}
          <div data-finale className="flex flex-col items-center justify-center gap-5 px-[var(--gutter)] text-center hz:w-[min(30vw,32rem)] hz:shrink-0 hz:px-0">
            {/* Vue de profil : la fiche (à gauche) entre dans les deux trous de la prise murale (à droite).
                Les broches sont alignées sur les trous ; la prise est dessinée par-dessus pour les cacher une fois branchées. */}
            <svg viewBox="0 0 240 110" className="w-[min(78vw,19rem)] overflow-visible" aria-hidden="true">
              <defs>
                <radialGradient id="socket-glow">
                  <stop offset="0" stopColor="#9a6bf2" stopOpacity="0.55" />
                  <stop offset="1" stopColor="#9a6bf2" stopOpacity="0" />
                </radialGradient>
              </defs>
              {/* mur */}
              <rect x="196" y="0" width="44" height="110" rx="4" fill="#efe9fd" />
              <circle data-socket-glow cx="184" cy="55" r="62" fill="url(#socket-glow)" opacity="0" />
              {/* fiche : câble, corps, broches (position finale = branchée) */}
              <g data-plug transform="translate(62 0)">
                <rect x="0" y="50" width="62" height="10" rx="5" fill="#5b21b6" />
                <rect x="56" y="28" width="46" height="54" rx="12" fill="#5b21b6" />
                <rect x="76" y="40" width="6" height="30" rx="3" fill="#ffffff" opacity="0.5" />
                <rect x="100" y="39" width="26" height="7" rx="3.5" fill="#4a4458" />
                <rect x="100" y="64" width="26" height="7" rx="3.5" fill="#4a4458" />
              </g>
              {/* prise murale de profil : plaque, trous face aux broches, voyant */}
              <rect x="168" y="12" width="32" height="86" rx="10" fill="#ffffff" stroke="#16131f" strokeOpacity="0.12" strokeWidth="2" />
              <rect x="168" y="37" width="10" height="11" rx="2" fill="#16131f" fillOpacity="0.75" />
              <rect x="168" y="62" width="10" height="11" rx="2" fill="#16131f" fillOpacity="0.75" />
              <circle data-led cx="188" cy="24" r="4" fill="#16a34a" />
            </svg>
            <div data-connected className="translate-y-4 opacity-0 motion-reduce:translate-y-0 motion-reduce:opacity-100">
              <p className="font-display text-[length:var(--step-2)] font-extrabold leading-tight">
                Et voilà, <span className="text-violet">tout remarche.</span>
              </p>
              <a href={telHref} className="mt-5 inline-flex items-center gap-2.5 rounded-full bg-violet px-6 py-3.5 font-bold text-white transition-colors hover:bg-violet-800">
                <PhoneIcon className="size-5" /> {site.contact.phone}
              </a>
            </div>
          </div>
        </div>

        {/* Câble horizontal (grand écran) */}
        <div className="pointer-events-none absolute inset-x-[var(--gutter)] bottom-[clamp(1.5rem,6vh,4rem)] hidden h-1 rounded bg-lilac-100 hz:block" aria-hidden="true">
          <div data-wire className="h-full origin-left scale-x-0 rounded bg-violet" />
        </div>
      </div>
    </section>
  );
}
