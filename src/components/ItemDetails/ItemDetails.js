import React from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import "./ItemDetails.css";
import { addToDatabaseCart } from "../../utilities/databaseManager";

//Template literals are enclosed by the backtick (` `)  (grave accent) character instead of double or single quotes.
// placeholder ${ }
//ctrl+k+c/u - multiline comment, alt+arrow - for line move
const ItemDetails = () => {
  const { id } = useParams();
  const [foodInd, setFoodInd] = useState([]);
  useEffect(() => {
    (async function () {
      try {
        const response = await fetch("https://morning-everglades-94803.herokuapp.com/product/" + id);
        const json = await response.json();
        setFoodInd(json);
      } catch (e) {
        console.error(e);
      }
    })();
  }, [id]);

  //const [category, setCategory] = useState([]);
  const [count, setCount] = useState(1);
  // const food = foods.find((product) => id === product.id);
  //const [cart, setCart] = useState([]);

  // useEffect(() => {
  //   const foodCategory = food.category;
  //   const currentFoods = foods.filter((food) => foodCategory === food.category);
  //   setCategory(currentFoods);
  // }, [food.category, foods, foodInd]);

  const { name, detailsDescription, img, price } = foodInd;

  const handleAddProduct = (product) => {
    const toBeAdded = product.id;
    //console.log(toBeAdded);
    //const productAdded = foodInd.find((pd) => pd.id === toBeAdded);
    const count = document.getElementById("item-quantity").innerHTML;
    //setCart(sameProduct);
    addToDatabaseCart(toBeAdded, count);
  };
  function refreshPage() {
    window.location.reload(false);
  }
  return (
    <div className="container">
      <a href="/">
        <span style={{ fontSize: "large", fontWeight: "700", color: "tomato" }}>
          Home
        </span>
      </a>
      <div className="row mt-4">
        <div className="col-lg-6 col-md-12">
          <h1>{name}</h1>
          <p>{detailsDescription}</p>
          <div className="row d-flex align-items-center ml-1 mt-4">
            <h3>${price * count}</h3>
            <div className="item-count">
              {count > 1 ? (
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
              <h6 style={{ marginTop: "10px" }} id="item-quantity">
                {count}
              </h6>

              <button
                className="plusButton"
                onClick={() => setCount(count + 1)}
              >
                {" "}
                +{" "}
              </button>
            </div>
          </div>
          <button
            onClick={() => handleAddProduct(foodInd)}
            onClickCapture={refreshPage}
            className="addButton"
          >
            <FontAwesomeIcon icon={faShoppingCart} />
            add
          </button>
        </div>
        <div className="col-lg-6 col-md-12">
          <img src={img} alt={name} width="75%" />
        </div>
      </div>
      {/* <div className="row mt-4 moreItem">
        {category.map((food) => (
          <Link to={"/product/" + food.id} key={food.id}>
            <img src={food.img} alt={food.name} width="10%" className="ml-2" />
          </Link>
        ))}
      </div> */}
    </div>
  );
};

export default ItemDetails;
