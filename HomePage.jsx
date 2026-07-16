import { Link } from "react-router-dom";

function HomePage() {
  return (
    <main className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8 text-center">
      <h1 className="text-3xl font-bold text-gray-900">Premium Essentials</h1>
      <p className="mt-3 text-gray-500">Günlük hayatın temel parçaları, tek yerde.</p>
      <Link
        to="/premium-essentials"
        className="inline-block mt-8 px-6 py-3 bg-gray-900 text-white rounded-lg text-sm font-medium"
      >
        Ürünleri Keşfet
      </Link>
    </main>
  );
}

export default HomePage;
