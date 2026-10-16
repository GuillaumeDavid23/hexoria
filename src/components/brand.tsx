import { useId } from "react";

/**
 * Pictogramme Hexoria redessiné en SVG d'après le tract : la « goutte » violette
 * (avec son œil) et les trois pistes de circuit terminées par des pastilles.
 * Les éléments portent des attributs data-* pour pouvoir être animés.
 */
export function Mark({ className, mono }: { className?: string; mono?: string }) {
  const id = useId();
  const fill = mono ?? `url(#${id})`;
  const line = mono ?? "#5b21b6";
  return (
    <svg viewBox="20 20 640 620" className={className} aria-hidden="true">
      <defs>
        <linearGradient id={id} x1="0.15" y1="0.9" x2="0.85" y2="0.1">
          <stop offset="0" stopColor="#4a1a9e" />
          <stop offset="1" stopColor="#8a46c9" />
        </linearGradient>
      </defs>
      <path
        data-mark-drop
        fillRule="evenodd"
        fill={fill}
        d="M330 45C425 38 488 102 466 186C450 250 384 278 322 300C252 325 214 370 234 420C246 452 274 465 300 468C200 470 108 402 94 300C80 198 150 62 330 45ZM190 156a34 34 0 1 0 0.1 0Z"
      />
      <g data-mark-lines fill="none" stroke={line} strokeWidth="17" strokeLinecap="round">
        <path data-trace d="M296 467C338 478 370 472 398 458" />
        <path data-trace d="M44 418C92 560 300 622 452 520C500 486 522 444 526 406" />
        <path data-trace d="M126 120C22 222 26 430 160 540C300 652 520 612 600 420C616 370 612 300 607 207" />
      </g>
      <g data-mark-nodes fill="none" stroke={line} strokeWidth="15">
        <circle cx="418" cy="447" r="19" />
        <circle cx="534" cy="386" r="19" />
        <circle cx="606" cy="185" r="21" />
      </g>
    </svg>
  );
}

/** Logotype complet : pictogramme + HEXORIA (+ signature en option). */
export function Logo({ className, signature = false, light = false }: { className?: string; signature?: boolean; light?: boolean }) {
  return (
    <span className={`inline-flex items-center gap-[0.45em] ${className ?? ""}`} aria-label="Hexoria" role="img">
      <Mark className="h-[1.9em] w-auto shrink-0" mono={light ? "#ffffff" : undefined} />
      <span className="flex flex-col leading-none" aria-hidden="true">
        <span className="font-display text-[1.25em] font-medium tracking-[0.12em]">HEXORIA</span>
        {signature && <span className="mt-[0.3em] text-[0.55em] tracking-wide opacity-75">L&apos;informatique, simplement.</span>}
      </span>
    </span>
  );
}
