//? Tipo de Book que devuelve la respuesta de buscar por título

export interface Book {
  title: string;
  author_name?: string[];
  first_publish_year?: number;
  cover_edition_key?: string;
  cover_i?: string;
  cover_size?: string;
  cover_image?: string;
}
