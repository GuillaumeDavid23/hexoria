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
  /**
   * Communes desservies autour de Boufflers (Somme / Pas-de-Calais).
   * x, y : position sur le radar de la section Secteur (en %), d'après la géographie réelle,
   * légèrement écartée près du centre pour rester lisible.
   */
  towns: [
    { name: "Auxi-le-Château", dept: "62", x: 57, y: 75 },
    { name: "Hesdin", dept: "62", x: 42, y: 31 },
    { name: "Frévent", dept: "62", x: 77, y: 45 },
    { name: "Saint-Pol-sur-Ternoise", dept: "62", x: 79, y: 22 },
    { name: "Doullens", dept: "80", x: 81, y: 64 },
    { name: "Abbeville", dept: "80", x: 33, y: 68 },
    { name: "Amiens", dept: "80", x: 67, y: 88 },
    { name: "Berck", dept: "62", x: 19, y: 34 },
  ],
  /** Conteneur Google Tag Manager (chargé seulement en production, après consentement). */
  gtmId: "GTM-NMPMQBVJ",
  /** Horaires (identiques à la fiche Google Business Profile). */
  hours: { label: "Du lundi au vendredi, 9 h – 18 h", days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "09:00", closes: "18:00" },
  contact: {
    phone: "03 22 29 00 38",
    phoneE164: "+33322290038",
    email: "contact@hexoria.fr",
    web: "hexoria.fr",
  },
  /** Profils officiels (pied de page + données structurées « sameAs »). */
  social: {
    facebook: "https://www.facebook.com/profile.php?id=61581932717672",
    instagram: "https://www.instagram.com/hexoria_web/",
    malt: "https://www.malt.fr/profile/guillaumedavid3",
    github: "https://github.com/GuillaumeDavid23",
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
