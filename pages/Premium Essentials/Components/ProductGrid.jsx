import ProductCards from "./ProductCards";

function ProductGrid({ products }) {
  if (products.length === 0) {
    return (
      <div className="py-20 text-center">
        <p className="text-sm text-brand-400 dark:text-brand-500">Bu kategoride ürün bulunamadı.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
      {products.map((product) => (
        <ProductCards key={product.id} product={product} />
      ))}
    </div>
  );
}

export default ProductGrid;
