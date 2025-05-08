import { useContext } from "react";
import SearchBar from "../components/SearchBar";
import FilterPanel from "../components/FilterPanel";
import MovieCard from "../components/MovieCard"; // ✅ estava faltando
import { MovieContext } from "../contexts/MovieContext";

const Home = () => {
  const { filteredMovies = [] } = useContext(MovieContext);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Lista de Filmes</h1>
      <SearchBar />
      <FilterPanel />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredMovies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default Home;
