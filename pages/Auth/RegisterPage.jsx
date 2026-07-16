import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

function RegisterPage() {
  const { register, authError } = useContext(AuthContext);
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (register(name, email, password)) {
      navigate("/hesabim");
    }
  }

  return (
    <main className="max-w-md mx-auto px-4 py-16 sm:px-6">
      <div className="text-center mb-8">
        <h1 className="font-display text-3xl font-semibold text-brand-950 dark:text-white">Hesap Oluşturun</h1>
        <p className="mt-2 text-sm text-brand-700 dark:text-brand-300">Üye olun, favorilerinizi ve siparişlerinizi takip edin.</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white dark:bg-brand-900 border border-brand-100 dark:border-brand-800 rounded-2xl shadow-card p-6 sm:p-8 space-y-5">
        <div>
          <label className="block text-sm font-medium text-brand-900 dark:text-brand-100 mb-1.5">Ad Soyad</label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Adınız Soyadınız"
            className="w-full px-4 py-2.5 rounded-lg border border-brand-200 dark:border-brand-700 bg-brand-50/50 dark:bg-brand-950 text-brand-950 dark:text-white placeholder:text-brand-400 text-sm focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-brand-900 dark:text-brand-100 mb-1.5">E-posta</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="ornek@eposta.com"
            className="w-full px-4 py-2.5 rounded-lg border border-brand-200 dark:border-brand-700 bg-brand-50/50 dark:bg-brand-950 text-brand-950 dark:text-white placeholder:text-brand-400 text-sm focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-brand-900 dark:text-brand-100 mb-1.5">Şifre</label>
          <input
            type="password"
            required
            minLength={4}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="En az 4 karakter"
            className="w-full px-4 py-2.5 rounded-lg border border-brand-200 dark:border-brand-700 bg-brand-50/50 dark:bg-brand-950 text-brand-950 dark:text-white placeholder:text-brand-400 text-sm focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent"
          />
        </div>

        {authError && <p className="text-sm text-red-600 dark:text-red-400">{authError}</p>}

        <button
          type="submit"
          className="w-full py-3 bg-brand-900 dark:bg-accent-600 hover:bg-brand-950 dark:hover:bg-accent-500 transition-colors text-white rounded-lg text-sm font-medium"
        >
          Hesap Oluştur
        </button>

        <p className="text-center text-sm text-brand-600 dark:text-brand-300">
          Zaten hesabınız var mı?{" "}
          <Link to="/giris" className="font-medium text-brand-900 dark:text-brand-200 hover:underline">
            Giriş yapın
          </Link>
        </p>
      </form>
    </main>
  );
}

export default RegisterPage;
