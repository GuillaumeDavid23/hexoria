"use client";

import { useEffect, useState } from "react";
import { site, telHref } from "@/content/site";
import { PhoneIcon } from "./header";

/**
 * Bouton d'appel fixe en bas d'écran (téléphone) : la plupart des visiteurs arrivent
 * par le QR code du tract. Visible après l'accueil, masqué sur l'écran de contact.
 */
export function CallBar({ label = "Appelez-moi" }: { label?: string }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    let atContact = false;
    const contact = document.getElementById("contact");
    const update = () => setShow(window.scrollY > window.innerHeight * 0.5 && !atContact);
    const io = new IntersectionObserver(([e]) => {
      atContact = e.isIntersecting;
      update();
    });
    if (contact) io.observe(contact);
    window.addEventListener("scroll", update, { passive: true });
    update();
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", update);
    };
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] transition-transform duration-500 ease-out-expo sm:hidden ${show ? "translate-y-0" : "translate-y-[120%]"}`}
    >
      <a href={telHref} tabIndex={show ? undefined : -1} className="flex items-center justify-center gap-3 rounded-full bg-violet py-4 text-[1.15rem] font-bold text-white shadow-[0_16px_40px_-10px_rgba(28,10,66,.7)]">
        <PhoneIcon className="size-5" /> {label} · {site.contact.phone}
      </a>
    </div>
  );
}
