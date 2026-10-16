"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Logo } from "@/components/brand";
import { site, telHref } from "@/content/site";
import { scrollToId, useLenis } from "./smooth-scroll";

export const NAV = [
  { id: "services", label: "Services" },
  { id: "deroulement", label: "Comment ça se passe" },
  { id: "zone", label: "Secteur" },
  { id: "questions", label: "Questions" },
  { id: "contact", label: "Contact" },
];

export function Header() {
  const lenis = useLenis();
  const [dark, setDark] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      // couleur de l'en-tête selon la section qui passe dessous (data-theme="dark" | "light")
      const under = document
        .elementsFromPoint(window.innerWidth / 2, 40)
        .find((el) => !el.closest("header") && el.closest("[data-theme]"))
        ?.closest("[data-theme]");
      setDark(under?.getAttribute("data-theme") === "dark");
      setScrolled(window.scrollY > 40);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (open) lenis?.stop();
    else lenis?.start();
  }, [open, lenis]);

  const link = (id: string) => (e: React.MouseEvent) => {
    if (document.getElementById(id)) {
      e.preventDefault();
      setOpen(false);
      lenis?.start();
      scrollToId(lenis, id);
    } else setOpen(false);
  };

  const tone = open
    ? "text-white"
    : dark
      ? "bg-violet-950/70 text-white backdrop-blur-xl"
      : scrolled
        ? "bg-mist/80 text-ink backdrop-blur-xl"
        : "text-ink";

  return (
    <>
      <header className={`fixed inset-x-0 top-0 z-50 transition-[background-color,color] duration-500 ease-out-expo ${tone}`}>
        <div className="container-x flex h-[var(--header-h)] items-center justify-between gap-6">
          <Link href="/" onClick={link("top")} className="relative z-10 text-[clamp(0.95rem,1.2vw,1.25rem)]" aria-label="Hexoria, retour à l'accueil">
            <Logo light={open || dark} />
          </Link>
          <nav className="hidden items-center gap-[clamp(1.25rem,2.2vw,3rem)] lg:flex" aria-label="Navigation principale">
            {NAV.map((n) => (
              <a key={n.id} href={`/#${n.id}`} onClick={link(n.id)} className="group relative text-[length:var(--step--1)] font-medium">
                {n.label}
                <span className="absolute -bottom-1 left-0 h-0.5 w-full origin-right scale-x-0 rounded bg-current transition-transform duration-500 ease-out-expo group-hover:origin-left group-hover:scale-x-100" />
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <a
              href={telHref}
              className={`hidden items-center gap-2 rounded-full px-5 py-2.5 text-[length:var(--step--1)] font-bold transition-colors sm:flex ${dark || open ? "bg-white text-violet hover:bg-lilac-100" : "bg-violet text-white hover:bg-violet-800"}`}
            >
              <PhoneIcon className="size-4" /> {site.contact.phone}
            </a>
            <button
              onClick={() => setOpen((o) => !o)}
              className="relative z-10 -mr-2 grid size-12 cursor-pointer place-items-center lg:hidden"
              aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
              aria-expanded={open}
            >
              <span className={`absolute h-0.5 w-7 rounded bg-current transition-transform duration-500 ${open ? "rotate-45" : "-translate-y-1.5"}`} />
              <span className={`absolute h-0.5 w-7 rounded bg-current transition-transform duration-500 ${open ? "-rotate-45" : "translate-y-1.5"}`} />
            </button>
          </div>
        </div>
      </header>

      {/* Menu mobile plein écran */}
      <div
        className={`fixed inset-0 z-40 bg-violet-900 text-white transition-[clip-path] duration-700 ease-out-expo lg:hidden ${
          open ? "[clip-path:circle(150%_at_100%_0)]" : "pointer-events-none [clip-path:circle(0%_at_100%_0)]"
        }`}
      >
        <div className="container-x flex h-full flex-col justify-center gap-1 pt-16">
          {NAV.map((n, i) => (
            <a
              key={n.id}
              href={`/#${n.id}`}
              onClick={link(n.id)}
              tabIndex={open ? undefined : -1}
              className="flex items-baseline gap-4 border-b border-white/10 py-4 font-display text-[length:var(--step-2)] font-bold leading-none"
            >
              <span className="font-sans text-sm text-lilac">0{i + 1}</span>
              {n.label}
            </a>
          ))}
          <a href={telHref} tabIndex={open ? undefined : -1} className="mt-10 flex items-center justify-center gap-3 rounded-full bg-white py-4 text-[length:var(--step-1)] font-bold text-violet">
            <PhoneIcon className="size-5" /> {site.contact.phone}
          </a>
          <p className="mt-6 text-center text-white/60">{site.area}</p>
        </div>
      </div>
    </>
  );
}

export function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.6a1 1 0 0 1-.25 1z" />
    </svg>
  );
}
