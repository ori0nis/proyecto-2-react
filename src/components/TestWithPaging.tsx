import { useState } from "react";
import { useFetch } from "../hooks/useFetch";

const PAGE_SIZE = 20;

export const TestWithPaging = () => {
  const { bookList, fetchBooksByTitle, loading, error } = useFetch();
  const [booksPerPage, setBooksPerPage] = useState<number>(PAGE_SIZE);

  const handleShowMore = () => {
    setBooksPerPage((prev) => prev + PAGE_SIZE);
  };

  const visibleBooks = bookList.slice(0, booksPerPage);

  return (
    <div>
      <button onClick={() => fetchBooksByTitle("the hobbit")}>Buscar</button>

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

      {visibleBooks.length < bookList.length && <button onClick={handleShowMore}>Show more</button>}
    </div>
  );
};
