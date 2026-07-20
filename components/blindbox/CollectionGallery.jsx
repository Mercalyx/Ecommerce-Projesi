import FigureCard from "./FigureCard";

// Figures may carry their own `productSlug` (the mixed-collection Koleksiyonlar
// page) or share one passed in via props (a single product's detail page).
function CollectionGallery({ figures, productSlug, columns = "sm:grid-cols-3 lg:grid-cols-5" }) {
  return (
    <div className={`grid grid-cols-2 ${columns} gap-4`}>
      {figures.map((figure) => (
        <FigureCard key={figure.id} figure={figure} productSlug={figure.productSlug ?? productSlug} />
      ))}
    </div>
  );
}

export default CollectionGallery;
