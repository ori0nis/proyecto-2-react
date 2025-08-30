import { useState } from "react";

export const SearchBar = () => {
  const [userInput, setUserInput] = useState<string>("");

  return (
    <div>
      <h1>Byblos</h1>
      <button>Search</button>
      <button>Quick search</button>
    </div>
  );
};
