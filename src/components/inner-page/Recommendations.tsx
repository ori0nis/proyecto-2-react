import { useSearch } from "../../context/search";
import { useState } from "react";
import { Input } from "../search";
import { Controller, useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";

type FormValues = {
  author: string;
  subject: string;
  year: string;
};

export const Recommendations = () => {
  const { fetchRandomBookByAuthor, fetchRandomBookBySubject, fetchRandomBookByYear } = useSearch();
  const { handleSubmit, control, reset } = useForm<FormValues>({
    defaultValues: {
      author: "",
      subject: "",
      year: "",
    },
  });
  const navigate = useNavigate();
  const location = useLocation();
  const [displayRecButtons, setDisplayRecButtons] = useState<boolean>(false);
  const [displayAuthorRec, setDisplayAuthorRec] = useState<boolean>(false);
  const [displaySubjectRec, setDisplaySubjectRec] = useState<boolean>(false);
  const [displayYearRec, setDisplayYearRec] = useState<boolean>(false);

  const handleDisplayRecButtons = () => {
    setDisplayRecButtons((prev) => !prev);
  };

  const handleDisplayAuthorRec = () => {
    setDisplayAuthorRec((prev) => !prev);
  };

  const handleDisplaySubjectRec = () => {
    setDisplaySubjectRec((prev) => !prev);
  };

  const handleDisplayYearRec = () => {
    setDisplayYearRec((prev) => !prev);
  };

  const onSubmit = (data: FormValues, type: "author" | "subject" | "year") => {
    switch (type) {
      case "author":
        fetchRandomBookByAuthor(data.author);
        break;
      case "subject":
        fetchRandomBookBySubject(data.subject);
        break;
      case "year":
        fetchRandomBookByYear(data.year);
        break;
    }

    reset();

    if (location.pathname === "/books/results/favorites" || location.pathname === "/books/results/result-list") {
      navigate("/books/results/book");
    }

  };

  return (
    <div>
      <button onClick={handleDisplayRecButtons}>{">"}Get a random book recommendation</button>
      {displayRecButtons && (
        <div>
          <button onClick={handleDisplayAuthorRec}>{">"} By author</button>
          {displayAuthorRec && (
            <div>
              <form onSubmit={handleSubmit((data) => onSubmit(data, "author"))}>
                <Controller
                  name="author"
                  control={control}
                  render={({ field, fieldState }) => (
                    <Input
                      name="author"
                      value={field.value}
                      required={true}
                      onBlur={field.onBlur}
                      onChange={field.onChange}
                      error={fieldState.error?.message}
                    />
                  )}
                />
                <button type="submit">Search</button>
              </form>
            </div>
          )}
          <button onClick={handleDisplaySubjectRec}>{">"} By genre</button>
          {displaySubjectRec && (
            <div>
              <form onSubmit={handleSubmit((data) => onSubmit(data, "subject"))}>
                <Controller
                  name="subject"
                  control={control}
                  render={({ field, fieldState }) => (
                    <Input
                      name="subject"
                      value={field.value}
                      required={true}
                      onBlur={field.onBlur}
                      onChange={field.onChange}
                      error={fieldState.error?.message}
                    />
                  )}
                />
                <button type="submit">Search</button>
              </form>
            </div>
          )}
          <button onClick={handleDisplayYearRec}>{">"} By publish year</button>
          {displayYearRec && (
            <div>
              <form onSubmit={handleSubmit((data) => onSubmit(data, "year"))}>
                <Controller
                  name="year"
                  control={control}
                  render={({ field, fieldState }) => (
                    <Input
                      name="year"
                      value={field.value}
                      required={true}
                      onBlur={field.onBlur}
                      onChange={field.onChange}
                      error={fieldState.error?.message}
                    />
                  )}
                />
                <button type="submit">Search</button>
              </form>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
