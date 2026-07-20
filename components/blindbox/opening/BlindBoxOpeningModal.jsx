import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import EggCapsule from "./EggCapsule";
import ParticleEffect from "./ParticleEffect";
import RevealResult from "./RevealResult";
import { useFocusTrap } from "../../../hooks/useFocusTrap";

const PHASE_LABELS = {
  shaking: "Kutu sallanıyor...",
  cracking: "Kutu çatlıyor...",
  opening: "Kutu açılıyor...",
  revealing: "Figürün ortaya çıkıyor...",
  completed: "",
};

// One reusable modal for all four collections. Theming, capsule shape and
// particle look all come from `product` — this component never branches on
// which collection it's showing.
function BlindBoxOpeningModal({ product, phase, selectedFigure, reducedMotion, onRetry, onClose }) {
  const containerRef = useRef(null);
  useFocusTrap(containerRef, true, onClose);

  useEffect(() => {
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, []);

  const { themeColors } = product;
  const isRevealPhase = phase === "revealing" || phase === "completed";

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label={`${product.collectionName} kutu açılışı`}
    >
      <div
        className="absolute inset-0"
        style={{ background: `linear-gradient(160deg, ${themeColors.deep} 0%, ${themeColors.primary} 130%)` }}
        onClick={onClose}
      />

      <div
        ref={containerRef}
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-3xl outline-none"
      >
        <div className="relative min-h-[420px] sm:min-h-[480px] flex flex-col items-center justify-center py-10 px-4">
          <ParticleEffect
            variant={product.particleVariant}
            phase={phase}
            secret={!!selectedFigure?.isSecret}
            reducedMotion={reducedMotion}
          />

          {!isRevealPhase && (
            <div className="relative w-48 h-64 sm:w-56 sm:h-72 shrink-0">
              <EggCapsule variant={product.openingAnimationType} phase={phase} themeColors={themeColors} isDeluxe={product.isDeluxe} />
            </div>
          )}

          {isRevealPhase && (
            <RevealResult figure={selectedFigure} product={product} phase={phase} onRetry={onRetry} onClose={onClose} />
          )}

          {!isRevealPhase && (
            <p className="mt-6 text-sm text-white/70 animate-pulse" aria-live="polite">
              {PHASE_LABELS[phase]}
            </p>
          )}
        </div>

        <button
          onClick={onClose}
          aria-label="Kapat"
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/15 hover:bg-white/25 text-white flex items-center justify-center transition-colors"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
            <path d="M6 6l12 12M18 6l-12 12" strokeLinecap="round" />
          </svg>
        </button>
      </div>
    </div>,
    document.body
  );
}

export default BlindBoxOpeningModal;
