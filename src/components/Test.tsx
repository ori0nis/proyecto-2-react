import { useEffect, useState } from "react";
import { useFetch } from "../hooks/useFetch";
import type { Book } from "../models/book";

export const Test = () => {
  const [book1, setBook1] = useState<Book>();

  const {
    bookList,
    book,
    loading,
    error,
    fetchBooksByTitle,
    fetchFirstBookByTitle,
    fetchBooksByAuthor,
    fetchBooksByFirstPublishYear,
  } = useFetch();

  useEffect(() => {
    /* fetchBookByTitle("the hobbit"); */
  }, []);

  return (
    <>
      <div>
        <button onClick={() => fetchBooksByAuthor("terry pratchett")}>Buscar por autor</button>
        {bookList.map((book, index) => (
          <div key={index}>
            <h1>{book.book_details.title}</h1>
            <p>{book.book_details.author_name}</p>
            <p>{book.book_details.first_publish_year}</p>
            <img src={book.cover_image} alt={book.book_details.title} />
            <p>{book.book_details.cover_edition_key}</p>
          </div>
        ))}
      </div>
      <div>
        <button onClick={() => fetchBooksByTitle("the hobbit")}>Buscar por título</button>
        {bookList.map((book, index) => (
          <div key={index}>
            <h1>{book.book_details.title}</h1>
            <p>{book.book_details.author_name}</p>
            <p>{book.book_details.first_publish_year}</p>
            <img src={book.cover_image} alt={book.book_details.title} />
            <p>{book.book_details.cover_edition_key}</p>
          </div>
        ))}
      </div>
      <div>
        <button onClick={() => fetchFirstBookByTitle("king lear")}>Quick search</button>
        <h1>{book?.book_details.title}</h1>
        <p>{book?.book_details.author_name}</p>
        <p>{book?.book_details.first_publish_year}</p>
        <img src={book?.cover_image} alt={book?.book_details.title} />
        <p>{book?.book_details.cover_edition_key}</p>
      </div>
      <div>
        <button onClick={() => fetchBooksByFirstPublishYear(1992)}>Search by year</button>
        <h1>{book?.book_details.title}</h1>
        <p>{book?.book_details.author_name}</p>
        <p>{book?.book_details.first_publish_year}</p>
        <img src={book?.cover_image} alt={book?.book_details.title} />
        <p>{book?.book_details.cover_edition_key}</p>
      </div>
    </>
  );
};
