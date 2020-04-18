import React from "react";
import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import foodData from "../../foodData";
import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import "./ItemDetails.css";

const ItemDetails = () => {
  const { id } = useParams();
  const foods = foodData;
  const [category, setCategory] = useState([]);
  const [count, setCount] = useState(0);
  const food = foods.find((product) => id === product.id);

  useEffect(() => {
    const foodCategory = food.category;
    const currentFoods = foods.filter((food) => foodCategory === food.category);
    setCategory(currentFoods);
  }, [food.category, foods]);

  const { name, detailsDescription, img, price } = food;
  return (
    <div className="container">
      <div className="row mt-4">
        <div className="col-lg-6 col-md-12">
          <h1>{name}</h1>
          <p>{detailsDescription}</p>
          <div className="row d-flex align-items-center ml-1 mt-4">
            <h3>${price}</h3>
            <div className="item-count">
              {count > 0 ? (
                <button
                  className="minusButton"
                  onClick={() => setCount(count - 1)}
                >
                  {" "}
                  -{" "}
                </button>
              ) : (
                <button className="minusButton" disabled>
                  {" "}
                  -{" "}
                </button>
              )}
              {count}
              <button
                className="plusButton"
                onClick={() => setCount(count + 1)}
              >
                {" "}
                +{" "}
              </button>
            </div>
          </div>
          <button className="addButton">
            <FontAwesomeIcon icon={faShoppingCart} />
            add
          </button>
        </div>
        <div className="col-lg-6 col-md-12">
          <img src={img} alt={name} width="75%" />
        </div>
      </div>
      <div className="row mt-4 moreItem">
        {category.map((food) => (
          <Link to={"/product/" + food.id} key={food.id}>
            <img src={food.img} alt={food.name} width="10%" className="ml-2" />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ItemDetails;
