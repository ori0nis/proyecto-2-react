//? Este context maneja los favoritos en toda la app. Los setea al inicio y provee la manera de guardar nuevos favoritos

import { useEffect, useState, type ReactNode } from "react";
import { FavoriteContext } from "./FavoriteContext";
import type { Book } from "../../models/book";

interface Props {
  children: ReactNode;
}

export const FavoriteProvider = ({ children }: Props) => {
  const [favorites, setFavorites] = useState<Book[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("favorites");

    if (stored) {
      setFavorites(JSON.parse(stored));
    }
  }, []);

  const handleSaveAsFavorite = (book: Book) => {
    // Si el libro ya está en favoritos, el click del botón lo quita. Si no, el click del botón lo añade 
    const isAlreadyFavorite = favorites.some((fav) => fav.book_details.key === book.book_details.key);

    let updatedFaves: Book[];

    if (isAlreadyFavorite) {
      updatedFaves = favorites.filter((fave) => book.book_details.key !== fave.book_details.key);
    } else {
      updatedFaves = [...favorites, book];
    }

    setFavorites(updatedFaves);
    localStorage.setItem("favorites", JSON.stringify(updatedFaves));
  };

  return <FavoriteContext.Provider value={{ favorites, handleSaveAsFavorite }}>{children}</FavoriteContext.Provider>;
};
