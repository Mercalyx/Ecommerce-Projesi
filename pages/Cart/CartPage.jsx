import { useContext } from "react";
import { CartContext } from "../../App";
import BreadCrumb from "./BreadCrumb";
import CartTitle from "./CartTitle";
import CartItems from "./CartItems";
import CartSummary from "./CartSummary";

function CartPage() {
  const { cart } = useContext(CartContext);

  return (
    <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 min-h-[60vh]">
      <BreadCrumb />
      <CartTitle itemCount={cart.length} />
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <CartItems items={cart} />
        <CartSummary items={cart} />
      </div>
    </main>
  );
}

export default CartPage;
