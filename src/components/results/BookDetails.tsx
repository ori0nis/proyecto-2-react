import { useFavorite } from "../../context/favorites";
import { useSearch } from "../../context/search";

export const BookDetails = () => {
  const { book } = useSearch();
  const { favorites, handleSaveAsFavorite } = useFavorite();

  return (
    <div key={book.book_details.key}>
      <h1>{book.book_details.title}</h1>
      <img src={book.cover_image} alt={book.book_details.title} />
      <p>{book.book_details.author_name}</p>
      <p>{book.book_details.first_publish_year}</p>
      <button onClick={() => handleSaveAsFavorite(book)}>
        {favorites.some((fav) => fav.book_details.key === book.book_details.key)
          ? "Remove from favorites"
          : "Save as favorite"}
      </button>
      <a href={`https://openlibrary.org/books/${book.book_details.cover_edition_key}`} target="_blank">
        See more info on OpenLibrary
      </a>
    </div>
  );
};
