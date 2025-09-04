import { useState } from "react";
import { AdvancedSearchForm, SearchBar } from "../../components/search";

export const SearchLayout = () => {
  const [showAdvancedSearch, setShowAdvancedSearch] = useState<boolean>(false);

  const toggleAdvancedSearch = () => setShowAdvancedSearch((prev) => !prev);

  return (
    <div className="text-center flex flex-col items-center justify-center w-full min-h-screen bg-amber-100">
      <SearchBar />

      <button onClick={toggleAdvancedSearch}>
        {showAdvancedSearch ? "Hide advanced search" : "Show advanced search"}
      </button>

      {showAdvancedSearch && <AdvancedSearchForm />}
    </div>
  );
};
