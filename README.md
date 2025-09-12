# 📖 Welcome to Byblos, a book search app based on the OpenLibrary API!
Flip the page into a world of literature with Byblos, an app that lets you search books by title, author, genre, language and publish year, receive random recommendations by category, and store your favorite books!

Take a look at Byblos' deployment [here](https://byblos-books.vercel.app/).

## 🖊️ About the Project
Byblos is built using ``React`` + ``TypeScript``, and focused on providing the user with a clean and intuitive search experience with none of the UI fluff, and all of the data robustness. 

Like it yet? You're about to like it more, because... fun fact: Byblos' advanced search supports searches for books in 100 LANGUAGES!

## 🛠️ Tech Stack & Libraries
- Framework: ``React`` + ``TypeScript`` 
- Styling: ``TailwindCSS``, with integration via ``@tailwindcss/vite`` 
- Routing: ``react-router-dom``
- Forms and validation: ``react-hook-form``
- HTTP requests: ``axios``
- Icons: ``lucide-react`` + local SVGs
- Animations: ``gsap``
- Bundler: ``Vite``
- Deployment: ``Vercel``

## 📦 Installation & Setup
### 1. Clone the repository:

```bash
git clone https://github.com/ori0nis/proyecto-2-react.git
cd proyecto-2-react
```
### 2. Install dependencies

```bash
npm install
```
### 3. Run the development server

```bash
npm run dev
```
### 4. Build for production

```bash
npm run build
```

## 🛢 Data management flux

``OpenLibraryDoc`` and ``Book`` are the backbone of Byblos' data management:

```ts
// Raw info from OpenLibrary - the extraction of the data we want

export interface OpenLibraryDoc {
  title: string;
  author_name: string[];
  first_publish_year: number;
  cover_edition_key: string;
  cover_i: number;
  key: string;
}
```

```ts
// Type that builds the book cover from the OpenLibraryDoc properties

import type { OpenLibraryDoc } from "./OpenLibraryDoc.model";

export interface Book {
  book_details: OpenLibraryDoc;
  cover_size: string;
  cover_image: string;
}
```

1. All requests begin with an ``axios`` call to OpenLibrary:

```ts
export const getBooksByTitle = async (title: string, page: number = 1): Promise<Book[]> => {
  // Encoded query
  const query = encodeURIComponent(title);

  const res = await axios.get(`https://openlibrary.org/search.json?title=${query}&page=${page}`);
  // Transform from OpenLibraryDoc to Book
  return res.data.docs.map((docs: OpenLibraryDoc) => mapDocsToBooks(docs));
};
```

2. Data is received as type ``OpenLibraryDoc``, and mapped to type ``Book`` by ``mapDocsToBooks()``, which builds its cover:

```ts
import type { Book, OpenLibraryDoc } from "../models/book";

export const mapDocsToBooks = (doc: OpenLibraryDoc): Book => {
  return {
    book_details: {
      title: doc.title,
      author_name: doc.author_name ?? ["Unknown"],
      first_publish_year: doc.first_publish_year ?? 0,
      cover_edition_key: doc.cover_edition_key ?? "",
      cover_i: doc.cover_i ?? 0,
      key: doc.key ?? "",
    },
    cover_size: "M",
    cover_image: doc.cover_edition_key
      ? `https://covers.openlibrary.org/b/olid/${doc.cover_edition_key}-M.jpg`
      : doc.cover_i
      ? `https://covers.openlibrary.org/b/id/${doc.cover_i}-M.jpg`
      : "/images/no-cover-available.jpg",
  };
};
```

3. ``axios`` requests are shaped in custom hook ``useFetch()``, which applies search filters to ``Book`` or ``Book[]``:

```ts
const fetchBooksByTitle = async (title: string, loadMore: boolean = false) => {
    // Important for appended new fetch 
    setSearchType("title");

    // This is what controls the appended new fetch
    if (loadMore) {
      setLoadingMore(true);
    } else {
      setLoading(true);
      setBookList([]);
    }

    try {
      const pageToFetch = loadMore ? currentPage + 1 : 1;

      // Cached searches to avoid OpenLibrary's error 429
      if (!loadMore && cache[title]) {
        setBookList(cache[title]);
        setCurrentSearch(title);
        setCurrentPage(1);
        return;
      }

      const books = await getBooksByTitle(title, pageToFetch);
      const filteredBookList = filterOutRepeatedSingleAuthor(books); // In search by title, we avoid serving the exact
                                                                     // same book (same single author) more than once

      if (loadMore) {
        setBookList((prev) => [...prev, ...filteredBookList]);
        setCurrentPage((prev) => prev + 1);
      } else {
        setBookList(filteredBookList);
        setCurrentSearch(title);
        setCurrentPage(1);
        cache[title] = filteredBookList;
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error.message);
        setError(error.message);
      } else {
        console.error(error);
        setError("Unknown error occurred");
      }
    } finally {
      if (loadMore) {
        setLoadingMore(false);
      } else {
        setLoading(false);
      }
    }
  };
```

4. Components are wrapped inside ``SearchContext``, which includes all relevant ``useFetch()`` items:

```ts
interface Props {
  children: ReactNode;
}

