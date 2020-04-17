import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import "./Header.css";
import logo from "../../images/logo2.png";
import "bootstrap/dist/css/bootstrap.min.css";

const Header = () => {
  return (
    <div className="container">
      <nav className="navbar navbar-expand-md">
        <div className="navbar-brand">
          <a href="/">
            <img src={logo} alt="logo" className="logo" />
          </a>
        </div>
        <div className="nav-link d-flex align-self-center">
          <ul className="navbar-nav">
            <li className="nav-item ml-3">
              <a href="/cart">
                <FontAwesomeIcon className="cart-icon" icon={faShoppingCart} />
              </a>
            </li>
            <li className="nav-item">
              <a href="/login">Login</a>
            </li>
            <button className="top-btn">Sign Up</button>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Header;
