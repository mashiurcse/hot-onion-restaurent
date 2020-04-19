import React from "react";
import "./FoodItems.css";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const FoodItems = (props) => {
  console.log(props);

  const { name, img, description, price, id } = props.food;
  return (
    <div className="card col-md-12 col-lg-4 items align-items-center justify-content-around mt-3">
      <Link to={"/product/" + id}>
        <img src={img} alt="name" width="200px" height="200px" />
        <div className="card-body">
          <h5 className="card-title">{name}</h5>
          <p className="card-text">{description}</p>
          <h4 className="card-title">{price}</h4>
        </div>
      </Link>
    </div>
  );
};

export default FoodItems;
