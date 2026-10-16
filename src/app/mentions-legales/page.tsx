import type { Metadata } from "next";
import Link from "next/link";
import { Logo } from "@/components/brand";
import { ConsentLink } from "@/components/site/consent";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Mentions légales",
  description: "Éditeur, hébergeur et données personnelles du site Hexoria.",
  alternates: { canonical: "/mentions-legales" },
};

export default function LegalPage() {
  const l = site.legal;
  return (
    <main className="container-x max-w-4xl py-16 sm:py-24">
      <Link href="/" aria-label="Hexoria, retour à l'accueil" className="text-[1.1rem]">
        <Logo />
      </Link>
      <h1 className="mt-14 font-display text-[length:var(--step-3)] font-extrabold leading-none">Mentions légales</h1>
      <div className="mt-12 space-y-10 text-stone [&_h2]:mb-2 [&_h2]:font-display [&_h2]:text-[length:var(--step-1)] [&_h2]:font-bold [&_h2]:text-ink">
        <section>
          <h2>Éditeur du site</h2>
          <p>
            {l.companyName}, {l.form}
            <br />
            Siège social : {l.street}, {l.postalCode} {site.city.toUpperCase()}
            <br />
            {l.rcs} · SIRET {l.siret}
            <br />
            TVA intracommunautaire : {l.vat}
            <br />
            Téléphone : {site.contact.phone} · Email : <a href={`mailto:${site.contact.email}`} className="text-violet underline">{site.contact.email}</a>
            <br />
            Directeur de la publication : {l.president}, président
          </p>
        </section>
        <section>
          <h2>Hébergement</h2>
          <p>IONOS SE, Elgendorfer Str. 57, 56410 Montabaur, Allemagne — www.ionos.fr</p>
        </section>
        <section id="donnees">
          <h2>Données personnelles et cookies</h2>
          <p>
            Ce site ne comporte ni formulaire ni compte. Si vous écrivez à {site.contact.email}, votre message sert uniquement à vous répondre.
          </p>
          <p className="mt-3">
            <strong>Mesure d&apos;audience.</strong> Avec votre accord seulement, le site utilise Google Analytics (Google Ireland Ltd), via Google Tag
            Manager, pour connaître la fréquentation des pages et la provenance des visites. Aucun cookie publicitaire n&apos;est utilisé. Votre choix est
            conservé 13 mois et vous pouvez le modifier à tout moment&nbsp;: <ConsentLink className="text-violet underline" />.
          </p>
          <p className="mt-3">
            Vous pouvez demander l&apos;accès, la rectification ou la suppression de vos données à {site.contact.email}.
          </p>
        </section>
      </div>
      <Link href="/" className="mt-16 inline-block rounded-full bg-violet px-6 py-3 font-bold text-white">
        ← Retour à l&apos;accueil
      </Link>
    </main>
  );
}
