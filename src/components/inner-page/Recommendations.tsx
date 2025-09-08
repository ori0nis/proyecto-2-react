import { useSearch } from "../../context/search";
import { useState } from "react";
import { Input } from "../search";
import { Controller, useForm } from "react-hook-form";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { ChevronDown } from "lucide-react";

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
    <div className="flex flex-col gap-2 w-fit">
      <div className="flex flex-col items-center justify-center">
        <NavLink to="#" className="cursor-default block px-2 py-1">
          Random book recommendation
        </NavLink>
        <button className="cursor-pointer" onClick={handleDisplayRecButtons}>
          <ChevronDown size={16} className="hover:bg-amber-200 hover:rounded-lg" />
        </button>
      </div>

      {/* By author */}
      {displayRecButtons && (
        <div className="flex flex-col gap-2 items-center justify-center animate-[slideInDownwards_0.5s_ease-in-out_0.1s_both]">
          <NavLink
            to="#"
            className="cursor-pointer block px-2 text-sm mx-auto hover:bg-amber-200 hover:rounded-lg"
            onClick={handleDisplayAuthorRec}
          >
            By author
          </NavLink>
          {displayAuthorRec && (
            <div>
              <form className="flex flex-col gap-2 animate-[slideInDownwards_0.5s_ease-in-out_0.1s_both]" onSubmit={handleSubmit((data) => onSubmit(data, "author"))}>
                <Controller
                  name="author"
                  control={control}
                  render={({ field, fieldState }) => (
                    <Input
                      name="author"
                      value={field.value}
                      className="w-full text-sm p-2 border border-[var(--border-gray-byblos)] rounded-lg h-6"
                      required
                      onBlur={field.onBlur}
                      onChange={field.onChange}
                      error={fieldState.error?.message}
                    />
                  )}
                />
                <button
                  type="submit"
                  className="cursor-pointer w-fit mx-auto border border-[var(--border-gray-byblos)] bg-green-300 rounded-lg px-4 py-0.5 text-sm"
                >
                  Search
                </button>
              </form>
            </div>
          )}

          {/* By subject */}
          <NavLink
            to="#"
            className="cursor-pointer block px-2 text-sm mx-auto mt-2 hover:bg-amber-200 hover:rounded-lg"
            onClick={handleDisplaySubjectRec}
          >
            By genre
          </NavLink>
          {displaySubjectRec && (
            <div className="flex flex-col gap-2">
              <form className="flex flex-col gap-2 animate-[slideInDownwards_0.5s_ease-in-out_0.1s_both]" onSubmit={handleSubmit((data) => onSubmit(data, "subject"))}>
                <Controller
                  name="subject"
                  control={control}
                  render={({ field, fieldState }) => (
                    <Input
                      name="subject"
                      value={field.value}
                      className="w-full text-sm p-2 border border-[var(--border-gray-byblos)] rounded-lg h-6"
                      required
                      onBlur={field.onBlur}
                      onChange={field.onChange}
                      error={fieldState.error?.message}
                    />
                  )}
                />
                <button
                  type="submit"
                  className="cursor-pointer w-fit mx-auto border border-[var(--border-gray-byblos)] bg-green-300 rounded-lg px-4 py-0.5 text-sm"
                >
                  Search
                </button>
              </form>
            </div>
          )}

          {/* By publish year */}
          <NavLink
            to="#"
            className="cursor-pointer block px-2 text-sm mx-auto mt-2 hover:bg-amber-200 hover:rounded-lg"
            onClick={handleDisplayYearRec}
          >
            By publish year
          </NavLink>
          {displayYearRec && (
            <div className="flex flex-col gap-2">
              <form className="flex flex-col gap-2 animate-[slideInDownwards_0.5s_ease-in-out_0.1s_both]" onSubmit={handleSubmit((data) => onSubmit(data, "year"))}>
                <Controller
                  name="year"
                  control={control}
                  render={({ field, fieldState }) => (
                    <Input
                      name="year"
                      value={field.value}
                      className="w-full text-sm p-2 border border-[var(--border-gray-byblos)] rounded-lg h-6"
                      required
                      onBlur={field.onBlur}
                      onChange={field.onChange}
                      error={fieldState.error?.message}
                    />
                  )}
                />
                <button
                  type="submit"
                  className="cursor-pointer w-fit mx-auto border border-[var(--border-gray-byblos)] bg-green-300 rounded-lg px-4 py-0.5 text-sm"
                >
                  Search
                </button>
              </form>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
