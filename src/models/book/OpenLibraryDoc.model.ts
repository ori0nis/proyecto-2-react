//? Tipo para extraer datos de la respuesta cruda de la API de búsqueda por título, lo utilizo para mapear en axios

export interface OpenLibraryDoc {
  title: string;
  author_name: string[];
  first_publish_year: number;
  cover_edition_key: string;
  cover_i: number;
}
