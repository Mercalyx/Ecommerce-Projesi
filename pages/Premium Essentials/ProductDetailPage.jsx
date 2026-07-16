import { useContext, useState } from "react";
import { Link, useParams } from "react-router-dom";
import products from "../../data/products";
import { CartContext } from "../../App";
import ProductCards from "./Components/ProductCards";

function Stars({ rating }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-amber-500">
      <path d="M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6-5.9-3.3-5.9 3.3 1.3-6.6L2.5 9.4l6.6-.8L12 2.5z" />
    </svg>
  );
}

function ProductDetailPage() {
  const { id } = useParams();
  const product = products.find((p) => p.id === Number(id));
  const { cart, setCart, favorites, setFavorites } = useContext(CartContext);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  if (!product) {
    return (
      <main className="max-w-2xl mx-auto px-4 py-20 text-center">
        <h1 className="font-display text-2xl font-semibold text-brand-950 dark:text-white">Ürün bulunamadı</h1>
        <Link to="/premium-essentials" className="inline-block mt-6 text-brand-900 dark:text-brand-300 underline text-sm">
          Tüm ürünlere dön
        </Link>
      </main>
    );
  }

  const isFavorite = favorites.includes(product.id);
  const discountPct = product.oldPrice
    ? Math.round(100 - (product.price / product.oldPrice) * 100)
    : null;
  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

  function toggleFavorite() {
    setFavorites(
      isFavorite ? favorites.filter((fid) => fid !== product.id) : [...favorites, product.id]
    );
  }

  function addToCart() {
    const existing = cart.find((item) => item.id === product.id);
    if (existing) {
      setCart(
        cart.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + qty } : item
        )
      );
    } else {
      setCart([...cart, { ...product, qty }]);
    }
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  }

  return (
    <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <nav className="text-sm text-brand-500 dark:text-brand-400 mb-6">
        <Link to="/" className="hover:text-brand-800 dark:hover:text-white">Ana Sayfa</Link>
        <span className="mx-2">/</span>
        <Link to={`/premium-essentials?kategori=${encodeURIComponent(product.category)}`} className="hover:text-brand-800 dark:hover:text-white">
          {product.category}
        </Link>
        <span className="mx-2">/</span>
        <span className="text-brand-800 dark:text-brand-200">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="aspect-square rounded-2xl overflow-hidden bg-brand-50 dark:bg-brand-900">
          <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
        </div>

        <div>
          <p className="text-xs uppercase tracking-wide text-brand-400 dark:text-brand-500">{product.category}</p>
          <h1 className="font-display text-3xl font-semibold text-brand-950 dark:text-white mt-1">{product.name}</h1>

          <div className="flex items-center gap-2 mt-3">
            <div className="flex items-center gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Stars key={i} rating={product.rating} />
              ))}
            </div>
            <span className="text-sm text-brand-600 dark:text-brand-300">
              {product.rating} <span className="text-brand-400 dark:text-brand-500">({product.reviewCount} değerlendirme)</span>
            </span>
          </div>

          <div className="flex items-baseline gap-3 mt-5">
            <p className="text-3xl font-semibold text-brand-950 dark:text-white">{product.price.toLocaleString("tr-TR")} ₺</p>
            {product.oldPrice && (
              <>
                <p className="text-lg text-brand-400 dark:text-brand-500 line-through">{product.oldPrice.toLocaleString("tr-TR")} ₺</p>
                <span className="px-2 py-0.5 rounded-full bg-red-500 text-white text-xs font-semibold">
                  -%{discountPct}
                </span>
              </>
            )}
          </div>

          <p className="mt-5 text-sm text-brand-700 dark:text-brand-300 leading-relaxed">{product.description}</p>

          <ul className="mt-5 space-y-2">
            {product.features.map((f) => (
              <li key={f} className="flex items-start gap-2 text-sm text-brand-700 dark:text-brand-300">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mt-0.5 shrink-0 text-accent-600 dark:text-accent-400">
                  <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {f}
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3 mt-7">
            <div className="flex items-center gap-3 border border-brand-200 dark:border-brand-800 rounded-full px-3 py-2">
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="w-5 h-5 flex items-center justify-center text-brand-500 dark:text-brand-400 hover:text-brand-900 dark:hover:text-white"
                aria-label="Azalt"
              >
                −
              </button>
              <span className="text-sm w-4 text-center text-brand-900 dark:text-white">{qty}</span>
              <button
                onClick={() => setQty((q) => q + 1)}
                className="w-5 h-5 flex items-center justify-center text-brand-500 dark:text-brand-400 hover:text-brand-900 dark:hover:text-white"
                aria-label="Artır"
              >
                +
              </button>
            </div>

            <button
              onClick={addToCart}
              className={`flex-1 py-3 rounded-lg text-sm font-medium transition-colors ${
                added ? "bg-emerald-600 text-white" : "bg-brand-900 dark:bg-accent-600 hover:bg-brand-950 dark:hover:bg-accent-500 text-white"
              }`}
            >
              {added ? "Sepete Eklendi ✓" : "Sepete Ekle"}
            </button>

            <button
              onClick={toggleFavorite}
              aria-label="Favorilere ekle"
              className="w-11 h-11 shrink-0 rounded-full border border-brand-200 dark:border-brand-800 flex items-center justify-center hover:bg-brand-50 dark:hover:bg-brand-900"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill={isFavorite ? "currentColor" : "none"}
                stroke="currentColor"
                strokeWidth="1.8"
                className={isFavorite ? "text-red-500" : "text-brand-400 dark:text-brand-500"}
              >
                <path d="M12 20.5s-7.5-4.6-10-9.3C.5 7.8 2.4 4.5 6 4.5c2.1 0 3.6 1.2 4.5 2.6.9-1.4 2.4-2.6 4.5-2.6 3.6 0 5.5 3.3 4 6.7-2.5 4.7-10 9.3-10 9.3z" strokeLinejoin="round" />
              </svg>
            </button>
          </div>

          <div className="mt-10 border-t border-brand-100 dark:border-brand-900 pt-6">
            <h2 className="text-sm font-semibold text-brand-900 dark:text-white mb-3">Ürün Bilgileri</h2>
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
              {Object.entries(product.specs).map(([key, value]) => (
                <div key={key} className="flex justify-between sm:justify-start sm:gap-2 text-sm py-1.5 border-b border-brand-50 dark:border-brand-900 sm:border-0">
                  <dt className="text-brand-500 dark:text-brand-400">{key}</dt>
                  <dd className="text-brand-900 dark:text-brand-100 font-medium">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <div className="mt-16">
          <h2 className="font-display text-xl font-semibold text-brand-950 dark:text-white mb-6">Benzer Ürünler</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
            {related.map((p) => (
              <ProductCards key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </main>
  );
}

export default ProductDetailPage;
