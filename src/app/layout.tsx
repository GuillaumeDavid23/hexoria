import type { Metadata, Viewport } from "next";
import { Figtree, Outfit } from "next/font/google";
import { Consent } from "@/components/site/consent";
import { site } from "@/content/site";
import { INDEXABLE, SITE_URL } from "@/lib/env";
import "./globals.css";

const outfit = Outfit({ variable: "--font-outfit", subsets: ["latin"], weight: ["500", "700", "800"] });
const figtree = Figtree({ variable: "--font-figtree", subsets: ["latin"], weight: ["400", "500", "600", "700"] });

const title = `Dépannage informatique à domicile à ${site.city} · Hexoria`;
const description = `Ordinateur, téléphone, imprimante, Wi-Fi : je viens chez vous à ${site.city}, Auxi-le-Château, Hesdin, Doullens, Abbeville et alentours. ${site.contact.phone}.`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: title, template: "%s · Hexoria" },
  description,
  applicationName: "Hexoria",
  alternates: { canonical: "/" },
  robots: INDEXABLE ? { index: true, follow: true } : { index: false, follow: false },
  openGraph: { type: "website", locale: "fr_FR", siteName: "Hexoria", title, description, url: "/" },
  twitter: { card: "summary_large_image", title, description },
  icons: { icon: "/icon.svg" },
  formatDetection: { telephone: true },
};

export const viewport: Viewport = {
  themeColor: "#5b21b6",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fr" className={`${outfit.variable} ${figtree.variable}`}>
      <body>
        {children}
        {/* Mesure d'audience : production uniquement (pas de statistiques faussées par la préproduction) */}
        {INDEXABLE && <Consent gtmId={site.gtmId} />}
      </body>
    </html>
  );
}
