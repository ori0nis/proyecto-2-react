//? Tipo para la respuesta cruda de la API, lo utilizo para mapear en axios

export interface OpenLibraryDoc {
  title: string;
  author_name?: string[];
  first_publish_year?: number;
  cover_edition_key?: string;
  cover_i?: number;
}
