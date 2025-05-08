import SearchBar from "../components/SearchBar"
import FilterPanel from "../components/FilterPanel"
const Home = () => {
  

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Lista de Filmes</h1>
      <SearchBar />
      <FilterPanel />
    </div>
  );
};

export default Home;
