/* import { Navigate } from "react-router-dom"; */
import { Navigate, useNavigate } from "react-router-dom";
import { InnerAdvancedSearchForm, InnerSearchBar, Recommendations } from "../../components/inner-page";
import { ResultList, SingleResult, Favorites } from "../../components/results";
import { useSearch } from "../../context/search";
import { useNavigation } from "../../context/navigation";
import { BookDetails } from "../../components/results/BookDetails";
import { useState } from "react";

export const InnerPage = () => {
  const { searchType, setSearchType, selectedBook } = useSearch();
  const { allowAccess } = useNavigation();
  const navigate = useNavigate();
  const [showAdvancedSearch, setShowAdvancedSearch] = useState<boolean>(false);

  const toggleAdvancedSearch = () => setShowAdvancedSearch((prev) => !prev);

  if (!allowAccess) return <Navigate to="/search" replace />;

  return (
    <div>
      {/* Versiones inner de las barras de búsqueda (no navegan, ahora sirven resultados en el display) */}
      <div>
        <InnerSearchBar />

        <button onClick={toggleAdvancedSearch}>
          {showAdvancedSearch ? "Hide advanced search" : "Show advanced search"}
        </button>

        {showAdvancedSearch && <InnerAdvancedSearchForm />}
      </div>

      {/* Los botones y Recommendations siempre se muestran */}
      <button onClick={() => navigate("/search")}>Back to home page</button>
      <button onClick={() => setSearchType("favorites")}>My favorites</button>
      <Recommendations />
      {/* Dependiendo del tipo de búsqueda, renderizamos un result display u otro */}
      {selectedBook ? (
        <BookDetails />
      ) : (
        <>
          {searchType === "single title" && <SingleResult />}
          {(searchType === "title" ||
            searchType === "author" ||
            searchType === "year" ||
            searchType === "subject" ||
            searchType === "advanced search") && <ResultList />}
          {searchType === "favorites" && <Favorites />}
        </>
      )}
    </div>
  );
};
