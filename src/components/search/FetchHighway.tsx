//? Este componente funciona como una autopista que bifurca y eleva estados. Gracias a él, los estados se pueden compartir entre componentes, con lo que SearchBar puede preocuparse solo de buscar y ResultList de mostrar resultados

import { useFetch } from "../../hooks/useFetch";
import { ResultList } from "../results/index";
import { SearchBar } from "./index";

export const FetchHighway = () => {
  const fetchAnything = useFetch();

  const handleFetchMore = () => {
    switch (fetchAnything.searchType) {
      case "title":
        fetchAnything.fetchBooksByTitle(fetchAnything.currentSearch, true);
        break;
      case "author":
        fetchAnything.fetchBooksByAuthor(fetchAnything.currentSearch, true);
        break;
      case "year":
        fetchAnything.fetchBooksByFirstPublishYear(fetchAnything.currentSearch, true);
        break;
      case "subject":
        fetchAnything.fetchBooksBySubject(fetchAnything.currentSearch, true);
        break;
    }
  };

  return (
    <div>
      <SearchBar
        fetchBooksByTitle={fetchAnything.fetchBooksByTitle}
        fetchFirstBookByTitle={fetchAnything.fetchFirstBookByTitle}
        fetchBooksByAuthor={fetchAnything.fetchBooksByAuthor}
        fetchBooksByFirstPublishYear={fetchAnything.fetchBooksByFirstPublishYear}
        fetchBooksBySubject={fetchAnything.fetchBooksBySubject}
      />
      <ResultList bookList={fetchAnything.bookList} loading={fetchAnything.loading} error={fetchAnything.error} onFetchMore={handleFetchMore} />
    </div>
  );
};
