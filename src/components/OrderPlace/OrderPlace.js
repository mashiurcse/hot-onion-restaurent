import React from "react";
import img from "../../images/map.png";
import delivery from "../../images/Group 1151.png";
import rider from "../../images/Group 1152.png";
import "bootstrap/dist/css/bootstrap.min.css";
import "./OrderPlace.css";

const OrderPlace = () => {
  function refreshPage() {
    window.location.reload(false);
  }
  return (
    <div className="container">
      <div style={{ display: "flex" }}>
        <div className=" d-flex justify-content-center my-3">
          <img src={img} alt="" width="600px" />
        </div>

        <div style={{ marginLeft: "100px" }}>
          <div className="order-place">
            <div>
              <img
                style={{ margin: "10px" }}
                src={delivery}
                alt=""
                width="100px"
              />
            </div>
            <div
              style={{
                width: "200px",
                backgroundColor: "white",
                marginLeft: "50px",
                borderLeft: "50px",
              }}
            >
              <ul>
                <li>
                  Your Location: <br></br>Hampvägen 12
                </li>
                <li>
                  Shop Address: <br></br>St. Eriksplan 45
                </li>
              </ul>
            </div>
            <div>
              Estimate Delivery Time:<br></br>
              <h3>9:30 PM</h3>
            </div>
            <div style={{ display: "flex" }}>
              <div>
                <img
                  src={rider}
                  alt=""
                  width="50px"
                  style={{ margin: "5px" }}
                />
              </div>
              <div
                style={{
                  width: "200px",
                  backgroundColor: "white",
                  marginLeft: "20px",
                  borderLeft: "50px",
                }}
              >
                <div>
                  <strong>Hamim</strong>
                </div>
                <div>Your Rider</div>
              </div>
              <div></div>
            </div>
            <div className=" d-flex justify-content-center my-3">
              <button
                onClick={refreshPage}
                style={{
                  width: "200px",
                  backgroundColor: "tomato",
                }}
              >
                Contact
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderPlace;
