import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../../App";
import BlindBoxImage from "./BlindBoxImage";
import BlindBoxCardInfo from "./BlindBoxCardInfo";
import FavoriteButton from "./FavoriteButton";

// onTryYourLuck is optional — pages that already have a dedicated opening
// promo (like HomePage) can omit it to keep the card to its two core actions.
function BlindBoxCard({ product, onTryYourLuck }) {
  const { cart, setCart } = useContext(CartContext);
  const [added, setAdded] = useState(false);

  function addToCart(e) {
    e.preventDefault();
    const existing = cart.find((item) => item.id === product.id);
    if (existing) {
      setCart(cart.map((item) => (item.id === product.id ? { ...item, qty: item.qty + 1 } : item)));
    } else {
      setCart([...cart, { ...product, qty: 1 }]);
    }
    setAdded(true);
    setTimeout(() => setAdded(false), 1000);
  }

  return (
    <div className="group flex flex-col bg-white dark:bg-brand-900 rounded-xl p-2.5 border border-transparent hover:border-brand-100 dark:hover:border-brand-800 hover:shadow-card transition-all">
      <Link to={`/urun/${product.slug}`} className="block">
        <div className="relative">
          <BlindBoxImage image={product.mainImage} alt={product.name} />
          <FavoriteButton productId={product.id} />
          <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5">
            {product.isNew && (
              <span className="px-2 py-0.5 rounded-full bg-brand-900 dark:bg-accent-600 text-white text-[10px] font-semibold uppercase tracking-wide">
                Yeni
              </span>
            )}
            {product.isDeluxe && (
              <span className="px-2 py-0.5 rounded-full bg-gradient-to-r from-amber-400 to-yellow-300 text-amber-950 text-[10px] font-semibold uppercase tracking-wide">
                Deluxe
              </span>
            )}
            {product.isLimited && (
              <span className="px-2 py-0.5 rounded-full bg-brand-800 text-white text-[10px] font-semibold uppercase tracking-wide">
                Limited
              </span>
            )}
          </div>
        </div>
        <BlindBoxCardInfo
          name={product.name}
          collectionName={product.collectionName}
          price={product.price}
          originalPrice={product.originalPrice}
          rating={product.rating}
          reviewCount={product.reviewCount}
          animalSupportContribution={product.animalSupportContribution}
        />
      </Link>

      <div className="mt-3 flex items-center gap-2">
        <Link
          to={`/urun/${product.slug}`}
          className="flex-1 text-center py-2 rounded-lg text-sm font-medium border border-brand-200 dark:border-brand-700 text-brand-800 dark:text-brand-100 hover:bg-brand-50 dark:hover:bg-brand-800 transition-colors"
        >
          Detayları Gör
        </Link>
        <button
          onClick={addToCart}
          className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
            added ? "bg-emerald-600 text-white" : "bg-brand-900 dark:bg-accent-600 hover:bg-brand-950 dark:hover:bg-accent-500 text-white"
          }`}
        >
          {added ? "Eklendi ✓" : "Sepete Ekle"}
        </button>
      </div>

      {onTryYourLuck && (
        <button
          onClick={(e) => onTryYourLuck(product, e.currentTarget)}
          className="hidden sm:block mt-2 w-full text-center py-2 rounded-lg text-xs font-semibold text-accent-700 dark:text-accent-400 hover:bg-accent-50 dark:hover:bg-accent-900/30 transition-colors"
        >
          ✨ Şansını Dene
        </button>
      )}
    </div>
  );
}

export default BlindBoxCard;
