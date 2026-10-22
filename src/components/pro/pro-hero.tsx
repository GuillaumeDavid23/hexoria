"use client";

import Link from "next/link";
import { useRef } from "react";
import { telHref } from "@/content/site";
import { PhoneIcon } from "@/components/site/header";
import { deferInit, gsap, MOTION, scrollToId, scrubFor, useGSAP, useLenis } from "@/components/site/smooth-scroll";

// Quelques lignes de code « tapées » à l'arrivée (couleurs façon éditeur)
const CODE: [string, string][][] = [
  [["#f5c76b", "#[Route"], ["#fff", "("], ["#86efac", "'/'"], ["#fff", ", name: "], ["#86efac", "'accueil'"], ["#fff", ")]"]],
  [["#c9b6fb", "public function"], ["#7dd3fc", " accueil"], ["#fff", "(): "], ["#f5c76b", "Response"]],
  [["#fff", "{"]],
  [["#fff", "  "], ["#c9b6fb", "return"], ["#fff", " $this->"], ["#7dd3fc", "render"], ["#fff", "("], ["#86efac", "'accueil.html.twig'"], ["#fff", ", ["]],
  [["#fff", "    "], ["#86efac", "'titre'"], ["#fff", " => "], ["#86efac", "'Votre activité'"], ["#fff", ","]],
  [["#fff", "    "], ["#86efac", "'offres'"], ["#fff", " => $this->offres->"], ["#7dd3fc", "toutes"], ["#fff", "(),"]],
  [["#fff", "  ]);"]],
  [["#fff", "}"]],
];

// …puis la mise en ligne dans le terminal (grand écran : sur téléphone, le bloc est trop bas)
const TERMINAL: [string, string][][] = [
  [["#c9b6fb", "$ "], ["#fff", "git push"]],
  [["#86efac", "✓ "], ["#ffffffb3", "Tests réussis"]],
  [["#86efac", "✓ "], ["#ffffffb3", "En ligne : "], ["#7dd3fc", "votre-entreprise.fr"]],
];

const RINGS = ["Rapide", "Adapté au mobile", "Pensé pour Google"];

