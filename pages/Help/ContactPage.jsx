import { useState } from "react";

const info = [
  { label: "E-posta", value: "destek@kubishop.com" },
  { label: "Telefon", value: "0850 123 45 67" },
  { label: "Adres", value: "Bağdat Cd. No:123, Kadıköy, İstanbul" },
  { label: "Çalışma Saatleri", value: "Hafta içi 09:00 - 18:00" },
];

function ContactPage() {
  const [sent, setSent] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <main className="max-w-5xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-10">
        <h1 className="font-display text-3xl font-semibold text-brand-950 dark:text-white">İletişim</h1>
        <p className="mt-2 text-sm text-brand-600 dark:text-brand-300">
          Sorularınız için bize ulaşın, en kısa sürede dönüş yapalım.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {info.map((i) => (
            <div key={i.label} className="bg-white dark:bg-brand-900 border border-brand-100 dark:border-brand-800 rounded-xl p-5">
              <p className="text-xs uppercase tracking-wide text-brand-400 dark:text-brand-500">{i.label}</p>
              <p className="text-sm text-brand-900 dark:text-white mt-1">{i.value}</p>
            </div>
          ))}
        </div>

        <div className="lg:col-span-3">
          {sent ? (
            <div className="bg-brand-50 dark:bg-brand-900 border border-brand-100 dark:border-brand-800 rounded-xl p-8 text-center">
              <h2 className="font-display text-xl font-semibold text-brand-950 dark:text-white">Mesajınız alındı</h2>
              <p className="mt-2 text-sm text-brand-600 dark:text-brand-300">
                En kısa sürede size dönüş yapacağız. (Bu bir demo formdur, mesaj gönderilmez.)
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white dark:bg-brand-900 border border-brand-100 dark:border-brand-800 rounded-xl p-6 sm:p-8 space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-brand-900 dark:text-brand-100 mb-1.5">Ad Soyad</label>
                  <input
                    required
                    type="text"
                    className="w-full px-4 py-2.5 rounded-lg border border-brand-200 dark:border-brand-700 bg-brand-50/50 dark:bg-brand-950 text-brand-950 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-brand-900 dark:text-brand-100 mb-1.5">E-posta</label>
                  <input
                    required
                    type="email"
                    className="w-full px-4 py-2.5 rounded-lg border border-brand-200 dark:border-brand-700 bg-brand-50/50 dark:bg-brand-950 text-brand-950 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-brand-900 dark:text-brand-100 mb-1.5">Konu</label>
                <input
                  required
                  type="text"
                  placeholder="Sipariş, iade, ürün hakkında..."
                  className="w-full px-4 py-2.5 rounded-lg border border-brand-200 dark:border-brand-700 bg-brand-50/50 dark:bg-brand-950 text-brand-950 dark:text-white placeholder:text-brand-400 text-sm focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-brand-900 dark:text-brand-100 mb-1.5">Mesaj</label>
                <textarea
                  required
                  rows={5}
                  className="w-full px-4 py-2.5 rounded-lg border border-brand-200 dark:border-brand-700 bg-brand-50/50 dark:bg-brand-950 text-brand-950 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent resize-none"
                />
              </div>
              <button
                type="submit"
                className="px-7 py-3 bg-brand-900 dark:bg-accent-600 hover:bg-brand-950 dark:hover:bg-accent-500 transition-colors text-white rounded-lg text-sm font-medium"
              >
                Gönder
              </button>
            </form>
          )}
        </div>
      </div>
    </main>
  );
}

export default ContactPage;
