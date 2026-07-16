import { useContext } from "react";
import { CartContext } from "../../App";

function CartSummary({ items }) {
  const { setCart } = useContext(CartContext);
  const subtotal = items.reduce((sum, item) => sum + item.price * item.qty, 0);

  function checkout() {
    alert("Siparişiniz alındı! (Bu bir demo, gerçek ödeme yapılmadı)");
    setCart([]);
  }

  return (
    <div className="lg:col-span-4">
      <div className="bg-gray-50 rounded-xl p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Sipariş Özeti</h2>
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>Ara Toplam</span>
          <span>{subtotal.toLocaleString("tr-TR")} ₺</span>
        </div>
        <div className="flex justify-between text-sm text-gray-600 mb-4">
          <span>Kargo</span>
          <span>Ücretsiz</span>
        </div>
        <div className="flex justify-between text-base font-semibold text-gray-900 border-t border-gray-200 pt-4 mb-6">
          <span>Toplam</span>
          <span>{subtotal.toLocaleString("tr-TR")} ₺</span>
        </div>
        <button
          onClick={checkout}
          disabled={items.length === 0}
          className="w-full py-3 bg-gray-900 text-white rounded-lg text-sm disabled:opacity-40"
        >
          Siparişi Tamamla
        </button>
      </div>
    </div>
  );
}

export default CartSummary;
