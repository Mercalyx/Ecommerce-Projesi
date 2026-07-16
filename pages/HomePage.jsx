import { Link } from "react-router-dom";
import products from "../data/products";

const categoryPreview = [
  {
    label: "Elektronik",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80",
  },
  {
    label: "Aksesuar",
    image: "https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=600&q=80",
  },
  {
    label: "Ev & Yaşam",
    image: "https://images.unsplash.com/photo-1616627561950-9f746e330187?auto=format&fit=crop&w=600&q=80",
  },
  {
    label: "Giyim",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80",
  },
];

const features = [
  {
    title: "Hızlı Teslimat",
    desc: "Siparişiniz 2-4 iş günü içinde kargoya verilir, 250 ₺ üzeri kargo her zaman bedava.",
    icon: (
      <path d="M3 4h2l2.4 12.4a2 2 0 0 0 2 1.6h7.6a2 2 0 0 0 2-1.6L21 8H6" strokeLinecap="round" strokeLinejoin="round" />
    ),
  },
  {
    title: "Güvenli Alışveriş",
    desc: "256-bit SSL korumalı ödeme altyapısı ile bilgileriniz her zaman güvende kalır.",
    icon: <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" strokeLinecap="round" strokeLinejoin="round" />,
  },
  {
    title: "Kolay İade",
    desc: "14 gün içinde koşulsuz iade hakkı — sorgusuz, sualsiz, tam ücret iadesi.",
    icon: (
      <path d="M4 4v6h6M20 20v-6h-6M5.6 15a7 7 0 0 0 12.3 2.4M18.4 9A7 7 0 0 0 6.1 6.6" strokeLinecap="round" strokeLinejoin="round" />
    ),
  },
];

const testimonials = [
  {
    quote: "Sipariş verdiğim ertesi gün elimdeydi, kalite beklediğimin çok üzerindeydi. Artık başka yerden bakmıyorum.",
    name: "Elif Yıldız",
    role: "İstanbul",
  },
  {
    quote: "İade sürecini bir kez denemek zorunda kaldım, hiç uğraştırmadı. Güven veren nadir mağazalardan.",
    name: "Kerem Aydın",
    role: "Ankara",
  },
  {
    quote: "Ürün açıklamaları gerçekten doğru — elime geçen ürün fotoğraftakiyle birebir aynıydı.",
    name: "Naz Demir",
    role: "İzmir",
  },
];

