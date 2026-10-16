import { site } from "@/content/site";
import { absoluteUrl } from "@/lib/env";
import { FAQ } from "./faq";

/** Données structurées : entreprise locale et questions fréquentes (informations du tract uniquement). */
export function StructuredData() {
  const data = [
    {
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      "@id": absoluteUrl("/#hexoria"),
      name: site.name,
      slogan: site.signature,
      description: `Dépannage informatique et multimédia (ordinateur, téléphone, tablette, imprimante, Wi-Fi, appareils connectés), installation et sauvegarde à domicile à ${site.city} et alentours.`,
      url: absoluteUrl("/"),
      logo: absoluteUrl("/icon.svg"),
      image: absoluteUrl("/opengraph-image"),
      telephone: site.contact.phoneE164,
      openingHoursSpecification: { "@type": "OpeningHoursSpecification", dayOfWeek: site.hours.days, opens: site.hours.opens, closes: site.hours.closes },
      email: site.contact.email,
      legalName: site.legal.companyName,
      vatID: site.legal.vat,
      founder: { "@type": "Person", name: site.legal.president },
      address: {
        "@type": "PostalAddress",
        streetAddress: site.legal.street,
        postalCode: site.legal.postalCode,
        addressLocality: site.city,
        addressRegion: "Hauts-de-France",
        addressCountry: "FR",
      },
      areaServed: [site.city, ...site.towns.map((t) => t.name)].map((name) => ({ "@type": "City", name })),
      makesOffer: ["Dépannage informatique", "Installation informatique", "Sauvegarde de données"].map((name) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: FAQ.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
    },
  ];
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}
