import { useState, type ReactNode } from "react";
import { SearchContext } from "./SearchContext";
import { useFetch } from "../../hooks/useFetch";
import type { AdvancedSearchParams } from "../../models/search";

interface Props {
  children: ReactNode;
}

export const SearchProvider = ({ children }: Props) => {
  const fetchAnything = useFetch();
  const [hasSearched, setHasSearched] = useState(false);

  // Envolvemos cada fetch para setear hasSearched, y así poder proteger las rutas internas
  const fetchBooksByTitle = async (title: string, loadMore: boolean = false) => {
    await fetchAnything.fetchBooksByTitle(title, loadMore);
    setHasSearched(true);
  };

  const fetchFirstBookByTitle = async (title: string) => {
    await fetchAnything.fetchFirstBookByTitle(title);
    setHasSearched(true);
  };

  const fetchBooksByAuthor = async (author: string, loadMore: boolean = false) => {
    await fetchAnything.fetchBooksByAuthor(author, loadMore);
    setHasSearched(true);
  };

  const fetchBooksByFirstPublishYear = async (year: string, loadMore: boolean = false) => {
    await fetchAnything.fetchBooksByFirstPublishYear(year, loadMore);
    setHasSearched(true);
  };

  const fetchBooksBySubject = async (subject: string, loadMore: boolean = false) => {
    await fetchAnything.fetchBooksBySubject(subject, loadMore);
    setHasSearched(true);
  };

  const fetchAdvancedSearch = async (params: AdvancedSearchParams, loadMore: boolean = false) => {
    await fetchAnything.fetchAdvancedSearch(params, loadMore);
    setHasSearched(true);
  };

  const fetchRandomBookByAuthor = async (author: string) => {
    await fetchAnything.fetchRandomBookByAuthor(author);
    setHasSearched(true);
  };

  const fetchRandomBookBySubject = async (subject: string) => {
    await fetchAnything.fetchRandomBookBySubject(subject);
    setHasSearched(true);
  };

  const fetchRandomBookByYear = async (year: string) => {
    await fetchAnything.fetchRandomBookByYear(year);
    setHasSearched(true);
  };

  const handleFetchMore = () => {
    switch (fetchAnything.searchType) {
      case "title":
        fetchAnything.fetchBooksByTitle(fetchAnything.currentSearch, true);
        break;
      case "author":
        fetchAnything.fetchBooksByAuthor(fetchAnything.currentSearch, true);
        break;
      case "year":
        fetchAnything.fetchBooksByFirstPublishYear(fetchAnything.currentSearch, true);
        break;
      case "subject":
        fetchAnything.fetchBooksBySubject(fetchAnything.currentSearch, true);
        break;
      case "advanced search":
        fetchAnything.fetchAdvancedSearch(fetchAnything.advancedCurrentSearch, true);
        break;
    }
  };

  return (
    <SearchContext.Provider
      value={{
        ...fetchAnything,
        fetchBooksByTitle,
        fetchFirstBookByTitle,
        fetchBooksByAuthor,
        fetchBooksByFirstPublishYear,
        fetchBooksBySubject,
        fetchAdvancedSearch,
        fetchRandomBookByAuthor,
        fetchRandomBookBySubject,
        fetchRandomBookByYear,
        handleFetchMore,
        hasSearched,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
