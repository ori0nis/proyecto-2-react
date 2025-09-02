//? Este util mapea un tipo OpenLibraryDoc (la respuesta cruda de búsqueda por título) a Book, el tipo que consumen useFetch y los componentes

import type { Book, OpenLibraryDoc } from "../models/book";

export const mapDocsToBooks = (doc: OpenLibraryDoc): Book => {
  return {
    book_details: {
      title: doc.title,
      author_name: doc.author_name ?? ["Unknown"],
      first_publish_year: doc.first_publish_year ?? 0,
      cover_edition_key: doc.cover_edition_key ?? "",
      cover_i: doc.cover_i ?? 0,
    },
    cover_size: "M",
    cover_image: doc.cover_edition_key
      ? `https://covers.openlibrary.org/b/olid/${doc.cover_edition_key}-M.jpg`
      : doc.cover_i
      ? `https://covers.openlibrary.org/b/id/${doc.cover_i}-M.jpg`
      : "/images/no-cover-available.jpg",
  };
};
