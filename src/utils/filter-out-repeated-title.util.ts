//? Este filtro deja pasar al primer libro con X título y quita los anteriores, para que no haya duplicados

import type { Book } from "../models/book";

export const filterOutRepeatedTitle = (books: Book[]): Book[] => {
  const filteredBooks: string[] = [];

  return books.filter((book) => {
    const bookTitle = book.book_details.title;

    if (!filteredBooks.includes(bookTitle)) {
      filteredBooks.push(bookTitle);
      return true;
    }
    return false;
  });
};
