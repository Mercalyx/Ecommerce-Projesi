function CartTitle({ itemCount }) {
  return (
    <h1 className="font-display text-2xl sm:text-3xl font-semibold text-brand-950 dark:text-white mb-6">
      Sepetim {itemCount > 0 && `(${itemCount} ürün)`}
    </h1>
  );
}

export default CartTitle;
