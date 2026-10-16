import type { Metadata, Viewport } from "next";
import { Figtree, Outfit } from "next/font/google";
import { site } from "@/content/site";
import { INDEXABLE, SITE_URL } from "@/lib/env";
import "./globals.css";

const outfit = Outfit({ variable: "--font-outfit", subsets: ["latin"], weight: ["500", "700", "800"] });
const figtree = Figtree({ variable: "--font-figtree", subsets: ["latin"], weight: ["400", "500", "600", "700"] });

const title = `Dépannage informatique à domicile à ${site.city} · Hexoria`;
const description = `Un souci avec votre ordinateur, votre téléphone, votre imprimante ou votre Wi-Fi ? Je viens chez vous à ${site.city} et alentours : dépannage, installation d'appareils (connectés aussi) et sauvegarde de vos photos, avec des explications claires. ${site.contact.phone}.`;

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
      <body>{children}</body>
    </html>
  );
}
