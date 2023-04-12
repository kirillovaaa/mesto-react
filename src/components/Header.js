import React from "react";
import logo from "../images/logo.svg";

function Header() {
  return (
    <header className="header">
      <img src={logo} className="mesto-logo" alt="mesto-logo" />
    </header>
  );
}

export default Header;
