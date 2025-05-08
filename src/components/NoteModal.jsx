import { useContext, useState, useEffect } from "react";
import { MovieContext } from "../contexts/MovieContext";

export default function NoteModal() {
  const { noteModalMovieId, movies, closeNoteModal, addNoteToMovie } =
    useContext(MovieContext);

  const movie = movies.find((m) => m.id === noteModalMovieId);
  const [note, setNote] = useState("");
  const [rating, setRating] = useState(0);

  useEffect(() => {
    if (movie) {
      setNote(movie.note || "");
      setRating(movie.personalRating || 0);
    }
  }, [movie]);

  if (!noteModalMovieId || !movie) return null;

  const handleStarClick = (value) => {
    setRating((prev) => (prev === value ? 0 : value));
  };

  const handleSave = () => {
    addNoteToMovie(movie.id, note, rating);
    closeNoteModal();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white p-4 rounded max-w-md w-full relative shadow-lg">
        {/* Botão X de fechar */}
        <button
          onClick={closeNoteModal}
          className="absolute top-2 right-2 text-gray-600 hover:text-red-600 text-xl"
          aria-label="Fechar"
        >
          &times;
        </button>

        <h2 className="text-xl font-bold mb-2">Anotação para {movie.title}</h2>

        <div className="mb-3">
          <p className="text-sm text-gray-600 mb-1 font-semibold">
            Sua Avaliação:
          </p>
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                onClick={() => handleStarClick(star)}
                className={`cursor-pointer text-2xl ${
                  star <= rating ? "text-yellow-400" : "text-gray-300"
                }`}
              >
                ★
              </span>
            ))}
            <span className="ml-2 text-sm text-gray-600">
              {rating > 0
                ? `${rating} estrela${rating > 1 ? "s" : ""}`
                : "Not Rated"}
            </span>
          </div>
        </div>
        <p className="text-sm text-gray-600 mb-1 font-semibold">
          Sua Anotação:
        </p>
        <textarea
          className="w-full border p-2 rounded"
          rows={4}
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />

        <div className="flex justify-end gap-2 mt-2">
          <button
            onClick={closeNoteModal}
            className="bg-gray-300 px-4 py-2 rounded"
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
}
