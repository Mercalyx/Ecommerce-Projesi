// Rarity vocabulary is data (a fixed set of known strings), not per-product
// branching — new rarities just need a new lookup entry, not new logic.
const RARITY_STYLES = {
  Standard: "bg-brand-100 text-brand-700 dark:bg-brand-800 dark:text-brand-200",
  "Secret Rare": "bg-gradient-to-r from-amber-400 to-yellow-300 text-amber-950 shadow-sm",
};

function RarityBadge({ rarity, className = "" }) {
  const style = RARITY_STYLES[rarity] || RARITY_STYLES.Standard;
  return (
    <span
      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wide ${style} ${className}`}
    >
      {rarity === "Secret Rare" && (
        <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6-5.9-3.3-5.9 3.3 1.3-6.6L2.5 9.4l6.6-.8L12 2.5z" />
        </svg>
      )}
      {rarity}
    </span>
  );
}

export default RarityBadge;
