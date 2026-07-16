function CartTitle({ itemCount }) {
  return (
    <h1 className="text-2xl font-bold text-gray-900 mb-6">
      Sepetim {itemCount > 0 && `(${itemCount} ürün)`}
    </h1>
  );
}

export default CartTitle;
