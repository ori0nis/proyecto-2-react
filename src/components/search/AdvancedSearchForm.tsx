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
  const { fetchAdvancedSearch } = useSearch();
  const { setAllowAccess } = useNavigation();
  const navigate = useNavigate();

  const onSubmit = (data: FormValues) => {
    // Si el user no ha llenado al menos un campo, no le dejamos buscar
    const inputValues = Object.values(data);
    const hasFilledAtLeastOneField = inputValues.some((value) => value && value.trim() !== "");

    if (!hasFilledAtLeastOneField) {
      alert("Please fill in at least one field to search");
      return;
    }

    const searchParams: AdvancedSearchParams = {
      title: data.title || undefined,
      author: data.author || undefined,
      year: data.year || undefined,
      subject: data.subject || undefined,
      language: data.language || undefined,
    };

    fetchAdvancedSearch(searchParams);
    setAllowAccess(true);
    navigate("/books/results/result-list");
  };

  return (
    <div className="text-center">
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
              className="px-2 border border-[var(--border-gray-byblos)] rounded-lg h-6.5 text-sm"
              placeholder=" Example: The Hobbit"
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
              className="px-2 border border-[var(--border-gray-byblos)] rounded-lg h-6.5 text-sm"
              placeholder=" Example: J.R.R Tolkien"
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
              className="px-2 border border-[var(--border-gray-byblos)] rounded-lg h-6.5 text-sm"
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
              className="px-2 border border-[var(--border-gray-byblos)] rounded-lg h-6.5 text-sm"
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
              className="text-center border border-[var(--border-gray-byblos)] rounded-lg h-6"
              required={false}
              onChange={field.onChange}
              onBlur={field.onBlur}
              error={fieldState.error?.message}
            />
          )}
        />
        <div className="py-2">
          <button
          type="submit"
          className="cursor-pointer border border-[var(--border-gray-byblos)] bg-green-300 rounded-lg px-4 py-0.5 text-sm"
        >
          Search
        </button>
        </div>
        
      </form>
    </div>
  );
};
