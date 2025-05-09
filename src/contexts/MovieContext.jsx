import { createContext, useState, useEffect } from "react";

export const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);
  const [filters, setFilters] = useState({
    watched: false,
    favorite: false,
    hasNote: false,
    stars: null, // null | 1 | 2 | 3 | 4 | 5 | 'with' | 'none'
    sortField: null, // 'title' | 'release_date' | 'stars'
    sortOrder: "asc", // 'asc' | 'desc'
  });

  const [search, setSearch] = useState("");
  const [includeSynopsis, setIncludeSynopsis] = useState(true);
  const [personalRating, setPersonalRatingState] = useState({});
  const [noteModalMovieId, setNoteModalMovieId] = useState(null);

  const setPersonalRating = (movieId, rating) => {
    setPersonalRatingState((prev) => ({
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

  const addNoteToMovie = (id, note, personalRatingValue) => {
    const updated = movies.map((movie) =>
      movie.id === id
        ? { ...movie, note, personalRating: personalRatingValue }
        : movie
    );
    setMovies(updated);
    setPersonalRating(id, personalRatingValue);
    localStorage.setItem("movies", JSON.stringify(updated));
  };

  const highlightSearch = (text) => {
    if (!search) return text;
    const regex = new RegExp(`(${search})`, "gi");
    return text.replace(regex, "<mark>$1</mark>");
  };

const filteredMovies = movies
  .filter((movie) => {
    const searchTarget = includeSynopsis
      ? `${movie.title} ${movie.description}`
      : movie.title;

    const matchesSearch = searchTarget
      .toLowerCase()
      .includes(search.toLowerCase());

    const rating = personalRating[movie.id] || 0;

    const matchesWatched = !filters.watched || movie.watched;
    const matchesFavorite = !filters.favorite || movie.favorite;
    const matchesHasNote = !filters.hasNote || !!movie.note;

    let matchesStars = true;
    if (filters.stars === "with") {
      matchesStars = rating > 0;
    } else if (filters.stars === "none") {
      matchesStars = rating === 0;
    } else if (typeof filters.stars === "number") {
      matchesStars = rating === filters.stars;
    }

    return (
      matchesSearch &&
      matchesWatched &&
      matchesFavorite &&
      matchesHasNote &&
      matchesStars
    );
  })
  .sort((a, b) => {
    if (!filters.sortField) return 0;

    const field = filters.sortField;
    let valA, valB;

    if (field === "stars") {
      valA = personalRating[a.id] || 0;
      valB = personalRating[b.id] || 0;
    } else if (["rt_score", "release_date", "running_time"].includes(field)) {
      valA = parseInt(a[field], 10);
      valB = parseInt(b[field], 10);
    } else {
      valA = a[field];
      valB = b[field];
    }

    if (typeof valA === "string") {
      return filters.sortOrder === "asc"
        ? valA.localeCompare(valB)
        : valB.localeCompare(valA);
    }

    return filters.sortOrder === "asc" ? valA - valB : valB - valA;
  });

  useEffect(() => {
    const savedMovies = localStorage.getItem("movies");
    if (savedMovies) {
      const parsed = JSON.parse(savedMovies);
      setMovies(parsed);

      const ratings = {};
      parsed.forEach((movie) => {
        if (movie.personalRating) {
          ratings[movie.id] = movie.personalRating;
        }
      });
      setPersonalRatingState(ratings);
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
        personalRating,
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
