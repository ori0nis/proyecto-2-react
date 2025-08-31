import { Controller, useForm } from "react-hook-form";
import { Input } from "./Input";
import { useFetch } from "../../hooks/useFetch";

type FormValues = {
  title: string;
};

export const SearchBar = () => {
  const { handleSubmit, control } = useForm<FormValues>({ defaultValues: { title: "" } });
  const { fetchBooksByTitle, fetchFirstBookByTitle } = useFetch();

  const onSubmit = (data: FormValues) => {
    console.log(data);
    // navigate to
  };

  return (
    <div>
      <h1>Byblos</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="title"
          control={control}
          rules={{ required: "Title is required" }}
          render={({ field, fieldState }) => (
            <Input
              label="Title: "
              value={field.value}
              name="title"
              placeholder="Type a book title to search..."
              required={true}
              onChange={field.onChange}
              onBlur={field.onBlur}
              error={fieldState.error?.message}
            />
          )}
        />
        <button
          type="button"
          onClick={handleSubmit((data) => {
            fetchBooksByTitle(data.title).then((res) => console.log(res))
            console.log(data);
          })}
        >
          Search
        </button>
        <button
          type="button"
          onClick={handleSubmit((data) => {
            fetchFirstBookByTitle(data.title);
            console.log(data);
          })}
        >
          Quick search
        </button>
      </form>
    </div>
  );
};
