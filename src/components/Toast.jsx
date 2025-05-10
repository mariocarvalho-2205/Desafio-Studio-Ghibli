import { useContext, useEffect, useState } from "react";
import { MovieContext } from "../contexts/MovieContext";

export default function Toast() {
  const { toastMessage, toastType } = useContext(MovieContext);
  const [isVisible, setIsVisible] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    if (toastMessage) {
      setIsVisible(true);
      setIsExiting(false);
    } else {
      setIsExiting(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 250);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  if (!isVisible && !isExiting) return null;

  const getToastStyles = () => {
    const baseStyles = "fixed top-4 right-4 z-50 px-4 py-2 rounded-lg shadow-lg text-white font-medium text-sm";
    
    switch (toastType) {
      case "favorite":
        return `${baseStyles} bg-yellow-500`;
      case "watched":
        return `${baseStyles} bg-green-500`;
      case "note":
        return `${baseStyles} bg-blue-500`;
      case "rating":
        return `${baseStyles} bg-purple-500`;
      default:
        return `${baseStyles} bg-gray-500`;
    }
  };

  return (
    <div 
      className={`${getToastStyles()} transform transition-all duration-250 ease-in-out ${
        isExiting ? 'translate-x-[120%] opacity-0' : 'translate-x-0 opacity-100'
      }`}
      style={{ willChange: 'transform, opacity' }}
    >
      {toastMessage}
    </div>
  );
}
