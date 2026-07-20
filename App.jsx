import { createContext, useState } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import HomePage from "./pages/HomePage";
import BlindBoxListPage from "./pages/BlindBoxes/BlindBoxListPage";
import BlindBoxDetailPage from "./pages/BlindBoxes/BlindBoxDetailPage";
import CollectionsPage from "./pages/CollectionsPage";
import AnimalSupportPage from "./pages/AnimalSupportPage";
import CartPage from "./pages/Cart/CartPage";
import LoginPage from "./pages/Auth/LoginPage";
import RegisterPage from "./pages/Auth/RegisterPage";
import AccountPage from "./pages/Auth/AccountPage";
import HelpPage from "./pages/Help/HelpPage";
import ContactPage from "./pages/Help/ContactPage";

// Sepet, favoriler ve siparişler burada, en üstte, tek bir yerde tutuluyor.
// Alttaki her component useContext(CartContext) ile buraya erişebiliyor,
// props ile aşağı doğru veri taşımaya (prop drilling) gerek kalmıyor.
export const CartContext = createContext();

function App() {
  const [cart, setCart] = useState([]); // [{ id, name, price, category, image, qty }]
  const [favorites, setFavorites] = useState([]); // [id, id, ...]
  const [orders, setOrders] = useState([]); // [{ id, date, items, total }]

  return (
    <CartContext.Provider value={{ cart, setCart, favorites, setFavorites, orders, setOrders }}>
      <ThemeProvider>
        <AuthProvider>
          <HashRouter>
            <div className="min-h-screen flex flex-col bg-white dark:bg-brand-950 transition-colors">
              <Header />
              <div className="flex-1">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/blind-boxlar" element={<BlindBoxListPage />} />
                  <Route path="/urun/:slug" element={<BlindBoxDetailPage />} />
                  <Route path="/koleksiyonlar" element={<CollectionsPage />} />
                  <Route path="/patilere-destek" element={<AnimalSupportPage />} />
                  <Route path="/cart" element={<CartPage />} />
                  <Route path="/giris" element={<LoginPage />} />
                  <Route path="/kayit" element={<RegisterPage />} />
                  <Route path="/hesabim" element={<AccountPage />} />
                  <Route path="/yardim" element={<HelpPage />} />
                  <Route path="/iletisim" element={<ContactPage />} />
                </Routes>
              </div>
              <Footer />
            </div>
          </HashRouter>
        </AuthProvider>
      </ThemeProvider>
    </CartContext.Provider>
  );
}

export default App;
