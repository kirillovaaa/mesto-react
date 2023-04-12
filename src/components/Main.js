import React, { useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import Card from "./Card";
import close from "../images/close.svg";
import avatar from "../images/avatar.png";
import edit from "../images/edit.svg";
import plus from "../images/plus.svg";
import heartStroke from "../images/heart-stroke.svg";
import deleteIcon from "../images/delete.svg";
import api from "../utils/api";

const Main = ({
  // открыты ли попапы
  isEditProfilePopupOpen,
  isAddPlacePopupOpen,
  isEditAvatarPopupOpen,
  selectedCard,
  // обработчики открытия попапов
  onEditAvatar,
  onEditProfile,
  onAddPlace,
  // обработчик закрытия попапов
  onCloseAllPopups,
  // обработчик нажатия на карточку
  onCardClick,
}) => {
  const [userName, setUserName] = useState();
  const [userDescription, setUserDescription] = useState();
  const [userAvatar, setUserAvatar] = useState(avatar);
  const [cards, setCards] = useState([]);

  useEffect(() => {
    Promise.all([api.getMe(), api.getInitialCards()])
      .then(([me, cards]) => {
        setUserName(me.name);
        setUserDescription(me.about);
        setUserAvatar(me.avatar);
        setCards(cards);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <main>
      <PopupWithForm name="delete" title="Вы уверены?" />

      <PopupWithForm
        name="place"
        title="Новое место"
        isOpen={isAddPlacePopupOpen}
        onClose={onCloseAllPopups}
      >
        <div className="popup__input-wrapper">
          <input
            id="add-place-name-field"
            className="popup__input"
            type="text"
            name="name"
            placeholder="Название"
            minLength="2"
            maxLength="30"
            required
          />
          <span
            id="add-place-name-field-error"
            className="popup__input-error"
          ></span>
        </div>
        <div className="popup__input-wrapper">
          <input
            id="add-place-link-field"
            className="popup__input"
            type="url"
            name="link"
            placeholder="Ссылка на картинку"
            required
          />
          <span
            id="add-place-link-field-error"
            className="popup__input-error"
          ></span>
        </div>
      </PopupWithForm>

      <PopupWithForm
        name="avatar"
        title="Обновить аватар"
        isOpen={isEditAvatarPopupOpen}
        onClose={onCloseAllPopups}
      >
        <div className="popup__input-wrapper">
          <input
            id="add-avatar-link-field"
            className="popup__input"
            type="url"
            name="link"
            placeholder="Ссылка на аватар"
            required
          />
          <span
            id="add-avatar-link-field-error"
            className="popup__input-error"
          ></span>
        </div>
      </PopupWithForm>

      <PopupWithForm
        name="profile"
        title="Редактировать профиль"
        isOpen={isEditProfilePopupOpen}
        onClose={onCloseAllPopups}
      >
        <div className="popup__input-wrapper">
          <input
            id="edit-name-field"
            className="popup__input"
            type="text"
            name="name"
            placeholder="Имя"
            minLength="2"
            maxLength="40"
            required
          />
          <span
            id="edit-name-field-error"
            className="popup__input-error"
          ></span>
        </div>
        <div className="popup__input-wrapper">
          <input
            id="edit-description-field"
            className="popup__input"
            type="text"
            name="about"
            placeholder="О себе"
            minLength="2"
            maxLength="200"
            required
          />
          <span
            id="edit-description-field-error"
            className="popup__input-error"
          ></span>
        </div>
      </PopupWithForm>

      <ImagePopup card={selectedCard} onClose={onCloseAllPopups} />

      {/* <!-- блок профиля --> */}
      <section className="profile">
        <div className="profile__avatar-wrapper">
          <img className="profile__avatar" src={userAvatar} alt="Аватар" />
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
            <h1 className="profile__name">{userName}</h1>
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
          <p className="profile__description">{userDescription}</p>
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
          <Card key={card._id} card={card} onClick={onCardClick} />
        ))}
      </section>

      {/* <!-- шаблон карточки места --> */}
      <template id="place-card-template">
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
      </template>
    </main>
  );
};

export default Main;
