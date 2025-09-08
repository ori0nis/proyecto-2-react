//? Este componente se encarga específicamente de todas las búsquedas que devuelvan solo un libro

import { useNavigate } from "react-router-dom";
import { useFavorite } from "../../context/favorites";
import { useSearch } from "../../context/search";
import { useNavigation } from "../../context/navigation";

export const SingleResult = () => {
  const { book, loading, error, setSelectedBook } = useSearch();
  const { favorites, handleSaveAsFavorite } = useFavorite();
  const { setClickFromResultList, setClickFromFavorites } = useNavigation();
  const navigate = useNavigate();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error fetching books</p>;
  if (!book) return <p>No books found</p>;

  return (
    <>
      <div
        key={book.book_details.key}
        style={{ cursor: "pointer" }}
        onClick={() => {
          setSelectedBook(book);
          setClickFromResultList(false);
          setClickFromFavorites(false);
          navigate("/books/results/book-detail");
        }}
      >
        <h2>{book.book_details.title}</h2>
        {book.cover_image && <img src={book.cover_image} alt={book.book_details.title}></img>}
        <p>{book.book_details.author_name.slice(0, 5).join(", ")}</p>
        <p>{book.book_details.first_publish_year}</p>
      </div>
      <div>
        <button onClick={() => handleSaveAsFavorite(book)}>
          {favorites.some((fav) => fav.book_details.key === book.book_details.key)
            ? "Remove from favorites"
            : "Save as favorite"}
        </button>
      </div>
    </>
  );
};
