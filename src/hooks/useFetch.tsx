//? useFetch pasa las requests de axios mapeadas por filtros adicionales y las sirve a los componentes

import { useState } from "react";
import {
  getBooksByAuthor,
  getBooksByFirstPublishYear,
  getBooksByTitle,
  getFirstBookByTitle,
} from "../services/axios/axios.service";
import type { Book } from "../models/book";
import { filterOutRepeatedSingleAuthor, filterOutRepeatedTitle } from "../utils";

export const useFetch = () => {
  const [bookList, setBookList] = useState<Book[]>([]);
  const [book, setBook] = useState<Book | null>(null);
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

  const fetchBooksByAuthor = async (author: string) => {
    setLoading(true);
    setError(null);

    try {
      const books = await getBooksByAuthor(author);
      const filteredBookList = filterOutRepeatedTitle(books);

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

  const fetchBooksByFirstPublishYear = async (year: number) => {
    setLoading(true);
    setError(null);

    try {
      const books = await getBooksByFirstPublishYear(year);
      const filteredBookList = filterOutRepeatedTitle(books);

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

  return {
    bookList,
    book,
    loading,
    error,
    fetchBooksByTitle,
    fetchFirstBookByTitle,
    fetchBooksByAuthor,
    fetchBooksByFirstPublishYear,
  };
};
