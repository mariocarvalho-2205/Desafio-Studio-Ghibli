import { useContext } from "react";
import { MovieContext } from "../contexts/MovieContext";
import StarRating from "./StarRating";
import NoteModal from "./NoteModal";

export default function MovieCard({ movie }) {
  const { toggleFavorite, toggleWatched, openNoteModal, highlightSearch } =
    useContext(MovieContext);

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
          <span dangerouslySetInnerHTML={{ __html: highlightedDescription }} />
        </p>

        </div>
      </div>

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
