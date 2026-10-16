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

const title = "Création de site web vitrine et application SaaS";
const description = `Développeur web près de ${site.city}, je crée des sites vitrines sur mesure, des applications web et SaaS (Next.js, React, Symfony), de la maquette à la mise en ligne. ${site.contact.phone}.`;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/pro" },
  openGraph: { title: `${title} · Hexoria`, description, url: "/pro" },
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
    </SmoothScroll>
  );
}
