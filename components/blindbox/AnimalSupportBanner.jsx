import { Link } from "react-router-dom";
import products from "../../data/products";

const TOTAL_DONATED_TO_DATE = 18640; // demo running total, in the site's existing tone

// No outer section/max-width wrapper on purpose (see HowBlindBoxWorks) — the
// pages that embed this control their own layout shape.
function AnimalSupportBanner({ showLink = true }) {
  const contributions = products.map((p) => p.animalSupportContribution);
  const minContribution = Math.min(...contributions);
  const maxContribution = Math.max(...contributions);

  return (
    <div className="bg-accent-50 dark:bg-accent-900/20 border border-accent-100 dark:border-accent-800 rounded-3xl px-8 py-10 sm:px-12 sm:py-12 flex flex-col sm:flex-row items-center gap-8">
      <div className="w-16 h-16 rounded-2xl bg-accent-600 flex items-center justify-center shrink-0 text-white">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
          <ellipse cx="12" cy="16.5" rx="5" ry="4" />
          <circle cx="5" cy="9" r="2.2" />
          <circle cx="9.5" cy="5.5" r="2.2" />
          <circle cx="14.5" cy="5.5" r="2.2" />
          <circle cx="19" cy="9" r="2.2" />
        </svg>
      </div>
      <div className="flex-1 text-center sm:text-left">
        <h2 className="font-display text-xl sm:text-2xl font-extrabold tracking-tight text-brand-950 dark:text-white mb-2">
          Her sürpriz bir patiye umut olur
        </h2>
        <p className="text-sm text-brand-600 dark:text-brand-300 max-w-xl">
          Her blind box'ın sabit bir kısmı, sokak hayvanlarının mama, tedavi ve barınma ihtiyaçlarına destek olmak için
          ayrılır — koleksiyona göre {minContribution} ₺ ile {maxContribution} ₺ arasında değişir. Ekstra ücret ödemeden
          kimsesiz dostlarımıza destek olursun.
        </p>
        {showLink && (
          <Link to="/patilere-destek" className="inline-block mt-3 text-sm font-medium text-accent-700 dark:text-accent-400 hover:underline">
            Bağış programını incele →
          </Link>
        )}
      </div>
      <div className="text-center shrink-0">
        <p className="font-display text-2xl sm:text-3xl font-extrabold text-accent-700 dark:text-accent-400">
          {TOTAL_DONATED_TO_DATE.toLocaleString("tr-TR")} ₺
        </p>
        <p className="text-xs text-brand-500 dark:text-brand-400 mt-1">bugüne kadar bağışlandı</p>
      </div>
    </div>
  );
}

export default AnimalSupportBanner;
