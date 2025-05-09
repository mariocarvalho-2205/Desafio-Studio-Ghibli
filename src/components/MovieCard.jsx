import { useContext } from "react";
import { MovieContext } from "../contexts/MovieContext";
import StarRating from "./StarRating";
import NoteModal from "./NoteModal";

export default function MovieCard({ movie }) {
  const {
    toggleFavorite,
    toggleWatched,
    openNoteModal,
    highlightSearch,
    personalRating,
  } = useContext(MovieContext);
  const rating = personalRating[movie.id] || 0;
  const highlightedDescription = highlightSearch(movie.description);

  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm overflow-hidden h-full flex flex-col transition-all duration-200 hover:shadow-lg">
      {/* Imagem */}
      <div className="relative aspect-[2/3] overflow-hidden">
        <img
          loading="lazy"
          src={movie.image}
          alt={movie.title}
          className="object-cover transition-transform duration-300 hover:scale-105"
        />
        <div className="absolute top-2 right-2 flex flex-col gap-1 items-end">
          {movie.note && (
            <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-blue-500 text-white bg-opacity-80 backdrop-blur-sm">
              <svg
                className="w-3 h-3 mr-1"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M16 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8Z" />
                <path d="M15 3v4a2 2 0 0 0 2 2h4" />
              </svg>
              Notes
            </div>
          )}
          {/* estrelas image rating */}
          {rating > 0 && (
            <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent hover:bg-secondary/80 bg-yellow-500 text-white bg-opacity-80 backdrop-blur-sm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                className="lucide lucide-star w-3 h-3 mr-1 fill-white"
              >
                <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"></path>
              </svg>
              {rating}/5
            </div>
          )}
        </div>
      </div>
      {/* Conteudo */}
      <div className="flex-grow p-4">
        {/* Titulo */}
        <h2 className="text-xl font-bold">{movie.title}</h2>
        <div className="flex justify-between items-center">
          <span className="text-sm">
            {movie.release_date} - {movie.running_time} min
          </span>
        </div>

        {/* Descrição */}
        <div className="mb-2">
          <p className="text-sm text-gray-600 text-justify">
            <span
              dangerouslySetInnerHTML={{ __html: highlightedDescription }}
            />
          </p>
        </div>
      </div>
      <div className="p-4">
        <p className="text-sm text-gray-700">
          🎬 {movie.director} | 📦 {movie.producer}
        </p>
        <p className="text-sm text-gray-600">⏱️ {movie.running_time} min</p>
        <p className="text-sm">⭐ {movie.rt_score}%</p>
        <StarRating movie={movie} />
        {movie.note && (
          <p className="mt-2 text-sm text-gray-700">
            📝 <strong>Nota:</strong> {movie.note}
          </p>
        )}
      </div>

      <div className="flex gap-2 mt-2 p-4">
        <button
          onClick={() => toggleWatched(movie.id)}
          className={`px-2 py-1 rounded text-sm ${
            movie.watched ? "bg-green-200" : "bg-gray-200"
          }`}
        >
          {movie.watched ? "Assistido" : "Marcar Assistido"}
        </button>

        <button
          onClick={() => toggleFavorite(movie.id)}
          className={`p-2 rounded text-sm ${
            movie.favorite ? "bg-yellow-200" : "bg-gray-200"
          }`}
        >
          {movie.favorite ? "Favorito " : "Favoritar"}
        </button>

        <button
          onClick={() => openNoteModal(movie.id)}
          className="px-2 py-1 bg-blue-200 text-sm rounded"
        >
          {movie.note ? "Editar Nota" : "Adicionar Nota"}
        </button>
      </div>

      <NoteModal movie={movie} />
    </div>
  );
}
