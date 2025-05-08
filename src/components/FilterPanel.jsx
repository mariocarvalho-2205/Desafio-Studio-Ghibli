import { useContext } from "react";
import { MovieContext } from "../contexts/MovieContext";

export default function FilterPanel() {
  const { movies = [], filters, setFilters } = useContext(MovieContext) || {};

  const updateFilter = (key, value) => {
    setFilters({ ...filters, [key]: value });
  };

  return (
    <div className="flex flex-wrap gap-4 mb-4 p-4 bg-gray-100 rounded">
      {/* Lista simples dos filmes (apenas para debug)
      {movies.map((movie) => {
        if (!movie) return null;
        return (
          <p key={movie.id}>
            {movie.title} - {movie.watched ? "Assistido" : "Não assistido"}
          </p>
        );
      })} */}

      {/* Filtros por checkbox */}
      {["watched", "favorite", "hasNote"].map((key) => (
        <label key={key} className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={filters?.[key] || false}
            onChange={(e) => updateFilter(key, e.target.checked)}
          />
          {key === "watched"
            ? "Assistido"
            : key === "favorite"
            ? "Favorito"
            : "Com Anotação"}
        </label>
      ))}

      {/* Filtro por estrelas */}
      <label className="flex items-center gap-2">
        Estrelas:
        <select
          className="ml-2 border px-2 py-1 rounded"
          value={filters?.stars || ""}
          onChange={(e) => updateFilter("stars", Number(e.target.value))}
        >
          <option value="">Todas</option>
          {[1, 2, 3, 4, 5].map((star) => (
            <option key={star} value={star}>
              {star} ⭐
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}
