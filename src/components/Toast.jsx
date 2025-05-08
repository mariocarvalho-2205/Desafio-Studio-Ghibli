import { useContext } from "react";
import { MovieContext } from "../contexts/MovieContext";

export default function Toast() {
  const { toastMessage } = useContext(MovieContext);

  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow">
      {toastMessage}
    </div>
  );
}
