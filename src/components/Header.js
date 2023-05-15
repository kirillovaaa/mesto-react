import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import CurrentUserContext from "../contexts/CurrentUserContext";
import logo from "../images/logo.svg";

const mapLinks = {
  "/sign-in": {
    text: "Регистрация",
    link: "/sign-up",
  },
  "/sign-up": {
    text: "Войти",
    link: "/sign-in",
  },
  "/": {
    text: "что надо?",
    link: "/sign-up",
  },
};

function Header({ isLoggedIn }) {
  const currentUser = useContext(CurrentUserContext);
  const { pathname } = useLocation();

  return (
    <header className="header">
      <Link to="/">
        <img src={logo} className="header__logo" alt="mesto-logo" />
      </Link>

      {!isLoggedIn && (
        <Link to={mapLinks[pathname].link} className="header__button">
          {mapLinks[pathname].text}
        </Link>
      )}
    </header>
  );
}

export default Header;
