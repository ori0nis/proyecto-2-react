//? useFetch pasa las requests de axios mapeadas por filtros adicionales y las sirve a los componentes

import { useState } from "react";
import { getBooksByTitle, getFirstBookByTitle } from "../services/axios/axios.service";
import type { BookFromTitleSearch } from "../models/book";
import { filterOutRepeatedSingleAuthor } from "../utils";

export const useFetch = () => {
  const [bookList, setBookList] = useState<BookFromTitleSearch[] | null>([]);
  const [book, setBook] = useState<BookFromTitleSearch | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchBooksByTitle = async (title: string) => {
    setLoading(true);
    setError(null);

    try {
      const data = await getBooksByTitle(title);
      const filteredBookList = filterOutRepeatedSingleAuthor(data);

      console.log(filteredBookList);
      setBookList(filteredBookList);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error.message);
        setError(error.message);
      } else {
        console.error(error);
        setError("Unknown error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchFirstBookByTitle = async (title: string) => {
    setLoading(true);
    setError(null);

    try {
      const bookToShow = await getFirstBookByTitle(title);
      console.log(bookToShow);
      setBook(bookToShow);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error.message);
        setError(error.message);
      } else {
        console.error(error);
        setError("Unknown error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return { bookList, book, fetchBooksByTitle, fetchFirstBookByTitle };
};
