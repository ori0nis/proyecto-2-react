//? En muchas búsquedas por título, OpenLibrary incluye varias veces el mismo libro "original" (escrito por el autor). No son ediciones diferentes, son el mismo libro subido varias veces. Esta función solo deja pasar al libro con el autor original una vez, y también incluye libros con múltiples autores incluso si uno también es el original. Esto es porque, a veces, los autores de una obra de comentario también listan al autor original

import type { Book } from "../models/book";

export const filterOutRepeatedSingleAuthor = (books: Book[]): Book[] => {
  const filteredBooks: string[] = [];

  return books.filter((book) => {
    const authors = book.book_details.author_name;

    if (authors.length === 1) {
      const author = authors[0];
      if (!filteredBooks.includes(author)) {
        filteredBooks.push(author);
        return true; // Dejamos pasar solo el primer libro del autor en solitario
      }
      return false; // El resto se descarta
    }
    return true // Libros con múltiples autores siempre pasan
  });
};
