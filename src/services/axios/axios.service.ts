//? El servicio de axios hace las requests a la API y mapea la respuesta. Cada llamada devuelve la primera página de resultados de OpenLibrary (100)

import axios from "axios";
import type { Book, OpenLibraryDoc } from "../../models/book";
import { filterOutRepeatedTitle, mapDocsToBooks } from "../../utils";
import { languageMap } from "../../models/language/LanguageMap.type";
import type { AdvancedSearchParams } from "../../models/search/index";

// GET BOOKS BY TITLE
export const getBooksByTitle = async (title: string, page: number = 1): Promise<Book[]> => {
  // Encodeamos para que la query sea del formato adecuado
  const query = encodeURIComponent(title);

  const res = await axios.get(`https://openlibrary.org/search.json?title=${query}&page=${page}`);
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
export const getBooksByAuthor = async (author: string, page: number = 1): Promise<Book[]> => {
  const query = encodeURIComponent(author);
  const res = await axios.get(`https://openlibrary.org/search.json?author=${query}&page=${page}`);

  return res.data.docs.map((docs: OpenLibraryDoc) => mapDocsToBooks(docs));
};

// GET BOOKS BY FIRST PUBLISH YEAR
export const getBooksByFirstPublishYear = async (year: string, page: number = 1): Promise<Book[]> => {
  const query = encodeURIComponent(year);
  const res = await axios.get(`https://openlibrary.org/search.json?q=first_publish_year:${query}&page=${page}`);

  return res.data.docs.map((docs: OpenLibraryDoc) => mapDocsToBooks(docs));
};

// GET BOOKS BY GENRE
export const getBooksBySubject = async (subject: string, page: number = 1): Promise<Book[]> => {
  const query = encodeURIComponent(subject);
  const res = await axios.get(`https://openlibrary.org/search.json?subject=${query}&page=${page}`);

  return res.data.docs.map((docs: OpenLibraryDoc) => mapDocsToBooks(docs));
};

// ADVANCED SEARCH
export const advancedSearch = async ({
  title,
  author,
  year,
  subject,
  language,
  page = 1,
}: AdvancedSearchParams): Promise<Book[]> => {
  let q = "";

  if (title) q += `title:${title} `;
  if (author) q += `author:${author} `;
  if (year) q += `year:${year} `;
  if (subject) q += `subject:${subject} `;
  if (language) {
    const isoLang = languageMap[language.toLowerCase()];
    if (isoLang) q += `language:${isoLang} `;
  }

  const query = encodeURIComponent(q.trim());
  const res = await axios.get(`https://openlibrary.org/search.json?q=${query}&page=${page}`);

  return res.data.docs.map((docs: OpenLibraryDoc) => mapDocsToBooks(docs));
};

// GET RANDOM BOOK RECOMMENDATION (BY AUTHOR)
export const randomBookRecByAuthor = async (author: string): Promise<Book> => {
  const query = encodeURIComponent(author);
  const pages = [1, 2, 3, 4, 5, 6, 7, 8];

  // Hacemos request conjunta
  const fullRequest = await Promise.all(
    pages.map((page) => axios.get(`https://openlibrary.org/search.json?author=${query}&page=${page}&language:eng`))
  );
  // Aplanamos en un solo array (cada respuesta devuelve un array de docs)
  const bookList = fullRequest.flatMap((res) => res.data.docs);
  // Mapeamos
  const mappedBookList = bookList.map(mapDocsToBooks);
  // Filtramos por si acaso
  const filteredBooklist = filterOutRepeatedTitle(mappedBookList);
  // Escogemos libro
  const randomBook = Math.floor(Math.random() * filteredBooklist.length);

  return filteredBooklist[randomBook];
};

// GET RANDOM BOOK RECOMMENDATION (BY YEAR)
export const randomBookRecByYear = async (year: string): Promise<Book> => {
  const query = encodeURIComponent(year);
  const pages = [1, 2, 3, 4, 5, 6, 7, 8];

  const fullRequest = await Promise.all(
    pages.map((page) =>
      axios.get(`https://openlibrary.org/search.json?q=first_publish_year:${query}&page=${page}&language:eng`)
    )
  );

  const bookList = fullRequest.flatMap((res) => res.data.docs);
  const mappedBookList = bookList.map(mapDocsToBooks);
  const filteredBookList = filterOutRepeatedTitle(mappedBookList);
  const randomBook = Math.floor(Math.random() * filteredBookList.length);

  return filteredBookList[randomBook];
};

// GET RANDOM BOOK RECOMMENDATION (BY SUBJECT)
export const randomBookRecBySubject = async (subject: string): Promise<Book> => {
  const query = encodeURIComponent(subject);
  const pages = [1, 2, 3, 4, 5, 6, 7, 8];

  const fullRequest = await Promise.all(
    pages.map((page) => axios.get(`https://openlibrary.org/search.json?q=subject=${query}&page=${page}&language:eng`))
  );

  const bookList = fullRequest.flatMap((res) => res.data.docs);
  const mappedBookList = bookList.map(mapDocsToBooks);
  const filteredBookList = filterOutRepeatedTitle(mappedBookList);
  const randomBook = Math.floor(Math.random() * filteredBookList.length);

  return filteredBookList[randomBook];
};
