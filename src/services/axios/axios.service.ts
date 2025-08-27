//? El servicio de axios hace las requests a la API y mapea la respuesta

import axios from "axios";
import type { BookFromTitleSearch, OpenLibraryDoc } from "../../models/book";
import { mapDocsToBooks } from "../../utils";

/* interface SearchParams {
  title: string;
  author?: string;
  first_publish_year?: number;
  language?: string;
} */

// GET BOOKS BY TITLE
export const getBooksByTitle = async (title: string): Promise<BookFromTitleSearch[]> => {
  // Encodeamos para que la query sea del formato adecuado
  const query = encodeURIComponent(title);
  const res = await axios.get(`https://openlibrary.org/search.json?title=${query}`);

  // Transformamos de OpenLibraryDoc a BookFromTitleSearch
  return res.data.docs.map((docs: OpenLibraryDoc, index: number) => mapDocsToBooks(docs, index));
};

// GET FIRST BOOK BY TITLE (QUICK SEARCH)
export const getFirstBookByTitle = async (title: string): Promise<BookFromTitleSearch> => {
  const query = encodeURIComponent(title);
  const res = await axios.get(`https://openlibrary.org/search.json?title=${query}`);
  // Sacamos solo el primer libro
  const docToShow: OpenLibraryDoc = res.data.docs[0];

  return mapDocsToBooks(docToShow, 0);
}

// TODO
// GET BOOKS BY AUTHOR
// GET BOOKS BY PUBLISH YEAR
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
