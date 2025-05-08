import { createContext, useState, useEffect } from "react";

export const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);
  const [filters, setFilters] = useState({
    watched: false,
    favorite: false,
    stars: null,
    hasNote: false,
  });

  const [search, setSearch] = useState("");
  const [includeSynopsis, setIncludeSynopsis] = useState(true);
  const [personalRatings, setPersonalRatings] = useState({});
  const [noteModalMovieId, setNoteModalMovieId] = useState(null);

  const setPersonalRating = (movieId, rating) => {
    setPersonalRatings((prev) => ({
      ...prev,
      [movieId]: rating,
    }));
  };

  const toggleFavorite = (id) => {
    setMovies((prev) =>
      prev.map((movie) =>
        movie.id === id ? { ...movie, favorite: !movie.favorite } : movie
      )
    );
  };

  const toggleWatched = (id) => {
    setMovies((prev) =>
      prev.map((movie) =>
        movie.id === id ? { ...movie, watched: !movie.watched } : movie
      )
    );
  };

  const openNoteModal = (id) => {
    setNoteModalMovieId(id);
  };

  const closeNoteModal = () => {
    setNoteModalMovieId(null);
  };

  const addNoteToMovie = (id, note, personalRating) => {
    const updated = movies.map((movie) =>
      movie.id === id ? { ...movie, note, personalRating } : movie
    );
    setMovies(updated);
    localStorage.setItem("movies", JSON.stringify(updated));
  };

  const highlightSearch = (text) => {
    if (!search) return text;
    const regex = new RegExp(`(${search})`, "gi");
    return text.replace(regex, "<mark>$1</mark>");
  };

  const filteredMovies = movies.filter((movie) => {
    const searchTarget = includeSynopsis
      ? `${movie.title} ${movie.description}`
      : movie.title;

    const matchesSearch = searchTarget
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesFilters =
      (!filters.watched || movie.watched) &&
      (!filters.favorite || movie.favorite) &&
      (!filters.hasNote || !!movie.note) &&
      (!filters.stars || personalRatings[movie.id] === filters.stars);

    return matchesSearch && matchesFilters;
  });

  useEffect(() => {
    const savedMovies = localStorage.getItem("movies");
    if (savedMovies) {
      setMovies(JSON.parse(savedMovies));
    } else {
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
          personalRating: 0,
        }));
        setMovies(formatted);
      });
    }
  }, []);

    // Salvar no localStorage sempre que movies mudar
    useEffect(() => {
        if (movies.length > 0) {
          localStorage.setItem("movies", JSON.stringify(movies));
        }
      }, [movies]);

  return (
    <MovieContext.Provider
      value={{
        movies,
        setMovies,
        filters,
        setFilters,
        search,
        setSearch,
        includeSynopsis,
        setIncludeSynopsis,
        personalRatings,
        setPersonalRating,
        filteredMovies,
        toggleFavorite,
        toggleWatched,
        noteModalMovieId,
        openNoteModal,
        closeNoteModal,
        addNoteToMovie,
        highlightSearch,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};
