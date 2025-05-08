import { createContext, useState, useEffect } from "react";

export const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);
  const [filters, setFilters] = useState({
    watched: false,
    favorite: false,
    hasNote: false,
    stars: "",
  });

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
    <MovieContext.Provider value={{ movies, setMovies, filters, setFilters }}>
      {children}
    </MovieContext.Provider>
  );
};
