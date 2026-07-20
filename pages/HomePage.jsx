import { Link } from "react-router-dom";
import products from "../data/products";
import TryYourLuckPromo from "../components/blindbox/TryYourLuckPromo";
import HowBlindBoxWorks from "../components/blindbox/HowBlindBoxWorks";
import AnimalSupportBanner from "../components/blindbox/AnimalSupportBanner";
import { useHashScroll } from "../hooks/useHashScroll";

function scrollToPromo() {
  document.getElementById("sansini-dene-promo")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function HomePage() {
  useHashScroll();

  return (
    <main>
      {/* Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-14 lg:pt-24 lg:pb-20 grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-16 items-center">
        <div>
          <div className="inline-flex items-center gap-2 bg-accent-50 dark:bg-accent-800/30 text-accent-700 dark:text-accent-300 px-3.5 py-1.5 rounded-full text-xs font-semibold mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-600 dark:bg-accent-400" />
            4 koleksiyon · 20 sürpriz figür
          </div>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-[3.4rem] font-extrabold leading-[1.05] tracking-tight text-brand-950 dark:text-white max-w-xl">
            Her Kutuda Yeni Bir Dünya
          </h1>
          <p className="mt-6 text-lg text-brand-600 dark:text-brand-300 leading-relaxed max-w-md">
            Dört eşsiz koleksiyon, yirmi sürpriz karakter ve kutunun içinden çıkacak tek bir hikâye.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Link
              to="/blind-boxlar"
              className="inline-block px-7 py-3.5 bg-accent-600 hover:bg-accent-700 transition-colors text-white rounded-lg text-sm font-semibold"
            >
              Blind Box'ları Keşfet
            </Link>
            <button
              onClick={scrollToPromo}
              className="inline-block px-7 py-3.5 bg-white dark:bg-transparent text-brand-900 dark:text-white border border-brand-200 dark:border-brand-700 rounded-lg text-sm font-semibold hover:bg-brand-50 dark:hover:bg-brand-900 transition-colors"
            >
              ✨ Şansını Dene
            </button>
          </div>
          <p className="text-xs text-brand-400 dark:text-brand-500 mt-5">
            Her kutu, koleksiyondaki 5 figürden birini içerir · Şansını Dene ile önce eğlenceli bir önizleme yaşa
          </p>
        </div>

        <div className="relative">
          <div className="absolute -inset-6 bg-[radial-gradient(circle_at_30%_20%,theme(colors.accent.100),transparent_60%)] dark:bg-[radial-gradient(circle_at_30%_20%,theme(colors.accent.900),transparent_60%)] -z-10" />
          <div className="grid grid-cols-2 gap-4" role="list" aria-label="Öne çıkan koleksiyonlar">
            {products.map((product) => (
              <Link
                key={product.id}
                to={`/urun/${product.slug}`}
                role="listitem"
                aria-label={`${product.collectionName} koleksiyonunu incele`}
                className="group relative rounded-2xl overflow-hidden shadow-card-hover border border-brand-100 dark:border-brand-800 aspect-square bg-white dark:bg-brand-900 hover:-translate-y-0.5 transition-transform"
              >
                <img src={product.mainImage} alt={product.name} loading="lazy" className="w-full h-full object-contain p-4 pb-9 group-hover:scale-[1.03] transition-transform" />
                <span className="absolute inset-x-3 bottom-2.5 text-center text-[11px] sm:text-xs font-semibold text-brand-800 dark:text-brand-100 leading-tight">
                  {product.collectionName}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Şansını Dene tanıtım alanı */}
      <TryYourLuckPromo id="sansini-dene-promo" />

      {/* Blind Box Nasıl Çalışır? */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <HowBlindBoxWorks id="nasil-calisir" />
      </section>

      {/* Patilere Destek */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 lg:pb-20">
        <AnimalSupportBanner />
      </section>
    </main>
  );
}

export default HomePage;
