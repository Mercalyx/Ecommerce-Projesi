import { Link } from "react-router-dom";

const columns = [
  {
    title: "Alışveriş",
    links: [
      { label: "Tüm Ürünler", to: "/premium-essentials" },
      { label: "Elektronik", to: "/premium-essentials?kategori=Elektronik" },
      { label: "Aksesuar", to: "/premium-essentials?kategori=Aksesuar" },
      { label: "Giyim", to: "/premium-essentials?kategori=Giyim" },
    ],
  },
  {
    title: "Hesap",
    links: [
      { label: "Giriş Yap", to: "/giris" },
      { label: "Kayıt Ol", to: "/kayit" },
      { label: "Hesabım", to: "/hesabim" },
      { label: "Sepetim", to: "/cart" },
    ],
  },
  {
    title: "Yardım",
    links: [
      { label: "Kargo Takibi", to: "/yardim#kargo" },
      { label: "İade & Değişim", to: "/yardim#iade" },
      { label: "Sıkça Sorulan Sorular", to: "/yardim#sss" },
      { label: "İletişim", to: "/iletisim" },
    ],
  },
];

function Footer() {
  return (
    <footer className="bg-white dark:bg-black border-t border-brand-200 dark:border-brand-800 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 grid grid-cols-2 lg:grid-cols-5 gap-8">
        <div className="col-span-2">
          <div className="flex items-center gap-2.5 mb-3">
            <div className="w-6 h-6 rounded-md bg-accent-600" />
            <p className="font-display text-lg font-bold tracking-tight text-brand-900 dark:text-white">Premium Essentials</p>
          </div>
          <p className="text-sm max-w-xs text-brand-500 dark:text-brand-400">
            Günlük hayatın temel parçalarını özenle seçiyor, kapınıza kadar
            getiriyoruz.
          </p>
        </div>

        {columns.map((col) => (
          <div key={col.title}>
            <p className="text-sm font-semibold text-brand-900 dark:text-white mb-3">{col.title}</p>
            <ul className="space-y-2.5">
              {col.links.map((l) => (
                <li key={l.label}>
                  <Link to={l.to} className="text-sm text-brand-500 dark:text-brand-400 hover:text-accent-600 dark:hover:text-accent-400 transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-brand-100 dark:border-brand-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-brand-400 dark:text-brand-500">
          <span>© {new Date().getFullYear()} Premium Essentials. Tüm hakları saklıdır.</span>
          <span>Bu bir demo mağazadır — gerçek ödeme alınmaz.</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
