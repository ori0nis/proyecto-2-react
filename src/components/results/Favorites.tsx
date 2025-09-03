import { useFavorite } from "../../context/favorites";
import { useSearch } from "../../context/search";

export const Favorites = () => {
  const { favorites, handleSaveAsFavorite } = useFavorite();
  const { setSelectedBook } = useSearch();

  return (
    <div>
      {favorites.map((favorite) => (
        <div key={favorite.book_details.key} onClick={() => setSelectedBook(favorite)}>
          <h2>{favorite.book_details.title}</h2>
          <img src={favorite.cover_image} alt={favorite.book_details.title} />
          <p>{favorite.book_details.author_name.join(", ")}</p>
          <p>{favorite.book_details.first_publish_year}</p>
          <button onClick={() => handleSaveAsFavorite(favorite)}>
            {favorites.some((fav) => fav.book_details.key === favorite.book_details.key)
              ? "Remove from favorites"
              : "Save as favorite"}
          </button>
        </div>
      ))}
    </div>
  );
};
