"use client";

import { useEffect, useState } from "react";
import { site, telHref } from "@/content/site";
import { PhoneIcon } from "./header";

/**
 * Bouton d'appel fixe en bas d'écran (téléphone) : la plupart des visiteurs arrivent
 * par le QR code du tract. Il n'apparaît qu'une fois les boutons de l'accueil sortis
 * de l'écran (jamais deux boutons d'appel à la fois), et se retire sur l'écran de contact.
 */
export function CallBar({ label = "Appelez-moi" }: { label?: string }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const cta = document.querySelector("[data-hero-cta]");
    const contact = document.getElementById("contact");
    const visible = new Map<Element, boolean>();
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => visible.set(e.target, e.isIntersecting));
      // tant que les boutons de l'accueil sont à l'écran, ou que le contact est affiché : pas de barre
      setShow(!(cta && visible.get(cta) !== false) && !(contact && visible.get(contact)));
    });
    if (cta) io.observe(cta);
    if (contact) io.observe(contact);
    return () => io.disconnect();
  }, []);

  return (
    <div
      data-zone="barre-appel"
      className={`fixed inset-x-0 bottom-0 z-40 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] transition-transform duration-500 ease-out-expo sm:hidden ${show ? "translate-y-0" : "translate-y-[120%]"}`}
    >
      <a href={telHref} tabIndex={show ? undefined : -1} className="flex items-center justify-center gap-3 rounded-full bg-violet py-4 text-[1.15rem] font-bold text-white shadow-[0_16px_40px_-10px_rgba(28,10,66,.7)]">
        <PhoneIcon className="size-5" /> {label} · {site.contact.phone}
      </a>
    </div>
  );
}
