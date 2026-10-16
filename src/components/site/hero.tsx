"use client";

import Link from "next/link";
import { useRef, type ReactNode } from "react";
import { site, telHref } from "@/content/site";
import { PhoneIcon } from "./header";
import { gsap, MOTION, scrollToId, scrubFor, useGSAP, useLenis } from "./smooth-scroll";

type Bug = {
  title: string;
  text: string;
  icon: ReactNode;
  /** centre de la fenêtre, en % de l'écran : grand écran puis téléphone (null = masquée) */
  at: [number, number];
  mobile: [number, number] | null;
  rot: number;
  extra?: "progress" | "spinner";
};

const I = {
  alert: (
    <svg viewBox="0 0 24 24" className="size-full" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
      <path d="M12 3 2.5 20h19L12 3Z" strokeLinejoin="round" />
      <path d="M12 10v4.5M12 17.5v.01" />
    </svg>
  ),
  wifi: (
    <svg viewBox="0 0 24 24" className="size-full" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
      <path d="M2 8.5a15 15 0 0 1 20 0M5.5 12.2a10 10 0 0 1 13 0M9 15.8a5 5 0 0 1 6 0M12 19.5v.01M3 3l18 18" />
    </svg>
  ),
  printer: (
    <svg viewBox="0 0 24 24" className="size-full" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round">
      <path d="M6 9V3h12v6M6 18H4v-7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v7h-2M7 14h10v7H7z" />
    </svg>
  ),
  lock: (
    <svg viewBox="0 0 24 24" className="size-full" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
      <rect x="4" y="10" width="16" height="11" rx="2.5" />
      <path d="M8 10V7a4 4 0 0 1 8 0v3" />
    </svg>
  ),
  phone: (
    <svg viewBox="0 0 24 24" className="size-full" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
      <rect x="6" y="2.5" width="12" height="19" rx="2.5" />
      <path d="M11 18h2" />
    </svg>
  ),
  tv: (
    <svg viewBox="0 0 24 24" className="size-full" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
      <rect x="2.5" y="5" width="19" height="13" rx="2" />
      <path d="M8 21h8M9 2l3 3 3-3" />
    </svg>
  ),
  clock: (
    <svg viewBox="0 0 24 24" className="size-full" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  ),
};

const BUGS: Bug[] = [
  { title: "Erreur", text: "Le programme ne répond pas.", icon: I.alert, at: [13, 26], mobile: [28, 14], rot: -6 },
  { title: "Wi-Fi", text: "Pas de connexion Internet", icon: I.wifi, at: [86, 23], mobile: [27, 88], rot: 5 },
  { title: "Mise à jour", text: "Installation… 3 %", icon: I.clock, at: [10, 70], mobile: null, rot: 4, extra: "progress" },
  { title: "Impression", text: "Imprimante hors ligne", icon: I.printer, at: [88, 66], mobile: [74, 93], rot: -4 },
  { title: "Téléphone", text: "Stockage presque plein", icon: I.phone, at: [26, 88], mobile: [73, 19], rot: -3 },
  { title: "Télévision", text: "Aucun signal", icon: I.tv, at: [72, 89], mobile: null, rot: 3 },
  { title: "Patientez", text: "Démarrage en cours…", icon: I.clock, at: [50, 15], mobile: null, rot: 2, extra: "spinner" },
  { title: "Box Internet", text: "Mot de passe Wi-Fi incorrect", icon: I.lock, at: [91, 45], mobile: null, rot: -2 },
];

// Le dernier mot du titre change en boucle : le premier reprend le tract
const DEVICES = ["ordinateur", "téléphone", "imprimante", "Wi-Fi", "tablette", "box Internet"];

// Câble emmêlé → câble bien rangé (morphing au défilement)
const TANGLED =
  "M-60 640C140 520 250 820 380 640S300 420 470 470S640 760 720 560S560 380 760 360S980 620 900 700S760 560 980 470S1180 300 1120 560S1260 760 1340 560S1240 380 1420 420S1600 600 1680 520";
const NEAT = "M-60 760C140 760 250 760 380 760S600 760 720 760S900 760 1000 760S1180 760 1280 760S1500 760 1680 760";

