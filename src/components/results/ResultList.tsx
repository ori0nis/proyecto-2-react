//? Este componente se encarga específicamente de todas las búsquedas que devuelvan más de un libro. Mostramos solo 20 resultados de los 100 obtenidos por cada Show More con un slice. Cuando nos acabamos la página 1, llamamos a la 2 con FetchMoreBooks. Show More vuelve a aparecer para seguir enseñando los libros del nuevo fetch

import { useState } from "react";
import { useSearch } from "../../context/search";
import { useFavorite } from "../../context/favorites";
import { useNavigate } from "react-router-dom";

const BOOKS_PER_PAGE = 20;

export const ResultList = () => {
  const { bookList, loading, loadingMore, error, handleFetchMore, setSelectedBook } = useSearch();
  const { favorites, handleSaveAsFavorite } = useFavorite();
  const [shownBooks, setShownBooks] = useState<number>(BOOKS_PER_PAGE);
  const navigate = useNavigate();

  const visibleBooks = bookList.slice(0, shownBooks);
  const canShowMore = bookList.length > shownBooks;
  const canFetchMore = !canShowMore && bookList.length > 0;

  const handleShowMore = () => setShownBooks((prev) => prev + BOOKS_PER_PAGE);

  if (loading) return <p>Loading results...</p>;
  if (error) return <p>Error fetching books</p>;
  if (bookList.length === 0) return <p>No books found</p>;

  return (
    <div>
      {visibleBooks.map((book) => (
        <>
          <div
            key={book.book_details.key}
            style={{ cursor: "pointer" }}
            onClick={() => {
              setSelectedBook(book);
              navigate("/books/results/book-detail");
            }}
          >
            <h2>{book.book_details.title}</h2>
            <img src={book.cover_image} alt={book.book_details.title}></img>
            <p>{book.book_details.author_name.join(", ")}</p>
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
      ))}

      {canShowMore && <button onClick={handleShowMore}>Show more books</button>}

      {canFetchMore && <button onClick={handleFetchMore}>Fetch more books</button>}

      {loadingMore && <p>Loading more books...</p>}
    </div>
  );
};
