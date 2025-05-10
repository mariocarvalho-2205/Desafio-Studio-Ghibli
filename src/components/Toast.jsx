import { useContext, useEffect, useState } from "react";
import { MovieContext } from "../contexts/MovieContext";
import { notificationService } from "../services/notificationService";

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

  return (
    <div 
      className={`${notificationService.getToastStyles(toastType)} transform transition-all duration-250 ease-in-out ${
        isExiting ? 'translate-x-[120%] opacity-0' : 'translate-x-0 opacity-100'
      }`}
      style={{ willChange: 'transform, opacity' }}
    >
      {toastMessage}
    </div>
  );
}
