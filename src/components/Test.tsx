import { useEffect, useState } from "react";
import { useFetch } from "../hooks/useFetch";
import { getFirstBookByTitle } from "../services/axios/axios.service";
import type { BookFromTitleSearch } from "../models/book";

export const Test = () => {
  const [book1, setBook1] = useState<BookFromTitleSearch>();

  const { bookList, book, fetchBooksByTitle, fetchFirstBookByTitle } = useFetch();

  const testFetch = async () => {
    /* const fetchData = await fetch("https://openlibrary.org/search.json?title=king+lear");
    const data = await fetchData.json(); */

    const data = await getFirstBookByTitle("king lear");

    setBook1(data);

    console.log(data);
  };

  useEffect(() => {
    /* fetchBookByTitle("the hobbit"); */
  }, []);

  return (
    <>
      <div>
        <button onClick={testFetch}>Buscar</button>
        <h1>{book1?.book_details.title}</h1>
        <p>{book1?.book_details.author_name}</p>
        <p>{book1?.book_details.first_publish_year}</p>
        <img src={book1?.cover_image} alt={book1?.book_details.title} />
        <p>{book1?.book_details.cover_edition_key}</p>
      </div>
      <div>
        <button onClick={() => fetchBooksByTitle("king lear")}>Buscar</button>
        {bookList?.map((book, book_id) => (
          <div key={book_id}>
            <h1>{book.book_details.title}</h1>
            <p>{book.book_details.author_name}</p>
            <p>{book.book_details.first_publish_year}</p>
            <p>{book_id}</p>
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
        <p>{book?.book_id}</p>
        <img src={book?.cover_image} alt={book?.book_details.title} />
        <p>{book?.book_details.cover_edition_key}</p>
      </div>
    </>
  );
};
