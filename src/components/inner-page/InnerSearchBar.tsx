import { Controller, useForm } from "react-hook-form";
import { Input } from "../search";
import { useState } from "react";
import { useSearch } from "../../context/search";
import { useLocation, useNavigate } from "react-router-dom";
import { ByblosLogo } from "../gsap";

type FormValues = {
  title: string;
  author: string;
  year: string;
  subject: string;
};

export const InnerSearchBar = () => {
  type ActiveSearch = keyof typeof searchConfigs;

  const { handleSubmit, control } = useForm<FormValues>({
    defaultValues: { title: "", author: "", year: "", subject: "" },
  });
  const {
    fetchBooksByTitle,
    fetchFirstBookByTitle,
    fetchBooksByAuthor,
    fetchBooksByFirstPublishYear,
    fetchBooksBySubject,
  } = useSearch();
  const navigate = useNavigate();
  const location = useLocation();

  const [activeSearch, setActiveSearch] = useState<ActiveSearch>("title");

  const searchConfigs = {
    title: {
      name: "title" as const,
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
    config.fetchFn(data[config.name]);

    // Si estamos en la ruta de favoritos, navegamos. Si no, no (porque entonces el flujo rompe)
    if (location.pathname === "/books/results/favorites" || location.pathname === "/books/results/book") {
      navigate("/books/results/result-list");
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 w-full max-w-3xl h-fit px-6 gap-1 justify-items-center items-center mx-auto">
        <ByblosLogo/>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-full justify-center items-center">
          <Controller
            name={config.name}
            control={control}
            rules={{ required: `${config.name} is required` }}
            render={({ field, fieldState }) => (
              <Input
                value={field.value}
                name={config.name}
                className="min-w-[300px] border border-[var(--border-gray-byblos)] rounded-lg h-9 px-3 text-sm"
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
                onClick={() => {
                  handleSubmit((data) => {
                    fetchFirstBookByTitle(data.title);
                    navigate("/books/results/book");
                  })();
                }}
              >
                Quick search
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Botones de tipo de búsqueda */}
      <div className="grid grid-cols-[140px_140px] gap-3 w-fit mx-auto mt-2">
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
    </>
  );
};
