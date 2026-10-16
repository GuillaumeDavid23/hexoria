import type { Metadata } from "next";
import { Method } from "@/components/pro/method";
import { Offers } from "@/components/pro/offers";
import { ProHero } from "@/components/pro/pro-hero";
import { Proof } from "@/components/pro/proof";
import { Skills } from "@/components/pro/skills";
import { CallBar } from "@/components/site/call-bar";
import { Footer } from "@/components/site/footer";
import { Header } from "@/components/site/header";
import { ScrubReveals } from "@/components/site/scrub-reveals";
import { SmoothScroll } from "@/components/site/smooth-scroll";
import { site } from "@/content/site";
import { absoluteUrl } from "@/lib/env";

const title = `Création de site web et d'application · ${site.city}`;
const description = `Développeur Symfony / PHP et React près de ${site.city} : sites vitrines, applications web, SaaS et mobiles (React Native), sur mesure. ${site.contact.phone}.`;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/pro" },
  openGraph: { title: `${title} · Hexoria`, description, url: "/pro" },
};

// Données structurées : les deux offres, rattachées à l'entreprise décrite sur l'accueil
const structured = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  itemListElement: [
    { name: "Création de site vitrine", description: "Site sur mesure adapté au téléphone, référencement local, formulaire de contact, mise en ligne." },
    { name: "Développement d'application web et SaaS", description: "Symfony / PHP et React : espace client, back-office, devis, réservations, tableaux de bord." },
    { name: "Développement d'application mobile", description: "Application iOS et Android en React Native, reliée à votre back-office." },
  ].map((s, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: { "@type": "Service", ...s, serviceType: "Développement web", provider: { "@id": absoluteUrl("/#hexoria") }, areaServed: { "@type": "City", name: site.city } },
  })),
};

export default function ProPage() {
  return (
    <SmoothScroll>
      <Header audience="pro" />
      <main>
        <ProHero />
        <Offers />
        <Skills />
        <Method />
        <Proof />
      </main>
      <Footer eyebrow="Professionnels" title="Parlons de votre projet" lead="Un premier échange pour comprendre vos besoins, sans engagement." />
      <CallBar label="Votre projet" />
      <ScrubReveals />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structured).replace(/</g, "\\u003c") }} />
    </SmoothScroll>
  );
}
