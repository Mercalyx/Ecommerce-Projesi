import { Link } from "react-router-dom";
import RarityBadge from "../RarityBadge";

function RevealResult({ figure, product, phase, onRetry, onClose }) {
  const visible = phase === "revealing" || phase === "completed";
  if (!visible || !figure) return null;

  return (
    <div className="relative z-10 flex flex-col items-center text-center px-4 animate-bb-pop-in">
      {figure.isSecret && (
        <p className="text-xs font-bold tracking-wide uppercase text-amber-300 mb-1 animate-bb-shimmer">
          ✨ Nadir Figürü Buldun! ✨
        </p>
      )}

      <div
        className={`w-32 h-32 sm:w-40 sm:h-40 rounded-full overflow-hidden bg-white dark:bg-brand-900 flex items-center justify-center ${
          figure.isSecret ? "ring-4 ring-amber-400 shadow-[0_0_40px_rgba(212,175,55,0.55)]" : "ring-2 ring-white/60"
        }`}
      >
        <img src={figure.image} alt={figure.altText} className="w-full h-full object-contain p-3" />
      </div>

      <div className="mt-4">
        <RarityBadge rarity={figure.rarity} />
      </div>

      <h3 className="mt-3 font-display text-xl sm:text-2xl font-bold text-white">{figure.displayName}</h3>
      <p className="mt-1 text-sm text-white/80 max-w-xs">{figure.revealText}</p>
      {figure.characterNote && <p className="mt-2 text-sm italic text-amber-200 max-w-xs">"{figure.characterNote}"</p>}
      <p className="mt-2 text-xs text-white/60">Çıkma ihtimali: %{figure.probability}</p>

      {phase === "completed" && (
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={onRetry}
            className="px-5 py-2.5 rounded-lg text-sm font-semibold bg-white text-brand-900 hover:bg-brand-100 transition-colors"
          >
            Tekrar Dene
          </button>
          <Link
            to={`/urun/${product.slug}`}
            onClick={onClose}
            className="px-5 py-2.5 rounded-lg text-sm font-semibold bg-white/10 text-white border border-white/30 hover:bg-white/20 transition-colors"
          >
            Koleksiyonu İncele
          </Link>
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-lg text-sm font-semibold text-white/70 hover:text-white transition-colors"
          >
            Kapat
          </button>
        </div>
      )}
    </div>
  );
}

export default RevealResult;
