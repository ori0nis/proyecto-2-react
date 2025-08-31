import { Controller, useForm } from "react-hook-form";
import { useFetch } from "../../hooks/useFetch";
import { Input } from "./Input";
import type { AdvancedSearchParams } from "../../models/search";

type FormValues = {
  title: string;
  author?: string;
  year?: string;
  subject?: string;
  language?: string;
};

export const AdvancedSearchForm = () => {
  const { handleSubmit, control } = useForm({
    defaultValues: {
      title: "",
      author: "",
      year: "",
      subject: "",
      language: "",
    },
  });
  const { fetchAdvancedSearch } = useFetch();

  const onSubmit = (data: FormValues) => {
    console.log(data);
    const searchParams: AdvancedSearchParams = {
      title: data.title,
      author: data.author || undefined,
      year: data.year || undefined,
      subject: data.subject || undefined,
      language: data.language || undefined,
    };

    fetchAdvancedSearch(searchParams);
    // navigate to
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Title */}
        <Controller
          name="title"
          control={control}
          rules={{ required: "Please type a title" }}
          render={({ field, fieldState }) => (
            <Input
              label="Title: "
              value={field.value}
              name="title"
              placeholder="Example: The Hobbit"
              required={true}
              onChange={field.onChange}
              onBlur={field.onBlur}
              error={fieldState.error?.message}
            />
          )}
        />

        {/* Author */}
        <Controller
          name="author"
          control={control}
          render={({ field, fieldState }) => (
            <Input
              label="Author: "
              value={field.value}
              name="author"
              placeholder="Example: J.R.R Tolkien"
              required={false}
              onChange={field.onChange}
              onBlur={field.onBlur}
              error={fieldState.error?.message}
            />
          )}
        />

        {/* Year */}
        <Controller
          name="year"
          control={control}
          render={({ field, fieldState }) => (
            <Input
              label="Year: "
              value={field.value}
              name="year"
              required={false}
              onChange={field.onChange}
              onBlur={field.onBlur}
              error={fieldState.error?.message}
            />
          )}
        />

        {/* Subject */}
        <Controller
          name="subject"
          control={control}
          render={({ field, fieldState }) => (
            <Input
              label="Genre: "
              value={field.value}
              name="subject"
              required={false}
              onChange={field.onChange}
              onBlur={field.onBlur}
              error={fieldState.error?.message}
            />
          )}
        />

        {/* Language */}
        <Controller
          name="language"
          control={control}
          render={({ field, fieldState }) => (
            <Input
              label="Language: "
              value={field.value}
              name="language"
              required={false}
              onChange={field.onChange}
              onBlur={field.onBlur}
              error={fieldState.error?.message}
            />
          )}
        />
        <button type="submit">Search</button>
      </form>
    </div>
  );
};
