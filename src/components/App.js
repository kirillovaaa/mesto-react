import React, { useState, useEffect } from "react";
import api from "../utils/api";
import Header from "./Header";
import PopupWithForm from "./PopupWithForm";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ImagePopup from "./ImagePopup";
import Main from "./Main";
import Footer from "./Footer";
import CurrentUserContext from "../contexts/CurrentUserContext";

const defaultUser = {
  _id: "",
  name: "",
  about: "",
  avatar: "",
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
        cards.map((oldCard) =>
          oldCard._id === newCard._id ? newCard : oldCard
        )
      );
    });
  };

  const handleCardDelete = (cardId) => {
    api
      .removeCard(cardId)
      .then((res) => {
        const newCards = cards.filter((card) => card._id !== cardId);
        setCards(newCards);
      })
      .catch((e) => console.log(e));
  };

  const handleUpdateUser = ({ name, about }) => {
    api
      .setUserInfo(name, about)
      .then((newUser) => {
        setCurrentUser(newUser);
      })
      .catch((e) => console.log(e))
      .finally(() => {
        closeAllPopups();
      });
  };

  const handleUpdateAvatar = ({ avatar }) => {
    api
      .setUserAvatar(avatar)
      .then((newUser) => {
        setCurrentUser(newUser);
      })
      .catch((e) => console.log(e))
      .finally(() => {
        closeAllPopups();
      });
  };

  const handleAddPlaceSubmit = ({ name, link }) => {
    api
      .addCard(name, link)
      .then((newCard) => {
        setCards([newCard, ...cards]);
      })
      .catch((e) => console.log(e))
      .finally(() => {
        closeAllPopups();
      });
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header />

      <PopupWithForm name="delete" title="Вы уверены?" />

      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onAddPlace={handleAddPlaceSubmit}
      />

      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
      />

      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}
      />

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
