import { createContext, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import PremiumEssentialsPage from "./pages/Premium Essentials/PremiumEssentialsPage";
import CartPage from "./pages/Cart/CartPage";

// Sepet ve favoriler burada, en üstte, tek bir yerde tutuluyor.
// Alttaki her component useContext(CartContext) ile buraya erişebiliyor,
// props ile aşağı doğru veri taşımaya (prop drilling) gerek kalmıyor.
export const CartContext = createContext();

function App() {
  const [cart, setCart] = useState([]); // [{ id, name, price, category, image, qty }]
  const [favorites, setFavorites] = useState([]); // [id, id, ...]

  return (
    <CartContext.Provider value={{ cart, setCart, favorites, setFavorites }}>
      <BrowserRouter>
        {/* Kendi projende muhtemelen zaten Header/Footer/BrowserRouter var —
            önemli olan kısım CartContext.Provider ile sarmalamak, geri kalanını
            kendi App.jsx'ine göre birleştir. */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/premium-essentials" element={<PremiumEssentialsPage />} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>
      </BrowserRouter>
    </CartContext.Provider>
  );
}

export default App;
