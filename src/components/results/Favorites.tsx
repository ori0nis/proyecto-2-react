import { useNavigate } from "react-router-dom";
import { useFavorite } from "../../context/favorites";
import { useSearch } from "../../context/search";
import { useNavigation } from "../../context/navigation";

export const Favorites = () => {
  const { favorites, handleSaveAsFavorite } = useFavorite();
  const { setSelectedBook } = useSearch();
  const { setClickFromFavorites, setClickFromResultList } = useNavigation();
  const navigate = useNavigate();

  return (
    <div>
      {favorites.map((favorite) => (
        <>
          <div
            key={favorite.book_details.key}
            style={{ cursor: "pointer" }}
            onClick={() => {
              setSelectedBook(favorite);
              setClickFromFavorites(true);
              setClickFromResultList(false);
              navigate("/books/results/book-detail");
            }}
          >
            <h2>{favorite.book_details.title}</h2>
            <img src={favorite.cover_image} alt={favorite.book_details.title} />
            <p>{favorite.book_details.author_name.join(", ")}</p>
            <p>{favorite.book_details.first_publish_year}</p>
          </div>
          <div>
            <button onClick={() => handleSaveAsFavorite(favorite)}>
              {favorites.some((fav) => fav.book_details.key === favorite.book_details.key)
                ? "Remove from favorites"
                : "Save as favorite"}
            </button>
          </div>
        </>
      ))}
    </div>
  );
};
