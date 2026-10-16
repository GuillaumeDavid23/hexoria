import Link from "next/link";

/** La meilleure démonstration : le site lui-même. */
export function Proof() {
  return (
    <section data-theme="light" className="bg-mist py-[clamp(4rem,12vh,8rem)]">
      <div className="container-x">
        <div data-scrub="scale" className="relative overflow-hidden rounded-[clamp(1.5rem,3vw,3rem)] bg-white p-[clamp(1.5rem,5vw,5rem)] ring-1 ring-violet/10">
          <div className="dots absolute inset-0 opacity-70" aria-hidden="true" />
          <div className="relative grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-end">
            <div>
              <p className="eyebrow mb-4 text-violet">La preuve par l&apos;exemple</p>
              <p className="font-display text-[length:var(--step-3)] font-extrabold leading-[0.98] tracking-[-0.03em]">
                Le site que vous parcourez&nbsp;? <span className="text-violet">Je l&apos;ai conçu et développé moi-même.</span>
              </p>
              <p className="mt-5 max-w-[50ch] text-stone">
                Animations au défilement, adaptation au téléphone, référencement, hébergement&nbsp;: tout ce que vous voyez ici peut être fait pour votre activité.
              </p>
            </div>
            <Link href="/" className="w-fit rounded-full px-7 py-4 font-semibold ring-2 ring-ink/15 transition-colors hover:bg-mist">
              Voir le parcours Particuliers →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
