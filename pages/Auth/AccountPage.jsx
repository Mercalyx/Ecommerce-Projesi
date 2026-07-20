import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { CartContext } from "../../App";
import products from "../../data/products";

function AccountPage() {
  const { user, logout } = useContext(AuthContext);
  const { favorites, orders } = useContext(CartContext);
  const navigate = useNavigate();

  if (!user) {
    return (
      <main className="max-w-md mx-auto px-4 py-20 sm:px-6 text-center">
        <h1 className="font-display text-2xl font-semibold text-brand-950 dark:text-white">Önce giriş yapmalısınız</h1>
        <p className="mt-2 text-sm text-brand-600 dark:text-brand-300">Hesabınızı görüntülemek için oturum açın.</p>
        <Link
          to="/giris"
          className="inline-block mt-6 px-6 py-3 bg-brand-900 dark:bg-accent-600 hover:bg-brand-950 dark:hover:bg-accent-500 transition-colors text-white rounded-lg text-sm font-medium"
        >
          Giriş Yap
        </Link>
      </main>
    );
  }

  const favoriteProducts = products.filter((p) => favorites.includes(p.id));

  function handleLogout() {
    logout();
    navigate("/");
  }

  return (
    <main className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-accent-600 text-white flex items-center justify-center text-lg font-semibold font-display">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <h1 className="font-display text-2xl font-semibold text-brand-950 dark:text-white">{user.name}</h1>
            <p className="text-sm text-brand-600 dark:text-brand-300">{user.email}</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="self-start sm:self-auto px-5 py-2.5 border border-brand-200 dark:border-brand-700 rounded-lg text-sm text-brand-800 dark:text-brand-200 hover:bg-brand-50 dark:hover:bg-brand-900 transition-colors"
        >
          Çıkış Yap
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
        <div className="bg-white dark:bg-brand-900 border border-brand-100 dark:border-brand-800 rounded-xl p-5">
          <p className="text-xs uppercase tracking-wide text-brand-400 dark:text-brand-500">Favoriler</p>
          <p className="text-2xl font-display font-semibold text-brand-950 dark:text-white mt-1">{favoriteProducts.length}</p>
        </div>
        <div className="bg-white dark:bg-brand-900 border border-brand-100 dark:border-brand-800 rounded-xl p-5">
          <p className="text-xs uppercase tracking-wide text-brand-400 dark:text-brand-500">Üyelik</p>
          <p className="text-2xl font-display font-semibold text-brand-950 dark:text-white mt-1">Standart</p>
        </div>
        <div className="bg-white dark:bg-brand-900 border border-brand-100 dark:border-brand-800 rounded-xl p-5">
          <p className="text-xs uppercase tracking-wide text-brand-400 dark:text-brand-500">Sipariş</p>
          <p className="text-2xl font-display font-semibold text-brand-950 dark:text-white mt-1">{orders.length}</p>
        </div>
      </div>

      <h2 className="text-lg font-semibold text-brand-950 dark:text-white mb-4">Siparişlerim</h2>
      {orders.length === 0 ? (
        <p className="text-sm text-brand-500 dark:text-brand-400 mb-10">Henüz siparişiniz yok.</p>
      ) : (
        <div className="mb-10 bg-white dark:bg-brand-900 border border-brand-100 dark:border-brand-800 rounded-xl divide-y divide-brand-100 dark:divide-brand-800">
          {orders.map((order) => (
            <div key={order.id} className="p-4 sm:p-5 flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-brand-900 dark:text-white">Sipariş #{order.id}</p>
                <p className="text-xs text-brand-500 dark:text-brand-400 mt-0.5">
                  {order.date} · {order.items.length} ürün
                </p>
              </div>
              <p className="text-sm font-semibold text-brand-950 dark:text-white">{order.total.toLocaleString("tr-TR")} ₺</p>
            </div>
          ))}
        </div>
      )}

      <h2 className="text-lg font-semibold text-brand-950 dark:text-white mb-4">Favori Ürünlerim</h2>
      {favoriteProducts.length === 0 ? (
        <p className="text-sm text-brand-500 dark:text-brand-400">
          Henüz favori eklemediniz.{" "}
          <Link to="/blind-boxlar" className="text-brand-900 dark:text-brand-300 underline">
            Blind box'lara göz atın
          </Link>
          .
        </p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {favoriteProducts.map((p) => (
            <Link
              key={p.id}
              to={`/urun/${p.slug}`}
              className="group block bg-white dark:bg-brand-900 border border-brand-100 dark:border-brand-800 rounded-xl overflow-hidden hover:shadow-card transition-shadow"
            >
              <div className="aspect-square overflow-hidden bg-brand-50 dark:bg-brand-800">
                <img
                  src={p.mainImage}
                  alt={p.name}
                  className="w-full h-full object-contain p-3 group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-3">
                <p className="text-sm font-medium text-brand-900 dark:text-white line-clamp-1">{p.name}</p>
                <p className="text-sm text-brand-600 dark:text-brand-300">{p.price.toLocaleString("tr-TR")} ₺</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}

export default AccountPage;
