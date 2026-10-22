"use client";

import { useRef } from "react";
import { site, telHref } from "@/content/site";
import { deferInit, gsap, MOTION, onEnter, useGSAP } from "./smooth-scroll";

const WORDS = ["Ordinateur", "Téléphone", "Tablette", "Imprimante", "Wi-Fi", "Box Internet", "Télévision connectée", "Photos", "Sauvegarde", "Messages d'erreur"];

export function Zone() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    (context) => {
      return deferInit(() => context.add(() => {
        const mm = gsap.matchMedia();
        mm.add({ fine: MOTION.fine, coarse: MOTION.coarse }, (ctx) => {
          const coarse = ctx.conditions?.coarse;
          const tl = gsap.timeline({
            defaults: { ease: "none" },
            scrollTrigger: coarse ? onEnter(root.current!, "top 78%") : { trigger: root.current, start: "top 92%", end: "center 67%", scrub: 0.6 },
          });
          tl.from("[data-ring]", { scale: 0, opacity: 0, duration: 1, stagger: 0.15, ease: "expo.out" }, 0)
            .from("[data-pin-drop]", { y: -120, opacity: 0, duration: 0.8, ease: "bounce.out" }, 0.3)
          .from("[data-town]", { scale: 0, opacity: 0, duration: 0.5, stagger: 0.08, ease: "back.out(2.5)" }, 0.6)
            .from("[data-zone-copy] > *", { y: 50, opacity: 0, duration: 0.8, stagger: 0.1, ease: "expo.out" }, 0.1);

          // Bandeau de mots : sa vitesse suit le défilement
          gsap.to("[data-band]", { xPercent: -25, ease: "none", scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true } });
        });
      }));
    },
    { scope: root },
  );

  return (
    <section ref={root} id="zone" data-scene data-theme="dark" className="relative overflow-hidden bg-violet-900 text-white">
      <div className="overflow-hidden border-b border-white/10 py-5" aria-hidden="true">
        <div data-band className="flex w-max gap-8 whitespace-nowrap font-display text-[length:var(--step-2)] font-bold">
          {[...WORDS, ...WORDS, ...WORDS].map((w, i) => (
            <span key={i} className="flex items-center gap-8 text-white/80">
              {w} <span className="size-2.5 rounded-full bg-lilac" />
            </span>
          ))}
        </div>
      </div>

      <div className="container-x grid items-center gap-10 py-[clamp(3rem,7vh,5rem)] lg:grid-cols-2 lg:gap-12">
        <div data-zone-copy>
          <p className="eyebrow mb-4 flex items-center gap-4 text-lilac">
            <span aria-hidden="true" className="h-0.5 w-12 rounded bg-lilac" /> Secteur
          </p>
          <h2 className="font-display text-[length:var(--step-4)] font-extrabold leading-[0.95] tracking-[-0.03em]">
            {site.city} <span className="text-lilac">et alentours.</span>
          </h2>
          <p className="mt-6 max-w-[38ch] text-[length:var(--step-1)] leading-snug text-white/80">
            Je me déplace à domicile, chez vous. Vous habitez un peu plus loin&nbsp;? Appelez-moi&nbsp;: on en parle.
          </p>
          <p className="mt-4 max-w-[46ch] text-[length:var(--step-0)] leading-relaxed text-white/65">
            J&apos;interviens à {site.city} et autour&nbsp;: {site.towns.map((t) => t.name).join(", ")}, ainsi que dans les communes voisines de la Somme
            et du Pas-de-Calais.
          </p>
          <a href={telHref} className="mt-8 inline-flex items-center gap-3 rounded-full bg-white px-7 py-4 font-bold text-violet transition-colors hover:bg-lilac-100">
            Appeler le {site.contact.phone}
          </a>
        </div>

        <div className="relative mx-auto grid aspect-square w-[min(100%,34rem)] place-items-center" aria-hidden="true">
          {[1, 0.78, 0.56, 0.34].map((s) => (
            <span key={s} data-ring className="absolute rounded-full border-2 border-lilac/25" style={{ width: `${s * 100}%`, height: `${s * 100}%` }} />
          ))}
          <span className="absolute size-full animate-[ping_3.2s_cubic-bezier(0,0,0.2,1)_infinite] rounded-full border-2 border-lilac/40" />
          <span className="absolute size-full animate-[ping_3.2s_cubic-bezier(0,0,0.2,1)_infinite] rounded-full border-2 border-lilac/40 [animation-delay:1.6s]" />
          {site.towns.map((t) => (
            <span
              key={t.name}
              data-town
              className={`absolute flex -translate-x-1/2 -translate-y-1/2 items-center gap-1.5 ${t.x > 60 ? "flex-row-reverse" : ""}`}
              style={{ left: `${t.x}%`, top: `${t.y}%` }}
            >
              <span className="size-2.5 shrink-0 rounded-full bg-lilac shadow-[0_0_0_4px_rgba(201,182,251,.2)]" />
              <span className="whitespace-nowrap rounded-full bg-white/10 px-2 py-0.5 text-[clamp(0.65rem,1.6vw,0.85rem)] font-semibold text-white backdrop-blur-sm">{t.name}</span>
            </span>
          ))}
          <div data-pin-drop className="relative flex flex-col items-center">
            <svg viewBox="0 0 24 32" className="h-[clamp(3.5rem,6vw,5rem)] drop-shadow-[0_10px_20px_rgba(0,0,0,.35)]">
              <path d="M12 0C5.4 0 0 5.2 0 11.7 0 20.5 12 32 12 32s12-11.5 12-20.3C24 5.2 18.6 0 12 0Z" fill="#fff" />
              <circle cx="12" cy="11.5" r="4.5" fill="#5b21b6" />
            </svg>
            <span className="mt-3 rounded-full bg-white px-4 py-1.5 font-display text-[length:var(--step-0)] font-bold text-violet shadow-lg">{site.city}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
