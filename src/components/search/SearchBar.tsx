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
      <div className="grid grid-cols-1 w-full max-w-3xl h-fit px-6 gap-8 justify-items-center items-center">
        <h1 className="text-7xl">BYBLOS</h1>
        <h2 className="italic">"What do you wanna read today?"</h2>

        {/* Title es la búsqueda que sale por default */}
        <div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col sm:flex-row w-full justify-center items-center"
          >
            <Controller
              name={config.name}
              control={control}
              rules={{ required: `${config.name} is required` }}
              render={({ field, fieldState }) => (
                <Input
                  value={field.value}
                  name={config.name}
                  className="min-w-[300px] border border-[var(--border-gray-byblos)] rounded-lg h-11 px-3"
                  placeholder={config.placeholder}
                  required={true}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  error={fieldState.error?.message}
                />
              )}
            />
            <div className="flex w-fit px-3 py-2 gap-2">
              <button
                type="submit"
                className="cursor-pointer border border-[var(--border-gray-byblos)] bg-green-300 rounded-lg px-4 py-0.5 text-sm"
              >
                Search
              </button>

              {/* Quick search solo está disponible para búsqueda por título */}
              {activeSearch === "title" && (
                <button
                  type="button"
                  className="cursor-pointer border border-[var(--border-gray-byblos)] bg-red-300 rounded-lg min-w-[120px] px-4 py-0.5 text-sm"
                  // Este submit se hace manualmente para evitar dificultades
                  //
                  onClick={handleSubmit((data) => {
                    fetchFirstBookByTitle(data.title);
                    setAllowAccess(true);
                    navigate("/books/results/book");
                  })}
                >
                  Quick search
                </button>
              )}
            </div>
          </form>
        </div>
        {/* Botones para abrir diferentes búsquedas */}
        <div /* className="flex flex-wrap w-full justify-center items-center gap-2" */
          className="grid grid-cols-[140px_140px] gap-3"
        >
          <button
            className="text-xs cursor-pointer border border-[var(--border-gray-byblos)] rounded-lg px-4 py-0.5"
            onClick={() => setActiveSearch("title")}
          >
            Search by title
          </button>
          <button
            className="text-xs cursor-pointer border border-[var(--border-gray-byblos)] rounded-lg px-4 py-0.5"
            onClick={() => setActiveSearch("author")}
          >
            Search by author
          </button>
          <button
            className="text-xs cursor-pointer border border-[var(--border-gray-byblos)] rounded-lg not-[]:px-4 py-0.5"
            onClick={() => setActiveSearch("year")}
          >
            Search by publish year
          </button>
          <button
            className="text-xs cursor-pointer border border-[var(--border-gray-byblos)] rounded-lg px-4 py-0.5"
            onClick={() => setActiveSearch("subject")}
          >
            Search by genre
          </button>
        </div>
      </div>
    </>
  );
};
