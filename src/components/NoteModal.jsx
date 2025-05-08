import { useContext, useState, useEffect } from "react";
import { MovieContext } from "../contexts/MovieContext";

export default function NoteModal() {
  const {
    noteModalMovieId,
    movies,
    closeNoteModal,
    addNoteToMovie,
  } = useContext(MovieContext);

  const movie = movies.find((m) => m.id === noteModalMovieId);
  const [note, setNote] = useState("");

  useEffect(() => {
    if (movie) {
      setNote(movie.note || "");
    }
  }, [movie]);

  if (!noteModalMovieId || !movie) return null;

  const handleSave = () => {
    addNoteToMovie(movie.id, note);
    closeNoteModal();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white p-4 rounded max-w-md w-full">
        <h2 className="text-xl font-bold mb-2">Anotação para {movie.title}</h2>
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
