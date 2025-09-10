import { useNavigate } from "react-router-dom";
import { useFavorite } from "../../context/favorites";
import { useSearch } from "../../context/search";
import { useNavigation } from "../../context/navigation";
import { ArrowLeft } from "lucide-react";

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
    <div className="w-full h-full flex flex-col items-start pt-0 xs:pt-4">
      {/* Botón volver arriba a la izquierda */}
      <button onClick={handleBack} className="self-start flex items-center gap-1 text-sm font-medium">
        <ArrowLeft className="w-5 h-5" /> Back to results
      </button>

      <div>
        <h2 className="mx-auto text-center text-2xl pt-4">Book details</h2>
        {/* Contenedor principal */}
        <div
          key={selectedBook.book_details.key}
          className="grid grid-cols-1 sm:grid-cols-[auto_1fr] gap-6 items-center p-6 rounded-lg mt-6 border border-[var(--border-gray-byblos)]"
        >
          {/* Imagen */}
          <img
            src={selectedBook.cover_image}
            alt={selectedBook.book_details.title}
            className="w-40 h-auto object-contain mx-auto sm:mx-0"
          />

          {/* Info */}
          <div className="flex flex-col gap-2 items-center sm:items-start">
            <h1 className="text-xl font-bold">{selectedBook.book_details.title}</h1>
            <p className="text-sm">{selectedBook.book_details.author_name}</p>
            <p className="text-sm">{selectedBook.book_details.first_publish_year}</p>

            {/* Botones de favorito y más info*/}
            <div className="flex flex-col sm:flex-row gap-2 mt-2">
              <button
                onClick={() => handleSaveAsFavorite(selectedBook)}
                className="border border-[var(--border-gray-byblos)] bg-red-200 rounded-lg px-4 py-1 text-sm w-fit mx-auto"
              >
                {favorites.some((fav) => fav.book_details.key === selectedBook.book_details.key) ? (
                  <svg width="28" height="28" aria-hidden="true" className="text-red-500">
                    <use href="/assets/spritesheet.svg#icon-heart-filled"></use>
                  </svg>
                ) : (
                  <svg width="28" height="28" aria-hidden="true" className="text-red-500">
                    <use href="/assets/spritesheet.svg#icon-heart-outline"></use>
                  </svg>
                )}
              </button>

              <a
                href={`https://openlibrary.org/books/${selectedBook.book_details.cover_edition_key}`}
                target="_blank"
                className="border border-[var(--border-gray-byblos)] bg-blue-300 rounded-lg px-4 py-2 text-sm text-center"
              >
                See more info on OpenLibrary
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
