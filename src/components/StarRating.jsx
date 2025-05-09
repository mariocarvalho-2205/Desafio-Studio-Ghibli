import { useContext } from "react";
import { MovieContext } from "../contexts/MovieContext";

export default function StarRating({ movie }) {
  const { personalRating, setPersonalRating } = useContext(MovieContext);
  const rating = personalRating[movie.id] || 0;

  // Se não houver avaliação, mostrar "Not rated"
  if (rating === 0) {
    return <span className="text-sm text-gray-400 italic">Not rated</span>;
  }

  return (
    <div className="flex gap-1 text-yellow-500">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          onClick={() => setPersonalRating(movie.id, star)}
          className={`cursor-pointer transition-colors ${
            rating >= star ? "text-yellow-500" : "text-gray-300"
          }`}
        >
          ★
        </span>
      ))}
    </div>
  );
}
