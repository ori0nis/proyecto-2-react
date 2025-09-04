import { Controller, useForm } from "react-hook-form";
import { Input } from "../search";
import { useState } from "react";
import { useSearch } from "../../context/search";
import { useNavigate } from "react-router-dom";

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
  };

  return (
    <div>
      <h1>Byblos</h1>
      <div>
        <button onClick={() => setActiveSearch("title")}>Search by title</button>
        <button onClick={() => setActiveSearch("author")}>Search by author</button>
        <button onClick={() => setActiveSearch("year")}>Search by year</button>
        <button onClick={() => setActiveSearch("subject")}>Search by genre</button>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name={config.name}
          control={control}
          rules={{ required: `${config.name} is required` }}
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
        {activeSearch === "title" && (
          <button
            type="button"
            onClick={() => {
              handleSubmit((data) => {
                fetchFirstBookByTitle(data.title);
                navigate("/books/results/book")
              })();
            }}
          >
            Quick search
          </button>
        )}
      </form>
    </div>
  );
};
