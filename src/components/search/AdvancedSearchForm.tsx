import { Controller, useForm } from "react-hook-form";
import { Input } from "./Input";
import type { AdvancedSearchParams } from "../../models/search";
import { useSearch } from "../../context/search";
import { useNavigate } from "react-router-dom";
import { useNavigation } from "../../context/navigation";

type FormValues = {
  title?: string;
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
  const { fetchAdvancedSearch, setSearchType } = useSearch();
  const {setAllowAccess} = useNavigation();
  const navigate = useNavigate();

  const onSubmit = (data: FormValues) => {
    // Si el user no ha llenado al menos un campo, no le dejamos buscar
    const inputValues = Object.values(data);
    const hasFilledAtLeastOneField = inputValues.some((value) => value && value.trim() !== "");

    if (!hasFilledAtLeastOneField) {
      alert("Please fill in at least one field to search");
      return;
    }

    setSearchType("advanced search");

    const searchParams: AdvancedSearchParams = {
      title: data.title || undefined,
      author: data.author || undefined,
      year: data.year || undefined,
      subject: data.subject || undefined,
      language: data.language || undefined,
    };

    fetchAdvancedSearch(searchParams);
    setAllowAccess(true);
    navigate("/books/results");
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Title */}
        <Controller
          name="title"
          control={control}
          render={({ field, fieldState }) => (
            <Input
              label="Title: "
              value={field.value}
              name="title"
              placeholder="Example: The Hobbit"
              required={false}
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
