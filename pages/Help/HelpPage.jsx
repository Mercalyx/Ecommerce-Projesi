import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const faqs = [
  {
    q: "Siparişim ne zaman elime ulaşır?",
    a: "Siparişleriniz onaylandıktan sonra 2-4 iş günü içinde kargoya verilir ve bölgenize bağlı olarak 1-3 iş günü içinde teslim edilir.",
  },
  {
    q: "Kargo ücreti ne kadar?",
    a: "250 ₺ ve üzeri siparişlerde kargo ücretsizdir. Bu tutarın altındaki siparişlerde sabit 49,90 ₺ kargo ücreti uygulanır.",
  },
  {
    q: "İade ve değişim nasıl yapılır?",
    a: "Ürünlerinizi teslim tarihinden itibaren 14 gün içinde, kullanılmamış ve orijinal ambalajında olmak koşuluyla koşulsuz iade edebilirsiniz. Hesabım sayfasındaki sipariş geçmişinden iade talebi oluşturabilirsiniz.",
  },
  {
    q: "Ödeme seçenekleri nelerdir?",
    a: "Bu bir demo mağaza olduğu için gerçek ödeme alınmamaktadır. Gerçek bir entegrasyonda kredi kartı, banka kartı ve kapıda ödeme seçenekleri sunulur.",
  },
  {
    q: "Üyelik ücretli mi?",
    a: "Hayır, üyelik tamamen ücretsizdir. Üye olarak favori ürünlerinizi kaydedebilir ve sipariş geçmişinizi takip edebilirsiniz.",
  },
];

function AccordionItem({ item, isOpen, onToggle }) {
  return (
    <div className="border-b border-brand-100 dark:border-brand-800 last:border-b-0">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 py-4 text-left"
      >
        <span className="text-sm font-medium text-brand-900 dark:text-white">{item.q}</span>
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className={`shrink-0 text-brand-400 dark:text-brand-500 transition-transform ${isOpen ? "rotate-180" : ""}`}
        >
          <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      {isOpen && <p className="text-sm text-brand-600 dark:text-brand-300 pb-4 pr-8">{item.a}</p>}
    </div>
  );
}

function HelpPage() {
  const [openIndex, setOpenIndex] = useState(0);
  const { hash } = useLocation();

  useEffect(() => {
    if (!hash) return;
    const el = document.getElementById(hash.slice(1));
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [hash]);

  return (
    <main className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-10">
        <h1 className="font-display text-3xl font-semibold text-brand-950 dark:text-white">Yardım Merkezi</h1>
        <p className="mt-2 text-sm text-brand-600 dark:text-brand-300">
          Kargo, iade ve siparişlerinizle ilgili en çok sorulan sorular.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
        <div id="kargo" className="bg-white dark:bg-brand-900 border border-brand-100 dark:border-brand-800 rounded-xl p-6">
          <h2 className="text-sm font-semibold text-brand-900 dark:text-white mb-2">Kargo Takibi</h2>
          <p className="text-sm text-brand-600 dark:text-brand-300">
            Siparişiniz kargoya verildiğinde takip numaranız Hesabım {'>'} Siparişlerim
            bölümünde görüntülenir. Bu demo mağazada gerçek kargo entegrasyonu bulunmaz.
          </p>
        </div>
        <div id="iade" className="bg-white dark:bg-brand-900 border border-brand-100 dark:border-brand-800 rounded-xl p-6">
          <h2 className="text-sm font-semibold text-brand-900 dark:text-white mb-2">İade &amp; Değişim</h2>
          <p className="text-sm text-brand-600 dark:text-brand-300">
            Teslim tarihinden itibaren 14 gün içinde koşulsuz iade hakkınız vardır.
            Değişim talepleri için İletişim sayfasından bize ulaşabilirsiniz.
          </p>
        </div>
      </div>

      <div id="sss">
        <h2 className="font-display text-xl font-semibold text-brand-950 dark:text-white mb-4">Sıkça Sorulan Sorular</h2>
        <div className="bg-white dark:bg-brand-900 border border-brand-100 dark:border-brand-800 rounded-xl px-6">
          {faqs.map((item, i) => (
            <AccordionItem
              key={item.q}
              item={item}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
            />
          ))}
        </div>
      </div>

      <p className="mt-10 text-sm text-brand-600 dark:text-brand-300">
        Sorunuzun cevabını bulamadınız mı?{" "}
        <Link to="/iletisim" className="text-brand-900 dark:text-brand-200 font-medium underline">
          Bizimle iletişime geçin
        </Link>
        .
      </p>
    </main>
  );
}

export default HelpPage;
