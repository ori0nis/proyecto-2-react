//? Este componente se encarga específicamente de todas las búsquedas que devuelvan solo un libro

import { useFavorite } from "../../context/favorites";
import { useSearch } from "../../context/search";

export const SingleResult = () => {
  const { book, loading, error, setSelectedBook } = useSearch();
  const { favorites, handleSaveAsFavorite } = useFavorite();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error fetching books</p>;
  if (!book) return <p>No books found</p>;

  return (
    <div key={book.book_details.key} onClick={() => setSelectedBook(book)}>
      <h2>{book.book_details.title}</h2>
      {book.cover_image && <img src={book.cover_image} alt={book.book_details.title}></img>}
      <p>{book.book_details.author_name.join(", ")}</p>
      <p>{book.book_details.first_publish_year}</p>
      <button onClick={() => handleSaveAsFavorite(book)}>
        {favorites.some((fav) => fav.book_details.key === book.book_details.key)
          ? "Remove from favorites"
          : "Save as favorite"}
      </button>
    </div>
  );
};
