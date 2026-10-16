"use client";

import Link from "next/link";
import { useRef } from "react";
import { Logo, Mark } from "@/components/brand";
import { mailHref, site, telHref } from "@/content/site";
import { ConsentLink } from "./consent";
import { PhoneIcon } from "./header";
import { deferInit, gsap, MOTION, onEnter, useGSAP } from "./smooth-scroll";

// Réseaux (adresses dans src/content/site.ts) ; Malt et GitHub ne s'affichent que sur la page Pro
type Social = { key: keyof typeof site.social; label: string; icon?: string; text?: string; pro?: true };
const SOCIAL: Social[] = [
  { key: "facebook", label: "Facebook", icon: "M13.5 21v-7.5h2.6l.4-3h-3V8.6c0-.9.3-1.5 1.6-1.5h1.6V4.4c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4v2.2H8v3h2.5V21h3Z" },
  {
    key: "instagram",
    label: "Instagram",
    icon: "M12 7.4a4.6 4.6 0 1 0 0 9.2 4.6 4.6 0 0 0 0-9.2Zm0 7.6a3 3 0 1 1 0-6 3 3 0 0 1 0 6Zm4.8-8.9a1.1 1.1 0 1 1 0 2.2 1.1 1.1 0 0 1 0-2.2ZM12 4.6c2.4 0 2.7 0 3.6.1 2.4.1 3.6 1.3 3.7 3.7.1.9.1 1.2.1 3.6s0 2.7-.1 3.6c-.1 2.4-1.3 3.6-3.7 3.7-.9.1-1.2.1-3.6.1s-2.7 0-3.6-.1c-2.4-.1-3.6-1.3-3.7-3.7-.1-.9-.1-1.2-.1-3.6s0-2.7.1-3.6c.1-2.4 1.3-3.6 3.7-3.7.9-.1 1.2-.1 3.6-.1ZM12 3c-2.4 0-2.8 0-3.7.1-3.3.2-5 1.9-5.2 5.2C3 9.2 3 9.6 3 12s0 2.8.1 3.7c.2 3.3 1.9 5 5.2 5.2.9.1 1.3.1 3.7.1s2.8 0 3.7-.1c3.3-.2 5-1.9 5.2-5.2.1-.9.1-1.3.1-3.7s0-2.8-.1-3.7c-.2-3.3-1.9-5-5.2-5.2C14.8 3 14.4 3 12 3Z",
  },
  { key: "malt", label: "Malt", text: "malt", pro: true },
  {
    key: "github",
    label: "GitHub",
    icon: "M12 2.5a9.5 9.5 0 0 0-3 18.5c.5.1.7-.2.7-.5v-1.7c-2.6.6-3.2-1.2-3.2-1.2-.4-1.1-1-1.4-1-1.4-.9-.6 0-.6 0-.6 1 .1 1.5 1 1.5 1 .9 1.5 2.3 1.1 2.8.8.1-.6.4-1.1.6-1.3-2.1-.2-4.3-1.1-4.3-4.7 0-1 .4-1.9 1-2.6-.1-.3-.4-1.2.1-2.5 0 0 .8-.3 2.6 1a9 9 0 0 1 4.8 0c1.8-1.3 2.6-1 2.6-1 .5 1.3.2 2.2.1 2.5.6.7 1 1.5 1 2.6 0 3.7-2.2 4.5-4.3 4.7.3.3.6.9.6 1.8v2.6c0 .3.2.6.7.5A9.5 9.5 0 0 0 12 2.5Z",
    pro: true,
  },
];

