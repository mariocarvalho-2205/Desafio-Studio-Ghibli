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
  } = useContext(MovieContext);

  const highlightedDescription = highlightSearch(movie.description);

  return (
    <div className="bg-white rounded-xl shadow p-4 flex flex-col gap-2">
      <img
        src={movie.image}
        alt={movie.title}
        className="rounded w-full h-64 object-cover"
      />
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">{movie.title}</h2>
        <span className="text-sm">{movie.release_date}</span>
      </div>
      <p className="text-sm text-gray-600">
        <span dangerouslySetInnerHTML={{ __html: highlightedDescription }} />
      </p>
      <p className="text-sm text-gray-700">
        🎬 {movie.director} | 📦 {movie.producer}
      </p>
      <p className="text-sm text-gray-600">⏱️ {movie.running_time} min</p>
      <p className="text-sm">⭐ Score RT: {movie.rt_score}</p>

      <StarRating movie={movie} />

      <div className="flex gap-2 mt-2">
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
          className={`px-2 py-1 rounded text-sm ${
            movie.favorite ? "bg-yellow-200" : "bg-gray-200"
          }`}
        >
          {movie.favorite ? "Favorito ⭐" : "Favoritar"}
        </button>

        <button
          onClick={() => openNoteModal(movie.id)}
          className="px-2 py-1 bg-blue-200 text-sm rounded"
        >
          Anotar
        </button>
      </div>

      <NoteModal movie={movie} />
    </div>
  );
}
