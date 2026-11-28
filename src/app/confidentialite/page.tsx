import type { Metadata } from "next";
import Link from "next/link";
import { Logo } from "@/components/brand";
import { ConsentLink } from "@/components/site/consent";
import { EmailLink } from "@/components/site/email-link";
import { site } from "@/content/site";

/**
 * Politique de confidentialité (FR + EN sur la même page).
 * Cette URL est déclarée sur l'écran de consentement OAuth Google de l'outil de prospection
 * (scope business.manage, publication sur la fiche Google Business Profile) : la section « Données Google »
 * doit rester alignée sur ce que fait réellement l'outil.
 */
export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description: "Données collectées par Hexoria, usage des données Google (Business Profile), durées de conservation et vos droits. English version included.",
  alternates: { canonical: "/confidentialite" },
};

const UPDATED = { fr: "28 novembre 2026", en: "November 28, 2026" };

export default function PrivacyPage() {
  const l = site.legal;
  const address = `${l.street}, ${l.postalCode} ${site.city.toUpperCase()}, France`;
  const prose =
    "space-y-10 text-stone [&_h2]:mb-2 [&_h2]:font-display [&_h2]:text-[length:var(--step-1)] [&_h2]:font-bold [&_h2]:text-ink [&_li]:mt-1.5 [&_p+p]:mt-3 [&_ul+p]:mt-3 [&_ul]:mt-3 [&_ul]:list-disc [&_ul]:pl-6";

  return (
    <main className="container-x max-w-4xl py-16 sm:py-24">
      <Link href="/" aria-label="Hexoria, retour à l'accueil" className="text-[1.1rem]">
        <Logo />
      </Link>

      <div lang="fr">
        <h1 className="mt-14 font-display text-[length:var(--step-3)] font-extrabold leading-none">Politique de confidentialité</h1>
        <p className="mt-4 text-stone">
          Mise à jour le {UPDATED.fr} ·{" "}
          <a href="#english" className="text-violet underline">
            English version below
          </a>
        </p>

        <div className={`mt-12 ${prose}`}>
          <section>
            <h2>Qui est responsable de vos données&nbsp;?</h2>
            <p>
              {l.companyName}, {l.form}, {address} ({l.rcs}), représentée par {l.president}. Contact : <EmailLink className="text-violet underline" /> ·{" "}
              {site.contact.phone}.
            </p>
          </section>

          <section>
            <h2>Ce site</h2>
            <p>
              Le site hexoria.fr ne comporte ni formulaire ni compte. Si vous m&apos;écrivez ou m&apos;appelez, vos coordonnées et votre message servent
              uniquement à vous répondre et à réaliser la prestation demandée.
            </p>
            <p>
              Avec votre accord seulement, Google Analytics (Google Ireland Ltd) mesure la fréquentation des pages. Aucun cookie publicitaire. Votre choix
              est conservé 13 mois et modifiable à tout moment&nbsp;: <ConsentLink className="text-violet underline" />.
            </p>
          </section>

          <section>
            <h2>Prospection auprès des professionnels</h2>
            <p>
              Hexoria contacte des entreprises locales pour leur proposer la création ou la refonte de leur site. Les informations utilisées sont publiques
              et professionnelles : nom de l&apos;entreprise, activité, adresse, téléphone, site web et adresse e-mail publiée par l&apos;entreprise elle-même
              (site, fiche Google, page Facebook, annuaire officiel des entreprises).
            </p>
            <p>
              Base légale : l&apos;intérêt légitime d&apos;Hexoria à présenter ses services à des professionnels (article 6.1.f du RGPD). Vous pouvez vous
              opposer à tout moment à ces messages, en répondant simplement au mail ou en écrivant à <EmailLink className="text-violet underline" /> :
              vos coordonnées sont alors retirées de la liste de prospection. Ces données sont conservées au plus 3 ans après le dernier échange.
            </p>
            <p>
              Les e-mails sont envoyés par le service Brevo. Si vous répondez, votre réponse peut être triée et une proposition de réponse préparée avec
              l&apos;aide du service d&apos;IA Anthropic (Claude), pour ne plus vous recontacter si vous le demandez ; chaque réponse est relue et envoyée par
              Guillaume.
            </p>
          </section>

          <section id="google">
            <h2>Données Google : publication sur la fiche Google Business Profile d&apos;Hexoria</h2>
            <p>
              Hexoria utilise un outil interne, réservé à son seul usage, qui se connecte au compte Google d&apos;Hexoria avec l&apos;autorisation de son
              titulaire (protocole OAuth, autorisation « Gérer vos fiches d&apos;établissement », scope <code>business.manage</code>). L&apos;outil n&apos;est pas
              proposé au public et seul le compte Google d&apos;Hexoria y est connecté.
            </p>
            <p>Avec cette autorisation, l&apos;outil fait uniquement ceci :</p>
            <ul>
              <li>
                <strong>lire la liste des comptes et des fiches</strong> d&apos;établissement du compte connecté, en se limitant à leur identifiant et à leur
                nom, pour choisir la fiche Hexoria ;
              </li>
              <li>
                <strong>publier une actualité</strong> (texte, lien vers hexoria.fr et, si besoin, une photo) sur la fiche Hexoria. Chaque publication est
                relue et lancée à la main par Guillaume.
              </li>
            </ul>
            <p>
              L&apos;outil ne lit pas les avis, les statistiques, les messages ni les questions-réponses, et ne modifie pas les informations de la fiche. Il
              n&apos;agit sur aucune fiche de client ou de prospect.
            </p>
            <p>Ce que l&apos;outil ne fait pas avec les données Google :</p>
            <ul>
              <li>il ne les vend pas, ne les loue pas et ne les partage avec aucun tiers ;</li>
              <li>il ne les utilise pas pour de la publicité, du profilage ou l&apos;évaluation de la solvabilité de quiconque ;</li>
              <li>il ne les transmet à aucun service d&apos;intelligence artificielle et ne les utilise pas pour entraîner ou améliorer des modèles ;</li>
              <li>personne d&apos;autre que Guillaume, titulaire du compte, n&apos;y a accès, sauf obligation légale ou besoin de sécurité.</li>
            </ul>
            <p>
              Données conservées, uniquement sur l&apos;ordinateur d&apos;Hexoria qui exécute l&apos;outil (fichier protégé et base locale) : le jeton
              d&apos;accès Google, l&apos;identifiant et le nom de la fiche choisie, et l&apos;identifiant de chaque actualité publiée avec sa date. Les échanges
              avec Google sont chiffrés (HTTPS). Le bouton « Déconnecter la fiche » efface le jeton et la fiche enregistrés. L&apos;accès peut aussi être retiré
              à tout moment depuis{" "}
              <a href="https://myaccount.google.com/permissions" className="text-violet underline" target="_blank" rel="noopener">
                myaccount.google.com/permissions
              </a>
              .
            </p>
            <p>
              L&apos;utilisation et le transfert à toute autre application des informations reçues des API Google respectent les{" "}
              <a href="https://developers.google.com/terms/api-services-user-data-policy" className="text-violet underline" target="_blank" rel="noopener">
                règles relatives aux données utilisateur des services d&apos;API Google
              </a>
              , y compris les exigences d&apos;utilisation limitée (Limited Use).
            </p>
          </section>

          <section>
            <h2>Hébergement et sous-traitants</h2>
            <ul>
              <li>Site web : IONOS SE (Allemagne).</li>
              <li>Envoi des e-mails de prospection : Brevo (France).</li>
              <li>Mesure d&apos;audience, avec votre accord : Google Ireland Ltd.</li>
              <li>
                Aide à la rédaction et au tri des réponses reçues : Anthropic (États-Unis), via son API professionnelle, encadrée par des clauses
                contractuelles types de la Commission européenne. Aucune donnée issue des API Google ne lui est transmise.
              </li>
            </ul>
          </section>

          <section>
            <h2>Vos droits</h2>
            <p>
              Vous pouvez demander l&apos;accès, la rectification, l&apos;effacement de vos données, la limitation du traitement ou vous opposer à la
              prospection, en écrivant à <EmailLink className="text-violet underline" />. Réponse sous un mois au plus. Si vous estimez que vos droits ne sont
              pas respectés, vous pouvez saisir la CNIL (
              <a href="https://www.cnil.fr" className="text-violet underline" target="_blank" rel="noopener">
                www.cnil.fr
              </a>
              ).
            </p>
          </section>
        </div>
      </div>

      <hr className="my-20 border-stone/20" />

      <div id="english" lang="en">
        <h2 className="font-display text-[length:var(--step-3)] font-extrabold leading-none">Privacy Policy</h2>
        <p className="mt-4 text-stone">Last updated: {UPDATED.en}</p>

        <div className={`mt-12 ${prose}`}>
          <section>
            <h2>Data controller</h2>
            <p>
              {l.companyName} (French SASU, share capital €100), {address}, {l.rcs},
              represented by {l.president}. Contact: <EmailLink className="text-violet underline" /> · +33 3 22 29 00 38.
            </p>
          </section>

          <section>
            <h2>This website</h2>
            <p>
              hexoria.fr has no forms and no user accounts. If you email or call Hexoria, your contact details and message are only used to reply to you and to
              deliver the service you asked for. With your consent only, Google Analytics measures page visits; no advertising cookies are used.
            </p>
          </section>

          <section>
            <h2>Business prospecting</h2>
            <p>
              Hexoria contacts local businesses to offer website creation or redesign. It only uses public, professional information (business name, activity,
              address, phone, website and the email address published by the business itself). Legal basis: legitimate interest (GDPR art. 6.1.f). You can opt
              out at any time by replying to the email; your details are then removed from the prospecting list. Emails are sent through Brevo; replies may be sorted, and a draft answer prepared, with the help of Anthropic&apos;s Claude API, and every answer is reviewed and sent by a human. Data is kept for at most 3 years after the last
              exchange.
            </p>
          </section>

          <section id="google-en">
            <h2>Google user data: posting on Hexoria&apos;s Google Business Profile</h2>
            <p>
              Hexoria uses an internal tool, for its own use only, which connects to Hexoria&apos;s own Google account through Google OAuth with the account
              owner&apos;s authorization (scope <code>https://www.googleapis.com/auth/business.manage</code>). It is not offered to the public and no other
              Google account is connected to it.
            </p>
            <p>With this authorization, the tool only:</p>
            <ul>
              <li>
                <strong>reads the list of accounts and business locations</strong> of the connected account, limited to their ID and name, so the owner can
                select the Hexoria location;
              </li>
              <li>
                <strong>publishes local posts</strong> (text, a link to hexoria.fr and optionally a photo) on the Hexoria location. Each post is reviewed and
                published manually by the account owner.
              </li>
            </ul>
            <p>
              The tool does not read reviews, insights, messages or Q&amp;A, does not edit business information, and never acts on any other business&apos;s
              profile.
            </p>
            <p>The tool does not:</p>
            <ul>
              <li>sell, rent or share Google user data with any third party;</li>
              <li>use Google user data for advertising, profiling, or to determine creditworthiness;</li>
              <li>send Google user data to any AI service, or use it to develop, improve or train generalized AI or machine-learning models;</li>
              <li>allow any human other than the account owner to access the data, except where required by law or for security purposes.</li>
            </ul>
            <p>
              Stored data, only on the Hexoria computer that runs the tool (a protected file and a local database): the OAuth refresh token, the selected
              location&apos;s ID and name, and the ID and date of each published post. All exchanges with Google use HTTPS. The &quot;Disconnect&quot; button
              deletes the stored token and location. Access can also be revoked at any time at{" "}
              <a href="https://myaccount.google.com/permissions" className="text-violet underline" target="_blank" rel="noopener">
                myaccount.google.com/permissions
              </a>
              .
            </p>
            <p>
              Hexoria&apos;s use and transfer to any other app of information received from Google APIs will adhere to the{" "}
              <a href="https://developers.google.com/terms/api-services-user-data-policy" className="text-violet underline" target="_blank" rel="noopener">
                Google API Services User Data Policy
              </a>
              , including the Limited Use requirements.
            </p>
          </section>

          <section>
            <h2>Service providers</h2>
            <p>
              Website hosting: IONOS SE (Germany). Prospecting emails: Brevo (France). Analytics, with consent only: Google Ireland Ltd. Drafting help and
              sorting of replies received by email: Anthropic (United States), under EU standard contractual clauses. No data received from Google APIs is
              sent to Anthropic.
            </p>
          </section>

          <section>
            <h2>Your rights</h2>
            <p>
              You can request access, correction or deletion of your data, restrict its processing or object to prospecting by writing to{" "}
              <EmailLink className="text-violet underline" />. You may also lodge a complaint with the French data protection authority, the CNIL
              (www.cnil.fr).
            </p>
          </section>
        </div>
      </div>

      <Link href="/" className="mt-16 inline-block rounded-full bg-violet px-6 py-3 font-bold text-white">
        ← Retour à l&apos;accueil
      </Link>
    </main>
  );
}
