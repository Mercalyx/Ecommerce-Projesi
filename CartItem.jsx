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
    <div className="flex items-center gap-4 py-4 border-b border-gray-100">
      <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center text-2xl">
        {item.image}
      </div>
      <div className="flex-1">
        <p className="text-xs uppercase text-gray-400">{item.category}</p>
        <h3 className="text-sm font-medium text-gray-800">{item.name}</h3>
        <p className="text-sm text-gray-900 mt-1">
          {item.price.toLocaleString("tr-TR")} ₺
        </p>
      </div>
      <div className="flex items-center gap-3 border border-gray-200 rounded-full px-3 py-1">
        <button onClick={() => changeQty(-1)}>-</button>
        <span className="text-sm">{item.qty}</span>
        <button onClick={() => changeQty(1)}>+</button>
      </div>
      <button onClick={removeItem} className="text-gray-400 hover:text-gray-700 text-sm">
        Kaldır
      </button>
    </div>
  );
}

export default CartItem;
