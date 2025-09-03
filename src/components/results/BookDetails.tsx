import { useFavorite } from "../../context/favorites";
import { useSearch } from "../../context/search";

export const BookDetails = () => {
  const { selectedBook, setSelectedBook } = useSearch();
  const { favorites, handleSaveAsFavorite } = useFavorite();

  if (!selectedBook) return null;

  return (
    <>
      <div key={selectedBook.book_details.key}>
        <button
          onClick={() => {
            setSelectedBook(null);
          }}
        >
          ⬅ Back to results
        </button>
        <h1>{selectedBook.book_details.title}</h1>
        <img src={selectedBook.cover_image} alt={selectedBook.book_details.title} />
        <p>{selectedBook.book_details.author_name}</p>
        <p>{selectedBook.book_details.first_publish_year}</p>
      </div>
      <div>
        <button onClick={() => handleSaveAsFavorite(selectedBook)}>
          {favorites.some((fav) => fav.book_details.key === selectedBook.book_details.key)
            ? "Remove from favorites"
            : "Save as favorite"}
        </button>
        <a href={`https://openlibrary.org/books/${selectedBook.book_details.cover_edition_key}`} target="_blank">
          See more info on OpenLibrary
        </a>
      </div>
    </>
  );
};
