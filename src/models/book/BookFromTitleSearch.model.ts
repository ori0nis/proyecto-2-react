//? Tipo que monto con la respuesta de búsqueda por título en axios. Esto es lo que se sirve a los componentes a través de useFetch

import type { OpenLibraryDoc } from "./OpenLibraryDoc.model";

export interface BookFromTitleSearch {
  book_details: OpenLibraryDoc,
  book_id: number,
  cover_size: string;
  cover_image: string;
}
