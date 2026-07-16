import CartItem from "./CartItem";

function CartItems({ items }) {
  if (items.length === 0) {
    return (
      <div className="lg:col-span-8 py-16 text-center text-gray-400">
        Sepetiniz boş.
      </div>
    );
  }

  return (
    <div className="lg:col-span-8">
      {items.map((item) => (
        <CartItem key={item.id} item={item} />
      ))}
    </div>
  );
}

export default CartItems;
