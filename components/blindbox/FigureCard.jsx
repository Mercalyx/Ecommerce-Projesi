import { Link } from "react-router-dom";
import RarityBadge from "./RarityBadge";

// isSecret only ever darkens the image and adds a gold ring + sparkle — the
// name, rarity, probability and character note always stay fully visible,
// per the "card must never be fully hidden" rule.
function FigureCard({ figure, productSlug }) {
  const body = (
    <div className="bg-white dark:bg-brand-900 border border-brand-100 dark:border-brand-800 rounded-xl p-3 h-full flex flex-col">
      <div
        className={`relative aspect-square shrink-0 rounded-lg overflow-hidden bg-brand-50 dark:bg-brand-800 ${
          figure.isSecret ? "ring-2 ring-amber-400" : ""
        }`}
      >
        <img
          src={figure.image}
          alt={figure.altText}
          loading="lazy"
          className={`w-full h-full object-contain p-3 ${figure.isSecret ? "brightness-[0.4] saturate-150" : ""}`}
        />
        {figure.isSecret && (
          <div className="absolute inset-0 flex items-center justify-center text-2xl" aria-hidden="true">
            ✨
          </div>
        )}
        <RarityBadge rarity={figure.rarity} className="absolute top-2 left-2" />
      </div>
      <div className="mt-2.5 flex flex-1 flex-col">
        <p className="min-h-10 text-sm font-semibold leading-snug text-brand-900 dark:text-white">{figure.displayName}</p>
        <p className="text-xs leading-relaxed text-brand-500 dark:text-brand-400 mt-0.5">{figure.description}</p>
        {figure.characterNote && (
          <p className="text-xs leading-relaxed text-amber-700 dark:text-amber-400 mt-1.5 italic">"{figure.characterNote}"</p>
        )}
        <p className="text-[11px] text-brand-400 dark:text-brand-500 mt-auto pt-2">Çıkma ihtimali: %{figure.probability}</p>
      </div>
    </div>
  );

  if (!productSlug) return body;

  return (
    <Link to={`/urun/${productSlug}`} className="block h-full hover:shadow-card rounded-xl transition-shadow">
      {body}
    </Link>
  );
}

export default FigureCard;
