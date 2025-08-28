//? El servicio de axios hace las requests a la API y mapea la respuesta

import axios from "axios";
import type { Book, OpenLibraryDoc } from "../../models/book";
import { mapDocsToBooks } from "../../utils";

/* interface SearchParams {
  title: string;
  author?: string;
  first_publish_year?: number;
  language?: string;
} */

// GET BOOKS BY TITLE
export const getBooksByTitle = async (title: string): Promise<Book[]> => {
  // Encodeamos para que la query sea del formato adecuado
  const query = encodeURIComponent(title);

  // Página 1
  const res = await axios.get(`https://openlibrary.org/search.json?title=${query}&page=1`);
  // Transformamos de OpenLibraryDoc a Book
  return res.data.docs.map((docs: OpenLibraryDoc) => mapDocsToBooks(docs));
};

// GET FIRST BOOK BY TITLE (QUICK SEARCH)
export const getFirstBookByTitle = async (title: string): Promise<Book> => {
  const query = encodeURIComponent(title);
  const res = await axios.get(`https://openlibrary.org/search.json?title=${query}`);
  // Sacamos solo el primer libro
  const docToShow: OpenLibraryDoc = res.data.docs[0];

  return mapDocsToBooks(docToShow);
};

// GET BOOKS BY AUTHOR
export const getBooksByAuthor = async (author: string): Promise<Book[]> => {
  const query = encodeURIComponent(author);
  const res = await axios.get(`https://openlibrary.org/search.json?author=${query}`);

  return res.data.docs.map((docs: OpenLibraryDoc) => mapDocsToBooks(docs));
};

// GET BOOKS BY FIRST PUBLISH YEAR
export const getBooksByFirstPublishYear = async (year: number): Promise<Book[]> => {
  const query = encodeURIComponent(year);
  const res = await axios.get(`https://openlibrary.org/search.json?q=first_publish_year:${query}`);

  return res.data.docs.map((docs: OpenLibraryDoc) => mapDocsToBooks(docs));
};

// TODO
// GET BOOKS BY GENRE
// GET BOOKS BY LANGUAGE
// GET BOOK RECOMMENDATION (RANDOM)
// ADVANCED SEARCH (MULTIPLE FIELDS)

/* 
export const advancedSearch = (params: SearchParams) => {}

const params: Record<string, string> = {};
if (title) params.title = title;
if (author) params.author = author;
if (year) params.first_publish_year = year;

const queryString = new URLSearchParams(params).toString();
const res = await axios.get(`https://openlibrary.org/search.json?${queryString}`);

*/
