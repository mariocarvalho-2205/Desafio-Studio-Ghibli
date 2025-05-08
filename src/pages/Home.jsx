import { useContext } from "react";
import SearchBar from "../components/SearchBar";
import FilterPanel from "../components/FilterPanel";
import MovieCard from "../components/MovieCard"; // ✅ estava faltando
import { MovieContext } from "../contexts/MovieContext";

const Home = () => {
  const { filteredMovies = [] } = useContext(MovieContext);

  return (
    <div className="p-56">
      <h1 className="text-2xl font-bold mb-4">Studio Ghibli Collection</h1>
      <p>Explore the magical world of Studio Ghibli films. Mark your favorites and keep track of what you've watched.</p>
      <SearchBar />
      <FilterPanel />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {filteredMovies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default Home;
