import { useState } from "react";
import { AdvancedSearchForm, SearchBar } from "../../components/search";

export const SearchPage = () => {
  const [showAdvancedSearch, setShowAdvancedSearch] = useState<boolean>(false);

  const toggleAdvancedSearch = () => setShowAdvancedSearch((prev) => !prev);

  return (
    <div>
      <SearchBar />

      <button onClick={toggleAdvancedSearch}>
        {showAdvancedSearch ? "Hide advanced search" : "Show advanced search"}
      </button>

      {showAdvancedSearch && <AdvancedSearchForm />}
    </div>
  );
};
