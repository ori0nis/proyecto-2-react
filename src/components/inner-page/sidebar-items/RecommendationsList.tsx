import { Controller, type Control, type SubmitHandler } from "react-hook-form";
import { NavLink } from "react-router-dom";
import { Input } from "../../search";

type FormValues = { author: string; subject: string; year: string };

interface RecommendationsListProps {
  displayAuthorRec: boolean;
  displaySubjectRec: boolean;
  displayYearRec: boolean;
  toggleAuthor: () => void;
  toggleSubject: () => void;
  toggleYear: () => void;
  onSubmit: (data: FormValues, type: "author" | "subject" | "year") => void;
  control: Control<FormValues>;
  handleSubmit: (callback: SubmitHandler<FormValues>) => (e?: React.BaseSyntheticEvent) => Promise<void>; // xd
}

export const RecommendationsList = ({
  displayAuthorRec,
  displaySubjectRec,
  displayYearRec,
  toggleAuthor,
  toggleSubject,
  toggleYear,
  onSubmit,
  control,
  handleSubmit,
}: RecommendationsListProps) => {
  return (
    <div className="w-full flex flex-col gap-2 items-center justify-center animate-[slideInDownwards_0.5s_ease-in-out_0.1s_both]">
      {/* By author */}
      <NavLink
        to="#"
        className="cursor-pointer text-xs font-semibold border border-[var(--border-gray-byblos)] rounded-lg hover:bg-amber-200 p-1 px-2"
        onClick={toggleAuthor}
      >
        By author
      </NavLink>
      {displayAuthorRec && (
        <form
          className="flex flex-col gap-2 w-fit animate-[slideInDownwards_0.5s_ease-in-out_0.1s_both]"
          onSubmit={handleSubmit((data) => onSubmit(data, "author"))}
        >
          <Controller
            name="author"
            control={control}
            render={({ field, fieldState }) => (
              <Input
                {...field}
                placeholder="Ex: George Orwell"
                className="w-full text-sm p-2 border border-[var(--border-gray-byblos)] rounded-lg h-6"
                error={fieldState.error?.message}
              />
            )}
          />
          <button
            type="submit"
            className="cursor-pointer mx-auto border border-[var(--border-gray-byblos)] bg-green-300 rounded-lg px-4 py-1 mb-4 text-xs"
          >
            Search
          </button>
        </form>
      )}

      {/* By genre */}
      <NavLink
        to="#"
        className="cursor-pointer text-xs font-semibold border border-[var(--border-gray-byblos)] rounded-lg p-1 hover:bg-amber-200 px-2"
        onClick={toggleSubject}
      >
        By genre
      </NavLink>
      {displaySubjectRec && (
        <form
          className="flex flex-col gap-2 w-fit animate-[slideInDownwards_0.5s_ease-in-out_0.1s_both]"
          onSubmit={handleSubmit((data) => onSubmit(data, "subject"))}
        >
          <Controller
            name="subject"
            control={control}
            render={({ field, fieldState }) => (
              <Input
                {...field}
                placeholder="Ex: Fantasy"
                className="w-full text-sm p-2 border border-[var(--border-gray-byblos)] rounded-lg h-6"
                error={fieldState.error?.message}
              />
            )}
          />
          <button
            type="submit"
            className="cursor-pointer mx-auto border border-[var(--border-gray-byblos)] bg-green-300 rounded-lg px-4 py-1 mb-4 text-xs"
          >
            Search
          </button>
        </form>
      )}

      {/* By year */}
      <NavLink
        to="#"
        className="cursor-pointer text-xs font-semibold border border-[var(--border-gray-byblos)] rounded-lg p-1 hover:bg-amber-200 px-2"
        onClick={toggleYear}
      >
        By publish year
      </NavLink>
      {displayYearRec && (
        <form
          className="flex flex-col gap-2 w-fit animate-[slideInDownwards_0.5s_ease-in-out_0.1s_both]"
          onSubmit={handleSubmit((data) => onSubmit(data, "year"))}
        >
          <Controller
            name="year"
            control={control}
            render={({ field, fieldState }) => (
              <Input
                {...field}
                placeholder="Ex: 1995"
                className="w-full text-sm p-2 border border-[var(--border-gray-byblos)] rounded-lg h-6"
                error={fieldState.error?.message}
              />
            )}
          />
          <button
            type="submit"
            className="cursor-pointer mx-auto border border-[var(--border-gray-byblos)] bg-green-300 rounded-lg px-4 py-1 text-xs"
          >
            Search
          </button>
        </form>
      )}
    </div>
  );
};
