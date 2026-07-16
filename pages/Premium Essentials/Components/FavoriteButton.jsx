import { useContext } from "react";
import { CartContext } from "../../../App";

function FavoriteButton({ productId }) {
  const { favorites, setFavorites } = useContext(CartContext);
  const isFavorite = favorites.includes(productId);

  function toggleFavorite(e) {
    e.preventDefault();
    e.stopPropagation();
    setFavorites(
      isFavorite
        ? favorites.filter((id) => id !== productId)
        : [...favorites, productId]
    );
  }

  return (
    <button
      onClick={toggleFavorite}
      aria-label="Favorilere ekle"
      className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-white/90 dark:bg-brand-950/80 backdrop-blur shadow-card flex items-center justify-center hover:scale-105 transition-transform"
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill={isFavorite ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="1.8"
        className={isFavorite ? "text-red-500" : "text-brand-300 dark:text-brand-500"}
      >
        <path
          d="M12 20.5s-7.5-4.6-10-9.3C.5 7.8 2.4 4.5 6 4.5c2.1 0 3.6 1.2 4.5 2.6.9-1.4 2.4-2.6 4.5-2.6 3.6 0 5.5 3.3 4 6.7-2.5 4.7-10 9.3-10 9.3z"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}

export default FavoriteButton;
