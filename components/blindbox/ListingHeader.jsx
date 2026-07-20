function ListingHeader({ title, subtitle }) {
  return (
    <div className="mb-6">
      <h2 className="font-display text-2xl sm:text-3xl font-semibold text-brand-950 dark:text-white">{title}</h2>
      <p className="text-sm text-brand-600 dark:text-brand-300 mt-1.5">{subtitle}</p>
    </div>
  );
}

export default ListingHeader;
