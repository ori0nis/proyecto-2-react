//? Tipo que monto con la respuesta de búsqueda en axios. Esto es lo que se sirve a los componentes a través de useFetch

import type { OpenLibraryDoc } from "./OpenLibraryDoc.model";
export interface Book {
  book_details: OpenLibraryDoc;
  cover_size: string;
  cover_image: string;
}
