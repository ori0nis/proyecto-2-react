//? Este componente se encarga específicamente de todas las búsquedas que devuelvan más de un libro. Mostramos solo 20 resultados de los 100 obtenidos por cada Show More con un slice. Cuando nos acabamos la página 1, llamamos a la 2 con FetchMoreBooks. Show More vuelve a aparecer para seguir enseñando los libros del nuevo fetch

import { useState } from "react";
import { useSearch } from "../../context/search";

const BOOKS_PER_PAGE = 20;

export const ResultList = () => {
  const { bookList, loading, loadingMore, error, handleFetchMore } = useSearch();
  const [shownBooks, setShownBooks] = useState<number>(BOOKS_PER_PAGE);

  const visibleBooks = bookList.slice(0, shownBooks);
  const canShowMore = bookList.length > shownBooks;
  const canFetchMore = !canShowMore && bookList.length > 0;

  const handleShowMore = () => setShownBooks((prev) => prev + BOOKS_PER_PAGE);

  if (loading) return <p>Loading results...</p>;
  if (error) return <p>Error fetching books</p>;
  if (bookList.length === 0) return <p>No books found</p>;

  return (
    <div>
      {visibleBooks.map((book, index) => (
        <div key={index}>
          <h2>{book.book_details.title}</h2>
          <img src={book.cover_image} alt={book.book_details.title}></img>
          <p>{book.book_details.author_name.join(", ")}</p>
          <p>{book.book_details.first_publish_year}</p>
        </div>
      ))}

      {canShowMore && <button onClick={handleShowMore}>Show more books</button>}

      {canFetchMore && <button onClick={handleFetchMore}>Fetch more books</button>}

      {loadingMore && <p>Loading more books...</p>}
    </div>
  );
};
