import React, { useState, useEffect } from "react";
import api from "../utils/api";
import Header from "./Header";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import Main from "./Main";
import Footer from "./Footer";
import CurrentUserContext from "../contexts/CurrentUserContext";

const defaultUser = {
  _id: undefined,
  name: undefined,
  about: undefined,
  avatar: undefined,
};

const App = () => {
  const [currentUser, setCurrentUser] = useState(defaultUser);
  const [cards, setCards] = useState([]);

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  useEffect(() => {
    const getData = async () => {
      const user = await api.getUserInfo();
      const cards = await api.getInitialCards();
      return { user, cards };
    };

    getData()
      .then(({ user, cards }) => {
        setCurrentUser(user);
        setCards(cards);
      })
      .catch((e) => console.log(e));
  }, []);

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard(null);
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  const handleCardLike = (cardId, isLiked) => {
    api.changeLikeCardStatus(cardId, !isLiked).then((newCard) => {
      setCards(
        cards.map((oldCard) => {
          if (oldCard._id === newCard._id) {
            return newCard;
          }
          return oldCard;
        })
      );
    });
  };

  const handleCardDelete = (cardId) => {
    api
      .removeCard(cardId)
      .then((res) => console.log(res))
      .catch((e) => console.log(e));
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header />

      <PopupWithForm name="delete" title="Вы уверены?" />

      <PopupWithForm
        name="place"
        title="Новое место"
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
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
        onClose={closeAllPopups}
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
        onClose={closeAllPopups}
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

      <ImagePopup card={selectedCard} onClose={closeAllPopups} />

      <Main
        cards={cards}
        // обработчики открытия попапов
        onEditAvatar={handleEditAvatarClick}
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        // обработчик нажатия на карточку
        onCardClick={handleCardClick}
        onCardLike={handleCardLike}
        onCardDelete={handleCardDelete}
      />

      <Footer />
    </CurrentUserContext.Provider>
  );
};

export default App;
