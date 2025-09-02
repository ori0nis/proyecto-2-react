//? Este componente es el que consume el SearchContext para lanzar la búsqueda adecuada, dependiendo de la selección del user

import { Controller, useForm } from "react-hook-form";
import { Input } from "./index";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
    setSearchType,
  } = useSearch();
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
    setSearchType(config.name);
    config.fetchFn(data[config.name]);
    navigate("/books/results");
  };

  return (
    <>
      <h1>Byblos</h1>
      {/* Botones para abrir diferentes búsquedas */}
      <div>
        <button onClick={() => setActiveSearch("title")}>Search by title</button>
        <button onClick={() => setActiveSearch("author")}>Search by author</button>
        <button onClick={() => setActiveSearch("year")}>Search by publish year</button>
        <button onClick={() => setActiveSearch("subject")}>Search by genre</button>
      </div>

      {/* Title es la búsqueda que sale por default */}
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
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
          <button type="submit">Search</button>

          {/* Quick search solo está disponible para búsqueda por título */}
          {activeSearch === "title" && (
            <button
              type="button"
              // Este submit se hace manualmente para evitar dificultades
              onClick={handleSubmit((data) => {
                fetchFirstBookByTitle(data.title);
                setSearchType("single title");
                console.log(data);
                navigate("/books/results");
              })}
            >
              Quick search
            </button>
          )}
        </form>
      </div>
    </>
  );
};
