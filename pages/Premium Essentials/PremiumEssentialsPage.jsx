import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import products from "../../data/products";
import CategoryHeader from "./Components/CategoryHeader";
import CategoryListing from "./Components/CategoryListing";
import ProductGrid from "./Components/ProductGrid";

function PremiumEssentialsPage() {
  const [searchParams] = useSearchParams();
  const urlCategory = searchParams.get("kategori");
  const query = (searchParams.get("q") || "").trim().toLowerCase();

  const [activeCategory, setActiveCategory] = useState(urlCategory || "Tümü");

  useEffect(() => {
    if (urlCategory) setActiveCategory(urlCategory);
  }, [urlCategory]);

  const filteredProducts = products
    .filter((p) => activeCategory === "Tümü" || p.category === activeCategory)
    .filter((p) => !query || p.name.toLowerCase().includes(query));

  return (
    <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <CategoryHeader query={query} resultCount={filteredProducts.length} />
      <CategoryListing active={activeCategory} onSelect={setActiveCategory} />
      <ProductGrid products={filteredProducts} />
    </main>
  );
}

export default PremiumEssentialsPage;
