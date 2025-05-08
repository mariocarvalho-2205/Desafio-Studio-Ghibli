// import MovieCard from '../components/MovieCard';
// import SearchBar from '../components/SearchBar';
// import FilterPanel from '../components/FilterPanel';
import { useMovies } from '../contexts/MovieContext';

const Home = () => {
  const { filteredMovies } = useMovies();

  return (
    <div className="p-4">
      <h1>teste</h1>
      {/* <SearchBar /> */}
      {/* <FilterPanel /> */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <p>teste</p>
        {/* {filteredMovies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))} */}
      </div>
    </div>
  );
};

export default Home;