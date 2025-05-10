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
  const [noteModalOpen, setNoteModalOpen] = useState(false);
  const [noteModalMovieId, setNoteModalMovieId] = useState(null);

  // Log de estado para debug
  useEffect(() => {
    if (filters.sortField) {
      console.log("Filtro de ordenação:", filters.sortField, filters.sortOrder);
    }
  }, [filters.sortField, filters.sortOrder]);

  const setPersonalRating = (movieId, rating) => {
    // Atualizar o rating no estado do contexto
    setPersonalRatingState((prev) => ({
      ...prev,
      [movieId]: rating,
    }));
    
    // Também atualizar o rating no estado dos filmes para persistência
    setMovies((prev) =>
      prev.map((movie) =>
        movie.id === movieId
          ? { ...movie, personalRating: rating }
          : movie
      )
    );
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

  // Carregar filmes e ratings na inicialização
  useEffect(() => {
    const savedMovies = localStorage.getItem("movies");
    if (savedMovies) {
      try {
        const parsed = JSON.parse(savedMovies);
        setMovies(parsed);

        // Extrair todos os ratings dos filmes salvos
        const ratings = {};
        parsed.forEach((movie) => {
          if (movie.personalRating) {
            ratings[movie.id] = movie.personalRating;
          }
        });
        setPersonalRatingState(ratings);
      } catch (error) {
        console.error("Erro ao carregar filmes do localStorage:", error);
        fetchMoviesFromAPI();
      }
    } else {
      fetchMoviesFromAPI();
    }
  }, []);

  // Função auxiliar para buscar filmes da API
  const fetchMoviesFromAPI = () => {
    fetch("https://ghibliapi.vercel.app/films")
      .then((res) => res.json())
      .then((data) => {
        const formatted = data.map((movie) => ({
          ...movie,
          watched: false,
          favorite: false,
          hasNote: false,
          note: "",
          personalRating: 0,
        }));
        setMovies(formatted);
      })
      .catch((error) => {
        console.error("Erro ao buscar filmes da API:", error);
      });
  };

  // Salvar filmes quando houver mudanças
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
        openNoteModal,
        closeNoteModal,
        noteModalOpen,
        noteModalMovieId,
        highlightSearch,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};