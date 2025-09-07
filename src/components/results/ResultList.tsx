//? Este componente se encarga específicamente de todas las búsquedas que devuelvan más de un libro. Mostramos solo 20 resultados de los 100 obtenidos por cada Show More con un slice. Cuando nos acabamos la página 1, llamamos a la 2 con FetchMoreBooks. Show More vuelve a aparecer para seguir enseñando los libros del nuevo fetch

import { useState } from "react";
import { useSearch } from "../../context/search";
import { useFavorite } from "../../context/favorites";
import { useNavigate } from "react-router-dom";
import { useNavigation } from "../../context/navigation";

const BOOKS_PER_PAGE = 20;

export const ResultList = () => {
  const { bookList, loading, loadingMore, error, handleFetchMore, setSelectedBook } = useSearch();
  const { favorites, handleSaveAsFavorite } = useFavorite();
  const [shownBooks, setShownBooks] = useState<number>(BOOKS_PER_PAGE);
  const { setClickFromResultList, setClickFromFavorites } = useNavigation();
  const navigate = useNavigate();

  const visibleBooks = bookList.slice(0, shownBooks);
  const canShowMore = bookList.length > shownBooks;
  const canFetchMore = !canShowMore && bookList.length > 0;

  const handleShowMore = () => setShownBooks((prev) => prev + BOOKS_PER_PAGE);

  if (loading) return <p>Loading results...</p>;
  if (error) return <p>Error fetching books</p>;
  if (bookList.length === 0) return <p>No books found</p>;

  return (
    <>
      <div className="grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-1">
        {visibleBooks.map((book) => (
          <div className="cursor-pointer text-center border border-[var(--border-gray-byblos)] rounded-lg p-2 flex flex-col items-center justify-center gap-1 hover:scale-105 transition-transform duration-300 ease-in-out">
            <div
              key={book.book_details.key}
              className="flex flex-col items-center gap-0.5 text-center"
              onClick={() => {
                setSelectedBook(book);
                setClickFromResultList(true);
                setClickFromFavorites(false);
                navigate("/books/results/book-detail");
              }}
            >
              <img
                src={book.cover_image}
                alt={book.book_details.title}
                className="w-60 h-72 object-contain mx-auto"
              ></img>
              <h3 className="text-lg font-semibold">{book.book_details.title}</h3>
              <p className="text-sm">{book.book_details.author_name.join(", ")}</p>{" "}
              {/* //TODO: Vigilar arrays con demasiados autores */}
              <p className="text-sm">{book.book_details.first_publish_year}</p>
            </div>
            <div>
              <button
                onClick={() => handleSaveAsFavorite(book)}
                className="cursor-pointer border border-[var(--border-gray-byblos)] rounded-lg text-xs p-1"
              >
                {favorites.some((fav) => fav.book_details.key === book.book_details.key)
                  ? "Remove from favorites"
                  : "Save as favorite"}
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-col items-center mt-4 w-full">
        {canShowMore && (
          <button
            onClick={handleShowMore}
            className="cursor-pointer text-center p-2 mt-2 border border-[var(--border-gray-byblos)] rounded-lg"
          >
            Show more books
          </button>
        )}

        {canFetchMore && (
          <button
            onClick={handleFetchMore}
            className="cursor-pointer text-center p-2 mt-2 border border-[var(--border-gray-byblos)] rounded-lg"
          >
            Fetch more books
          </button>
        )}

        {loadingMore && <p className="mt-2">Loading more books...</p>}
      </div>
    </>
  );
};
