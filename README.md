# Hexoria — site vitrine

Dépannage informatique à domicile, Boufflers et alentours. « L'informatique, simplement. »

Next.js 16 · Tailwind 4 · GSAP (ScrollTrigger, SplitText, MorphSVG, DrawSVG, ScrambleText) · Lenis.
Aucune base de données : tout le contenu est dans `src/content/site.ts` et les composants de `src/components/site/`.

| Section | Effet au défilement |
| --- | --- |
| Accueil | Le dernier mot du titre défile (ordinateur, téléphone, imprimante…). Au scroll, les fenêtres d'erreur passent à « Réglé ! » et s'écartent, le câble emmêlé se range, « y voir clair » devient net |
| Engagements | Texte qui s'allume mot à mot, compteurs (« 99 → 0 jargon ») |
| Services | Cartes empilées ; jauge « Ça rame → Ça file », Wi-Fi et appareils qui s'allument, copie de photos 0 → 100 % |
| Déroulement | Défilement horizontal épinglé (souris), câble qui se branche à la fin ; frise verticale sur téléphone |
| Secteur | Radar autour de Boufflers, bandeau de mots lié au scroll |
| Contact | Numéro géant qui se « décode », bouton d'appel fixe sur téléphone |

`prefers-reduced-motion` est respecté. Sur écran tactile, les animations se jouent une fois à l'apparition.

## Développement

```bash
npm install
npm run dev
```

## Production (VPS IONOS)

Voir l'en-tête de `docker-compose.prod.yml` (relais par le Caddy partagé, réseau `web`).

```bash
docker compose -f docker-compose.prod.yml up -d --build
```

À compléter avant diffusion : mentions légales dans `src/content/site.ts` (`legal`).
