import { useContext, useState, useEffect, useRef } from "react";
import { MovieContext } from "../contexts/MovieContext";

export default function NoteModal({ movie }) {
  const { noteModalOpen, noteModalMovieId, closeNoteModal, movies, setMovies } =
    useContext(MovieContext);

  const [note, setNote] = useState("");
  const modalRef = useRef(null);
  const textareaRef = useRef(null);
  const { personalRating, setPersonalRating } = useContext(MovieContext);
  const rating = personalRating[movie.id] || 0;

  // Função para lidar com cliques nas estrelas
  const handleStarClick = (starIndex) => {
    // Se clicar na mesma estrela já selecionada, remove a avaliação
    if (starIndex === 1 && rating === 1) {
      setPersonalRating(movie.id, 0);
    } else {
      setPersonalRating(movie.id, starIndex);
    }
  };

  // Encontrar o filme selecionado pelo ID no contexto
  const selectedMovie = noteModalMovieId
    ? movies.find((m) => m.id === noteModalMovieId)
    : null;

  // Atualizar a nota APENAS quando o modal abrir com um novo filme
  useEffect(() => {
    if (noteModalOpen && selectedMovie) {
      setNote(selectedMovie.note || "");
    }
  }, [noteModalOpen, selectedMovie?.id]);

  // Foco no textarea quando o modal abre
  useEffect(() => {
    if (noteModalOpen && textareaRef.current) {
      // Pequeno delay para garantir que o DOM foi atualizado
      setTimeout(() => {
        textareaRef.current.focus();
      }, 50);
    }
  }, [noteModalOpen]);

  // Fechar o modal ao clicar fora
  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeNoteModal();
      }
    }

    if (noteModalOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [noteModalOpen, closeNoteModal]);

  // Não renderizar nada se o modal estiver fechado ou não houver filme selecionado
  if (!noteModalOpen || !selectedMovie) return null;

  const handleSave = () => {
    // Atualizar a nota do filme no estado global
    setMovies((prevMovies) =>
    prevMovies.map((m) =>
      m.id === selectedMovie.id
        ? {
            ...m,
            note: note,
            hasNote: note.trim().length > 0,
            personalRating: personalRating[selectedMovie.id] || 0, // <-- adiciona isso
          }
        : m
    )
  );

  closeNoteModal();
  };

  // Manipular tecla Esc para fechar e Ctrl+Enter para salvar
  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      closeNoteModal();
    } else if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
      handleSave();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      onKeyDown={handleKeyDown}
    >
      <div
        ref={modalRef}
        className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full"
      >
        <h2 className="text-lg font-bold mb-2 text-indigo-700">
          {selectedMovie.note ? "Editar" : "Adicionar"} Nota para:{" "}
          {selectedMovie.title}
        </h2>
        <div className="flex items-center mb-2 mt-2">
          <div className="text-sm font-medium mr-2">
            <p>Sua avaliação:</p>
          </div>
          <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => handleStarClick(star)}
                className="focus:outline-none"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill={rating >= star ? "currentColor" : "none"}
                  stroke="currentColor"
                  strokeWidth="2"
                  className={`transition-colors ${
                    rating >= star ? "text-yellow-400" : "text-gray-300"
                  }`}
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              </button>
            ))}
          </div>
          <div className="ml-2 text-xs text-gray-500">
            {rating > 0 ? `${rating}/5` : "Not rated"}
          </div>
        </div>
        <div className="text-sm font-medium mr-2">
          <p>Sua nota:</p>
        </div>
        <textarea
          ref={textareaRef}
          className="w-full p-2 border border-gray-300 rounded mb-4 resize-none"
          rows={5}
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Escreva sua nota aqui..."
          style={{ minHeight: "120px" }}
        />
        <div className="flex justify-end gap-2">
          <button
            className="px-4 py-2 text-sm rounded bg-gray-300 text-gray-800"
            onClick={closeNoteModal}
            type="button"
          >
            Cancelar
          </button>
          <button
            className="px-4 py-2 text-sm rounded bg-blue-500 text-white"
            onClick={handleSave}
            type="button"
          >
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
}
