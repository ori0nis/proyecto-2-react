import { useState } from "react";
import { AdvancedSearchForm, SearchBar } from "../../components/search";
import { ChevronDown, ChevronUp } from "lucide-react";

export const SearchLayout = () => {
  const [showAdvancedSearch, setShowAdvancedSearch] = useState<boolean>(false);

  const toggleAdvancedSearch = () => setShowAdvancedSearch((prev) => !prev);

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen bg-amber-50">
      <div className={`transition-opacity duration-700 ${showAdvancedSearch ? "opacity-35" : "opacity-100"}`}>
        <SearchBar />
      </div>

      <div className="py-4 text-sm text-center">
        {showAdvancedSearch ? (
          <>
            <p>Hide advanced search</p>
            <button className="cursor-pointer" onClick={toggleAdvancedSearch}>
              <ChevronUp size={16} />
            </button>
          </>
        ) : (
          <>
            <p>Show advanced search</p>
            <button className="cursor-pointer" onClick={toggleAdvancedSearch}>
              <ChevronDown size={16} />
            </button>
          </>
        )}
      </div>

      {showAdvancedSearch && (
        <div className={`animate-[slideInDownwards_0.5s_ease-in-out_0.1s_both]`}>
          <AdvancedSearchForm />
        </div>
      )}
    </div>
  );
};
