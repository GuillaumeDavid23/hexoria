import { site } from "@/content/site";

export const FAQ = [
  {
    q: "Vous intervenez seulement sur les ordinateurs ?",
    a: "Non : ordinateur, téléphone, tablette, imprimante, box Internet et Wi-Fi, appareils connectés… Si c'est branché et que ça vous complique la vie, appelez-moi.",
  },
  {
    q: "Je ne suis pas à l'aise avec l'informatique, est-ce un problème ?",
    a: "Pas du tout, c'est justement pour ça que je suis là. Je vous explique chaque étape simplement, et vous pouvez me poser toutes les questions que vous voulez.",
  },
  {
    q: "Dois-je apporter mon ordinateur quelque part ?",
    a: `Non. Je viens chez vous, à ${site.city} et alentours, et j'interviens directement sur place.`,
  },
  {
    q: "Jusqu'où vous déplacez-vous ?",
    a: `Autour de ${site.city} : ${site.towns.map((t) => t.name).join(", ")} et les communes voisines, dans la Somme et le Pas-de-Calais. Vous êtes un peu plus loin ? Appelez-moi, on en parle.`,
  },
  {
    q: "Combien ça coûte ?",
    a: `Chaque situation est différente. Appelez-moi au ${site.contact.phone} pour me décrire votre souci : je vous dirai ce qu'il est possible de faire et à quel prix, avant d'intervenir.`,
  },
  {
    q: "Comment ne pas perdre mes photos et documents ?",
    a: "Le plus sûr est d'en avoir une copie sur un autre support, comme un disque dur externe ou une clé USB. C'est le service Sauvegarde : vos fichiers sont copiés, et je vous montre où les retrouver.",
  },
  {
    q: "Je viens d'acheter un nouvel appareil, pouvez-vous l'installer ?",
    a: "Oui : ordinateur, téléphone, imprimante, appareil connecté… Mise en route, connexion au Wi-Fi, réglages, et je vous montre comment vous en servir.",
  },
];

export function Faq() {
  return (
    <section id="questions" data-scene data-theme="light" className="bg-mist py-[clamp(5rem,14vh,10rem)]">
      <div className="container-x grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <p data-scrub="up" className="eyebrow mb-4 flex items-center gap-4 text-violet">
            <span aria-hidden="true" className="h-0.5 w-12 rounded bg-violet" /> Questions
          </p>
          <h2 data-scrub="up" className="font-display text-[length:var(--step-3)] font-extrabold leading-[0.95] tracking-[-0.03em]">
            Vous vous <span className="text-violet">demandez peut-être…</span>
          </h2>
        </div>
        <div className="grid gap-3 lg:col-span-8">
          {FAQ.map((f) => (
            <details key={f.q} data-scrub="up" className="group rounded-2xl bg-white ring-1 ring-ink/5 transition-shadow open:shadow-[0_24px_50px_-30px_rgba(28,10,66,.4)]">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 p-[clamp(1.1rem,2vw,1.75rem)] font-display text-[length:var(--step-1)] font-bold leading-snug [&::-webkit-details-marker]:hidden">
                {f.q}
                <span className="relative grid size-10 shrink-0 place-items-center rounded-full bg-lilac-100 text-violet transition-transform duration-500 ease-out-expo group-open:rotate-45 group-open:bg-violet group-open:text-white" aria-hidden="true">
                  <span className="absolute h-0.5 w-4 rounded bg-current" />
                  <span className="absolute h-4 w-0.5 rounded bg-current" />
                </span>
              </summary>
              <p className="max-w-[60ch] px-[clamp(1.1rem,2vw,1.75rem)] pb-[clamp(1.1rem,2vw,1.75rem)] text-stone">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
