import { Link } from "react-router-dom";

function BreadCrumb() {
  return (
    <nav className="text-sm text-brand-500 dark:text-brand-400 mb-4">
      <Link to="/" className="hover:text-brand-800 dark:hover:text-white">
        Ana Sayfa
      </Link>
      <span className="mx-2">/</span>
      <span className="text-brand-800 dark:text-brand-200">Sepetim</span>
    </nav>
  );
}

export default BreadCrumb;
