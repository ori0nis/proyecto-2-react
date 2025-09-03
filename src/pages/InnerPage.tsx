/* import { Navigate } from "react-router-dom"; */
import { Navigate, useNavigate } from "react-router-dom";
import { Recommendations } from "../components/inner-menu";
import { ResultList, SingleResult, Favorites } from "../components/results";
import { useSearch } from "../context/search";
import { useNavigation } from "../context/navigation";

export const InnerPage = () => {
  const { searchType, setSearchType } = useSearch();
  const { allowAccess } = useNavigation();
  const navigate = useNavigate();
  /* if (!hasSearched) return <Navigate to="/search" replace />; */
  if (!allowAccess) return <Navigate to="/search" replace />;

  return (
    <div>
      <button onClick={() => navigate("/search")}>Back to home page</button>
      {/* Recommendations siempre se muestra */}
      <button onClick={() => setSearchType("favorites")}>My favorites</button>
      <Recommendations />
      {/* Dependiendo del tipo de búsqueda, renderizamos uno u otro */}
      {searchType === "single title" && <SingleResult />}
      {(searchType === "title" ||
        searchType === "author" ||
        searchType === "year" ||
        searchType === "subject" ||
        searchType === "advanced search") && <ResultList />}
      {searchType === "favorites" && <Favorites />}
    </div>
  );
};
