import { HomeButton, FavoritesButton } from "./sidebar-items";
import { RecommendationsButton, RecommendationsList } from "./sidebar-items";
import { useSearch } from "../../context/search";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

type FormValues = { author: string; subject: string; year: string };

export const Sidebar = () => {
  const { fetchRandomBookByAuthor, fetchRandomBookBySubject, fetchRandomBookByYear } = useSearch();
  const { handleSubmit, control, reset } = useForm<FormValues>({
    defaultValues: { author: "", subject: "", year: "" },
  });
  const navigate = useNavigate();
  const location = useLocation();

  const [showRecommendations, setShowRecommendations] = useState(false);
  const [displayAuthorRec, setDisplayAuthorRec] = useState(false);
  const [displaySubjectRec, setDisplaySubjectRec] = useState(false);
  const [displayYearRec, setDisplayYearRec] = useState(false);

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
    /* Títulos, dependiendo de la vista */
    <div className="xs:w-[200px] h-fit px-4 rounded-lg flex flex-col gap-4 xs:gap-0">
      {/* Título de menú */}
      <h2 className="hidden xs:block text-xl font-semibold cursor-default">MENU</h2>
      <hr className="xs:block hidden border-t border-gray-400" />

      {/* Título de Byblos */}
      <h2 className="block xs:hidden text-5xl text-center font-medium">
        B
        <img
          className="inline w-12 h-12 mb-3 object-cover bg-gray-200 border-0 rounded-lg"
          src="../../../images/byblos-256.png"
          alt="Byblos Logo"
        />
        BLOS
      </h2>

      {/* Botones */}
      <div className="flex xs:flex-col flex-row gap-2 justify-center">
        <HomeButton />
        <hr className="border-t border-gray-400" />
        <FavoritesButton />
        <hr className="border-t border-gray-400" />
        <RecommendationsButton toggle={() => setShowRecommendations((prev) => !prev)} />
      </div>

      {/* Recomendaciones, solo cuando se pulsa el botón */}
      {showRecommendations && (
        <RecommendationsList
          displayAuthorRec={displayAuthorRec}
          displaySubjectRec={displaySubjectRec}
          displayYearRec={displayYearRec}
          toggleAuthor={() => setDisplayAuthorRec((prev) => !prev)}
          toggleSubject={() => setDisplaySubjectRec((prev) => !prev)}
          toggleYear={() => setDisplayYearRec((prev) => !prev)}
          onSubmit={onSubmit}
          control={control}
          handleSubmit={handleSubmit}
        />
      )}
    </div>
  );
};
