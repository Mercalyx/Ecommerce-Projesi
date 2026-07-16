import { Link } from "react-router-dom";

function BreadCrumb() {
  return (
    <nav className="text-sm text-gray-500 mb-4">
      <Link to="/" className="hover:text-gray-700">
        Ana Sayfa
      </Link>
      <span className="mx-2">/</span>
      <span className="text-gray-800">Sepetim</span>
    </nav>
  );
}

export default BreadCrumb;
