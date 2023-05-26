import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import InfoTooltip from "./InfoTooltip";
import api from "../utils/api";
import Header from "./Header";
import PopupWithForm from "./PopupWithForm";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ImagePopup from "./ImagePopup";
import Main from "./Main";
import Footer from "./Footer";
import ProtectedRoute from "./ProtectedRoute";
import CurrentUserContext from "../contexts/CurrentUserContext";

const defaultUser = {
  _id: "",
  email: "",
  name: "",
  about: "",
  avatar: "",
};

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [currentUser, setCurrentUser] = useState(defaultUser);
  const [cards, setCards] = useState([]);

  const [isTooltipOpen, setIsTooltipOpen] = useState(false);
  const [isTooltipSuccessful, setIsTooltipSuccessful] = useState(false);

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  const navigate = useNavigate();

  // при старте приложения ищем токен в localstorage
  useEffect(() => {
    handleTokenCheck();
  }, []);

  // эффект для запроса на получение карточек
  // (работает только тогда, когда isLoggedIn)
  useEffect(() => {
    if (isLoggedIn) {
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
    }
  }, [isLoggedIn]);

  const handleTokenCheck = () => {
    const token = localStorage.getItem("token");
    if (token) {
      // если токен есть, то выполняем проверку
      api.setToken(token);
      api
        .getUserInfo()
        .then(() => {
          // если токен рабочий, то приложение должно направиться на главную
          setIsLoggedIn(true);
          navigate("/", { replace: true });
        })
        .catch((e) => {
          // если токен больше недействителен, пишем ошибку
          console.log(`ошибка сохраненного токена: (${e})`);
        });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

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
    setIsTooltipOpen(false);
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  const handleCardLike = (cardId, isLiked) => {
    api
      .changeLikeCardStatus(cardId, !isLiked)
      .then((newCard) => {
        setCards((cards) =>
          cards.map((oldCard) =>
            oldCard._id === newCard._id ? newCard : oldCard
          )
        );
      })
      .catch((e) => console.log(e));
  };

  const handleCardDelete = (cardId) => {
    api
      .removeCard(cardId)
      .then(() => {
        setCards((cards) => cards.filter((card) => card._id !== cardId));
      })
      .catch((e) => console.log(e));
  };

  const handleUpdateUser = ({ name, about }) => {
    api
      .setUserInfo(name, about)
      .then((newUser) => {
        setCurrentUser(newUser);
        closeAllPopups();
      })
      .catch((e) => console.log(e));
  };

  const handleUpdateAvatar = ({ avatar }) => {
    api
      .setUserAvatar(avatar)
      .then((newUser) => {
        setCurrentUser(newUser);
        closeAllPopups();
      })
      .catch((e) => console.log(e));
  };

  const handleAddPlaceSubmit = ({ name, link }) => {
    api
      .addCard(name, link)
      .then((newCard) => {
        setCards([...cards, newCard]);
        closeAllPopups();
      })
      .catch((e) => console.log(e));
  };

  const handleRegisterSubmit = ({ email, password }) => {
    api
      .register(email, password)
      .then(() => {
        setIsTooltipOpen(true);
        setIsTooltipSuccessful(true);
        navigate("/sign-in");
      })
      .catch((e) => {
        setIsTooltipOpen(true);
        setIsTooltipSuccessful(false);
        console.log(e);
      });
  };

  const handleLoginSubmit = ({ email, password }) => {
    api
      .login(email, password)
      .then((token) => {
        setIsTooltipOpen(true);
        setIsTooltipSuccessful(true);
        localStorage.setItem("token", token);
        api.setToken(token);
        setIsLoggedIn(true);
        navigate("/", { replace: true });
      })
      .catch((e) => {
        setIsTooltipOpen(true);
        setIsTooltipSuccessful(false);
        console.log(e);
      });
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header isLoggedIn={isLoggedIn} onLogout={handleLogout} />

      <InfoTooltip
        isOpen={isTooltipOpen}
        isSuccessful={isTooltipSuccessful}
        onClose={closeAllPopups}
      />

      <Routes>
        <Route
          path="/"
          index={true}
          element={
            <ProtectedRoute
              isLoggedIn={isLoggedIn}
              element={() => (
                <>
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
                </>
              )}
            />
          }
        />

        <Route
          path="/sign-in"
          element={<Login onSubmit={handleLoginSubmit} />}
        />

        <Route
          path="/sign-up"
          element={<Register onSubmit={handleRegisterSubmit} />}
        />
      </Routes>
    </CurrentUserContext.Provider>
  );
};

export default App;
