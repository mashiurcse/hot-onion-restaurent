import React from "react";
import "./Footer.css";
import whiteLogo from "../../images/logo.png";

const Footer = () => {
  return (
    <div className="footer py-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-6">
            <img src={whiteLogo} alt="logo" width="40%" />
          </div>
          <div className="col-lg-3 justify-content-center">
            <ul>
              <li>
                <small>About Online food</small>
              </li>
              <li>
                <small>Read our blog</small>
              </li>
              <li>
                <small>Sign up to deliver</small>
              </li>
              <li>
                <small>Add your restaurant</small>
              </li>
            </ul>
          </div>
          <div className="col-lg-3 justify-content-center">
            <ul>
              <li>
                <small>Get Help</small>
              </li>
              <li>
                <small>Read FAQs</small>
              </li>
              <li>
                <small>View All Cities</small>
              </li>
              <li>
                <small>Restaurant near me</small>
              </li>
            </ul>
          </div>
        </div>
        <div className="row pt-5">
          <div className="col-lg-6 col-md-12">
            <small style={{ color: "white" }}>
              Copyright © 2020 Red Onion Restaurant
            </small>
          </div>
          <div className="col-lg-6 col-md-12">
            <ul className="nav justify-content-end">
              <li className="nav-item mr-3">Privacy Policy</li>
              <li className="nav-item mr-3">Terms of service</li>
              <li className="nav-item mr-3">Pricing</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
