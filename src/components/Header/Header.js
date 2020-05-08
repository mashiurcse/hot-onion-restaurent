import React from "react";
import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import "./Header.css";
import logo from "../../images/logo2.png";
import "bootstrap/dist/css/bootstrap.min.css";
import { getDatabaseCart } from "../../utilities/databaseManager";
import { useState } from "react";
import { useAuth } from "../Login/UseAuth";

const Header = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    //cart data
    const saveData = getDatabaseCart();
    const product = Object.keys(saveData);

    setCart(product);
  }, []);

  const auth = useAuth();
  // console.log(auth.user);

  return (
    <div className="container">
      <nav className="navbar navbar-expand-md">
        <div style={{ textAlign: "left" }} className="navbar-brand">
          <a href="/">
            <img src={logo} alt="logo" className="logo" />
          </a>
        </div>
        <div className="nav-link d-flex align-self-center">
          <ul className="navbar-nav">
            <li className="nav-item ml-3">
              <span>
                <a href="/login">
                  <FontAwesomeIcon
                    className="cart-icon"
                    icon={faShoppingCart}
                  />
                  <span className="cart-amount counter-number">
                    {cart.length}
                  </span>
                </a>
              </span>
            </li>
            {auth.user ? (
              <div className="nav-link d-flex align-self-center">
                <span style={{ color: "red" }}>{auth.user.name} </span>
                <a href="/login">
                  <button
                    style={{
                      height: "25px",
                      border: "none",
                      marginLeft: "20px",
                      fontSize: "small",
                      backgroundColor: "red",
                      color: "white",
                    }}
                  >
                    SignOut
                  </button>
                </a>
              </div>
            ) : (
              <div className="nav-link d-flex align-self-center">
                <li className="nav-item">
                  <a href="/login">Login</a>
                </li>
                <li>
                  <a href="/login">
                    <button className="top-btn">SignUp</button>
                  </a>
                </li>
              </div>
            )}
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Header;