function HomePage() {
  const featured = [...products].sort((a, b) => b.rating - a.rating).slice(0, 4);

  return (
    <main>
      {/* Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20 lg:pt-24 lg:pb-28 grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-16 items-center">
        <div>
          <div className="inline-flex items-center gap-2 bg-accent-50 dark:bg-accent-800/30 text-accent-700 dark:text-accent-300 px-3.5 py-1.5 rounded-full text-xs font-semibold mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-600 dark:bg-accent-400" />
            Yeni sezon koleksiyonu geldi
          </div>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-[3.4rem] font-extrabold leading-[1.05] tracking-tight text-brand-950 dark:text-white max-w-xl">
            Günlük hayatın temel parçaları, tek yerde.
          </h1>
          <p className="mt-6 text-lg text-brand-600 dark:text-brand-300 leading-relaxed max-w-md">
            Özenle seçilmiş elektronik, aksesuar, giyim ve yaşam ürünleriyle
            tarzınızı tamamlayın — hızlı kargo, kolay iade.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Link
              to="/premium-essentials"
              className="inline-block px-7 py-3.5 bg-accent-600 hover:bg-accent-700 transition-colors text-white rounded-lg text-sm font-semibold"
            >
              Ürünleri Keşfet
            </Link>
            <Link
              to="/kayit"
              className="inline-block px-7 py-3.5 bg-white dark:bg-transparent text-brand-900 dark:text-white border border-brand-200 dark:border-brand-700 rounded-lg text-sm font-semibold hover:bg-brand-50 dark:hover:bg-brand-900 transition-colors"
            >
              Üye Ol
            </Link>
          </div>
          <p className="text-xs text-brand-400 dark:text-brand-500 mt-5">Kart bilgisi gerekmez · 250 ₺ üzeri kargo bedava</p>
        </div>

        <div className="relative">
          <div className="absolute -inset-6 bg-[radial-gradient(circle_at_30%_20%,theme(colors.accent.100),transparent_60%)] dark:bg-[radial-gradient(circle_at_30%_20%,theme(colors.accent.900),transparent_60%)] -z-10" />
          <div className="rounded-2xl overflow-hidden shadow-card-hover border border-brand-100 dark:border-brand-800 aspect-[4/3]">
            <img
              src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=75"
              alt="Premium Essentials koleksiyonu"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Özellik kartları */}
      <section className="bg-brand-50 dark:bg-brand-900/40 border-y border-brand-100 dark:border-brand-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          <div className="max-w-xl mx-auto text-center mb-12">
            <h2 className="font-display text-3xl font-extrabold tracking-tight text-brand-950 dark:text-white">Neden Premium Essentials?</h2>
            <p className="mt-3 text-brand-600 dark:text-brand-300">Alışverişi hızlı, güvenli ve dertsiz hale getiren üç şey.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {features.map((f) => (
              <div key={f.title} className="bg-white dark:bg-brand-900 border border-brand-100 dark:border-brand-800 rounded-2xl p-7">
                <div className="w-11 h-11 rounded-xl bg-accent-50 dark:bg-accent-800/40 flex items-center justify-center mb-5">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="text-accent-600 dark:text-accent-400">
                    {f.icon}
                  </svg>
                </div>
                <h3 className="font-semibold text-brand-950 dark:text-white mb-2">{f.title}</h3>
                <p className="text-sm text-brand-600 dark:text-brand-300 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Kategoriler */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="flex items-end justify-between mb-8">
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-brand-950 dark:text-white">Kategorilere Göz At</h2>
          <Link to="/premium-essentials" className="text-sm font-medium text-accent-600 dark:text-accent-400 hover:text-accent-700 dark:hover:text-accent-300">
            Tümünü gör →
          </Link>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {categoryPreview.map((c) => (
            <Link
              key={c.label}
              to={`/premium-essentials?kategori=${encodeURIComponent(c.label)}`}
              className="group relative aspect-[4/5] rounded-2xl overflow-hidden bg-brand-100 dark:bg-brand-900"
            >
              <img
                src={c.image}
                alt={c.label}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-transparent" />
              <span className="absolute bottom-4 left-4 text-white font-medium">{c.label}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Öne çıkan ürünler */}
      <section className="bg-brand-50 dark:bg-brand-900/40 border-y border-brand-100 dark:border-brand-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-brand-950 dark:text-white">En Çok Beğenilenler</h2>
              <p className="text-sm text-brand-600 dark:text-brand-300 mt-1.5">Müşterilerimizin favorileri.</p>
            </div>
            <Link to="/premium-essentials" className="text-sm font-medium text-accent-600 dark:text-accent-400 hover:text-accent-700 dark:hover:text-accent-300">
              Tümünü gör →
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
            {featured.map((p) => (
              <Link key={p.id} to={`/urun/${p.id}`} className="group block">
                <div className="aspect-square rounded-xl overflow-hidden bg-white dark:bg-brand-900 border border-brand-100 dark:border-brand-800">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <p className="mt-3 text-sm font-medium text-brand-900 dark:text-white line-clamp-1">{p.name}</p>
                <p className="text-sm text-brand-600 dark:text-brand-300">{p.price.toLocaleString("tr-TR")} ₺</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Müşteri yorumları — her zaman koyu bant */}
      <section className="bg-brand-900 dark:bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          <h2 className="text-center font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-white mb-12">
            Müşterilerimiz ne diyor
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div key={t.name} className="bg-brand-800 dark:bg-brand-900 border border-brand-700 dark:border-brand-800 rounded-2xl p-7">
                <p className="text-brand-100 text-[15px] leading-relaxed mb-6">"{t.quote}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-accent-600 flex items-center justify-center text-white text-xs font-semibold shrink-0">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-white text-sm font-semibold">{t.name}</p>
                    <p className="text-brand-400 text-xs">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Üyelik çağrısı — mavi banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="bg-accent-600 rounded-3xl px-8 py-14 sm:px-16 sm:py-16 flex flex-col sm:flex-row items-center justify-between gap-8 text-center sm:text-left">
          <div>
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-white mb-2">Ailemize katılın</h2>
            <p className="text-accent-100 max-w-md">
              Üye olun; favorilerinizi kaydedin, siparişlerinizi takip edin ve özel kampanyalardan ilk siz haberdar olun.
            </p>
          </div>
          <Link
            to="/kayit"
            className="shrink-0 inline-block px-7 py-3.5 bg-white hover:bg-accent-50 transition-colors text-accent-700 rounded-lg text-sm font-bold"
          >
            Hemen Üye Ol
          </Link>
        </div>
      </section>
    </main>
  );
}

export default HomePage;
