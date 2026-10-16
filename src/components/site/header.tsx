"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Logo } from "@/components/brand";
import { site, telHref } from "@/content/site";
import { scrollToId, useLenis } from "./smooth-scroll";

export type Audience = "perso" | "pro";

export const NAV: Record<Audience, { id: string; label: string }[]> = {
  perso: [
    { id: "services", label: "Services" },
    { id: "deroulement", label: "Comment ça se passe" },
    { id: "zone", label: "Secteur" },
    { id: "questions", label: "Questions" },
  ],
  pro: [
    { id: "offres", label: "Offres" },
    { id: "competences", label: "Compétences" },
    { id: "methode", label: "Méthode" },
    { id: "contact", label: "Contact" },
  ],
};

/** Bascule entre les deux parcours (deux pages distinctes). */
export function AudienceSwitch({ audience, inverted = false, className = "" }: { audience: Audience; inverted?: boolean; className?: string }) {
  const item = (a: Audience, href: string, label: string) => {
    const on = a === audience;
    return (
      <Link
        href={href}
        aria-current={on ? "page" : undefined}
        className={`rounded-full px-3.5 py-1.5 transition-colors sm:px-4 ${on ? (inverted ? "bg-white text-violet" : "bg-violet text-white") : "opacity-75 hover:opacity-100"}`}
      >
        {label}
      </Link>
    );
  };
  return (
    <nav aria-label="Choisir votre profil" className={`flex items-center gap-1 rounded-full p-1 text-[0.85rem] font-semibold ring-1 ring-current/20 ${className}`}>
      {item("perso", "/", "Particuliers")}
      {item("pro", "/pro", "Professionnels")}
    </nav>
  );
}

export function Header({ audience = "perso" }: { audience?: Audience }) {
  const nav = NAV[audience];
  const lenis = useLenis();
  const [dark, setDark] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Couleur de l'en-tête selon la section qui passe dessous (data-theme="dark" | "light") :
    // un observateur suit une ligne fine à 40 px du haut, sans recalcul de mise en page au défilement.
    const under = new Set<Element>();
    let io: IntersectionObserver | undefined;
    const observe = () => {
      io?.disconnect();
      under.clear();
      io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => (e.isIntersecting ? under.add(e.target) : under.delete(e.target)));
          // la plus profonde dans le document l'emporte (section imbriquée, écran épinglé)
          const last = [...under].sort((a, b) => (a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1)).pop();
          setDark(last?.getAttribute("data-theme") === "dark");
        },
        { rootMargin: `-40px 0px ${41 - window.innerHeight}px 0px` },
      );
      document.querySelectorAll("[data-theme]").forEach((el) => io!.observe(el));
    };
    const onScroll = () => setScrolled(window.scrollY > 40);
    observe();
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", observe);
    return () => {
      io?.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", observe);
    };
  }, []);

  useEffect(() => {
    if (open) lenis?.stop();
    else lenis?.start();
    // le menu a son propre bouton d'appel : la barre d'appel fixe se retire pendant qu'il est ouvert
    document.documentElement.toggleAttribute("data-menu-open", open);
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
      <header data-zone="en-tete" className={`fixed inset-x-0 top-0 z-50 transition-[background-color,color] duration-500 ease-out-expo ${tone}`}>
        <div className="container-x flex h-[var(--header-h)] items-center justify-between gap-6">
          <Link href="/" onClick={link("top")} className="relative z-10 text-[clamp(0.95rem,1.2vw,1.25rem)]" aria-label="Hexoria, retour à l'accueil">
            <Logo light={open || dark} />
          </Link>
          <AudienceSwitch audience={audience} inverted={open || dark} className="hidden md:flex" />
          <nav className="hidden items-center gap-[clamp(1.1rem,1.8vw,2.5rem)] xl:flex" aria-label="Navigation principale">
            {nav.map((n) => (
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
              className="relative z-10 -mr-2 grid size-12 cursor-pointer place-items-center xl:hidden"
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
        data-zone="menu"
        className={`fixed inset-0 z-40 bg-violet-900 text-white transition-[clip-path] duration-700 ease-out-expo xl:hidden ${
          open ? "[clip-path:circle(150%_at_100%_0)]" : "pointer-events-none [clip-path:circle(0%_at_100%_0)]"
        }`}
      >
        <div className="container-x flex h-full flex-col justify-center gap-1 pt-16">
          <AudienceSwitch audience={audience} inverted className="mb-8 w-fit text-base" />
          {nav.map((n, i) => (
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
