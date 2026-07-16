import { useContext } from "react";
import { CartContext } from "../../../App";

function FavoriteButton({ productId }) {
  const { favorites, setFavorites } = useContext(CartContext);
  const isFavorite = favorites.includes(productId);

  function toggleFavorite() {
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
      className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white shadow flex items-center justify-center"
    >
      <span className={isFavorite ? "text-red-500" : "text-gray-300"}>
        {isFavorite ? "♥" : "♡"}
      </span>
    </button>
  );
}

export default FavoriteButton;
