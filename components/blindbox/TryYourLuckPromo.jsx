import { useRef, useState } from "react";
import products from "../../data/products";
import { useBlindBoxOpening } from "../../hooks/useBlindBoxOpening";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";
import BlindBoxOpeningModal from "./opening/BlindBoxOpeningModal";

// Home page's 4-way collection picker. Owns a single useBlindBoxOpening
// instance — one hook instance is enough since only one modal can be open
// at a time no matter which of the four collections the user picks.
function TryYourLuckPromo({ id = "sansini-dene-promo" }) {
  const reducedMotion = usePrefersReducedMotion();
  const opening = useBlindBoxOpening({ reducedMotion });
  const [activeProduct, setActiveProduct] = useState(null);
  const triggerRefs = useRef({});

  function handlePick(product) {
    setActiveProduct(product);
    opening.start(product.figures);
  }

  function handleClose() {
    opening.reset();
    triggerRefs.current[activeProduct?.id]?.focus();
  }

  return (
    <section id={id} className="bg-brand-50 dark:bg-brand-900/40 border-y border-brand-100 dark:border-brand-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="max-w-xl mx-auto text-center mb-10">
          <h2 className="font-display text-3xl font-extrabold tracking-tight text-brand-950 dark:text-white">Şansını Dene</h2>
          <p className="mt-3 text-brand-600 dark:text-brand-300">
            Satın almadan önce dört koleksiyondan birini seç, kutuyu sanal olarak aç ve hangi figürün çıkabileceğini keşfet.
          </p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {products.map((product) => (
            <button
              key={product.id}
              ref={(el) => (triggerRefs.current[product.id] = el)}
              onClick={() => handlePick(product)}
              aria-label={`${product.collectionName} kutusunu sanal olarak aç`}
              className="group text-left bg-white dark:bg-brand-900 border border-brand-100 dark:border-brand-800 rounded-2xl p-4 hover:shadow-card-hover hover:-translate-y-0.5 transition-all"
            >
              <div className="aspect-square rounded-xl overflow-hidden bg-brand-50 dark:bg-brand-800 mb-3">
                <img src={product.mainImage} alt={product.name} loading="lazy" className="w-full h-full object-contain p-3" />
              </div>
              <p className="min-h-10 text-sm font-semibold leading-snug text-brand-900 dark:text-white">{product.collectionName}</p>
              <p className="text-xs text-accent-700 dark:text-accent-400 mt-1 font-medium">Kutuyu Aç ✨</p>
            </button>
          ))}
        </div>
      </div>

      {activeProduct && opening.phase !== "idle" && (
        <BlindBoxOpeningModal
          product={activeProduct}
          phase={opening.phase}
          selectedFigure={opening.selectedFigure}
          reducedMotion={reducedMotion}
          onRetry={() => opening.start(activeProduct.figures)}
          onClose={handleClose}
        />
      )}
    </section>
  );
}

export default TryYourLuckPromo;
