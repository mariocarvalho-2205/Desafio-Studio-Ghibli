import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://ghibliapi.vercel.app',
});

export default instance;
