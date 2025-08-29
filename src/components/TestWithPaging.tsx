//? Mostramos solo 20 resultados de los 100 obtenidos por cada Show More con un slice. Cuando nos acabamos la página 1, llamamos a la 2 con FetchMoreBooks. Show More vuelve a aparecer para seguir enseñando los libros del nuevo fetch   

import { useState } from "react";
import { useFetch } from "../hooks/useFetch";

const BOOKS_PER_PAGE = 20;

export const TestWithPaging = () => {
  const { bookList, loading, error, currentSearch, fetchBooksByTitle, fetchBooksBySubject, fetchBooksByAuthor, fetchBooksByFirstPublishYear } = useFetch();
  const [shownBooks, setShownBooks] = useState<number>(BOOKS_PER_PAGE);

  const visibleBooks = bookList.slice(0, shownBooks);

  const canShowMore = shownBooks < bookList.length;
  const canFetchMore = !canShowMore && bookList.length > 0;

  const handleShowMore = () => {
    setShownBooks((prev) => prev + BOOKS_PER_PAGE);
  };

  return (
    <div>
      <button onClick={() => fetchBooksBySubject("terror")}>Buscar desde componente con paginación</button>

      {loading && <p>Cargando...</p>}
      {error && <p>{error}</p>}

      {visibleBooks.map((book, index) => (
        <div key={index}>
          <h2>{book.book_details.title}</h2>
          <p>{book.book_details.author_name.join(", ")}</p>
          <p>{book.book_details.first_publish_year}</p>
          <img src={book.cover_image} alt={book.book_details.title} />
        </div>
      ))}

      {canShowMore && <button onClick={handleShowMore}>Show more books</button>}

      {canFetchMore && <button onClick={() => fetchBooksBySubject(currentSearch, true)}>Fetch more books</button>}
    </div>
  );
};
