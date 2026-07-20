import { useContext } from "react";
import { CartContext } from "../../App";

function CartItem({ item }) {
  const { cart, setCart } = useContext(CartContext);

  function changeQty(delta) {
    setCart(
      cart
        .map((i) => (i.id === item.id ? { ...i, qty: i.qty + delta } : i))
        .filter((i) => i.qty > 0) // adet 0'a inerse satırı otomatik kaldır
    );
  }

  function removeItem() {
    setCart(cart.filter((i) => i.id !== item.id));
  }

  return (
    <div className="flex items-center gap-4 py-4 border-b border-brand-100 dark:border-brand-800">
      <div className="w-16 h-16 sm:w-20 sm:h-20 bg-brand-50 dark:bg-brand-800 rounded-xl overflow-hidden shrink-0">
        <img src={item.mainImage} alt={item.name} className="w-full h-full object-contain p-2" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs uppercase tracking-wide text-brand-400 dark:text-brand-500">{item.collectionName}</p>
        <h3 className="text-sm font-medium text-brand-900 dark:text-white line-clamp-1">{item.name}</h3>
        <p className="text-sm text-brand-950 dark:text-brand-200 mt-1">
          {item.price.toLocaleString("tr-TR")} ₺
        </p>
      </div>
      <div className="flex items-center gap-3 border border-brand-200 dark:border-brand-800 rounded-full px-3 py-1">
        <button
          onClick={() => changeQty(-1)}
          className="w-5 h-5 flex items-center justify-center text-brand-500 dark:text-brand-400 hover:text-brand-900 dark:hover:text-white"
          aria-label="Azalt"
        >
          −
        </button>
        <span className="text-sm w-4 text-center text-brand-900 dark:text-white">{item.qty}</span>
        <button
          onClick={() => changeQty(1)}
          className="w-5 h-5 flex items-center justify-center text-brand-500 dark:text-brand-400 hover:text-brand-900 dark:hover:text-white"
          aria-label="Artır"
        >
          +
        </button>
      </div>
      <button onClick={removeItem} className="text-brand-400 dark:text-brand-500 hover:text-brand-800 dark:hover:text-white text-sm shrink-0">
        Kaldır
      </button>
    </div>
  );
}

export default CartItem;
