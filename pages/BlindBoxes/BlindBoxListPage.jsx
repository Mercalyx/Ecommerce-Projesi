import { useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import products from "../../data/products";
import ListingHeader from "../../components/blindbox/ListingHeader";
import BlindBoxCard from "../../components/blindbox/BlindBoxCard";
import BlindBoxOpeningModal from "../../components/blindbox/opening/BlindBoxOpeningModal";
import { useBlindBoxOpening } from "../../hooks/useBlindBoxOpening";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";

function BlindBoxListPage() {
  const [searchParams] = useSearchParams();
  const query = (searchParams.get("q") || "").trim().toLowerCase();

  const reducedMotion = usePrefersReducedMotion();
  const opening = useBlindBoxOpening({ reducedMotion });
  const [activeProduct, setActiveProduct] = useState(null);
  const lastTriggerRef = useRef(null);

  const filteredProducts = products.filter((p) => {
    if (!query) return true;
    return (
      p.name.toLowerCase().includes(query) ||
      p.collectionName.toLowerCase().includes(query) ||
      p.tags.some((t) => t.toLowerCase().includes(query))
    );
  });

  function handleTryYourLuck(product, triggerEl) {
    lastTriggerRef.current = triggerEl;
    setActiveProduct(product);
    opening.start(product.figures);
  }

  function handleClose() {
    opening.reset();
    lastTriggerRef.current?.focus();
  }

  return (
    <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <ListingHeader
        title={query ? `"${query}" için sonuçlar` : "Blind Box'lar"}
        subtitle={
          query
            ? `${filteredProducts.length} koleksiyon bulundu.`
            : "Dört özel koleksiyon, yirmi sürpriz figür. Hangisi seni bulacak?"
        }
      />

      {filteredProducts.length === 0 ? (
        <div className="py-20 text-center">
          <p className="text-sm text-brand-400 dark:text-brand-500">Aramanızla eşleşen bir blind box bulunamadı.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredProducts.map((product) => (
            <BlindBoxCard key={product.id} product={product} onTryYourLuck={handleTryYourLuck} />
          ))}
        </div>
      )}

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
    </main>
  );
}

export default BlindBoxListPage;
