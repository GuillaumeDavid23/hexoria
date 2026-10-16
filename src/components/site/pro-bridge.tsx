import Link from "next/link";

/** Passerelle vers le parcours professionnel, en fin de page Particuliers. */
export function ProBridge() {
  return (
    <section data-theme="light" className="bg-mist pb-[clamp(4rem,10vh,8rem)]">
      <div className="container-x">
        <Link
          href="/pro"
          data-scrub="scale"
          className="group relative grid gap-6 overflow-hidden rounded-[clamp(1.5rem,3vw,3rem)] bg-gradient-to-br from-violet-800 to-violet p-[clamp(1.5rem,4vw,4.5rem)] text-white md:grid-cols-[1fr_auto] md:items-end"
        >
          <div className="dots absolute inset-0 opacity-30 [filter:invert(1)]" aria-hidden="true" />
          <div className="relative">
            <p className="eyebrow mb-4 text-lilac">Vous êtes un professionnel&nbsp;?</p>
            <p className="max-w-[20ch] font-display text-[length:var(--step-3)] font-extrabold leading-[0.95] tracking-[-0.03em]">
              Site vitrine, application web <span className="text-lilac">sur mesure.</span>
            </p>
            <p className="mt-4 max-w-[46ch] text-white/80">Commerces, artisans, associations, entreprises : découvrez l&apos;offre dédiée aux pros.</p>
          </div>
          <span className="relative inline-flex w-fit items-center gap-3 rounded-full bg-white px-7 py-4 font-bold text-violet transition-transform group-hover:translate-x-1">
            Voir l&apos;offre pro <span aria-hidden="true">→</span>
          </span>
        </Link>
      </div>
    </section>
  );
}
