import { useContext } from "react";
import { MovieContext } from "../contexts/MovieContext";

export default function SearchBar() {
  const { search, setSearch, includeSynopsis, setIncludeSynopsis } =
    useContext(MovieContext);

    const onChange = (e) => {
        const { checked } = e.target;
        setIncludeSynopsis(checked); 
    };

  return (
    <div className="flex items-center gap-4 mb-4">
      <input
        type="text"
        placeholder="Buscar título ou sinopse..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-2 rounded border border-gray-300"
      />
      <label className="flex items-center gap-1">
        <input
          type="checkbox"
          checked={includeSynopsis}
          onChange={onChange}
        />
        Incluir sinopse
      </label>
    </div>
  );
}
