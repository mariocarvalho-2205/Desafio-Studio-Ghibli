import { createContext, useState, useEffect } from "react";

export const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);
  const [filters, setFilters] = useState({
    watched: false,
    favorite: false,
    hasNote: false,
    stars: null, // null | 1 | 2 | 3 | 4 | 5 | 'with' | 'none'
    sortField: "", // 'title' | 'release_date' | 'running_time' | 'rt_score' | 'stars'
    sortOrder: "asc", // 'asc' | 'desc'
  });

  const [search, setSearch] = useState("");
  const [includeSynopsis, setIncludeSynopsis] = useState(true);
  const [personalRating, setPersonalRatingState] = useState({});
  const [noteModalMovieId, setNoteModalMovieId] = useState(null);

  // Log de estado para debug
  useEffect(() => {
    if (filters.sortField) {
      console.log("Filtro de ordenação:", filters.sortField, filters.sortOrder);
    }
  }, [filters.sortField, filters.sortOrder]);

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

  // Função de ordenação simplificada e robusta
  const sortMovies = (a, b) => {
    // Se não há campo de ordenação, retorna a ordem original
    if (!filters.sortField) return 0;
    
    const field = filters.sortField;
    const order = filters.sortOrder === "asc" ? 1 : -1;
    
    // Determina os valores para comparação com base no campo
    let valA, valB;
    
    if (field === "stars") {
      // Para ordenação por estrelas, usamos personalRating
      valA = personalRating[a.id] || 0;
      valB = personalRating[b.id] || 0;
    } 
    else if (field === "rt_score") {
      // Score é sempre numérico, vamos garantir isso
      valA = parseFloat(a.rt_score) || 0;
      valB = parseFloat(b.rt_score) || 0;
    }
    else if (field === "running_time") {
      // Duração é sempre numérica
      valA = parseFloat(a.running_time) || 0;
      valB = parseFloat(b.running_time) || 0;
    }
    else if (field === "release_date") {
      // Data de lançamento - converter para inteiro
      valA = parseInt(a.release_date, 10) || 0;
      valB = parseInt(b.release_date, 10) || 0;
    }
    else {
      // Para outros campos como título
      valA = a[field];
      valB = b[field];
    }
    
    // Ordenação específica para strings
    if (typeof valA === "string" && typeof valB === "string") {
      return order * valA.localeCompare(valB);
    }
    
    // Ordenação numérica padrão
    return order * (valA - valB);
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
    .sort(sortMovies);

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