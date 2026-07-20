import { useContext, useState } from "react";
import { Link, useParams } from "react-router-dom";
import products from "../../data/products";
import { CartContext } from "../../App";
import BlindBoxCard from "../../components/blindbox/BlindBoxCard";
import CollectionGallery from "../../components/blindbox/CollectionGallery";
import HowBlindBoxWorks from "../../components/blindbox/HowBlindBoxWorks";
import AnimalSupportBanner from "../../components/blindbox/AnimalSupportBanner";
import BlindBoxDisclaimer from "../../components/blindbox/BlindBoxDisclaimer";
import BlindBoxOpeningModal from "../../components/blindbox/opening/BlindBoxOpeningModal";
import { useBlindBoxOpening } from "../../hooks/useBlindBoxOpening";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";

function Stars() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-amber-500">
      <path d="M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6-5.9-3.3-5.9 3.3 1.3-6.6L2.5 9.4l6.6-.8L12 2.5z" />
    </svg>
  );
}

function BlindBoxDetailPage() {
  const { slug } = useParams();
  const product = products.find((p) => p.slug === slug);
  const { cart, setCart, favorites, setFavorites } = useContext(CartContext);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const reducedMotion = usePrefersReducedMotion();
  const opening = useBlindBoxOpening({ reducedMotion });

  if (!product) {
    return (
      <main className="max-w-2xl mx-auto px-4 py-20 text-center">
        <h1 className="font-display text-2xl font-semibold text-brand-950 dark:text-white">Ürün bulunamadı</h1>
        <Link to="/blind-boxlar" className="inline-block mt-6 text-brand-900 dark:text-brand-300 underline text-sm">
          Tüm blind box'lara dön
        </Link>
      </main>
    );
  }

  const isFavorite = favorites.includes(product.id);
  const related = products.filter((p) => p.id !== product.id).slice(0, 3);

  function toggleFavorite() {
    setFavorites(isFavorite ? favorites.filter((fid) => fid !== product.id) : [...favorites, product.id]);
  }

  function addToCart() {
    const existing = cart.find((item) => item.id === product.id);
    if (existing) {
      setCart(cart.map((item) => (item.id === product.id ? { ...item, qty: item.qty + qty } : item)));
    } else {
      setCart([...cart, { ...product, qty }]);
    }
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  }

  function handleCloseModal() {
    opening.reset();
    document.getElementById("try-your-luck-button")?.focus();
  }

  return (
    <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <nav className="text-sm text-brand-500 dark:text-brand-400 mb-6">
        <Link to="/" className="hover:text-brand-800 dark:hover:text-white">
          Ana Sayfa
        </Link>
        <span className="mx-2">/</span>
        <Link to="/blind-boxlar" className="hover:text-brand-800 dark:hover:text-white">
          Blind Box'lar
        </Link>
        <span className="mx-2">/</span>
        <span className="text-brand-800 dark:text-brand-200">{product.collectionName}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div>
          <div className="aspect-square rounded-2xl overflow-hidden bg-brand-50 dark:bg-brand-900">
            <img src={product.mainImage} alt={product.name} className="w-full h-full object-contain p-8" />
          </div>
          {product.gallery.length > 1 && (
            <div className="grid grid-cols-4 gap-3 mt-3">
              {product.gallery.map((img, i) => (
                <div key={i} className="aspect-square rounded-lg overflow-hidden bg-brand-50 dark:bg-brand-900 p-2">
                  <img src={img} alt={`${product.name} görsel ${i + 1}`} loading="lazy" className="w-full h-full object-contain" />
                </div>
              ))}
            </div>
          )}
        </div>

        <div>
          <p className="text-xs uppercase tracking-wide text-brand-400 dark:text-brand-500">{product.collectionName}</p>
          <h1 className="font-display text-3xl font-semibold text-brand-950 dark:text-white mt-1">{product.name}</h1>
          <p className="mt-1 text-sm italic text-brand-500 dark:text-brand-400">{product.slogan}</p>

          <div className="flex items-center gap-2 mt-3">
            <div className="flex items-center gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Stars key={i} />
              ))}
            </div>
            <span className="text-sm text-brand-600 dark:text-brand-300">
              {product.rating} <span className="text-brand-400 dark:text-brand-500">({product.reviewCount} değerlendirme)</span>
            </span>
          </div>

          <div className="flex items-baseline gap-3 mt-5">
            <p className="text-3xl font-semibold text-brand-950 dark:text-white">{product.price.toLocaleString("tr-TR")} ₺</p>
            {product.originalPrice && (
              <p className="text-lg text-brand-400 dark:text-brand-500 line-through">
                {product.originalPrice.toLocaleString("tr-TR")} ₺
              </p>
            )}
          </div>

          <p className="mt-5 text-sm text-brand-700 dark:text-brand-300 leading-relaxed">{product.description}</p>

          {product.badges.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {product.badges.map((badge) => (
                <span
                  key={badge}
                  className="px-2.5 py-1 rounded-full bg-gradient-to-r from-amber-400 to-yellow-300 text-amber-950 text-[11px] font-semibold uppercase tracking-wide"
                >
                  {badge}
                </span>
              ))}
            </div>
          )}

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
              aria-label={isFavorite ? "Favorilerden çıkar" : "Favorilere ekle"}
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
                <path
                  d="M12 20.5s-7.5-4.6-10-9.3C.5 7.8 2.4 4.5 6 4.5c2.1 0 3.6 1.2 4.5 2.6.9-1.4 2.4-2.6 4.5-2.6 3.6 0 5.5 3.3 4 6.7-2.5 4.7-10 9.3-10 9.3z"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>

          <button
            id="try-your-luck-button"
            onClick={() => opening.start(product.figures)}
            className="mt-4 w-full py-3.5 rounded-lg text-sm font-bold text-white bg-gradient-to-r from-accent-600 to-accent-500 hover:from-accent-700 hover:to-accent-600 transition-colors shadow-card"
          >
            ✨ Şansını Dene
          </button>
          <p className="mt-2 text-xs text-center text-brand-400 dark:text-brand-500">
            Kutuyu sanal olarak aç ve hangi karakterin çıkacağını keşfet.
          </p>

          {product.animalSupportContribution > 0 && (
            <p className="mt-4 text-xs text-accent-700 dark:text-accent-400 text-center sm:text-left">
              🐾 Bu üründen {product.animalSupportContribution} ₺ patilere destek olarak bağışlanır.
            </p>
          )}
        </div>
      </div>

      <div className="mt-16">
        <h2 className="font-display text-xl font-semibold text-brand-950 dark:text-white mb-2">İçinden Çıkabilecek Figürler</h2>
        <p className="text-sm text-brand-600 dark:text-brand-300 mb-6">Kutunun içinden bu beş figürden biri rastgele çıkar.</p>
        <CollectionGallery figures={product.figures} />
      </div>

      <div className="mt-12 bg-brand-50/70 dark:bg-brand-900/60 border border-brand-100 dark:border-brand-800 rounded-xl p-6">
        <h2 className="text-sm font-semibold text-brand-900 dark:text-white mb-3">Nadirlik ve Çıkma İhtimalleri</h2>
        <ul className="space-y-1.5">
          {product.rarityInformation.map((line) => (
            <li key={line} className="text-sm text-brand-600 dark:text-brand-300 flex items-start gap-2">
              <span className="text-accent-600 dark:text-accent-400 mt-0.5">•</span>
              {line}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-16">
        <HowBlindBoxWorks />
      </div>

      <div className="mt-12 border-t border-brand-100 dark:border-brand-900 pt-6">
        <h2 className="text-sm font-semibold text-brand-900 dark:text-white mb-3">Malzeme ve Boyut Bilgileri</h2>
        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
          {[
            ["Malzeme", product.materialInfo.material],
            ["Figür Boyutu", product.materialInfo.figureHeight],
            ["Kutu Boyutu", product.materialInfo.boxSize],
            ["Ambalaj", product.materialInfo.packagingNote],
          ].map(([label, value]) => (
            <div key={label} className="flex justify-between sm:justify-start sm:gap-2 text-sm py-1.5 border-b border-brand-50 dark:border-brand-900 sm:border-0">
              <dt className="text-brand-500 dark:text-brand-400">{label}</dt>
              <dd className="text-brand-900 dark:text-brand-100 font-medium text-right sm:text-left">{value}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="mt-12">
        <AnimalSupportBanner />
      </div>

      <BlindBoxDisclaimer />

      {related.length > 0 && (
        <div className="mt-16">
          <h2 className="font-display text-xl font-semibold text-brand-950 dark:text-white mb-6">Benzer Koleksiyonlar</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6">
            {related.map((p) => (
              <BlindBoxCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}

      {opening.phase !== "idle" && (
        <BlindBoxOpeningModal
          product={product}
          phase={opening.phase}
          selectedFigure={opening.selectedFigure}
          reducedMotion={reducedMotion}
          onRetry={() => opening.start(product.figures)}
          onClose={handleCloseModal}
        />
      )}
    </main>
  );
}

export default BlindBoxDetailPage;
