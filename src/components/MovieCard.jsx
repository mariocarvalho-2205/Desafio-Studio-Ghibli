import { useContext } from "react";
import { MovieContext } from "../contexts/MovieContext";
import StarRating from "./StarRating";
import NoteModal from "./NoteModal";

export default function MovieCard({ movie }) {
  const { 
    toggleFavorite, 
    toggleWatched, 
    highlightSearch, 
    personalRating,
    openNoteModal
  } = useContext(MovieContext);
  
  const rating = personalRating[movie.id] || 0;
  const highlightedDescription = highlightSearch(movie.description);

  const formatRunningTime = (minutes) => {
    const hrs = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hrs}h ${mins}min`;
  };

  return (
    <div className="rounded-2xl border-none bg-white text-gray-800 shadow-md overflow-hidden h-full flex flex-col transition-all duration-300 hover:shadow-xl hover:scale-[1.02] animate-fadeIn">
      {/* Imagem */}
      <div className="relative aspect-[2/3] overflow-hidden">
        <img
          loading="lazy"
          src={movie.image}
          alt={movie.title}
          className="object-cover transition-transform duration-300 hover:scale-105 w-full h-full"
        />
        <div className="absolute top-2 right-2 flex flex-col gap-1 items-end">
          {movie.note && (
            <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-blue-500 text-white bg-opacity-80 backdrop-blur-sm shadow">
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
            <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-yellow-500 text-white bg-opacity-80 backdrop-blur-sm shadow">
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
        <h2 className="text-xl font-bold text-indigo-700">{movie.title}</h2>
        <div className="flex justify-between items-center text-sm text-gray-500 mb-2">
          <span className="text-sm">
            {movie.release_date} - {formatRunningTime(movie.running_time)}
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
      <div className="p-4 min-h-[140px]">
        <p className="text-sm text-gray-700">🎬 {movie.director}</p>
        <p className="text-sm text-gray-700">📦 {movie.producer}</p>
        <p className="text-sm text-gray-700">
          ⏱️ {formatRunningTime(movie.running_time)}
        </p>
        <p className="text-sm text-gray-700">⭐ {movie.rt_score}%</p>
        <div className="h-6">
          <StarRating movie={movie} />
        </div>

        <div className="min-h-[60px] mt-2">
          {movie.note ? (
            <div className="min-h-[60px] rounded-2xl p-2 border border-blue-400 bg-blue-100">
              <p className="text-sm text-blue-600">
                📝 <strong>Nota:</strong> {movie.note}
              </p>
            </div>
          ) : (
            <p className="invisible text-sm">
              📝 <strong>Nota:</strong> Placeholder
            </p>
          )}
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mt-2 p-4">
        <button
          onClick={() => toggleWatched(movie.id)}
          className={`px-2 py-1 rounded text-sm transition ${
            movie.watched
              ? "bg-green-200 text-green-800"
              : "bg-gray-200 text-gray-800"
          }`}
        >
          {movie.watched ? "✔ Assistido" : "👁 Marcar Assistido"}
        </button>

        <button
          onClick={() => toggleFavorite(movie.id)}
          className={`px-2 py-1 rounded text-sm transition ${
            movie.favorite
              ? "bg-yellow-200 text-yellow-800"
              : "bg-gray-200 text-gray-800"
          }`}
        >
          {movie.favorite ? "⭐ Favorito" : "☆ Favoritar"}
        </button>

        <button
          onClick={() => openNoteModal(movie.id)}
          className="px-2 py-1 bg-blue-200 text-blue-800 text-sm rounded transition"
        >
          {movie.note ? "✏️ Editar Nota" : "📝 Adicionar Nota"}
        </button>
      </div>
    </div>
  );
}