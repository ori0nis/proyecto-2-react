import { useState } from "react";
import { getBooksByTitle } from "../services/axios/axios.service";
import type { Book } from "../models/book";

export const useFetch = () => {
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchBookByTitle = async (title: string) => {
    try {
      setLoading(true);
      const data = await getBooksByTitle(title);

      //TODO
    } catch (error: unknown) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return { fetchBookByTitle };
};