function BugWindow({ b, i }: { b: Bug; i: number }) {
  return (
    <div
      data-win
      data-side={b.at[0] < 50 ? -1 : 1}
      className={`absolute z-10 -translate-x-1/2 -translate-y-1/2 left-[var(--mx)] top-[var(--my)] md:left-[var(--x)] md:top-[var(--y)] ${b.mobile ? "" : "hidden md:block"}`}
      style={
        {
          "--x": `${b.at[0]}%`,
          "--y": `${b.at[1]}%`,
          "--mx": `${b.mobile?.[0] ?? 0}%`,
          "--my": `${b.mobile?.[1] ?? 0}%`,
        } as React.CSSProperties
      }
      aria-hidden="true"
    >
      <div data-par={0.4 + (i % 3) * 0.3}>
        <div data-win-in className="in-pop" style={{ rotate: `${b.rot}deg`, "--d": `${0.5 + ((i * 5) % 7) * 0.09}s` } as React.CSSProperties}>
          <div className="animate-[bob_5s_ease-in-out_infinite]" style={{ animationDelay: `${-i * 0.8}s` }}>
            <div
              data-win-card
              className="relative w-[clamp(9.5rem,15vw,15rem)] overflow-hidden rounded-xl bg-white text-left shadow-[0_24px_60px_-24px_rgba(28,10,66,.45)] ring-1 ring-ink/10"
            >
              <div className="flex items-center gap-1.5 border-b border-ink/5 bg-mist px-3 py-2">
                <span className="size-2 rounded-full bg-alert/80" />
                <span className="size-2 rounded-full bg-warn/80" />
                <span className="size-2 rounded-full bg-ink/15" />
                <span className="ml-1.5 truncate text-[0.68rem] font-semibold text-stone">{b.title}</span>
              </div>
              <div className="relative">
                <div data-bad className="flex items-start gap-2.5 p-3">
                  <span className={`mt-0.5 size-5 shrink-0 ${b.extra === "spinner" ? "text-violet" : "text-alert"}`}>
                    {b.extra === "spinner" ? <span className="block size-full animate-[spin_1s_linear_infinite] rounded-full border-[3px] border-violet/20 border-t-violet" /> : b.icon}
                  </span>
                  <span className="text-[clamp(0.72rem,0.9vw,0.9rem)] font-medium leading-snug text-ink">
                    {b.text}
                    {b.extra === "progress" && (
                      <span className="mt-2 block h-1.5 overflow-hidden rounded-full bg-ink/10">
                        <span className="block h-full w-[3%] rounded-full bg-warn" />
                      </span>
                    )}
                  </span>
                </div>
                <div data-ok className="absolute inset-0 flex items-center gap-2.5 bg-white p-3 opacity-0">
                  <span className="grid size-6 shrink-0 place-items-center rounded-full bg-ok text-white">
                    <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <path d="m5 12.5 4.5 4.5L19 7.5" />
                    </svg>
                  </span>
                  <span className="text-[clamp(0.75rem,0.9vw,0.92rem)] font-bold text-ok">Réglé&nbsp;!</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Hero() {
  const root = useRef<HTMLElement>(null);
  const lenis = useLenis();

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add({ fine: MOTION.fine, coarse: MOTION.coarse }, (ctx) => {
        const coarse = ctx.conditions?.coarse;

        // L'entrée (titre, fenêtres, câble, boutons) est en CSS : voir .in-* dans globals.css

        // Défilement : chaque souci est « réglé », les fenêtres dégagent, le câble se range
        // et la phrase « y voir clair » devient nette.
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: { trigger: root.current, start: "top top", end: coarse ? "+=110%" : "+=130%", scrub: scrubFor(coarse), pin: true, anticipatePin: 1 },
        });
        const wins = gsap.utils.toArray<HTMLElement>("[data-win]");
        wins.forEach((w, i) => {
          const at = i * 0.06;
          tl.to(w.querySelector("[data-bad]"), { opacity: 0, duration: 0.08 }, at)
            .to(w.querySelector("[data-ok]"), { opacity: 1, duration: 0.08 }, at)
            .to(w.querySelector("[data-win-card]"), { boxShadow: "0 0 0 2px #16a34a, 0 24px 60px -24px rgba(22,163,74,.45)", duration: 0.08 }, at)
            .to(w, { x: () => Number(w.dataset.side) * window.innerWidth * 0.35, y: -window.innerHeight * 0.15, rotate: Number(w.dataset.side) * 12, scale: 0.6, autoAlpha: 0, duration: 0.35, ease: "power2.in" }, 0.35 + at * 0.6);
        });
        tl.to("[data-cable]", { morphSVG: NEAT, duration: 0.6 }, 0.1)
          .to("[data-cable]", { stroke: "#5b21b6", opacity: 0.9, duration: 0.6 }, 0.1)
          .fromTo("[data-clear]", { filter: "blur(5px)", opacity: 0.6 }, { filter: "blur(0px)", opacity: 1, duration: 0.45 }, 0.3)
          .from("[data-underline]", { drawSVG: "0%", duration: 0.3 }, 0.62)
          .to("[data-scroll-cue]", { autoAlpha: 0, duration: 0.15 }, 0)
          .to({}, { duration: 0.25 });

        // Le mot du titre défile : ordinateur → téléphone → imprimante…
        const box = root.current!.querySelector<HTMLElement>("[data-words]")!;
        const words = gsap.utils.toArray<HTMLElement>("[data-word]");
        gsap.set(words, { visibility: "visible", yPercent: (i) => (i ? 110 : 0) });
        const widths = new Map<HTMLElement, number>();
        const measure = () => words.forEach((w) => widths.set(w, w.offsetWidth + 4));
        measure();
        const fit = (w: HTMLElement) => widths.get(w) ?? w.offsetWidth + 4;
        gsap.set(box, { width: fit(words[0]), overflow: "hidden" });
        document.fonts?.ready.then(() => {
          measure();
          if (cycle.progress() === 0) gsap.set(box, { width: fit(words[0]) });
        });
        const cycle = gsap.timeline({ repeat: -1, delay: 2.4 });
        words.forEach((w, i) => {
          const next = words[(i + 1) % words.length];
          cycle
            .to(w, { yPercent: -110, duration: 0.6, ease: "power3.in" }, i * 2.2)
            .fromTo(next, { yPercent: 110 }, { yPercent: 0, duration: 0.7, ease: "expo.out", immediateRender: false }, i * 2.2 + 0.45)
            .to(box, { width: () => fit(next), duration: 0.7, ease: "expo.out" }, i * 2.2 + 0.4);
        });

        // Souris : les fenêtres suivent légèrement le pointeur (profondeur)
        if (!coarse) {
          const layers = gsap.utils.toArray<HTMLElement>("[data-par]").map((el) => ({
            depth: Number(el.dataset.par),
            x: gsap.quickTo(el, "x", { duration: 1.2, ease: "power3.out" }),
            y: gsap.quickTo(el, "y", { duration: 1.2, ease: "power3.out" }),
          }));
          const move = (e: PointerEvent) => {
            const dx = e.clientX / window.innerWidth - 0.5;
            const dy = e.clientY / window.innerHeight - 0.5;
            layers.forEach((l) => {
              l.x(dx * 40 * l.depth);
              l.y(dy * 30 * l.depth);
            });
          };
          window.addEventListener("pointermove", move);
          return () => window.removeEventListener("pointermove", move);
        }
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} id="top" data-scene data-theme="light" className="relative h-[var(--scene-h)] min-h-[34rem] overflow-hidden bg-mist">
      <div className="dots absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,#000_30%,transparent_75%)]" aria-hidden="true" />
      <div className="absolute left-1/2 top-1/2 size-[min(120vw,70rem)] -translate-1/2 rounded-full bg-[radial-gradient(circle,rgba(154,107,242,.22)_0%,rgba(154,107,242,0)_65%)]" aria-hidden="true" />

      <svg viewBox="0 0 1600 900" preserveAspectRatio="none" className="absolute inset-0 h-full w-full opacity-50 md:opacity-100" aria-hidden="true">
        <path data-cable className="in-draw" pathLength={1} d={TANGLED} fill="none" stroke="#9a6bf2" strokeOpacity="0.55" strokeWidth="5" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
      </svg>

      {BUGS.map((b, i) => (
        <BugWindow key={b.title + i} b={b} i={i} />
      ))}

      <div className="relative z-20 flex h-full flex-col items-center justify-center px-[var(--gutter)] pt-[calc(var(--header-h)*0.6)] text-center">
        <h1 data-eyebrow style={{ "--d": "0.2s" } as React.CSSProperties} className="in-fade eyebrow mb-[clamp(1rem,3vh,2rem)] flex flex-wrap items-center justify-center gap-x-3 text-[0.78rem] text-violet sm:text-[length:var(--step--1)]">
          Dépannage informatique à domicile{" "}
          <span aria-hidden="true" className="size-1.5 rounded-full bg-violet" />
          <span>
            <span className="sr-only">à </span>
            {site.area}
          </span>
        </h1>
        <p className="font-display text-[clamp(2.5rem,min(1rem+6.4vw,12vh),9rem)] font-extrabold leading-[0.95] tracking-[-0.035em]">
          <span data-line className="in-rise split-line block" style={{ "--d": "0.1s" } as React.CSSProperties}>
            <span className="block">Un souci avec</span>
          </span>
          <span data-line className="in-rise split-line block" style={{ "--d": "0.2s" } as React.CSSProperties}>
            <span className="block text-violet">
              votre{" "}
              <span data-words className="relative -mb-[0.12em] inline-grid grid-cols-[minmax(0,1fr)] justify-items-start pb-[0.12em] pr-[0.04em] align-bottom">
                {DEVICES.map((d, i) => (
                  <span key={d} data-word className={`col-start-1 row-start-1 whitespace-nowrap ${i ? "invisible" : ""}`} aria-hidden={i ? true : undefined}>
                    {d}
                  </span>
                ))}
              </span>
              &nbsp;?
            </span>
          </span>
        </p>
        <div data-clear-in className="in-fade mt-[clamp(1rem,3.5vh,2.5rem)]" style={{ "--d": "0.7s" } as React.CSSProperties}>
        <p data-clear className="relative font-display text-[length:var(--step-2)] font-medium leading-tight tracking-tight">
          Je vous aide à{" "}
          <span className="relative inline-block whitespace-nowrap">
            y voir clair.
            <svg viewBox="0 0 300 20" preserveAspectRatio="none" className="absolute -bottom-[0.3em] left-0 h-[0.4em] w-full" aria-hidden="true">
              <path data-underline d="M4 14C80 6 200 4 296 10" fill="none" stroke="#5b21b6" strokeWidth="6" strokeLinecap="round" />
            </svg>
          </span>
        </p>
        </div>
        <div data-cta data-hero-cta data-zone="accueil" style={{ "--d": "0.9s" } as React.CSSProperties} className="in-fade mt-[clamp(1.5rem,4.5vh,3rem)] flex flex-wrap items-center justify-center gap-3">
          <a href={telHref} className="flex items-center gap-2.5 rounded-full bg-violet px-7 py-4 text-[length:var(--step-0)] font-bold text-white shadow-[0_20px_40px_-18px_rgba(91,33,182,.8)] transition-transform hover:scale-[1.03] hover:bg-violet-800">
            <PhoneIcon className="size-5" /> Appelez-moi
          </a>
          <Link
            href="/#services"
            onClick={(e) => {
              e.preventDefault();
              scrollToId(lenis, "services");
            }}
            className="hidden rounded-full px-7 py-4 text-[length:var(--step-0)] font-semibold ring-2 ring-ink/15 transition-colors hover:bg-white sm:block"
          >
            Voir les services
          </Link>
        </div>
      </div>

      <div data-scroll-cue className="absolute inset-x-0 bottom-[calc(1.5rem+var(--ui-gap))] z-20 hidden justify-center md:flex" aria-hidden="true">
        <span className="relative h-12 w-0.5 overflow-hidden rounded bg-violet/15">
          <span className="absolute inset-x-0 top-0 h-1/2 animate-[scrollcue_2s_ease-in-out_infinite] bg-violet" />
        </span>
      </div>
      <style>{`@keyframes scrollcue{0%{transform:translateY(-100%)}100%{transform:translateY(200%)}}`}</style>
    </section>
  );
}
