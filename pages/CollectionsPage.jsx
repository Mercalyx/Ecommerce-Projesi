import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import products from "../data/products";
import CollectionFilterList from "../components/blindbox/CollectionFilterList";
import CollectionGallery from "../components/blindbox/CollectionGallery";

const allFigures = products.flatMap((product) =>
  product.figures.map((figure) => ({ ...figure, productSlug: product.slug, collectionName: product.collectionName }))
);
const collectionOptions = ["Tümü", ...products.map((p) => p.collectionName)];

// Read-only catalog of all 20 figures across the four collections — figures
// are never purchasable on their own, so this page has no cart/favorite actions.
function CollectionsPage() {
  const [searchParams] = useSearchParams();
  const urlCollection = searchParams.get("koleksiyon");
  const [activeCollection, setActiveCollection] = useState(urlCollection || "Tümü");

  useEffect(() => {
    if (urlCollection) setActiveCollection(urlCollection);
  }, [urlCollection]);

  const filtered = allFigures.filter((figure) => activeCollection === "Tümü" || figure.collectionName === activeCollection);

  return (
    <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6">
        <h1 className="font-display text-2xl sm:text-3xl font-semibold text-brand-950 dark:text-white">Koleksiyonlar</h1>
        <p className="text-sm text-brand-600 dark:text-brand-300 mt-1.5">
          Dört blind box'ın içinden çıkabilecek toplam 20 figürü keşfet. Figürler tek başına satılmaz — hangisinin
          çıkacağı yalnızca kutuyu açtığında belli olur.
        </p>
      </div>

      <CollectionFilterList options={collectionOptions} active={activeCollection} onSelect={setActiveCollection} />

      {filtered.length === 0 ? (
        <div className="py-20 text-center">
          <p className="text-sm text-brand-400 dark:text-brand-500">Bu koleksiyonda figür bulunamadı.</p>
        </div>
      ) : (
        <CollectionGallery figures={filtered} />
      )}
    </main>
  );
}

export default CollectionsPage;
