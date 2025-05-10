import axios from 'axios';

// Configuração base do Axios para todas as requisições
const api = axios.create({
  baseURL: 'https://ghibliapi.vercel.app',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Interceptor para tratamento de erros
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response) {
      // Erro do servidor
      console.error('Erro na resposta:', error.response.data);
    } else if (error.request) {
      // Erro na requisição
      console.error('Erro na requisição:', error.request);
    } else {
      // Erro na configuração
      console.error('Erro:', error.message);
    }
    return Promise.reject(error);
  }
);

export const apiService = {
  // Método para buscar todos os filmes
  async getMovies() {
    try {
      const response = await api.get('/films');
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar filmes:', error);
      throw error;
    }
  }
}; 