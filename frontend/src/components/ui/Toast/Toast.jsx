import React, { useEffect } from "react";
import style from "./Toast.module.css";

function Toast({ message, type = "success", onClose, duration = 3000 }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [onClose, duration]);

  return (
    <div className={`${style.toast} ${type === "success" ? style["toast--success"] : style["toast--error"]}`}>
      <span className={style.toast__message}>{message}</span>
      <button 
        onClick={onClose}
        className={style.toast__close}
      >
        ×
      </button>
    </div>
  );
}

export default Toast;