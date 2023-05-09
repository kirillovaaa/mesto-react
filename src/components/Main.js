import React, { useState, useEffect, useContext } from "react";
import Card from "./Card";
import avatar from "../images/avatar.png";
import edit from "../images/edit.svg";
import plus from "../images/plus.svg";
import heartStroke from "../images/heart-stroke.svg";
import deleteIcon from "../images/delete.svg";
import CurrentUserContext from "../contexts/CurrentUserContext";

const Main = ({
  cards,
  // обработчики открытия попапов
  onEditAvatar,
  onEditProfile,
  onAddPlace,
  // обработчик нажатия на карточку
  onCardClick,
  onCardLike,
  onCardDelete,
}) => {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main>
      {/* <!-- блок профиля --> */}
      <section className="profile">
        <div className="profile__avatar-wrapper">
          <img
            className="profile__avatar"
            src={currentUser.avatar}
            alt="Аватар"
          />
          <button className="profile__avatar-edit" onClick={onEditAvatar}>
            <img
              className="profile__edit-icon"
              src={edit}
              alt="Редактировать"
            />
          </button>
        </div>

        <div className="profile__info">
          <div className="profile__heading">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button
              type="button"
              className="profile__edit-button"
              onClick={onEditProfile}
            >
              <img
                className="profile__edit-icon"
                src={edit}
                alt="Редактировать"
              />
            </button>
          </div>
          <p className="profile__description">{currentUser.about}</p>
        </div>
        <button
          className="profile__add-button"
          type="button"
          onClick={onAddPlace}
        >
          <img className="profile__add-icon" src={plus} alt="Плюс" />
        </button>
      </section>

      {/* <!-- сетка с карточками мест --> */}
      <section className="places">
        {cards.map((card) => (
          <Card
            key={card._id}
            card={card}
            onClick={onCardClick}
            onLike={onCardLike}
            onDelete={onCardDelete}
          />
        ))}
      </section>

      {/* <!-- шаблон карточки места --> */}
      <div className="places__item">
        <img className="places__image" />
        <div className="places__name-wrapper">
          <h2 className="places__name"></h2>
          <button type="button" className="places__fav-button">
            <img className="places__fav-image" src={heartStroke} />

            <span className="places__fav-likes"></span>
          </button>
        </div>
        <button type="button" className="places__delete-button">
          <img className="places__delete-icon" src={deleteIcon} />
        </button>
      </div>
    </main>
  );
};

export default Main;
