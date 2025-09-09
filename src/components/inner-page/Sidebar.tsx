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
    <div className="xs:w-[200px] py-4 px-4 rounded-lg flex flex-col gap-4">
      <h2 className="hidden xs:block text-xl mt-3 font-semibold cursor-default">MENU</h2>
      <hr className="xs:block hidden border-t border-gray-400" />

      <h2 className="block xs:hidden text-5xl text-center font-medium">
        B
        <img
          className="inline w-12 h-12 mb-3 object-cover bg-gray-200 border-0 rounded-lg"
          src="../../../images/byblos-256.png"
          alt="Byblos Logo"
        />
        BLOS
      </h2>
      <hr className="block xs:hidden border-t border-gray-400" />

      <div className="flex xs:flex-col flex-row gap-4 justify-center">
        <HomeButton />
        <FavoritesButton />
        <RecommendationsButton toggle={() => setShowRecommendations((prev) => !prev)} />
      </div>

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
