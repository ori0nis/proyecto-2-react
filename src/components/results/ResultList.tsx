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
  const [listView, setListView] = useState<boolean>(false);
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
      {/* Botones de tipo de vista para móvil */}
      <div className="flex w-fit mb-2 mx-auto gap-6">
        <button
          onClick={() => setListView(true)}
          className={`block xs:hidden mx-auto cursor-pointer ${listView ? "text-red-500" : ""}`}
        >
          <svg width="28" height="28" aria-hidden="true">
            <use href="/assets/spritesheet.svg#icon-list"></use>
          </svg>
        </button>
        <button
          onClick={() => setListView(false)}
          className={`block xs:hidden mx-auto cursor-pointer ${!listView ? "text-red-500" : ""}`}
        >
          <svg width="24" height="24" aria-hidden="true">
            <use href="/assets/spritesheet.svg#icon-grid-dots"></use>
          </svg>
        </button>
      </div>

      {/* Grid o lista de libros */}
      <div
        className={
          listView
            ? "flex flex-col gap-4 p-1"
            : "grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-1"
        }
      >
        {visibleBooks.map((book) => (
          <div
            key={book.book_details.key}
            className={`flex flex-col items-center gap-0.5 text-center cursor-pointer border border-[var(--border-gray-byblos)] rounded-lg p-2 hover:scale-105 transition-transform duration-300 ease-in-out
            ${listView ? "flex flex-row items-center gap-4" : ""}`}
          >
            <div
              onClick={() => {
                setSelectedBook(book);
                setClickFromResultList(true);
                setClickFromFavorites(false);
                navigate("/books/results/book-detail");
              }}
              className={
                listView ? "flex items-center gap-4 flex-1 justify-between" : "flex flex-col items-center gap-0.5"
              }
            >
              <img
                src={book.cover_image}
                alt={book.book_details.title}
                className={listView ? "w-24 h-32 object-contain" : "w-50 h-62 object-contain mx-auto"}
              />
              <div className="text-white">
                <h3
                  className={listView ? "text-sm font-semibold text-gray-900" : "text-lg font-semibold text-gray-900"}
                >
                  {book.book_details.title}
                </h3>
                <p
                  className={
                    listView ? "text-xs text-[var(--border-gray-byblos)]" : "text-sm text-[var(--border-gray-byblos)]"
                  }
                >
                  {book.book_details.author_name.slice(0, 5).join(", ")}
                </p>
                <p
                  className={
                    listView ? "text-xs text-[var(--border-gray-byblos)]" : "text-sm text-[var(--border-gray-byblos)]"
                  }
                >
                  {book.book_details.first_publish_year}
                </p>
              </div>
              
              {/* Botón de favorito */}
              <div className="mt-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSaveAsFavorite(book);
                  }}
                  className="cursor-pointer text-xs p-1"
                >
                  {favorites.some((fav) => fav.book_details.key === book.book_details.key) ? (
                    <svg width="28" height="28" aria-hidden="true" className="text-red-500">
                      <use href="/assets/spritesheet.svg#icon-heart-filled"></use>
                    </svg>
                  ) : (
                    <svg width="28" height="28" aria-hidden="true" className="text-red-500">
                      <use href="/assets/spritesheet.svg#icon-heart-outline"></use>
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Botones de Show more y Fetch more */}
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
