import React from "react";
import "./Banner.css";
import "bootstrap/dist/css/bootstrap.min.css";

const Banner = () => {
  return (
    <div className="banner d-flex justify-content-center align-items-center">
      <div>
        <div>
          <h1>Best food waiting for your belly!</h1>
        </div>
        <div className=" d-flex justify-content-center">
          <input
            type="text"
            name="search"
            id="search"
            placeholder="Search food items"
          />
          <button className="top-btn">Search</button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
