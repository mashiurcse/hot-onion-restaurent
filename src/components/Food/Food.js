import React from "react";
import "./Food.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { useEffect } from "react";
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

  const [food, setFood] = useState([]);
  const [category, setCategory] = useState("lunch");

  useEffect(() => {
    fetch("https://morning-everglades-94803.herokuapp.com/product")
      .then((res) => res.json())
      .then((data) => {
        setFood(data);
      });
  }, []);

  const currFood = food.filter((food) => food.category === category);

  // To Load Data from fake data to Server
  // const handleAddData = () => {
  //   fetch("http://localhost:4200/addProduct", {
  //     method: "POST",
  //     body: JSON.stringify(foods),
  //     headers: {
  //       "Content-type": "application/json; charset=UTF-8",
  //     },
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log(data);
  //     });
  // };

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
          {/* <li className="nav-item m-2">
            <button onClick={handleAddData}>Add Data</button>
          </li> */}
        </ul>
      </nav>
      <div className="row">
        {currFood.map((food) => (
          <FoodItems food={food} key={food.id}></FoodItems>
        ))}
      </div>
      <div className="checkout d-flex justify-content-center my-3">
        {cart.length > 0 ? (
          <Link to="/cart">
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
