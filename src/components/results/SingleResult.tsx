//? Este componente se encarga específicamente de todas las búsquedas que devuelvan solo un libro

import { useSearch } from "../../context/search";

export const SingleResult = () => {
  const { book, loading, error } = useSearch();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error fetching books</p>;
  if (!book) return <p>No books foundº</p>;

  return (
    <div>
      <h2>{book.book_details.title}</h2>
      <img src={book.cover_image}></img>
      <p>{book.book_details.author_name}</p>
      <p>{book.book_details.first_publish_year}</p>
    </div>
  );
};
