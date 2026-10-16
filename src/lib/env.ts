/**
 * Configuration d'environnement, figée au moment du build (variables passées
 * en arguments de build Docker, voir Dockerfile et docker-compose.prod.yml).
 *
 * - SITE_URL : URL publique de référence (canonical, sitemap, Open Graph, emails).
 *   Ne pas supposer que le sous-domaine de préproduction est le domaine final.
 * - SITE_ENV : "production" rend le site indexable ; toute autre valeur
 *   (par défaut "preview") ajoute noindex partout (balise meta + en-tête HTTP).
 */
export const SITE_URL = (process.env.SITE_URL ?? "http://localhost:3000").replace(/\/$/, "");
export const SITE_ENV: "production" | "preview" = process.env.SITE_ENV === "production" ? "production" : "preview";
export const INDEXABLE = SITE_ENV === "production";

export const absoluteUrl = (path = "/") => `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
