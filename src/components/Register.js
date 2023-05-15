import React from "react";
import logo from "../images/logo.svg";

function Register() {
  return (
    <form className="signup">
      <div className="signup__registration">
        <h1 className="signup__heading">Регистрация</h1>
        <div className="signup__input-wrapper">
          <input
            id="signup-registration-password-field"
            className="signup__input"
            type="text"
            name="password"
            placeholder="Пароль"
            minLength="2"
            maxLength="30"
            required={true}
            // value={name}
          />

          {/* <span
            id="signup-registration-password-field-error"
            className="signup__input-error"
          ></span> */}
        </div>

        <div className="signup__input-wrapper">
          <input
            id="signup-registration-link-field"
            className="signup__input"
            type="url"
            name="link"
            placeholder="Email"
            required={true}
            // value={link}
          />
          {/* 
          <span
            id="signup-registration-link-field-error"
            className="signup__input-error"
          ></span> */}
        </div>
      </div>
      <div className="signup__footer">
        <button className="signup__registration-button">
          Зарегистрироваться
        </button>
        <button className="signup__login-button">
          Уже зарегистрированы? Войти
        </button>
      </div>
    </form>
  );
}

export default Register;
