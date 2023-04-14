import React, { useState, useEffect } from "react";
import Card from "./Card";
import avatar from "../images/avatar.png";
import edit from "../images/edit.svg";
import plus from "../images/plus.svg";
import heartStroke from "../images/heart-stroke.svg";
import deleteIcon from "../images/delete.svg";
import api from "../utils/api";

const Main = ({
  // обработчики открытия попапов
  onEditAvatar,
  onEditProfile,
  onAddPlace,
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
