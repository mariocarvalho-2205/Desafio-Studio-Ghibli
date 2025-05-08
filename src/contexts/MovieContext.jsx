import { createContext, useContext, useEffect, useState } from 'react';
import axios from '../data/api';

export const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [includeSynopsis, setIncludeSynopsis] = useState(false);

  useEffect(() => {
    const fetchMovies = async () => {
        await axios.get('/films')
        .then((res) => setMovies(res.data))
        .catch((err) => console.error(err));
    };
    fetchMovies();
}, []);

  const filteredMovies = movies.filter(movie => {
    const textMatch = movie.title.toLowerCase().includes(searchText.toLowerCase());
    const synopsisMatch = includeSynopsis && movie.description.toLowerCase().includes(searchText.toLowerCase());
    return textMatch || synopsisMatch;
  });

  return (
    <MovieContext.Provider value={{ movies, setMovies, filteredMovies, searchText, setSearchText, includeSynopsis, setIncludeSynopsis }}>
      {children}
    </MovieContext.Provider>
  );
};
