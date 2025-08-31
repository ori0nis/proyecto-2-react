/* eslint-disable @typescript-eslint/no-explicit-any */
//? useFetch pasa las requests de axios mapeadas por filtros adicionales. Además, permite la paginación habilitando a que una llamada con loadMore = true dispare el request a la página 2, 3 y etc

import { useState } from "react";
import {
  advancedSearch,
  getBooksByAuthor,
  getBooksByFirstPublishYear,
  getBooksBySubject,
  getBooksByTitle,
  getFirstBookByTitle,
  randomBookRecByAuthor,
  randomBookRecBySubject,
  randomBookRecByYear,
} from "../services/axios/axios.service";
import type { Book } from "../models/book";
import { filterOutRepeatedSingleAuthor, filterOutRepeatedTitle } from "../utils";
import type { AdvancedSearchParams } from "../models/search";

export const useFetch = () => {
  const [bookList, setBookList] = useState<Book[]>([]);
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  // Estados para paginación
  const [currentSearch, setCurrentSearch] = useState<string>("");
  const [advancedCurrentSearch, setAdvancedCurrentSearch] = useState<AdvancedSearchParams | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const fetchBooksByTitle = async (title: string, loadMore: boolean = false) => {
    setLoading(true);
    setError(null);

    try {
      const pageToFetch = loadMore ? currentPage + 1 : 1;

      const books = await getBooksByTitle(title, pageToFetch);
      const filteredBookList = filterOutRepeatedSingleAuthor(books);

      if (loadMore) {
        setBookList((prev) => [...prev, ...filteredBookList]);
        setCurrentPage((prev) => prev + 1);
      } else {
        setBookList(filteredBookList);
        setCurrentSearch(title);
        setCurrentPage(1);
      }
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

  const fetchBooksByAuthor = async (author: string, loadMore: boolean = false) => {
    setLoading(true);
    setError(null);

    try {
      const pageToFetch = loadMore ? currentPage + 1 : 1;

      const books = await getBooksByAuthor(author, pageToFetch);
      const filteredBookList = filterOutRepeatedTitle(books);

      if (loadMore) {
        setBookList((prev) => [...prev, ...filteredBookList]);
        setCurrentPage((prev) => prev + 1);
      } else {
        setBookList(filteredBookList);
        setCurrentSearch(author);
        setCurrentPage(1);
      }
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

  const fetchBooksByFirstPublishYear = async (year: string, loadMore: boolean = false) => {
    setLoading(true);
    setError(null);

    try {
      const pageToFetch = loadMore ? currentPage + 1 : 1;

      const books = await getBooksByFirstPublishYear(year, pageToFetch);
      const filteredBookList = filterOutRepeatedTitle(books);

      if (loadMore) {
        setBookList((prev) => [...prev, ...filteredBookList]);
        setCurrentPage((prev) => prev + 1);
      } else {
        setBookList(filteredBookList);
        setCurrentSearch(year);
        setCurrentPage(1);
      }
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

  const fetchBooksBySubject = async (subject: string, loadMore: boolean = false) => {
    setLoading(true);
    setError(null);

    try {
      const pageToFetch = loadMore ? currentPage + 1 : 1;

      const books = await getBooksBySubject(subject, pageToFetch);
      const filteredBookList = filterOutRepeatedTitle(books);

      if (loadMore) {
        setBookList((prev) => [...prev, ...filteredBookList]);
        setCurrentPage((prev) => prev + 1);
      } else {
        setBookList(filteredBookList);
        setCurrentSearch(subject);
        setCurrentPage(1);
      }
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

  const fetchAdvancedSearch = async (params: AdvancedSearchParams, loadMore: boolean = false) => {
    setLoading(true);
    setError(null);

    try {
      const pageToFetch = loadMore ? currentPage + 1 : 1;

      const books = await advancedSearch({
        ...params,
        page: pageToFetch,
      });

      const filteredBookList = filterOutRepeatedTitle(books);
      if (loadMore) {
        setBookList((prev) => [...prev, ...filteredBookList]);
        setCurrentPage((prev) => prev + 1);
      } else {
        setBookList(filteredBookList);
        setAdvancedCurrentSearch(params);
        setCurrentPage(1);
      }
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

  const fetchRandomBookByAuthor = async (author: string) => {
    setLoading(true);
    setError(null);

    try {
      const book = await randomBookRecByAuthor(author);
      setBook(book);
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

  const fetchRandomBookByYear = async (year: string) => {
    setLoading(true);
    setError(null);

    try {
      const book = await randomBookRecByYear(year);
      setBook(book);
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

  const fetchRandomBookBySubject = async (subject: string) => {
    setLoading(true);
    setError(null);

    try {
      const book = await randomBookRecBySubject(subject);
      setBook(book);
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
    currentPage,
    currentSearch,
    advancedCurrentSearch,
    loading,
    error,
    fetchBooksByTitle,
    fetchFirstBookByTitle,
    fetchBooksByAuthor,
    fetchBooksByFirstPublishYear,
    fetchBooksBySubject,
    fetchRandomBookByAuthor,
    fetchRandomBookByYear,
    fetchRandomBookBySubject,
    fetchAdvancedSearch,
  };
};
