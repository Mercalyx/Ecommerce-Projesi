import { useContext } from "react";
import { CartContext } from "../../../App";
import ProductImage from "./ProductImage";
import ProductInfo from "./productInfo";
import FavoriteButton from "./FavoriteButton";

function ProductCards({ product }) {
  const { cart, setCart } = useContext(CartContext);

  function addToCart() {
    const existing = cart.find((item) => item.id === product.id);
    if (existing) {
      // Ürün zaten sepette varsa yeni satır açmak yerine adedini artır
      setCart(
        cart.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        )
      );
    } else {
      setCart([...cart, { ...product, qty: 1 }]);
    }
  }

  return (
    <div className="flex flex-col">
      <div className="relative">
        <ProductImage image={product.image} name={product.name} />
        <FavoriteButton productId={product.id} />
      </div>
      <ProductInfo name={product.name} category={product.category} price={product.price} />
      <button
        onClick={addToCart}
        className="mt-3 w-full py-2 bg-gray-900 text-white rounded-lg text-sm"
      >
        Sepete Ekle
      </button>
    </div>
  );
}

export default ProductCards;
