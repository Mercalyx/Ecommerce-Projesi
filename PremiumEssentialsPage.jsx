import { useState } from "react";
import products from "../../data/products";
import CategoryHeader from "./Components/CategoryHeader";
import CategoryListing from "./Components/CategoryListing";
import ProductGrid from "./Components/ProductGrid";

function PremiumEssentialsPage() {
  const [activeCategory, setActiveCategory] = useState("Tümü");

  const filteredProducts =
    activeCategory === "Tümü"
      ? products
      : products.filter((p) => p.category === activeCategory);

  return (
    <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <CategoryHeader />
      <CategoryListing active={activeCategory} onSelect={setActiveCategory} />
      <ProductGrid products={filteredProducts} />
    </main>
  );
}

export default PremiumEssentialsPage;
