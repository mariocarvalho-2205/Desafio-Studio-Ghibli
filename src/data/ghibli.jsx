import axios from 'axios';

export const fetchMovies = async () => {
  const res = await axios.get('https://ghibliapi.vercel.app/api/films');
  return res.data;
};

