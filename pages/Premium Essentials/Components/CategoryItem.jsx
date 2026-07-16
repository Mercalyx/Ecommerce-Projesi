function CategoryItem({ label, isActive, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-full text-sm border transition-colors ${
        isActive
          ? "bg-brand-900 dark:bg-accent-600 text-white border-brand-900 dark:border-accent-600"
          : "bg-white dark:bg-brand-900 text-brand-700 dark:text-brand-300 border-brand-200 dark:border-brand-800 hover:border-brand-400 dark:hover:border-brand-600"
      }`}
    >
      {label}
    </button>
  );
}

export default CategoryItem;
