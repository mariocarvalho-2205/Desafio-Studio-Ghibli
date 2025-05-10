import { apiService } from './apiService';

export const movieService = {
  // Busca filmes da API e salva no localStorage
  async fetchMovies() {
    try {
      const data = await apiService.getMovies();
      return data.map(movie => ({
        ...movie,
        watched: false,
        favorite: false,
        hasNote: false,
        note: "",
        personalRating: 0,
      }));
    } catch (error) {
      console.error("Erro ao buscar filmes:", error);
      throw error;
    }
  },

  // Persiste os filmes no localStorage
  saveMoviesToStorage(movies) {
    if (movies.length > 0) {
      localStorage.setItem("movies", JSON.stringify(movies));
    }
  },

  // Recupera os filmes do localStorage
  loadMoviesFromStorage() {
    const savedMovies = localStorage.getItem("movies");
    if (savedMovies) {
      try {
        return JSON.parse(savedMovies);
      } catch (error) {
        console.error("Erro ao carregar filmes do localStorage:", error);
        return null;
      }
    }
    return null;
  },

  saveRatingsToStorage(ratings) {
    localStorage.setItem("personalRatings", JSON.stringify(ratings));
  },

  loadRatingsFromStorage() {
    const savedRatings = localStorage.getItem("personalRatings");
    if (savedRatings) {
      try {
        return JSON.parse(savedRatings);
      } catch (error) {
        console.error("Erro ao carregar ratings do localStorage:", error);
        return {};
      }
    }
    return {};
  }
}; 