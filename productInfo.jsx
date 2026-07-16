function ProductInfo({ name, category, price }) {
  return (
    <div className="mt-3">
      <p className="text-xs uppercase tracking-wide text-gray-400">{category}</p>
      <h3 className="text-sm font-medium text-gray-800">{name}</h3>
      <p className="text-sm font-semibold text-gray-900 mt-1">
        {price.toLocaleString("tr-TR")} ₺
      </p>
    </div>
  );
}

export default ProductInfo;
