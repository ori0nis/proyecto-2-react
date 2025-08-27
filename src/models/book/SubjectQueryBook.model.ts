//? Tipo de Book que devuelve la respuesta de buscar por género (esta petición es a otro endpoint)

import type { Book } from "./BookFromTitleSearch.model";

export interface SubjectQueryBook {
  book: Book;
  subject: string[];
}
