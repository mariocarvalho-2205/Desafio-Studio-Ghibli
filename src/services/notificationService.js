export const notificationService = {
  showToast(message, type, setToastMessage, setToastType) {
    setToastMessage(message);
    setToastType(type);
    setTimeout(() => {
      setToastMessage(null);
      setToastType(null);
    }, 1500);
  },

  getToastStyles(type) {
    const baseStyles = "fixed top-4 right-4 z-50 px-4 py-2 rounded-lg shadow-lg text-white font-medium text-sm";
    
    switch (type) {
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
  }
}; 