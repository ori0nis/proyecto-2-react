import { useNavigate } from "react-router-dom";
import { useFavorite } from "../../context/favorites";
import { useSearch } from "../../context/search";
import { useNavigation } from "../../context/navigation";

export const BookDetails = () => {
  const { selectedBook, setSelectedBook } = useSearch();
  const { favorites, handleSaveAsFavorite } = useFavorite();
  const { clickFromResultList, clickFromFavorites, setClickFromResultList, setClickFromFavorites } = useNavigation();
  const navigate = useNavigate();

  if (!selectedBook) return null;

  // Utilizador del flag de desde dónde vienen los clicks, para que la navegación desde BookDetails funcione bien
  const handleBack = () => {
    setSelectedBook(null);

    if (clickFromFavorites) {
      navigate("/books/results/favorites");
    } else if (clickFromResultList) {
      navigate("/books/results/result-list");
    } else {
      navigate("/books/results/book");
    }

    setClickFromFavorites(false);
    setClickFromResultList(false);
  };

  return (
    <>
      <div key={selectedBook.book_details.key}>
        <button onClick={handleBack}>⬅ Back to results</button>
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