export function ProHero() {
  const root = useRef<HTMLElement>(null);
  const spacer = useRef<HTMLDivElement>(null);
  const lenis = useLenis();

  // L'entrée (titre, éditeur, code tapé) est en CSS : voir .in-* dans globals.css

  useGSAP(
    (context) => {
      // file différée (voir deferInit) : épingler et préparer la scène ne bloque pas le chargement
      return deferInit(() => context.add(() => {
        const mm = gsap.matchMedia();
        mm.add({ fine: MOTION.fine, coarse: MOTION.coarse }, (ctx) => {
          const coarse = ctx.conditions?.coarse;

          // Défilement : l'éditeur recule, le site apparaît et se construit bloc par bloc
          const tl = gsap.timeline({
            defaults: { ease: "none" },
            scrollTrigger: { trigger: root.current, start: "top top", end: coarse ? "+=95%" : "+=110%", scrub: scrubFor(coarse), pin: true, pinSpacer: spacer.current, anticipatePin: 1 },
          });
          tl.to("[data-editor]", { xPercent: -14, yPercent: -10, rotate: -4, scale: 0.86, opacity: 0.35, duration: 0.4 }, 0)
            .fromTo("[data-browser]", { xPercent: 18, yPercent: 14, rotate: 4, opacity: 0 }, { xPercent: 0, yPercent: 0, rotate: 0, opacity: 1, duration: 0.4 }, 0.05)
            .from("[data-block]", { y: 30, opacity: 0, scale: 0.94, duration: 0.18, stagger: 0.06 }, 0.3)
            .from("[data-ring-arc]", { drawSVG: "0%", duration: 0.3, stagger: 0.06 }, 0.6)
            .from("[data-ring-ok]", { scale: 0, duration: 0.1, stagger: 0.06, ease: "back.out(2)" }, 0.8)
            .to({}, { duration: 0.1 });
        });
      }));
    },
    { scope: root },
  );

  // conteneur d'épinglage déjà dans le HTML : GSAP n'a pas à déplacer la section, ce qui relancerait les entrées CSS (clignotement)
  return (
    <div ref={spacer}>
      <section ref={root} id="top" data-scene data-theme="dark" className="relative h-[var(--scene-h)] min-h-[40rem] overflow-hidden bg-violet-950 text-white">
        <div
          className="absolute inset-0 opacity-[0.07] [background-image:linear-gradient(#fff_1px,transparent_1px),linear-gradient(90deg,#fff_1px,transparent_1px)] [background-size:56px_56px]"
          aria-hidden="true"
        />
        <div className="absolute -left-[20vw] top-[30%] size-[70vw] rounded-full bg-[radial-gradient(circle,rgba(109,40,217,.45)_0%,rgba(18,7,45,0)_65%)]" aria-hidden="true" />

        <div className="container-x relative grid h-full content-center gap-[clamp(1.5rem,4vh,3rem)] pt-[var(--header-h)] lg:grid-cols-[1.05fr_1fr] lg:items-center lg:gap-[clamp(2rem,4vw,5rem)]">
          <div>
            <h1 data-pro-intro style={{ "--d": "0.4s" } as React.CSSProperties} className="in-fade eyebrow mb-[clamp(0.75rem,2.5vh,1.75rem)] text-[0.78rem] text-lilac sm:text-[length:var(--step--1)]">
              Création de sites &amp; applications · Vitrine, SaaS, mobile
            </h1>
            <p className="font-display text-[clamp(2.3rem,min(1rem+4.4vw,10vh),7rem)] font-extrabold leading-[0.95] tracking-[-0.035em]">
              <span data-line className="in-rise split-line block" style={{ "--d": "0.1s" } as React.CSSProperties}>
                <span className="block">Votre site web,</span>
              </span>
              <span data-line className="in-rise split-line block" style={{ "--d": "0.2s" } as React.CSSProperties}>
                <span className="block text-lilac">sur mesure.</span>
              </span>
            </p>
            <p data-pro-intro style={{ "--d": "0.48s" } as React.CSSProperties} className="in-fade mt-[clamp(0.75rem,2.5vh,1.75rem)] max-w-[40ch] text-[length:var(--step-1)] leading-snug text-white/80">
              Sites vitrines, applications web et mobiles que je conçois et développe moi-même, de la maquette à la mise en ligne.
            </p>
            <div data-pro-intro data-hero-cta data-zone="accueil" style={{ "--d": "0.56s" } as React.CSSProperties} className="in-fade mt-[clamp(1rem,3.5vh,2.5rem)] flex flex-wrap gap-3">
              <a href={telHref} className="flex items-center gap-2.5 rounded-full bg-white px-6 py-3.5 font-bold text-violet transition-colors hover:bg-lilac-100">
                <PhoneIcon className="size-5" /> Parler de votre projet
              </a>
              <Link
                href="/pro#offres"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToId(lenis, "offres");
                }}
                className="hidden rounded-full px-6 py-3.5 font-semibold ring-2 ring-white/25 transition-colors hover:bg-white/10 sm:block"
              >
                Voir les offres
              </Link>
            </div>
          </div>

          {/* Éditeur de code → site web */}
          <div className="relative mx-auto h-[clamp(14rem,36svh,34rem)] w-full max-w-[40rem] lg:h-[min(62svh,34rem)]" aria-hidden="true">
            <div className="in-fade absolute inset-0" style={{ "--d": "0.3s" } as React.CSSProperties}>
            <div data-editor className="absolute inset-0 flex flex-col overflow-hidden rounded-2xl bg-[#1b1233] shadow-2xl ring-1 ring-white/10">
              <div className="flex items-center gap-1.5 border-b border-white/10 px-4 py-2.5">
                <span className="size-2.5 rounded-full bg-alert/80" />
                <span className="size-2.5 rounded-full bg-warn/80" />
                <span className="size-2.5 rounded-full bg-ok/80" />
                <span className="ml-3 text-xs text-white/50">AccueilController.php</span>
              </div>
              <div className="min-h-0 flex-1 space-y-1.5 p-4 font-mono text-[clamp(0.62rem,1.05vw,0.95rem)] leading-relaxed">
                {CODE.map((line, i) => (
                  <div key={i} className="flex gap-4">
                    <span className="w-4 shrink-0 text-right text-white/25">{i + 1}</span>
                    <span data-code className="in-type whitespace-pre" style={{ "--d": `${0.8 + i * 0.22}s` } as React.CSSProperties}>
                      {line.map(([c, t], j) => (
                        <span key={j} style={{ color: c }}>
                          {t}
                        </span>
                      ))}
                    </span>
                  </div>
                ))}
              </div>
              <div className="hidden shrink-0 border-t border-white/10 bg-black/25 px-4 pb-4 pt-3 font-mono text-[clamp(0.62rem,0.9vw,0.82rem)] leading-relaxed lg:block">
                <p className="mb-1.5 font-sans text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-white/35">Terminal</p>
                {TERMINAL.map((line, i) => (
                  <div key={i} className="in-type whitespace-pre" style={{ "--d": `${2.6 + i * 0.35}s` } as React.CSSProperties}>
                    {line.map(([c, t], j) => (
                      <span key={j} style={{ color: c }}>
                        {t}
                      </span>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            </div>
            <div data-browser className="absolute inset-0 overflow-hidden rounded-2xl bg-white text-ink opacity-0 shadow-[0_40px_90px_-30px_rgba(0,0,0,.7)] motion-reduce:opacity-100">
              <div className="flex items-center gap-3 border-b border-ink/5 bg-mist px-4 py-2.5">
                <span className="flex gap-1.5">
                  <span className="size-2.5 rounded-full bg-alert/80" />
                  <span className="size-2.5 rounded-full bg-warn/80" />
                  <span className="size-2.5 rounded-full bg-ok/80" />
                </span>
                <span className="flex-1 truncate rounded-full bg-white px-3 py-1 text-xs text-stone ring-1 ring-ink/5">🔒 votre-entreprise.fr</span>
              </div>
              <div className="flex h-[calc(100%-2.6rem)] flex-col gap-[3%] p-[4%]">
                <div data-block className="flex items-center justify-between">
                  <span className="h-3 w-20 rounded bg-ink/80" />
                  <span className="flex gap-2">
                    <span className="h-2 w-8 rounded bg-ink/15" />
                    <span className="h-2 w-8 rounded bg-ink/15" />
                    <span className="h-2 w-10 rounded bg-violet" />
                  </span>
                </div>
                <div data-block className="relative flex flex-[1.4] flex-col justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-br from-violet to-violet-400 p-[5%]">
                  <span className="h-3 w-3/5 rounded bg-white/90 sm:h-4" />
                  <span className="h-3 w-2/5 rounded bg-white/90 sm:h-4" />
                  <span className="mt-2 h-5 w-24 rounded-full bg-white" />
                </div>
                <div className="grid flex-1 grid-cols-3 gap-[3%]">
                  {[0, 1, 2].map((i) => (
                    <div key={i} data-block className="flex flex-col gap-1.5 rounded-xl bg-mist p-[8%] ring-1 ring-ink/5">
                      <span className="size-5 rounded-md bg-lilac" />
                      <span className="h-1.5 w-4/5 rounded bg-ink/30" />
                      <span className="h-1.5 w-3/5 rounded bg-ink/15" />
                    </div>
                  ))}
                </div>
                <div data-block className="flex items-center justify-around rounded-xl bg-mist py-[2.5%] ring-1 ring-ink/5">
                  {RINGS.map((r) => (
                    <span key={r} className="flex items-center gap-2 text-[clamp(0.55rem,0.85vw,0.8rem)] font-semibold text-stone">
                      <span className="relative grid size-[clamp(1.4rem,2.4vw,2.2rem)] place-items-center">
                        <svg viewBox="0 0 36 36" className="absolute inset-0 size-full -rotate-90">
                          <circle cx="18" cy="18" r="15" fill="none" stroke="#efe9fd" strokeWidth="4" />
                          <circle data-ring-arc cx="18" cy="18" r="15" fill="none" stroke="#16a34a" strokeWidth="4" strokeLinecap="round" />
                        </svg>
                        <span data-ring-ok className="text-[0.7em] font-bold text-ok">✓</span>
                      </span>
                      <span className="hidden sm:inline">{r}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
