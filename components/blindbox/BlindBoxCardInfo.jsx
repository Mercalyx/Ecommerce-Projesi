function BlindBoxCardInfo({ name, collectionName, price, originalPrice, rating, reviewCount, animalSupportContribution }) {
  return (
    <div className="mt-3">
      <p className="text-xs uppercase tracking-wide text-brand-400 dark:text-brand-500">{collectionName}</p>
      <h3 className="min-h-10 text-sm font-medium leading-snug text-brand-900 dark:text-white">{name}</h3>

      {rating && (
        <div className="flex items-center gap-1 mt-1">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className="text-amber-500">
            <path d="M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6-5.9-3.3-5.9 3.3 1.3-6.6L2.5 9.4l6.6-.8L12 2.5z" />
          </svg>
          <span className="text-xs text-brand-600 dark:text-brand-300">
            {rating} <span className="text-brand-400 dark:text-brand-500">({reviewCount})</span>
          </span>
        </div>
      )}

      <div className="flex items-baseline gap-2 mt-1">
        <p className="text-sm font-semibold text-brand-950 dark:text-white">{price.toLocaleString("tr-TR")} ₺</p>
        {originalPrice && (
          <p className="text-xs text-brand-400 dark:text-brand-500 line-through">{originalPrice.toLocaleString("tr-TR")} ₺</p>
        )}
      </div>

      <p className="text-[11px] text-brand-500 dark:text-brand-400 mt-1.5">5 farklı sürpriz figür</p>
      {animalSupportContribution > 0 && (
        <p className="text-[11px] text-accent-700 dark:text-accent-400 mt-0.5">
          🐾 {animalSupportContribution} ₺ patilere bağışlanır
        </p>
      )}
    </div>
  );
}

export default BlindBoxCardInfo;
