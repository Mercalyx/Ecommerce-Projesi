import products from "../../../data/products";
import CategoryItem from "./CategoryItem";

function CategoryListing({ active, onSelect }) {
  const categories = ["Tümü", ...new Set(products.map((p) => p.category))];

  return (
    <div className="flex flex-wrap gap-2 mb-8">
      {categories.map((category) => (
        <CategoryItem
          key={category}
          label={category}
          isActive={category === active}
          onClick={() => onSelect(category)}
        />
      ))}
    </div>
  );
}

export default CategoryListing;
