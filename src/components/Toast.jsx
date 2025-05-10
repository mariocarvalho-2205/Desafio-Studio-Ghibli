import { useContext, useEffect, useState } from "react";
import { MovieContext } from "../contexts/MovieContext";

export default function Toast() {
  const { toastMessage, toastType } = useContext(MovieContext);
  const [isVisible, setIsVisible] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    if (toastMessage) {
      setIsExiting(false);
      setIsVisible(true);
      
      const exitTimer = setTimeout(() => {
        setIsExiting(true);
      }, 2700);

      const hideTimer = setTimeout(() => {
        setIsVisible(false);
      }, 3000);

      return () => {
        clearTimeout(exitTimer);
        clearTimeout(hideTimer);
      };
    }
  }, [toastMessage]);

  if (!isVisible) return null;

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
    <div 
      className={`fixed top-4 right-4 z-50 transition-all duration-300 transform ${
        isExiting ? 'translate-x-full opacity-0' : 'translate-x-0 opacity-100'
      }`}
    >
      <div className={`px-4 py-2 rounded-lg shadow-lg ${getToastStyles()}`}>
        {toastMessage}
      </div>
    </div>
  );
}
