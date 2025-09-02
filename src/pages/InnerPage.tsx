import { Navigate } from "react-router-dom";
import { Recommendations } from "../components/inner-menu";
import { ResultList, SingleResult } from "../components/results";
import { useSearch } from "../context/search";

export const InnerPage = () => {
  const { hasSearched, searchType } = useSearch();

  if (!hasSearched) return <Navigate to="/search" replace />;

  return (
    <div>
      {/* Recommendations siempre se muestra */}
      <Recommendations />

      {/* Dependiendo del tipo de búsqueda, renderizamos uno u otro */}
      {searchType === "single title" && <SingleResult />}
      {(searchType === "title" ||
        searchType === "author" ||
        searchType === "year" ||
        searchType === "subject" ||
        searchType === "advanced search") && <ResultList />}
    </div>
  );
};
