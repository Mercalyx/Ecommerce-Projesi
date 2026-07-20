import { Link } from "react-router-dom";
import products from "../data/products";
import AnimalSupportBanner from "../components/blindbox/AnimalSupportBanner";

function AnimalSupportPage() {
  return (
    <main className="max-w-5xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-10 text-center">
        <h1 className="font-display text-3xl font-semibold text-brand-950 dark:text-white">Patilere Destek</h1>
        <p className="mt-2 text-sm text-brand-600 dark:text-brand-300 max-w-xl mx-auto">
          Kubishop'ta satın aldığın her blind box, sokak hayvanlarının mama, tedavi ve barınma ihtiyaçları için sabit
          bir bağışı da beraberinde getirir — sen ekstra hiçbir ücret ödemezsin.
        </p>
      </div>

      <AnimalSupportBanner showLink={false} />

      <div className="mt-12">
        <h2 className="text-lg font-semibold text-brand-950 dark:text-white mb-4">Koleksiyona Göre Bağış Tutarları</h2>
        <div className="bg-white dark:bg-brand-900 border border-brand-100 dark:border-brand-800 rounded-xl divide-y divide-brand-100 dark:divide-brand-800">
          {products.map((product) => (
            <Link
              key={product.id}
              to={`/urun/${product.slug}`}
              className="flex items-center justify-between gap-4 p-4 sm:p-5 hover:bg-brand-50 dark:hover:bg-brand-800/60 transition-colors"
            >
              <div className="flex items-center gap-4 min-w-0">
                <div className="w-12 h-12 rounded-lg overflow-hidden bg-brand-50 dark:bg-brand-800 shrink-0">
                  <img src={product.mainImage} alt={product.name} className="w-full h-full object-contain p-1.5" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-brand-900 dark:text-white line-clamp-1">{product.collectionName}</p>
                  <p className="text-xs text-brand-500 dark:text-brand-400">{product.price.toLocaleString("tr-TR")} ₺</p>
                </div>
              </div>
              <p className="text-sm font-semibold text-accent-700 dark:text-accent-400 shrink-0">
                🐾 {product.animalSupportContribution} ₺
              </p>
            </Link>
          ))}
        </div>
      </div>

      <div className="mt-12 space-y-4 text-sm text-brand-600 dark:text-brand-300 leading-relaxed">
        <h2 className="text-lg font-semibold text-brand-950 dark:text-white">Bağış Programı Nasıl İşliyor?</h2>
        <p>
          Her koleksiyonun satış fiyatına, o koleksiyona özel sabit bir hayvan destek payı dahildir. Bu tutar sipariş
          toplamına ekstra bir ücret olarak yansımaz — Kubishop tarafından karşılanır ve doğrudan sokak hayvanlarını
          besleyen, tedavi eden ve barındıran yerel hayvan dostu derneklere aktarılır.
        </p>
        <p>
          Sepet sayfasında, siparişindeki ürünlere göre hesaplanan toplam bağış tutarını görebilirsin. Alışverişini
          tamamladığında bu tutar otomatik olarak bağış havuzuna eklenir.
        </p>
      </div>
    </main>
  );
}

export default AnimalSupportPage;
