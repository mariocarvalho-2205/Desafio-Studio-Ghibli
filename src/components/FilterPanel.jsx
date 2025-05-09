import { useContext, useState } from "react";
import { MovieContext } from "../contexts/MovieContext";

export default function FilterPanel() {
  const { filters, setFilters } = useContext(MovieContext);
  const [sortLabel, setSortLabel] = useState("Ordenação");
  const [starsLabel, setStarsLabel] = useState("Estrelas");

  const updateFilter = (key, value) => {
    console.log(`Atualizando filtro: ${key} = `, value);
    setFilters((prev) => ({ ...prev, [key]: value }));
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
      updateFilter("stars", Number(value));
      setStarsLabel(`${value} ⭐`);
    }
  };

  const handleSortChange = (event) => {
    const value = event.target.value;
    const label = event.target.options[event.target.selectedIndex].text;

    console.log(`Mudando ordenação para: ${value} (${label})`);

    if (!value || value === "default") {
      updateFilter("sortField", "");
      updateFilter("sortOrder", "asc");
      setSortLabel("Ordenação");
    } else {
      const [field, order] = value.split(":");
      console.log(`Campo: ${field}, Ordem: ${order}`);

      // Atualiza os filtros com os novos valores
      setFilters((prev) => ({
        ...prev,
        sortField: field,
        sortOrder: order,
      }));

      setSortLabel(label);
    }
  };

  const filterButtons = [
    { key: "watched", label: "Assistido", color: "green" },
    { key: "favorite", label: "Favorito", color: "yellow" },
    { key: "hasNote", label: "Com Anotação", color: "blue" },
  ];

  // Determina o valor atual do select de ordenação
  const getCurrentSortValue = () => {
    if (!filters.sortField) return "default";
    return `${filters.sortField}:${filters.sortOrder}`;
  };

  return (
<div className="flex flex-col gap-4 mb-8 p-6 bg-white shadow-lg rounded-xl border border-indigo-200 animate-fadeIn">
  {/* Botões de filtro */}
  <div className="flex flex-col md:flex-row justify-between gap-4">
    <div className="flex flex-wrap gap-2">
      {filterButtons.map(({ key, label, color }) => (
        <button
          key={key}
          onClick={() => toggleFilter(key)}
          className={`px-3 py-1 rounded-full text-sm font-medium border transition duration-300
            ${
              filters[key]
                ? `bg-${color}-500 text-white border-${color}-600`
                : "bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200"
            }`}
        >
          {label}
        </button>
      ))}

      {/* Filtro de estrelas */}
      <select
        value={filters.stars === null ? "" : filters.stars}
        
        onChange={(e) => handleStarsChange(e.target.value)}
        className="appearance-none px-3 py-1 rounded-full text-sm font-medium border border-gray-300 bg-white text-gray-700 cursor-pointer hover:border-indigo-400 transition duration-300"
      >
        <option value="" disabled={filters.stars !== null}>
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

    {/* Filtro de ordenação */}
    <select
      value={getCurrentSortValue()}
      onChange={handleSortChange}
      className="appearance-none px-3 py-1 rounded-full text-sm font-medium border border-gray-300 bg-white text-gray-700 cursor-pointer hover:border-indigo-400 transition duration-300"
    >
      <option value="default" disabled={!!filters.sortField}>
        -- Ordenar por --
      </option>
      <option value="default">Default</option>
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

  {/* Filtros ativos */}
  <div className="flex flex-wrap items-center gap-2">
    {filterButtons.map(({ key, label }) =>
      filters[key] ? (
        <span
          key={key}
          className={`px-2 py-1 rounded-full text-xs font-medium border ${
            {
              watched: "bg-green-100 text-green-800 border-green-300",
              favorite: "bg-yellow-100 text-yellow-800 border-yellow-300",
              hasNote: "bg-blue-100 text-blue-800 border-blue-300",
            }[key]
          }`}
        >
          {label}
        </span>
      ) : null
    )}

    {filters.stars === "with" && (
      <span className="px-2 py-1 rounded-full text-xs bg-yellow-100 text-yellow-800 border border-yellow-300">
        Com Estrelas
      </span>
    )}
    {filters.stars === "none" && (
      <span className="px-2 py-1 rounded-full text-xs bg-gray-200 text-gray-800 border border-gray-300">
        Sem Estrelas
      </span>
    )}
    {typeof filters.stars === "number" && (
      <span className="px-2 py-1 rounded-full text-xs bg-yellow-100 text-yellow-800 border border-yellow-300">
        {filters.stars} ⭐
      </span>
    )}

    {filters.sortField && (
      <span className="px-2 py-1 rounded-full text-xs bg-purple-100 text-purple-800 border border-purple-300">
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
        className="ml-auto px-4 py-1 rounded-full text-sm bg-red-500 text-white hover:bg-red-600 transition duration-300"
      >
        Limpar Filtros
      </button>
    )}
  </div>
</div>

  );
}