export const SearchProvider = ({ children }: Props) => {
  const fetchAnything = useFetch();
  // Relevant for BookDetails page
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  // Uses searchType defined in useFetch() to trigger correct fetch function
  const handleFetchMore = () => {
    switch (fetchAnything.searchType) {
      case "title":
        fetchAnything.fetchBooksByTitle(fetchAnything.currentSearch, true);
        break;
      case "author":
        fetchAnything.fetchBooksByAuthor(fetchAnything.currentSearch, true);
        break;
      (...etc)
    }
  };

  return (
    <SearchContext.Provider
      value={{
        ...fetchAnything,
        handleFetchMore,
        selectedBook, // Relevant for BookDetails page
        setSelectedBook,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
```

5. Search components trigger ``useFetch()`` calls.

- ``SearchBar`` deals with different types of searches by structuring them in an object:

```ts
const searchConfigs = {
    title: {
      name: "title" as const,
      label: "Title: ",
      placeholder: "Example: The Hobbit",
      fetchFn: fetchBooksByTitle,
    },
    author: {
      name: "author" as const,
      label: "Author: ",
      placeholder: "Example: J.R.R Tolkien",
      fetchFn: fetchBooksByAuthor,
    }, (...etc)
```

``onSubmit`` serves the ``react-hook-form`` ``handleSubmit`` with correct data and navigates to correct endpoint:

```ts
const onSubmit = (data: FormValues) => {
    // Provide correct function and navigate to ResultList
    config.fetchFn(data[config.name]);
    setAllowAccess(true);
    navigate("/books/results/result-list");
  };

(...)

<form onSubmit={handleSubmit(onSubmit)}>
  (...)
</form>
```

6. Result components serve book results:

```ts
// Books limited per page
const BOOKS_PER_PAGE = 20;
const [shownBooks, setShownBooks] = useState<number>(BOOKS_PER_PAGE);
const visibleBooks = bookList.slice(0, shownBooks);

// Show and fetch buttons
const canShowMore = bookList.length > shownBooks;
const canFetchMore = !canShowMore && bookList.length > 0;

// Books
{visibleBooks.map((book) => (
  <div
    key={book.book_details.key}
    className={`flex flex-col items-center gap-2 text-center 
    ${listView ? "flex-row items-center gap-4" : ""}`}
    >
      (...)
  </div>
```

## 📋 UI Features
- Search landing page with regular, quick and advanced search by title, author, genre, language and publish year 
- Internal dashboard also features regular, quick and advanced search
- Seamless navigation thanks to SPA build

## 👔 Book Viewing
- View all search results and click on each book for details, with a link to relevant OpenLibrary page
- Book results are limited to 20 per page to speed up requests. Scroll down and click "Show more books" to display rest of current request results, and "Fetch more books" to make a new request that appends to previous one 
- Mobile version also offers a list view for book results

## 📱 Book Favorites and Recommendations
- Mark books as favorites and view them in the Favorites tab. Favorites are managed through ``FavoriteContext``
- Get a random book recommendation by author, genre or publish year (picked just for you from over 800 possible results!):

```ts
export const randomBookRecByAuthor = async (author: string): Promise<Book> => {
  const query = encodeURIComponent(author);
  const pag
```
Just kidding. Not gonna spill the secret sauce ;)

## 🔐 Authorization System
- Internal routes are setup to work only through navigation

## 🚀 Router and Endpoints
- Router is based on ``react-router-dom``, and it is designed to contain all contexts and wrap ``App.tsx``
- ``PrivateGuard`` uses ``NavigationContext`` to provide access to internal routes only after a submitted search
- ``BrokenRouteAvoider`` prevents broken routes and redirects to /404

```ts
interface Props {
  children: ReactNode;
}

export const Router = ({ children }: Props) => {
  return (
    <>
      <BrowserRouter>
        <SearchProvider>
          <NavigationProvider>
            <FavoriteProvider>
              <BrokenRouteAvoider>
                {/* Public route */}
                <Route path="/search" element={<SearchLayout />} />
                {/* Internal routes (only accessible through navigation) */}
                <Route element={<PrivateGuard />}>
                  <Route path="/books/*" element={<PrivateRouter />} />
                </Route>
              </BrokenRouteAvoider>
              {children}
            </FavoriteProvider>
          </NavigationProvider>
        </SearchProvider>
      </BrowserRouter>
    </>
  );
};
```

Available endpoints are:

- ``/search`` - Landing page
- ``/books/results/result-list`` - Display of bulk searches
- ``/books/results/book`` - Display of single searches
- ``/books/results/favorites`` - Favorites page
- ``/books/results/book-detail`` - Book detail page

--> **Please note that the only working deployment endpoint at the moment is:** https://byblos-books.vercel.app <--

## 💎 Last but not least: the crown jewel. 

<div align="center" style="transform: scale(0.7);">
  <img src="https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExMm5ibXFuZ2c1Zmxyd2k3eno1M2F6NWxkeGpla3oxaWhhcnhjamNrcSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/T6DvlxSGY4CGHDueOo/giphy.gif" alt="Demo de Byblos" />
</div>

My first attempt at ``gsap``! Very proud of it.

## 🌟 Future Enhancements
- Book shelves (think to-read, by genre, by rating and such, or customizable by the user)
- Improved search algorithms and filters
- Book results and recommendations catered to user's location or system language
- Maybe a cheeky loading spinner here and there

## 📄 License
This project is open source and available under the ``MIT License``.

## 🤝 Contributing
Contributions, issues, and feature requests are welcome! Contact me for more info, and stay up to date with the issues page.

Happy reading!

