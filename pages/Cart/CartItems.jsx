import CartItem from "./CartItem";

function CartItems({ items }) {
  if (items.length === 0) {
    return (
      <div className="lg:col-span-8 py-16 text-center text-brand-400 dark:text-brand-500">
        Sepetiniz boş.
      </div>
    );
  }

  return (
    <div className="lg:col-span-8 bg-white dark:bg-brand-900 rounded-xl border border-brand-100 dark:border-brand-800 px-4 sm:px-6 [&>*:last-child]:border-b-0">
      {items.map((item) => (
        <CartItem key={item.id} item={item} />
      ))}
    </div>
  );
}

export default CartItems;
