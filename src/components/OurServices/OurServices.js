import React from "react";
import "./OurServices.css";
import fastDelivery from "../../images/fast-delivery.png";
import autoResponder from "../../images/good-responder.png";
import homeDelivery from "../../images/home-delivery.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBusAlt,
  faArrowAltCircleRight,
  faBell,
  faTruck,
} from "@fortawesome/free-solid-svg-icons";

const OurService = () => {
  return (
    <div className="container">
      <div className="row">
        <div style={{ textAlign: "left" }} className="col-lg-6 my-5">
          <h1>Why choose us</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique
            atque, rem eligendi consequatur nobis vitae nihil recusandae tenetur
            accusantium nam sequi dicta officiis, veritatis fuga modi ullam
            quisquam amet voluptatibus.
          </p>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-4 col-md-12">
          <img src={fastDelivery} alt="fast delivery" className="img-fluid" />
          <h3 className="my-2">
            <FontAwesomeIcon icon={faBusAlt} color="rgb(255, 44, 109)" /> Fast
            Delivery
          </h3>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fugit,
            fugiat modi et eum facilis neque
          </p>
          <p style={{ fontWeight: "600", color: "blue" }}>
            {" "}
            See More{" "}
            <FontAwesomeIcon icon={faArrowAltCircleRight} color="green" />{" "}
          </p>
        </div>
        <div className="col-lg-4 col-md-12">
          <img src={autoResponder} alt="auto responder" className="img-fluid" />
          <h3 className="my-2">
            <FontAwesomeIcon icon={faBell} color="rgb(255, 44, 109)" /> A Good
            Auto Responder
          </h3>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fugit,
            fugiat modi et eum facilis neque
          </p>
          <p style={{ fontWeight: "600", color: "blue" }}>
            {" "}
            See More{" "}
            <FontAwesomeIcon icon={faArrowAltCircleRight} color="green" />{" "}
          </p>
        </div>
        <div className="col-lg-4 col-md-12">
          <img src={homeDelivery} alt="fast delivery" className="img-fluid" />
          <h3 className="my-2">
            <FontAwesomeIcon icon={faTruck} color="rgb(255, 44, 109)" /> Home
            Delivery
          </h3>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fugit,
            fugiat modi et eum facilis neque
          </p>
          <p style={{ fontWeight: "600", color: "blue" }}>
            {" "}
            See More{" "}
            <FontAwesomeIcon icon={faArrowAltCircleRight} color="green" />{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

export default OurService;
