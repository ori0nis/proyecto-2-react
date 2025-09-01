//? Este componente se encarga específicamente de todas las búsquedas que devuelvan más de un libro

import { useState } from "react";
import type { Book } from "../../models/book";

const BOOKS_PER_PAGE = 20;

interface Props {
  bookList: Book[];
  loading: boolean;
  error: unknown;
  onFetchMore: () => void
}

export const ResultList = ({
  bookList,
  loading,
  error,
  onFetchMore
}: Props) => {
  const [shownBooks, setShownBooks] = useState<number>(BOOKS_PER_PAGE);

  const visibleBooks = bookList.slice(0, shownBooks);
  const canShowMore = bookList.length > shownBooks;
  const canFetchMore = !canShowMore && bookList.length > 0;

  const handleShowMore = () => setShownBooks((prev) => prev + BOOKS_PER_PAGE);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error fetching books</p>;
  if (bookList.length === 0) return <p>No books found</p>;

  return (
    <div>
      {visibleBooks.map((book, index) => (
        <div key={index}>
          <h2>{book.book_details.title}</h2>
          <p>{book.book_details.author_name}</p>
          <p>{book.book_details.first_publish_year}</p>
        </div>
      ))}

      {canShowMore && <button onClick={handleShowMore}>Show more books</button>}

      {canFetchMore && <button onClick={onFetchMore}>Fetch more books</button>}
    </div>
  );
};
