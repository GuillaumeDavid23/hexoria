"use client";

import { useEffect, useState } from "react";
import { site } from "@/content/site";

/**
 * Adresse email protégée des robots collecteurs : le HTML envoyé ne contient que
 * « contact (arobase) hexoria.fr » ; le navigateur recompose l'adresse et le lien mailto
 * dès l'affichage. Les deux morceaux restent séparés dans le code (aucune adresse lisible).
 */
export function EmailLink({ className }: { className?: string }) {
  const { user, domain } = site.contact.email;
  const [address, setAddress] = useState<string | null>(null);
  // eslint-disable-next-line react-hooks/set-state-in-effect -- recomposition volontairement côté navigateur uniquement
  useEffect(() => setAddress([user, domain].join(String.fromCharCode(64))), [user, domain]);

  return (
    <a href={address ? `mailto:${address}` : undefined} className={className}>
      {address ?? `${user} (arobase) ${domain}`}
    </a>
  );
}
