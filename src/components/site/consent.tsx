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
  // Téléphone : bandeau compact collé en bas, sous les boutons de l'accueil (qui restent visibles)
  return (
    <div
      role="dialog"
      aria-label="Cookies de mesure d'audience"
      className="fixed inset-x-2 bottom-[calc(0.5rem+env(safe-area-inset-bottom))] z-[60] mx-auto max-w-md rounded-2xl bg-white p-3.5 tiny:flex tiny:items-center tiny:gap-2 tiny:p-2 tiny:pl-3.5 text-ink shadow-[0_24px_60px_-20px_rgba(28,10,66,.55)] ring-1 ring-ink/10 sm:bottom-6 sm:left-6 sm:right-auto sm:mx-0 sm:max-w-sm sm:p-5"
    >
      <p className="hidden font-display text-lg font-bold sm:block">Un petit cookie&nbsp;?</p>
      <p className="text-[0.85rem] leading-snug text-stone sm:mt-1.5 sm:text-[0.95rem]">
        {/* écran peu haut (petit téléphone) : version courte */}
        <span className="tiny:hidden">J&apos;utilise Google Analytics pour connaître la fréquentation du site, seulement si vous l&apos;acceptez.</span>
        <span className="hidden tiny:inline">Statistiques (Google Analytics)&nbsp;?</span>{" "}
        <Link href="/mentions-legales#donnees" className="text-violet underline">
          <span className="tiny:hidden">En savoir plus</span>
          <span className="hidden tiny:inline">Infos</span>
        </Link>
      </p>
      <div className="mt-2 grid shrink-0 grid-cols-2 gap-2 sm:mt-4 tiny:mt-0 tiny:gap-1.5">
        <button onClick={() => decide("denied")} className="cursor-pointer rounded-full py-2 font-bold text-violet ring-2 tiny:px-3 tiny:text-sm ring-violet transition-colors hover:bg-lilac-100 sm:py-3">
          Refuser
        </button>
        <button onClick={() => decide("granted")} className="cursor-pointer rounded-full bg-violet py-2 font-bold text-white tiny:px-3 tiny:text-sm transition-colors hover:bg-violet-800 sm:py-3">
          Accepter
        </button>
      </div>
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
