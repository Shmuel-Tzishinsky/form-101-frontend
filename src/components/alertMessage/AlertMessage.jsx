import { useState, useEffect } from "react";

import "./alertMessage.css";

export function Snackbar({ message, onClose, open, autoHideDuration }) {
  const [showAlert, setShowAlert] = useState(!1);
  useEffect(() => {
    const close = setTimeout(() => onClose(!1), autoHideDuration);

    return () => clearTimeout(close);
  }, [autoHideDuration, open, onClose]);

  useEffect(() => {
    if (open) {
      setShowAlert(!0);
    } else {
      setTimeout(() => setShowAlert(!1), 500);
    }
  }, [open, setShowAlert]);

  return (
    showAlert && (
      <div
        className={`alert-message-container ${
          !open ? "close-alert-message" : ""
        }`}
      >
        <div className="alert-message-close" onClick={() => onClose(!0)}>
          x
        </div>
        <p>{message}</p>
      </div>
    )
  );
}
