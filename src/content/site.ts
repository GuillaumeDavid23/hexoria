/**
 * Informations publiques d'Hexoria — reprises du tract.
 * Une valeur à null n'est pas affichée (ou s'affiche « à compléter » en préproduction).
 */
export const site = {
  name: "Hexoria",
  signature: "L'informatique, simplement.",
  person: "Guillaume",
  city: "Boufflers",
  department: "Somme",
  area: "Boufflers et alentours",
  /** Conteneur Google Tag Manager (chargé seulement en production, après consentement). */
  gtmId: "GTM-NMPMQBVJ",
  contact: {
    phone: "03 22 29 00 38",
    phoneE164: "+33322290038",
    email: "contact@hexoria.fr",
    web: "hexoria.fr",
  },
  /** Mentions légales : à renseigner avant la mise en ligne publique. */
  legal: {
    owner: null as string | null, // ex. « Guillaume Nom »
    status: "Entrepreneur individuel" as string | null,
    siret: null as string | null,
    address: null as string | null,
  },
};

export const telHref = `tel:${site.contact.phoneE164}`;
export const mailHref = `mailto:${site.contact.email}`;
