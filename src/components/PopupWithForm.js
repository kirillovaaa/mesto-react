import React from "react";
import close from "../images/close.svg";

const PopupWithForm = ({ title, name, children, isOpen, onClose }) => {
  return (
    <div className={`popup ${isOpen && "popup_opened"}`} id={`popup-${name}`}>
      <form className="popup__form" name={name}>
        <h2 className="popup__heading">{title}</h2>

        {children}

        <button type="submit" className="popup__save-button">
          Сохранить
        </button>

        <button
          className="popup__close-button"
          type="button"
          id="popup-profile-close"
          onClick={onClose}
        >
          <img className="popup__close-icon" src={close} alt="Закрыть" />
        </button>
      </form>
    </div>
  );
};

export default PopupWithForm;
