import { createContext, useState, useEffect } from "react";
import { movieService } from "../services/movieService";
import { notificationService } from "../services/notificationService";

export const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
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
  const [noteModalOpen, setNoteModalOpen] = useState(false);
  const [noteModalMovieId, setNoteModalMovieId] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);
  const [toastType, setToastType] = useState(null);

  // Log de estado para debug
  useEffect(() => {
    if (filters.sortField) {
      console.log("Filtro de ordenação:", filters.sortField, filters.sortOrder);
    }
  }, [filters.sortField, filters.sortOrder]);

  // Carregar filmes e ratings na inicialização
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const savedMovies = movieService.loadMoviesFromStorage();
        const savedRatings = movieService.loadRatingsFromStorage();
        
        if (savedMovies) {
          setMovies(savedMovies);
        } else {
          const fetchedMovies = await movieService.fetchMovies();
          setMovies(fetchedMovies);
        }

        if (savedRatings) {
          setPersonalRatingState(savedRatings);
        }
      } catch (error) {
        setError("Erro ao carregar os filmes. Por favor, tente novamente.");
        console.error("Erro ao carregar dados iniciais:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadInitialData();
  }, []);

  useEffect(() => {
    if (movies.length > 0) {
      movieService.saveMoviesToStorage(movies);
    }
  }, [movies]);

  const showToast = (message, type) => {
    notificationService.showToast(message, type, setToastMessage, setToastType);
  };

  const setPersonalRating = (movieId, rating) => {
    const movie = movies.find(m => m.id === movieId);
    const action = rating === 0 ? "removida" : "adicionada";
    
    setPersonalRatingState((prev) => {
      const newRatings = {
        ...prev,
        [movieId]: rating,
      };
      movieService.saveRatingsToStorage(newRatings);
      return newRatings;
    });

    showToast(`Avaliação ${action} para ${movie.title}`, "rating");
  };

  const toggleFavorite = (id) => {
    const movie = movies.find(m => m.id === id);
    const action = movie.favorite ? "removido" : "adicionado";
    
    setMovies((prev) =>
      prev.map((m) =>
        m.id === id ? { ...m, favorite: !m.favorite } : m
      )
    );

    showToast(`Filme ${action} aos favoritos`, "favorite");
  };

  const toggleWatched = (id) => {
    const movie = movies.find(m => m.id === id);
    const action = movie.watched ? "removido" : "marcado";
    
    setMovies((prev) =>
      prev.map((m) =>
        m.id === id ? { ...m, watched: !m.watched } : m
      )
    );

    showToast(`Filme ${action} como assistido`, "watched");
  };

  const highlightSearch = (text) => {
    if (!search) return text;
    const regex = new RegExp(`(${search})`, "gi");
    return text.replace(regex, "<mark>$1</mark>");
  };

  // Função de ordenação simplificada 
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
    } else if (field === "rt_score") {
      // Score é sempre numérico, vamos garantir isso
      valA = parseFloat(a.rt_score) || 0;
      valB = parseFloat(b.rt_score) || 0;
    } else if (field === "running_time") {
      // Duração é sempre numérica
      valA = parseFloat(a.running_time) || 0;
      valB = parseFloat(b.running_time) || 0;
    } else if (field === "release_date") {
      // Data de lançamento - converter para inteiro
      valA = parseInt(a.release_date, 10) || 0;
      valB = parseInt(b.release_date, 10) || 0;
    } else {
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

  const openNoteModal = (movieId) => {
    setNoteModalMovieId(movieId);
    setNoteModalOpen(true);
  };
  
  const closeNoteModal = () => {
    setNoteModalOpen(false);
    setNoteModalMovieId(null);
  };

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
        openNoteModal,
        closeNoteModal,
        noteModalOpen,
        noteModalMovieId,
        highlightSearch,
        toastMessage,
        toastType,
        showToast,
        isLoading,
        error,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};