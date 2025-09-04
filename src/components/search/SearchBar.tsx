//? Este componente es el que consume el SearchContext para lanzar la búsqueda adecuada, dependiendo de la selección del user

import { Controller, useForm } from "react-hook-form";
import { Input } from "./index";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useNavigation } from "../../context/navigation";
import { useSearch } from "../../context/search";

type FormValues = {
  title: string;
  author: string;
  year: string;
  subject: string;
  language: string;
};

export const SearchBar = () => {
  type ActiveSearch = keyof typeof searchConfigs; // Para poder meter el searchConfig

  const { handleSubmit, control } = useForm<FormValues>({
    defaultValues: {
      title: "",
      author: "",
      year: "",
      subject: "",
    },
  });
  const {
    fetchBooksByTitle,
    fetchFirstBookByTitle,
    fetchBooksByAuthor,
    fetchBooksByFirstPublishYear,
    fetchBooksBySubject,
  } = useSearch();
  const { setAllowAccess } = useNavigation();
  const [activeSearch, setActiveSearch] = useState<ActiveSearch>("title");
  const navigate = useNavigate();

  // Tipo de búsqueda (para no repetir mucho TSX)
  const searchConfigs = {
    title: {
      name: "title" as const, // Para que TS no se queje
      label: "Title: ",
      placeholder: "Example: The Hobbit",
      fetchFn: fetchBooksByTitle,
    },
    author: {
      name: "author" as const,
      label: "Author: ",
      placeholder: "Example: J.R.R Tolkien",
      fetchFn: fetchBooksByAuthor,
    },
    year: {
      name: "year" as const,
      label: "Publish year: ",
      placeholder: "Example: 1995",
      fetchFn: fetchBooksByFirstPublishYear,
    },
    subject: {
      name: "subject" as const,
      label: "Genre: ",
      placeholder: "Example: Fantasy",
      fetchFn: fetchBooksBySubject,
    },
  };

  const config = searchConfigs[activeSearch];

  const onSubmit = (data: FormValues) => {
    // Metemos la función correspondiente y navegamos al ResultList
    config.fetchFn(data[config.name]);
    setAllowAccess(true);
    navigate("/books/results/result-list");
  };

  return (
    <>
      <div className="flex flex-col w-full max-w-3xl h-fit gap-8 items-center justify-center bg-amber-800">
        <h1>Byblos</h1>
        {/* Botones para abrir diferentes búsquedas */}
        <div className="flex w-full justify-around bg-green-500">
          <button className="cursor-pointer border rounded-lg px-4 py-0.5" onClick={() => setActiveSearch("title")}>Search by title</button>
          <button className="cursor-pointer border rounded-lg px-4 py-0.5" onClick={() => setActiveSearch("author")}>Search by author</button>
          <button className="cursor-pointer border rounded-lg px-4 py-0.5" onClick={() => setActiveSearch("year")}>Search by publish year</button>
          <button className="cursor-pointer border rounded-lg px-4 py-0.5" onClick={() => setActiveSearch("subject")}>Search by genre</button>
        </div>

        {/* Title es la búsqueda que sale por default */}
        <div className="text-center bg-blue-700 py-5">
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center justify-center text-center gap-5">
            <Controller
              name={config.name}
              control={control}
              rules={{ required: `${config.name} is required` }} //TODO: Maquetar bien este error
              render={({ field, fieldState }) => (
                <Input
                  label={config.label}
                  value={field.value}
                  name={config.name}
                  placeholder={config.placeholder}
                  required={true}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  error={fieldState.error?.message}
                />
              )}
            />
            <button type="submit" className="cursor-pointer border rounded-lg px-4 py-0.5">Search</button>

            {/* Quick search solo está disponible para búsqueda por título */}
            {activeSearch === "title" && (
              <button
                type="button"
                className="cursor-pointer border rounded-lg px-4 py-0.5"
                // Este submit se hace manualmente para evitar dificultades
                onClick={handleSubmit((data) => {
                  fetchFirstBookByTitle(data.title);
                  setAllowAccess(true);
                  navigate("/books/results/book");
                })}
              >
                Quick search
              </button>
            )}
          </form>
        </div>
      </div>
    </>
  );
};
