import ProductCards from "./ProductCards";

function ProductGrid({ products }) {
  if (products.length === 0) {
    return <p className="text-sm text-gray-400">Bu kategoride ürün bulunamadı.</p>;
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCards key={product.id} product={product} />
      ))}
    </div>
  );
}

export default ProductGrid;
