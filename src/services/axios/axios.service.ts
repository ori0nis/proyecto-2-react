//? El servicio de axios se encarga de hacer las requests a la API y mapear la respuesta al tipo Book, para que useFetch pueda pasarla por el filtro y servirla a los componentes

import axios from "axios";
import type { Book, OpenLibraryDoc } from "../../models/book";

/* interface SearchParams {
  title: string;
  author?: string;
  first_publish_year?: number;
  language?: string;
} */

// GET BY TITLE
export const getBooksByTitle = async (title: string): Promise<Book[]> => {
  // Encodeamos para que la query sea del formato adecuado
  const query = encodeURIComponent(title);

  const res = await axios.get(`https://openlibrary.org/search.json?title=${query}`);
  console.log(res.data);

  // Transformamos de OpenLibraryDoc a Book
  return res.data.docs.map((doc: OpenLibraryDoc) => ({
    title: doc.title,
    author: doc.author_name ?? ["Unknown"],
    first_publish_year: doc.first_publish_year ?? 0,
    cover_edition_key: doc.cover_edition_key ?? "",
    cover_i: doc.cover_i ?? "",
    cover_size: "M",
    cover_image: doc.cover_edition_key
      ? `https://covers.openlibrary.org/b/olid/${doc.cover_edition_key}-M.jpg`
      : doc.cover_i
      ? `https://covers.openlibrary.org/b/id/${doc.cover_i}-M`
      : "/public/images/no-cover-available.jpg",
  }));
};

/* 
export const advancedSearch = (params: SearchParams) => {}

const params: Record<string, string> = {};
if (title) params.title = title;
if (author) params.author = author;
if (year) params.first_publish_year = year;

const queryString = new URLSearchParams(params).toString();
const res = await axios.get(`https://openlibrary.org/search.json?${queryString}`);

*/
