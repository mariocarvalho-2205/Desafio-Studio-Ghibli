import { createContext, useState, useEffect } from "react";

export const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
    const [includeSynopsis, setIncludeSynopsis] = useState(true); 
  const [movies, setMovies] = useState([]);
  const [filters, setFilters] = useState({
    watched: false,
    favorite: false,
    hasNote: false,
    stars: "",
  });

  const filteredMovies = movies.filter((movie) => {
    // Aplica os filtros aqui, como watched, favorite, etc.
    return true;  // Exemplo de filtro
  });

  const highlightSearch = (text) => {
    const searchTerm = "someSearchTerm";  // Você pode substituir isso por um estado ou variável dinâmica de pesquisa
    if (searchTerm) {
      return text.replace(
        new RegExp(`(${searchTerm})`, "gi"),
        `<span class="bg-yellow-300">$1</span>`
      );
    }
    return text;
  };

  useEffect(() => {
    fetch("https://ghibliapi.vercel.app/films")
      .then((res) => res.json())
      .then((data) => {
        const formatted = data.map((movie) => ({
          ...movie,
          watched: false,
          favorite: false,
          hasNote: false,
          note: "",
          stars: 0,
        }));
        setMovies(formatted);
      });
  }, []);

  return (
    <MovieContext.Provider value={{ movies, setMovies, filters, setFilters, filteredMovies, highlightSearch }}>
      {children}
    </MovieContext.Provider>
  );
};
