import React from "react";
import deleteIcon from "../images/delete.svg";
import likeActiveIcon from "../images/heart-fill.svg";
import likeInactiveIcon from "../images/heart-stroke.svg";

const Card = ({ card, onClick }) => {
  const handleClick = () => {
    onClick(card);
  };

  return (
    <div className="places__item" onClick={handleClick}>
      <img className="places__image" src={card.link} alt={card.name} />
      <div className="places__name-wrapper">
        <h2 className="places__name">{card.name}</h2>
        <button type="button" className="places__fav-button">
          <img className="places__fav-image" src={likeInactiveIcon} />
          <span className="places__fav-likes">{card.likes.length}</span>
        </button>
      </div>
      <button type="button" className="places__delete-button">
        <img className="places__delete-icon" src={deleteIcon} />
      </button>
    </div>
  );
};

export default Card;
