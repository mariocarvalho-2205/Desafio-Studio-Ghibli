import { useContext } from "react";
import SearchBar from "../components/SearchBar";
import FilterPanel from "../components/FilterPanel";
import MovieCard from "../components/MovieCard"; 
import { MovieContext } from "../contexts/MovieContext";
import NoteModal from "../components/NoteModal";
const Home = () => {
  const { filteredMovies = [] } = useContext(MovieContext);



  function MovieList() {
  const { filteredMovies } = useContext(MovieContext);
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {filteredMovies.map(movie => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
      
      {/* O NoteModal deve ser instanciado uma única vez fora dos cards */}
      <NoteModal movie={filteredMovies}/>
    </div>
  );
}

  return (
    <div className="px-4 sm:px-6 md:px-10 lg:px-20 xl:px-32 py-10 bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen animate-fadeIn">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-center text-indigo-700 mb-4">
        Studio Ghibli Collection
      </h1>

      <p className="text-center text-gray-700 mb-8 text-sm sm:text-base md:text-lg">
        Explore o mundo mágico dos filmes do Studio Ghibli. Marque seus favoritos e acompanhe os que já assistiu.
      </p>

      <div className="animate-slideUp">
        <SearchBar />
        <FilterPanel />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6 mt-8 transition-all duration-500 ease-in-out">
        {filteredMovies.map((movie) => (
          <div
            key={movie.id}
            className="transform transition-all duration-500 ease-in-out animate-fadeIn"
          >
            <MovieCard movie={movie} />
          </div>
        ))}
      </div>
       <MovieList />
    </div>
  );
};

export default Home;
