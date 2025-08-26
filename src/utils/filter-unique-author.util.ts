import type { Book } from "../models/book";

export const filterUniqueAuthor = (books: Book[]): Book[] => {
  const booksThatWillBeShown = new Set<string>();

  return books.filter((book) => {
    const authors = book.author_name;

    // Si el libro tiene un solo autor, lo dejamos pasar salvo que ya esté en el set (ya tenemos el libro original del autor)
    if (authors?.length === 1) {
      const author = authors[0];
      if (booksThatWillBeShown.has(author)) {
        return false;
      } else {
        booksThatWillBeShown.add(author);
        return true;
      }
    }
    // Libros con múltiples autores siempre pasan. A veces, un autor que haga una versión comentada de un libro muy conocido puede listar también a su autor original y no queremos perder esos
    return true;
  });
};
