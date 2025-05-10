import { useContext, useEffect, useState } from "react";
import { MovieContext } from "../contexts/MovieContext";

export default function Toast() {
  const { toastMessage, toastType } = useContext(MovieContext);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (toastMessage) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 2700); // Começar a animação de saída 300ms antes do timeout
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  if (!toastMessage) return null;

  const getToastStyles = () => {
    switch (toastType) {
      case "favorite":
        return "bg-yellow-500 text-yellow-900";
      case "watched":
        return "bg-green-500 text-green-900";
      case "note":
        return "bg-blue-500 text-blue-900";
      case "rating":
        return "bg-yellow-500 text-yellow-900";
      default:
        return "bg-gray-500 text-gray-900";
    }
  };

  return (
    <div className={`fixed top-4 right-4 z-50 ${isVisible ? 'animate-slide-in' : 'animate-slide-out'}`}>
      <div className={`px-4 py-2 rounded-lg shadow-lg ${getToastStyles()}`}>
        {toastMessage}
      </div>
    </div>
  );
}