/** Dernier écran : le numéro, en très grand. */
export function Footer({
  eyebrow = site.area,
  title = "Appelez-moi",
  lead = "Une aide à domicile, avec des explications claires.",
  pro = false,
}: {
  eyebrow?: string;
  title?: string;
  lead?: string;
  /** page Pro : affiche aussi Malt et GitHub */
  pro?: boolean;
}) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    (context) => {
      return deferInit(() => context.add(() => {
        const mm = gsap.matchMedia();
        mm.add({ fine: MOTION.fine, coarse: MOTION.coarse }, (ctx) => {
          const coarse = ctx.conditions?.coarse;
          const tl = gsap.timeline({ scrollTrigger: onEnter(root.current!, coarse ? "top 70%" : "top 55%") });
          tl.from("[data-contact] > *", { y: 50, opacity: 0, duration: 1.1, stagger: 0.08, ease: "expo.out" }, 0)
            .from("[data-number]", { duration: 1.4, scrambleText: { text: "{original}", chars: "0123456789", speed: 0.6, revealDelay: 0.3 } }, 0.2);
          // le pictogramme en filigrane tourne et ses pistes se dessinent pendant l'approche
          gsap.fromTo("[data-ghost]", { rotate: -25, scale: 0.85 }, { rotate: 0, scale: 1, ease: "none", scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom bottom", scrub: true } });
          gsap.from("[data-ghost] [data-trace]", { drawSVG: "0%", ease: "none", scrollTrigger: { trigger: root.current, start: "top 90%", end: "top 20%", scrub: true } });
        });
      }));
    },
    { scope: root },
  );

  return (
    <footer ref={root} id="contact" data-scene data-theme="dark" className="relative flex flex-col overflow-hidden bg-violet-950 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_100%,rgba(109,40,217,.55)_0%,rgba(18,7,45,0)_60%)]" aria-hidden="true" />
      <div data-ghost className="pointer-events-none absolute -bottom-[12vw] -right-[10vw] w-[min(70vw,60rem)] opacity-[0.12]" aria-hidden="true">
        <Mark mono="#ffffff" className="h-auto w-full" />
      </div>

      <div data-contact className="container-x relative z-10 pb-[clamp(3rem,8vh,5.5rem)] pt-[calc(var(--header-h)+1.5rem)]">
        <p className="eyebrow mb-5 flex items-center gap-4 text-lilac">
          <span aria-hidden="true" className="h-0.5 w-12 rounded bg-lilac" /> {eyebrow}
        </p>
        <h2 className="font-display text-[length:var(--step-3)] font-extrabold leading-none tracking-tight">{title}</h2>
        <a href={telHref} className="group mt-4 block w-fit" aria-label={`Appeler le ${site.contact.phone}`}>
          <span data-number className="block whitespace-nowrap font-display text-[clamp(2.6rem,min(9vw,17vh),11rem)] font-extrabold leading-[0.95] tracking-[-0.04em] text-lilac tabular-nums transition-colors group-hover:text-white">
            {site.contact.phone}
          </span>
        </a>
        <div className="mt-[clamp(1.5rem,5vh,3rem)] flex flex-wrap gap-3">
          <a href={telHref} className="flex items-center gap-2.5 rounded-full bg-white px-7 py-4 text-[length:var(--step-0)] font-bold text-violet transition-colors hover:bg-lilac-100">
            <PhoneIcon className="size-5" /> Appeler maintenant
          </a>
          <a href={mailHref} className="rounded-full px-7 py-4 text-[length:var(--step-0)] font-semibold ring-2 ring-white/25 transition-colors hover:bg-white/10">
            {site.contact.email}
          </a>
          {SOCIAL.filter((r) => pro || !r.pro).map((r) => (
            <a
              key={r.key}
              href={site.social[r.key]}
              target="_blank"
              rel="noopener"
              aria-label={`Hexoria sur ${r.label}`}
              className="grid size-[3.6rem] place-items-center rounded-full ring-2 ring-white/25 transition-colors hover:bg-white/10"
            >
              {r.icon ? (
                <svg viewBox="0 0 24 24" className="size-6" fill="currentColor" aria-hidden="true">
                  <path d={r.icon} />
                </svg>
              ) : (
                <span className="font-display text-sm font-bold tracking-tight" aria-hidden="true">
                  {r.text}
                </span>
              )}
            </a>
          ))}
        </div>
        <p className="mt-8 max-w-[44ch] text-white/70">{lead}</p>
        <p className="mt-2 flex items-center gap-2 text-white/70">
          <span aria-hidden="true" className="size-2 rounded-full bg-ok" />
          {site.hours.label}
        </p>
      </div>

      <div className="container-x relative z-10 flex flex-wrap items-center justify-between gap-x-8 gap-y-3 border-t border-white/10 py-6 pb-[calc(1.5rem+5rem)] text-[length:var(--step--1)] text-white/60 sm:pb-6">
        <span className="flex items-center gap-4">
          <Logo light className="text-[0.85rem] text-white" /> <span>© 2026 · {site.signature}</span>
        </span>
        <nav className="flex flex-wrap gap-x-6 gap-y-1" aria-label="Pied de page">
          <Link href="/" className="transition-colors hover:text-white">
            Particuliers
          </Link>
          <Link href="/pro" className="transition-colors hover:text-white">
            Professionnels
          </Link>
          <Link href="/mentions-legales" className="transition-colors hover:text-white">
            Mentions légales
          </Link>
          <ConsentLink className="transition-colors hover:text-white" />
        </nav>
      </div>
    </footer>
  );
}
