import { useContext, useState } from "react";
import { MovieContext } from "../contexts/MovieContext";

export default function FilterPanel() {
  const { filters, setFilters } = useContext(MovieContext);

  const [sortLabel, setSortLabel] = useState("Ordenação");
  const [starsLabel, setStarsLabel] = useState("Estrelas");

  const updateFilter = (key, value) => {
    setFilters({ ...filters, [key]: value });
  };

  const toggleFilter = (key) => {
    updateFilter(key, !filters[key]);
  };

  const clearFilters = () => {
    setFilters({
      watched: false,
      favorite: false,
      hasNote: false,
      stars: null,
      sortField: "",
      sortOrder: "asc",
    });
    setSortLabel("Ordenação");
    setStarsLabel("Estrelas");
  };

  const handleStarsChange = (value) => {
    if (value === "with") {
      updateFilter("stars", "with");
      setStarsLabel("Com Estrelas");
    } else if (value === "none") {
      updateFilter("stars", "none");
      setStarsLabel("Sem Estrelas");
    } else if (value === "") {
      updateFilter("stars", null);
      setStarsLabel("Todas");
    } else {
      // Converte para número
      updateFilter("stars", Number(value));
      setStarsLabel(`${value} ⭐`);
    }
  };

  const handleSortChange = (value, label) => {
    if (value === "") {
      updateFilter("sortField", "");
      updateFilter("sortOrder", "asc");
    } else {
      const [field, order] = value.split(":");
      updateFilter("sortField", field);
      updateFilter("sortOrder", order);
    }
    setSortLabel(label);
  };

  const filterButtons = [
    { key: "watched", label: "Assistido", color: "green" },
    { key: "favorite", label: "Favorito", color: "yellow" },
    { key: "hasNote", label: "Com Anotação", color: "blue" },
  ];

  return (
    <div className="flex flex-col gap-4 mb-4 p-4 bg-gray-100 rounded">
      {/* Botões de filtro */}
      <div className="flex flex-wrap gap-2">
        {filterButtons.map(({ key, label, color }) => (
          <button
            key={key}
            onClick={() => toggleFilter(key)}
            className={`px-3 py-1 rounded text-sm font-medium border
              ${
                filters[key]
                  ? `bg-${color}-500 text-white border-${color}-600`
                  : "bg-white text-gray-700 border-gray-300"
              }
              hover:opacity-80 transition`}
          >
            {label}
          </button>
        ))}

        {/* Filtro de estrelas customizado */}
        <div className="relative">
          <select
            value={filters.stars || ""}
            onChange={(e) => handleStarsChange(e.target.value)}
            className="appearance-none px-3 py-1 rounded text-sm font-medium border border-gray-300 bg-white text-gray-700 cursor-pointer"
            style={{ backgroundImage: "none" }}
          >
            <option disabled className="font-bold">
              -- Filtrar por estrelas --
            </option>
            <option value="">Todas</option>
            <option value="with">Com Estrelas</option>
            <option value="none">Sem Estrelas</option>
            {[1, 2, 3, 4, 5].map((star) => (
              <option key={star} value={star}>
                {star} ⭐
              </option>
            ))}
          </select>
        </div>

        {/* Filtro de ordenação customizado */}
        <div className="relative">
          <select
            onChange={(e) => {
              const selected = e.target.options[e.target.selectedIndex];
              handleSortChange(selected.value, selected.textContent);
            }}
            className="appearance-none px-3 py-1 rounded text-sm font-medium border border-gray-300 bg-white text-gray-700 cursor-pointer"
            style={{ backgroundImage: "none" }}
          >
            <option disabled className="font-bold">
              -- Ordenar por --
            </option>
            <option value="">Default</option>
            <option value="title:asc">Título A-Z</option>
            <option value="title:desc">Título Z-A</option>
            <option value="running_time:desc">Maior duração</option>
            <option value="running_time:asc">Menor duração</option>
            <option value="rt_score:desc">Maior avaliação</option>
            <option value="rt_score:asc">Menor avaliação</option>
            <option value="stars:desc">Mais estrelas</option>
            <option value="stars:asc">Menos estrelas</option>
          </select>
        </div>
      </div>

      {/* Filtros ativos e limpar */}
      <div className="flex flex-wrap gap-2 mt-2">
        {filterButtons.map(({ key, label, color }) =>
          filters[key] ? (
            <span
              key={key}
              className={`px-2 py-1 rounded text-xs bg-${color}-100 text-${color}-800 border border-${color}-300`}
            >
              {label}
            </span>
          ) : null
        )}

        {filters.stars === "with" && (
          <span className="px-2 py-1 rounded text-xs bg-yellow-100 text-yellow-800 border border-yellow-300">
            Com Estrelas
          </span>
        )}
        {filters.stars === "none" && (
          <span className="px-2 py-1 rounded text-xs bg-gray-200 text-gray-800 border border-gray-300">
            Sem Estrelas
          </span>
        )}

        {filters.sortField && (
          <span className="px-2 py-1 rounded text-xs bg-purple-100 text-purple-800 border border-purple-300">
            Ordenado: {sortLabel}
          </span>
        )}

        {(filters.watched ||
          filters.favorite ||
          filters.hasNote ||
          filters.stars ||
          filters.sortField) && (
          <button
            onClick={clearFilters}
            className="ml-auto px-3 py-1 rounded text-sm bg-red-500 text-white hover:bg-red-600 transition"
          >
            Limpar Filtros
          </button>
        )}
      </div>
    </div>
  );
}
