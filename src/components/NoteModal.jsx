import { useContext, useState, useEffect, useRef } from "react";
import { MovieContext } from "../contexts/MovieContext";

export default function NoteModal({ movie }) {
  const { 
    noteModalOpen, 
    noteModalMovieId, 
    closeNoteModal, 
    movies, 
    setMovies, 
    personalRating, 
    setPersonalRating,
    showToast
  } = useContext(MovieContext);

  const [note, setNote] = useState("");
  const modalRef = useRef(null);
  const textareaRef = useRef(null);

  // Encontrar o filme selecionado pelo ID no contexto
  const selectedMovie = noteModalMovieId
    ? movies.find((m) => m.id === noteModalMovieId)
    : null;

  // Obter a avaliação do filme selecionado
  const rating = selectedMovie ? (personalRating[selectedMovie.id] || 0) : 0;

  // Função para lidar com cliques nas estrelas
  const handleStarClick = (starIndex) => {
    if (!selectedMovie) return;
    
    // Se clicar na mesma estrela já selecionada, remove a avaliação
    if (starIndex === rating) {
      setPersonalRating(selectedMovie.id, 0);
    } else {
      setPersonalRating(selectedMovie.id, starIndex);
    }
  };

  // Atualizar a nota APENAS quando o modal abrir com um novo filme
  useEffect(() => {
    if (noteModalOpen && selectedMovie) {
      setNote(selectedMovie.note || "");
    }
  }, [noteModalOpen, selectedMovie?.id]);

  // Foco no textarea quando o modal abre
  useEffect(() => {
    if (noteModalOpen && textareaRef.current) {
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
    const action = selectedMovie.note ? "atualizada" : "adicionada";
    
    // Atualizar a nota do filme no estado global
    setMovies((prevMovies) =>
      prevMovies.map((m) =>
        m.id === selectedMovie.id
          ? { ...m, note: note, hasNote: note.trim().length > 0 }
          : m
      )
    );

    // Mostrar toast antes de fechar o modal
    showToast(`Nota ${action} para ${selectedMovie.title}`, "note");

    // Fechar o modal
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
      className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50 animate-fadeIn"
      onKeyDown={handleKeyDown}
    >
      <div
        ref={modalRef}
        className="bg-white rounded-2xl shadow-xl p-6 max-w-md w-full mx-4 transform transition-all duration-300 animate-slideUp"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-indigo-700">
            {selectedMovie.note ? "Editar" : "Adicionar"} Nota
          </h2>
          <button
            onClick={closeNoteModal}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            {selectedMovie.title}
          </h3>
          <div className="flex items-center text-sm text-gray-600">
            <span className="mr-4">🎬 {selectedMovie.director}</span>
            <span>📅 {selectedMovie.release_date}</span>
          </div>
        </div>

        <div className="mb-4">
          <div className="flex items-center mb-2">
            <span className="text-sm font-medium text-gray-700 mr-2">
              Sua avaliação:
            </span>
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => handleStarClick(star)}
                  className="focus:outline-none transform hover:scale-110 transition-transform"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
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
            <span className="ml-2 text-sm text-gray-500">
              {rating > 0 ? `${rating}/5` : "Not rated"}
            </span>
          </div>
        </div>

        <div className="mb-4">
          <label
            htmlFor="note"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Sua nota:
          </label>
          <textarea
            ref={textareaRef}
            id="note"
            className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all resize-none bg-gray-50"
            rows={5}
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Escreva sua nota aqui..."
            style={{ minHeight: "120px" }}
          />
        </div>

        <div className="flex justify-end gap-3">
          <button
            className="px-4 py-2 text-sm rounded-xl bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
            onClick={closeNoteModal}
            type="button"
          >
            Cancelar
          </button>
          <button
            className="px-4 py-2 text-sm rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
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

