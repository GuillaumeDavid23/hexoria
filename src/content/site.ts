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
  /** Mentions légales (registre : societe.com / RNE). */
  legal: {
    companyName: "HEXORIA",
    form: "SASU au capital de 100 €",
    president: "Guillaume David",
    rcs: "RCS Amiens 989 103 247",
    siret: "989 103 247 00015",
    vat: "FR19989103247",
    street: "6 rue Principale",
    postalCode: "80150",
  },
};

export const telHref = `tel:${site.contact.phoneE164}`;
export const mailHref = `mailto:${site.contact.email}`;
