import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../../../App";
import ProductImage from "./ProductImage";
import ProductInfo from "./productInfo";
import FavoriteButton from "./FavoriteButton";

function ProductCards({ product }) {
  const { cart, setCart } = useContext(CartContext);
  const [added, setAdded] = useState(false);

  const discountPct = product.oldPrice
    ? Math.round(100 - (product.price / product.oldPrice) * 100)
    : null;

  function addToCart() {
    const existing = cart.find((item) => item.id === product.id);
    if (existing) {
      // Ürün zaten sepette varsa yeni satır açmak yerine adedini artır
      setCart(
        cart.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        )
      );
    } else {
      setCart([...cart, { ...product, qty: 1 }]);
    }
    setAdded(true);
    setTimeout(() => setAdded(false), 1000);
  }

  return (
    <div className="group flex flex-col bg-white dark:bg-brand-900 rounded-xl p-2.5 border border-transparent hover:border-brand-100 dark:hover:border-brand-800 hover:shadow-card transition-all">
      <Link to={`/urun/${product.id}`} className="block">
        <div className="relative">
          <ProductImage image={product.image} name={product.name} />
          <FavoriteButton productId={product.id} />
          <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5">
            {product.isNew && (
              <span className="px-2 py-0.5 rounded-full bg-brand-900 dark:bg-accent-600 text-white text-[10px] font-semibold uppercase tracking-wide">
                Yeni
              </span>
            )}
            {discountPct && (
              <span className="px-2 py-0.5 rounded-full bg-red-500 text-white text-[10px] font-semibold uppercase tracking-wide">
                -%{discountPct}
              </span>
            )}
          </div>
        </div>
        <ProductInfo
          name={product.name}
          category={product.category}
          price={product.price}
          oldPrice={product.oldPrice}
          rating={product.rating}
          reviewCount={product.reviewCount}
        />
      </Link>
      <button
        onClick={addToCart}
        className={`mt-3 w-full py-2 rounded-lg text-sm font-medium transition-colors ${
          added ? "bg-emerald-600 text-white" : "bg-brand-900 dark:bg-accent-600 hover:bg-brand-950 dark:hover:bg-accent-500 text-white"
        }`}
      >
        {added ? "Eklendi ✓" : "Sepete Ekle"}
      </button>
    </div>
  );
}

export default ProductCards;
