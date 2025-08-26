import { useState } from "react";
/* import { getBooksByTitle } from "../services/axios/axios.service"; */

export const Test = () => {
  const [book, setBook] = useState({
    title: "",
    author: "",
    publish_year: 0,
    cover_edition_key: "",
    cover_i: "",
    size: "",
    cover_image: "",
  });

  const testFetch = async () => {
    const fetchData = await fetch("https://openlibrary.org/search.json?title=the+hobbit");
    const data = await fetchData.json();

    const title = data.docs[0].title;
    const author = data.docs[0].author_name[0];
    const year = data.docs[0].first_publish_year;
    const coverKey = data.docs[0].cover_edition_key;
    const coverId = data.docs[0].cover_i;
    const size = "M";

    setBook({
      title,
      author,
      publish_year: year,
      cover_edition_key: coverKey,
      cover_i: coverId,
      size,
      cover_image: coverKey
        ? `https://covers.openlibrary.org/b/olid/${coverKey}-${size}.jpg`
        : coverId
        ? `https://covers.openlibrary.org/b/id/${coverId}-${size}`
        : "/public/images/no-cover-available.jpg",
    });

    console.log(data);
  };

  /* getBooksByTitle({ title: "king lear" }); */

  return (
    <div>
      <button onClick={testFetch}>Buscar</button>
      <h1>{book.title}</h1>
      <p>{book.author}</p>
      <p>{book.publish_year}</p>
      <img src={book.cover_image} alt={book.title} />
      <p>{book.cover_edition_key}</p>
    </div>
  );
};
