import { useContext } from "react";
import { MovieContext } from "../contexts/MovieContext";

export default function StarRating({ movie }) {
  const { setPersonalRating } = useContext(MovieContext);

  return (
    <div className="flex gap-1 text-yellow-500">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          onClick={() => setPersonalRating(movie.id, star)}
          className={`cursor-pointer ${
            movie.stars >= star ? "text-yellow-500" : "text-gray-300"
          }`}
        >
          ★
        </span>
      ))}
    </div>
  );
}