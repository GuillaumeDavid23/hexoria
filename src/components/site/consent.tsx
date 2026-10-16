"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

/**
 * Mesure d'audience (Google Tag Manager → Google Analytics) avec consentement préalable (CNIL) :
 * - rien n'est chargé ni déposé tant que le visiteur n'a pas cliqué sur « Accepter » ;
 * - « Accepter » et « Refuser » ont la même importance ; le choix est gardé 13 mois ;
 * - le lien « Cookies » du pied de page rouvre le bandeau (retrait du consentement à tout moment).
 */
const KEY = "hx-consent";
const MAX_AGE = 1000 * 60 * 60 * 24 * 395; // 13 mois
export const OPEN_EVENT = "hx-consent-open";

type Choice = "granted" | "denied";

type GtmWindow = Window & { dataLayer?: unknown[]; __hxGtm?: boolean };

function readChoice(): Choice | null {
  try {
    const raw = JSON.parse(localStorage.getItem(KEY) ?? "null") as { v: Choice; t: number } | null;
    return raw && Date.now() - raw.t < MAX_AGE ? raw.v : null;
  } catch {
    return null;
  }
}

function saveChoice(v: Choice) {
  try {
    localStorage.setItem(KEY, JSON.stringify({ v, t: Date.now() }));
  } catch {
    /* stockage indisponible (navigation privée) : le bandeau reviendra à la prochaine visite */
  }
}

function loadGtm(id: string) {
  const w = window as GtmWindow;
  if (w.__hxGtm) return;
  w.__hxGtm = true;
  w.dataLayer = w.dataLayer || [];
  // Mode consentement Google : mesure d'audience acceptée, publicité refusée
  // eslint-disable-next-line prefer-rest-params -- gtag() doit pousser l'objet « arguments »
  const gtag = function () { w.dataLayer!.push(arguments); } as (...args: unknown[]) => void;
  gtag("consent", "default", { analytics_storage: "granted", ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied" });
  w.dataLayer.push({ "gtm.start": Date.now(), event: "gtm.js" });
  const s = document.createElement("script");
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtm.js?id=${id}`;
  document.head.appendChild(s);

  // Contacts : chaque clic sur un numéro ou un email devient un événement (avec l'endroit du clic),
  // à relayer vers GA4 dans Tag Manager (événements « clic_telephone » et « clic_email »).
  document.addEventListener("click", (e) => {
    const a = (e.target as Element).closest?.("a[href^='tel:'], a[href^='mailto:']");
    if (!a) return;
    const zone = a.closest<HTMLElement>("[data-zone]")?.dataset.zone || a.closest("section, footer")?.id || "autre";
    w.dataLayer!.push({ event: a.getAttribute("href")!.startsWith("tel:") ? "clic_telephone" : "clic_email", emplacement: zone, page: location.pathname });
  });
}

/** Retrait du consentement : suppression des cookies Google Analytics (_ga, _ga_*). */
function clearAnalyticsCookies() {
  const host = location.hostname;
  const domains = ["", host, `.${host}`, `.${host.replace(/^www\./, "")}`];
  document.cookie.split(";").forEach((c) => {
    const name = c.split("=")[0].trim();
    if (!/^_ga|^_gid|^_gat/.test(name)) return;
    domains.forEach((d) => (document.cookie = `${name}=; Max-Age=0; path=/${d ? `; domain=${d}` : ""}`));
  });
}

export function Consent({ gtmId }: { gtmId: string }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const choice = readChoice();
    if (choice === "granted") loadGtm(gtmId);
    // eslint-disable-next-line react-hooks/set-state-in-effect -- le choix n'est lisible qu'au navigateur
    else if (choice === null) setOpen(true);
    const reopen = () => setOpen(true);
    window.addEventListener(OPEN_EVENT, reopen);
    return () => window.removeEventListener(OPEN_EVENT, reopen);
  }, [gtmId]);

  const decide = (v: Choice) => {
    const was = readChoice();
    saveChoice(v);
    setOpen(false);
    if (v === "granted") loadGtm(gtmId);
    else if (was === "granted") {
      clearAnalyticsCookies();
      location.reload(); // décharge Tag Manager déjà lancé
    }
  };

  if (!open) return null;
  // Panneau sombre et contrasté (lisible sur l'accueil clair), en langage simple, qui glisse depuis le bas.
  return (
    <div
      role="dialog"
      aria-labelledby="consent-title"
      className="fixed inset-x-0 bottom-0 z-[60] animate-[consent-in_.6s_var(--ease-out-expo)_both] p-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] sm:inset-x-auto sm:bottom-6 sm:left-6 sm:p-0"
    >
      <div className="mx-auto max-w-md rounded-3xl bg-violet-950 p-5 text-white shadow-[0_24px_60px_-16px_rgba(18,7,45,.75)] ring-1 ring-white/15 sm:max-w-sm">
        <div className="flex items-start gap-3">
          <span className="grid size-10 shrink-0 place-items-center rounded-full bg-white/10 text-xl" aria-hidden="true">
            🍪
          </span>
          <div>
            <p id="consent-title" className="font-display text-[1.05rem] font-bold leading-tight">
              Vous m&apos;aidez à améliorer le site&nbsp;?
            </p>
            <p className="mt-1.5 text-[0.9rem] leading-snug text-white/80">
              J&apos;aimerais savoir quelles pages vous intéressent, grâce à des statistiques de visite (Google Analytics). Jamais de publicité.{" "}
              <Link href="/mentions-legales#donnees" className="whitespace-nowrap font-semibold text-lilac underline">
                En savoir plus
              </Link>
            </p>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-2">
          <button onClick={() => decide("denied")} className="cursor-pointer rounded-full py-3 font-bold text-white ring-2 ring-white/40 transition-colors hover:bg-white/10">
            Refuser
          </button>
          <button onClick={() => decide("granted")} className="cursor-pointer rounded-full bg-white py-3 font-bold text-violet transition-colors hover:bg-lilac-100">
            Accepter
          </button>
        </div>
      </div>
      <style>{`@keyframes consent-in{from{transform:translateY(110%);opacity:0}}`}</style>
    </div>
  );
}

/** Lien « Cookies » : rouvre le bandeau pour modifier son choix. */
export function ConsentLink({ className }: { className?: string }) {
  return (
    <button type="button" onClick={() => window.dispatchEvent(new Event(OPEN_EVENT))} className={`cursor-pointer ${className ?? ""}`}>
      Cookies
    </button>
  );
}
