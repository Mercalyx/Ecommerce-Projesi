function ProductImage({ image, name }) {
  return (
    <div className="relative w-full aspect-square bg-gray-100 rounded-lg flex items-center justify-center text-5xl">
      <span role="img" aria-label={name}>
        {image}
      </span>
    </div>
  );
}

export default ProductImage;
