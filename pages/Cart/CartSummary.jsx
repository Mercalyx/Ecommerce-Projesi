import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../App";

function CartSummary({ items }) {
  const { setCart, orders, setOrders } = useContext(CartContext);
  const navigate = useNavigate();
  const subtotal = items.reduce((sum, item) => sum + item.price * item.qty, 0);
  const shipping = subtotal === 0 || subtotal >= 250 ? 0 : 49.9;
  const total = subtotal + shipping;

  function checkout() {
    const order = {
      id: orders.length + 1,
      date: new Date().toLocaleDateString("tr-TR"),
      items,
      total,
    };
    setOrders([order, ...orders]);
    setCart([]);
    alert("Siparişiniz alındı! (Bu bir demo, gerçek ödeme yapılmadı)");
    navigate("/hesabim");
  }

  return (
    <div className="lg:col-span-4">
      <div className="bg-brand-50/70 dark:bg-brand-900/60 border border-brand-100 dark:border-brand-800 rounded-xl p-6">
        <h2 className="font-display text-lg font-semibold text-brand-950 dark:text-white mb-4">Sipariş Özeti</h2>
        <div className="flex justify-between text-sm text-brand-600 dark:text-brand-300 mb-2">
          <span>Ara Toplam</span>
          <span>{subtotal.toLocaleString("tr-TR")} ₺</span>
        </div>
        <div className="flex justify-between text-sm text-brand-600 dark:text-brand-300 mb-4">
          <span>Kargo</span>
          <span>{shipping === 0 ? "Ücretsiz" : `${shipping.toLocaleString("tr-TR")} ₺`}</span>
        </div>
        <div className="flex justify-between text-base font-semibold text-brand-950 dark:text-white border-t border-brand-200 dark:border-brand-800 pt-4 mb-6">
          <span>Toplam</span>
          <span>{total.toLocaleString("tr-TR")} ₺</span>
        </div>
        <button
          onClick={checkout}
          disabled={items.length === 0}
          className="w-full py-3 bg-brand-900 dark:bg-accent-600 hover:bg-brand-950 dark:hover:bg-accent-500 transition-colors text-white rounded-lg text-sm font-medium disabled:opacity-40 disabled:hover:bg-brand-900 dark:disabled:hover:bg-accent-600"
        >
          Siparişi Tamamla
        </button>
      </div>
    </div>
  );
}

export default CartSummary;
