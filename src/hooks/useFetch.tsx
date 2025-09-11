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
  //! Creo cachés para que no salte el 429 de OpenLibrary. Las búsquedas random no están cacheadas porque si no siempre devolverían lo mismo
  const cache: Record<string, Book[]> = {};
  const singleBookCache: Record<string, Book> = {};

  const [bookList, setBookList] = useState<Book[]>([]);
  const [book, setBook] = useState<Book>({
    book_details: {
      title: "",
      author_name: [],
      first_publish_year: 0,
      cover_edition_key: "",
      cover_i: 0,
      key: "",
    },
    cover_size: "",
    cover_image: "",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  // Estados para paginación
  const [searchType, setSearchType] = useState<string>("");
  const [currentSearch, setCurrentSearch] = useState<string>("");
  const [advancedCurrentSearch, setAdvancedCurrentSearch] = useState<AdvancedSearchParams>({
    title: "",
    author: "",
    year: "",
    subject: "",
    language: "",
    page: 1,
  });
  const [currentPage, setCurrentPage] = useState<number>(1);

  const fetchBooksByTitle = async (title: string, loadMore: boolean = false) => {
    setSearchType("title");

    if (loadMore) {
      setLoadingMore(true);
    } else {
      setLoading(true);
      setBookList([]);
    }

    try {
      const pageToFetch = loadMore ? currentPage + 1 : 1;

      // Si no estamos pidiendo más libros y la búsqueda está en caché, devolvemos la caché
      if (!loadMore && cache[title]) {
        setBookList(cache[title]);
        setCurrentSearch(title);
        setCurrentPage(1);
        return;
      }

      const books = await getBooksByTitle(title, pageToFetch);
      const filteredBookList = filterOutRepeatedSingleAuthor(books);

      if (loadMore) {
        setBookList((prev) => [...prev, ...filteredBookList]);
        setCurrentPage((prev) => prev + 1);
      } else {
        setBookList(filteredBookList);
        setCurrentSearch(title);
        setCurrentPage(1);
        cache[title] = filteredBookList;
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
      if (loadMore) {
        setLoadingMore(false);
      } else {
        setLoading(false);
      }
    }
  };

  const fetchFirstBookByTitle = async (title: string) => {
    setLoading(true);
    setSearchType("single title");

    try {
      if (singleBookCache[title]) {
        setBook(singleBookCache[title]);
        setLoading(false);
        return;
      }

      const bookToShow = await getFirstBookByTitle(title);

      setBook(bookToShow);
      singleBookCache[title] = bookToShow;
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
    setSearchType("author");

    if (loadMore) {
      setLoadingMore(true);
    } else {
      setLoading(true);
      setBookList([]);
    }

    try {
      const pageToFetch = loadMore ? currentPage + 1 : 1;

      if (!loadMore && cache[author]) {
        setBookList(cache[author]);
        setCurrentSearch(author);
        setCurrentPage(1);
        return;
      }

      const books = await getBooksByAuthor(author, pageToFetch);
      const filteredBookList = filterOutRepeatedTitle(books);

      if (loadMore) {
        setBookList((prev) => [...prev, ...filteredBookList]);
        setCurrentPage((prev) => prev + 1);
      } else {
        setBookList(filteredBookList);
        setCurrentSearch(author);
        setCurrentPage(1);
        cache[author] = filteredBookList;
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
      if (loadMore) {
        setLoadingMore(false);
      } else {
        setLoading(false);
      }
    }
  };

  const fetchBooksByFirstPublishYear = async (year: string, loadMore: boolean = false) => {
    setSearchType("year");

    if (loadMore) {
      setLoadingMore(true);
    } else {
      setLoading(true);
      setBookList([]);
    }

    try {
      const pageToFetch = loadMore ? currentPage + 1 : 1;

      if (!loadMore && cache[year]) {
        setBookList(cache[year]);
        setCurrentSearch(year);
        setCurrentPage(1);
        return;
      }

      const books = await getBooksByFirstPublishYear(year, pageToFetch);
      const filteredBookList = filterOutRepeatedTitle(books);

      if (loadMore) {
        setBookList((prev) => [...prev, ...filteredBookList]);
        setCurrentPage((prev) => prev + 1);
      } else {
        setBookList(filteredBookList);
        setCurrentSearch(year);
        setCurrentPage(1);
        cache[year] = filteredBookList;
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
      if (loadMore) {
        setLoadingMore(false);
      } else {
        setLoading(false);
      }
    }
  };

  const fetchBooksBySubject = async (subject: string, loadMore: boolean = false) => {
    setSearchType("subject");

    if (loadMore) {
      setLoadingMore(true);
    } else {
      setLoading(true);
      setBookList([]);
    }

    try {
      const pageToFetch = loadMore ? currentPage + 1 : 1;

      if (!loadMore && cache[subject]) {
        setBookList(cache[subject]);
        setCurrentSearch(subject);
        setCurrentPage(1);
        return;
      }

      const books = await getBooksBySubject(subject, pageToFetch);
      const filteredBookList = filterOutRepeatedTitle(books);

      if (loadMore) {
        setBookList((prev) => [...prev, ...filteredBookList]);
        setCurrentPage((prev) => prev + 1);
      } else {
        setBookList(filteredBookList);
        setCurrentSearch(subject);
        setCurrentPage(1);
        cache[subject] = filteredBookList;
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
      if (loadMore) {
        setLoadingMore(false);
      } else {
        setLoading(false);
      }
    }
  };

  const fetchAdvancedSearch = async (params: AdvancedSearchParams, loadMore: boolean = false) => {
    setSearchType("advanced search");

    if (loadMore) {
      setLoadingMore(true);
    } else {
      setLoading(true);
      setBookList([]);
    }

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
      if (loadMore) {
        setLoadingMore(false);
      } else {
        setLoading(false);
      }
    }
  };

  const fetchRandomBookByAuthor = async (author: string) => {
    setLoading(true);

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
    searchType,
    setSearchType,
    currentPage,
    currentSearch,
    advancedCurrentSearch,
    loading,
    loadingMore,
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
