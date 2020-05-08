import React from "react";
import "./Food.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { useEffect } from "react";
import foodData from "../../foodData";
import FoodItems from "../FoodItems/FoodItems";
import { Link } from "react-router-dom";
import { getDatabaseCart } from "../../utilities/databaseManager";

const Food = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    //cart data
    const saveData = getDatabaseCart();
    const product = Object.keys(saveData);

    setCart(product);
  }, []);
  //console.log(cart.length);
  const foods = foodData;
  const [food, setFood] = useState([]);
  const [category, setCategory] = useState("lunch");
  useEffect(() => {
    setFood(foods);
  }, [foods]);
  const currFood = food.filter((food) => food.category === category);

  return (
    <div className="container">
      <nav className="my-3">
        <ul className="nav justify-content-center">
          <li className="nav-item m-2" onClick={() => setCategory("breakfast")}>
            <span className={category === "breakfast" ? "active h6" : "h6"}>
              Breakfast
            </span>
          </li>
          <li className="nav-item m-2" onClick={() => setCategory("lunch")}>
            <span className={category === "lunch" ? "active h6" : "h6"}>
              lunch
            </span>
          </li>
          <li className="nav-item m-2" onClick={() => setCategory("dinner")}>
            <span className={category === "dinner" ? "active h6" : "h6"}>
              dinner
            </span>
          </li>
        </ul>
      </nav>
      <div className="row">
        {currFood.map((food) => (
          <FoodItems food={food} key={food.id}></FoodItems>
        ))}
      </div>
      <div className="checkout d-flex justify-content-center my-3">
        {cart.length > 0 ? (
          <Link to="/login">
            <button style={{ backgroundColor: "tomato" }}>
              Checkout Order
            </button>
          </Link>
        ) : (
          <button>Checkout Order</button>
        )}
      </div>
    </div>
  );
};

export default Food;
