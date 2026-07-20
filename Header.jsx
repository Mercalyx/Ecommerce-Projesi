import { useContext, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { CartContext } from "./App";
import { AuthContext } from "./context/AuthContext";
import { ThemeContext } from "./context/ThemeContext";
import products from "./data/products";

const navLinkClass = ({ isActive }) =>
  `text-sm font-medium whitespace-nowrap transition-colors ${
    isActive ? "text-brand-900 dark:text-white" : "text-brand-600 dark:text-brand-300 hover:text-brand-900 dark:hover:text-white"
  }`;

function SearchIcon(props) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" {...props}>
      <circle cx="11" cy="11" r="7" />
      <path d="M21 21l-4.35-4.35" strokeLinecap="round" />
    </svg>
  );
}

function ThemeToggle({ className = "" }) {
  const { theme, toggleTheme } = useContext(ThemeContext);
  return (
    <button
      onClick={toggleTheme}
      aria-label={theme === "dark" ? "Aydınlık moda geç" : "Karanlık moda geç"}
      className={`w-9 h-9 flex items-center justify-center rounded-full text-brand-700 dark:text-brand-200 hover:bg-brand-50 dark:hover:bg-brand-900 ${className}`}
    >
      {theme === "dark" ? (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <circle cx="12" cy="12" r="4.5" />
          <path d="M12 2.5v2M12 19.5v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M2.5 12h2M19.5 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" strokeLinecap="round" />
        </svg>
      ) : (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M20 14.5A8.5 8.5 0 1 1 9.5 4a7 7 0 0 0 10.5 10.5z" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </button>
  );
}

function SearchBar({ query, setQuery, onSubmit, size = "md" }) {
  const height = size === "lg" ? "h-11" : "h-10";
  return (
    <form onSubmit={onSubmit} className="flex-1 min-w-0">
      <div className={`relative flex items-stretch w-full ${height}`}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Koleksiyon ara..."
          className="peer w-full h-full pl-4 pr-12 text-sm rounded-full border border-brand-200 dark:border-brand-800 bg-white dark:bg-brand-900 text-brand-950 dark:text-white placeholder:text-brand-400 dark:placeholder:text-brand-400 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent"
        />
        <button
          type="submit"
          aria-label="Ara"
          className="absolute right-1 top-1 bottom-1 aspect-square rounded-full bg-brand-900 dark:bg-accent-600 text-white flex items-center justify-center hover:bg-brand-950 dark:hover:bg-accent-500 transition-colors"
        >
          <SearchIcon />
        </button>
      </div>
    </form>
  );
}

function Header() {
  const { cart, favorites } = useContext(CartContext);
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [query, setQuery] = useState("");

  const itemCount = cart.reduce((sum, item) => sum + item.qty, 0);

  function handleSearch(e) {
    e.preventDefault();
    navigate(`/blind-boxlar${query.trim() ? `?q=${encodeURIComponent(query.trim())}` : ""}`);
    setMobileOpen(false);
  }

  function handleLogout() {
    logout();
    setAccountOpen(false);
    navigate("/");
  }

  return (
    <header className="sticky top-0 z-40 bg-accent-50 dark:bg-accent-800/30 backdrop-blur border-b border-brand-100 dark:border-brand-900">
      {/* Üst bant */}
      <div className="hidden sm:block bg-brand-950 dark:bg-black/40 text-brand-100 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-1.5 flex items-center justify-between">
          <span>1000 TL ve üzeri siparişlerde kargo ücretsiz</span>
          <Link to="/yardim" className="hover:text-white transition-colors">
            Yardım Merkezi
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Ana satır: logo + ikonlar (+ lg'de arama) */}
        <div className="flex items-center gap-3 sm:gap-4 py-2 sm:py-2.5">
          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="lg:hidden w-9 h-9 flex items-center justify-center rounded-lg text-brand-700 dark:text-brand-200 hover:bg-brand-50 dark:hover:bg-brand-900 shrink-0"
            aria-label="Menüyü aç"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              {mobileOpen ? (
                <path d="M6 6l12 12M18 6l-12 12" strokeLinecap="round" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
              )}
            </svg>
          </button>

          <Link to="/" className="shrink-0 flex items-center">
            <img src={`${import.meta.env.BASE_URL}logo.png`} alt="Kubishop" className="h-16 sm:h-20 w-auto" />
          </Link>

          {/* Masaüstü navigasyon (lg+) */}
          <nav className="hidden lg:flex items-center gap-6 ml-2 shrink-0">
            <NavLink to="/" end className={navLinkClass}>
              Ana Sayfa
            </NavLink>

            <div
              className="relative"
              onMouseEnter={() => setCategoryOpen(true)}
              onMouseLeave={() => setCategoryOpen(false)}
            >
              <NavLink to="/blind-boxlar" className={navLinkClass}>
                <span className="inline-flex items-center gap-1">
                  Blind Box'lar
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </NavLink>
              {categoryOpen && (
                <div className="absolute top-full left-0 pt-3 w-56 animate-slide-down">
                  <div className="bg-white dark:bg-brand-900 border border-brand-100 dark:border-brand-800 rounded-xl shadow-popover py-2">
                    {products.map((product) => (
                      <Link
                        key={product.id}
                        to={`/urun/${product.slug}`}
                        className="block px-4 py-2 text-sm text-brand-700 dark:text-brand-200 hover:bg-brand-50 dark:hover:bg-brand-800 hover:text-brand-950 dark:hover:text-white"
                        onClick={() => setCategoryOpen(false)}
                      >
                        {product.collectionName}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <NavLink to="/koleksiyonlar" className={navLinkClass}>
              Koleksiyonlar
            </NavLink>

            <Link to="/#nasil-calisir" className={navLinkClass({ isActive: false })}>
              Nasıl Çalışır?
            </Link>

            <NavLink to="/patilere-destek" className={navLinkClass}>
              Patilere Destek
            </NavLink>
          </nav>

          {/* Arama - lg ve üzeri, kendi alanında geniş */}
          <div className="hidden lg:block flex-1 max-w-md ml-4">
            <SearchBar query={query} setQuery={setQuery} onSubmit={handleSearch} />
          </div>

          {/* Sağ ikonlar */}
          <div className="flex items-center gap-1 ml-auto">
            <ThemeToggle className="hidden sm:flex" />

            <div
              className="relative"
              onMouseEnter={() => setAccountOpen(true)}
              onMouseLeave={() => setAccountOpen(false)}
            >
              <button
                className="w-9 h-9 flex items-center justify-center rounded-full text-brand-700 dark:text-brand-200 hover:bg-brand-50 dark:hover:bg-brand-900"
                aria-label="Hesabım"
                onClick={() => navigate(user ? "/hesabim" : "/giris")}
              >
                {user ? (
                  <span className="w-7 h-7 rounded-full bg-accent-600 text-white text-xs font-semibold flex items-center justify-center">
                    {user.name.charAt(0).toUpperCase()}
                  </span>
                ) : (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                    <circle cx="12" cy="8" r="3.5" />
                    <path d="M4.5 20c1.6-3.5 4.5-5.5 7.5-5.5s5.9 2 7.5 5.5" strokeLinecap="round" />
                  </svg>
                )}
              </button>

              {accountOpen && (
                <div className="absolute top-full right-0 pt-3 w-56 animate-slide-down">
                  <div className="bg-white dark:bg-brand-900 border border-brand-100 dark:border-brand-800 rounded-xl shadow-popover py-2">
                    {user ? (
                      <>
                        <div className="px-4 py-2 border-b border-brand-50 dark:border-brand-800">
                          <p className="text-sm font-medium text-brand-900 dark:text-white line-clamp-1">{user.name}</p>
                          <p className="text-xs text-brand-500 dark:text-brand-400 line-clamp-1">{user.email}</p>
                        </div>
                        <Link to="/hesabim" className="block px-4 py-2 text-sm text-brand-700 dark:text-brand-200 hover:bg-brand-50 dark:hover:bg-brand-800">
                          Hesabım
                        </Link>
                        <button
                          onClick={handleLogout}
                          className="w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-brand-50 dark:hover:bg-brand-800"
                        >
                          Çıkış Yap
                        </button>
                      </>
                    ) : (
                      <>
                        <Link to="/giris" className="block px-4 py-2 text-sm text-brand-700 dark:text-brand-200 hover:bg-brand-50 dark:hover:bg-brand-800">
                          Giriş Yap
                        </Link>
                        <Link to="/kayit" className="block px-4 py-2 text-sm text-brand-700 dark:text-brand-200 hover:bg-brand-50 dark:hover:bg-brand-800">
                          Kayıt Ol
                        </Link>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>

            <Link
              to="/hesabim"
              className="w-9 h-9 hidden sm:flex items-center justify-center rounded-full text-brand-700 dark:text-brand-200 hover:bg-brand-50 dark:hover:bg-brand-900 relative"
              aria-label="Favorilerim"
            >
              <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                <path d="M12 20.5s-7.5-4.6-10-9.3C.5 7.8 2.4 4.5 6 4.5c2.1 0 3.6 1.2 4.5 2.6.9-1.4 2.4-2.6 4.5-2.6 3.6 0 5.5 3.3 4 6.7-2.5 4.7-10 9.3-10 9.3z" />
              </svg>
              {favorites.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 text-[10px] bg-brand-900 dark:bg-accent-600 text-white rounded-full flex items-center justify-center">
                  {favorites.length}
                </span>
              )}
            </Link>

            <Link
              to="/cart"
              className="flex items-center gap-1.5 px-3 py-2 rounded-full text-brand-700 dark:text-brand-200 hover:bg-brand-50 dark:hover:bg-brand-900 relative"
            >
              <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                <path d="M3 4h2l2.4 12.4a2 2 0 0 0 2 1.6h7.6a2 2 0 0 0 2-1.6L21 8H6" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="10" cy="21" r="1.3" />
                <circle cx="17" cy="21" r="1.3" />
              </svg>
              <span className="hidden sm:inline text-sm font-medium">Sepetim</span>
              {itemCount > 0 && (
                <span className="inline-flex items-center justify-center w-5 h-5 text-xs bg-brand-900 dark:bg-accent-600 text-white rounded-full">
                  {itemCount}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Arama - lg altı, kendi tam genişlikte satırı */}
        <div className="lg:hidden pb-3.5">
          <SearchBar query={query} setQuery={setQuery} onSubmit={handleSearch} />
        </div>
      </div>

      {/* Mobil menü paneli */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-brand-100 dark:border-brand-900 bg-white dark:bg-brand-950 animate-fade-in">
          <div className="px-4 py-4 space-y-4">
            <nav className="flex flex-col gap-1">
              <Link to="/" onClick={() => setMobileOpen(false)} className="py-2 text-sm font-medium text-brand-800 dark:text-brand-100">
                Ana Sayfa
              </Link>
              <Link
                to="/blind-boxlar"
                onClick={() => setMobileOpen(false)}
                className="py-2 text-sm font-medium text-brand-800 dark:text-brand-100"
              >
                Blind Box'lar
              </Link>
              {products.map((product) => (
                <Link
                  key={product.id}
                  to={`/urun/${product.slug}`}
                  onClick={() => setMobileOpen(false)}
                  className="py-2 pl-3 text-sm text-brand-600 dark:text-brand-300 border-l-2 border-brand-100 dark:border-brand-800"
                >
                  {product.collectionName}
                </Link>
              ))}
              <Link to="/koleksiyonlar" onClick={() => setMobileOpen(false)} className="py-2 text-sm font-medium text-brand-800 dark:text-brand-100">
                Koleksiyonlar
              </Link>
              <Link to="/#nasil-calisir" onClick={() => setMobileOpen(false)} className="py-2 text-sm font-medium text-brand-800 dark:text-brand-100">
                Nasıl Çalışır?
              </Link>
              <Link to="/patilere-destek" onClick={() => setMobileOpen(false)} className="py-2 text-sm font-medium text-brand-800 dark:text-brand-100">
                Patilere Destek
              </Link>
            </nav>

            <div className="pt-3 border-t border-brand-100 dark:border-brand-900 flex flex-col gap-1">
              <Link to="/hesabim" onClick={() => setMobileOpen(false)} className="py-2 text-sm font-medium text-brand-800 dark:text-brand-100">
                Favorilerim {favorites.length > 0 && `(${favorites.length})`}
              </Link>
              <Link to="/cart" onClick={() => setMobileOpen(false)} className="py-2 text-sm font-medium text-brand-800 dark:text-brand-100">
                Sepetim {itemCount > 0 && `(${itemCount})`}
              </Link>
              {user ? (
                <>
                  <Link to="/hesabim" onClick={() => setMobileOpen(false)} className="py-2 text-sm font-medium text-brand-800 dark:text-brand-100">
                    Hesabım ({user.name})
                  </Link>
                  <button onClick={handleLogout} className="py-2 text-left text-sm font-medium text-red-600 dark:text-red-400">
                    Çıkış Yap
                  </button>
                </>
              ) : (
                <>
                  <Link to="/giris" onClick={() => setMobileOpen(false)} className="py-2 text-sm font-medium text-brand-800 dark:text-brand-100">
                    Giriş Yap
                  </Link>
                  <Link to="/kayit" onClick={() => setMobileOpen(false)} className="py-2 text-sm font-medium text-brand-800 dark:text-brand-100">
                    Kayıt Ol
                  </Link>
                </>
              )}
              <Link to="/yardim" onClick={() => setMobileOpen(false)} className="py-2 text-sm font-medium text-brand-800 dark:text-brand-100">
                Yardım Merkezi
              </Link>
              <Link to="/iletisim" onClick={() => setMobileOpen(false)} className="py-2 text-sm font-medium text-brand-800 dark:text-brand-100">
                İletişim
              </Link>
            </div>

            <div className="pt-3 border-t border-brand-100 dark:border-brand-900 flex items-center justify-between">
              <span className="text-sm font-medium text-brand-800 dark:text-brand-100">Görünüm</span>
              <ThemeToggle />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
