import React, { useEffect, useState } from "react";
import {
  getDatabaseCart,
  addToDatabaseCart,
  processOrder,
} from "../../utilities/databaseManager";
import foodData from "../../foodData";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Cart.css";
import { Link } from "react-router-dom";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [order, setOrder] = useState({
    isUserInfo: false,
  });

  useEffect(() => {
    const savedCart = getDatabaseCart(); //get ocject
    const productKeys = Object.keys(savedCart);

    const cartProducts = productKeys.map((existingKey) => {
      //keys gula dhore product gula ber kore nia asbo, map return a array
      const product = foodData.find((pd) => pd.id === existingKey);
      product.quantity = savedCart[existingKey];
      return product;
    });

    setCart(cartProducts);
    console.log(cartProducts);
  }, []);

  const subTotal = cart.reduce(
    (total, pd) => total + pd.price * pd.quantity,
    0
  );
  const tax = Math.round(subTotal * 0.12, 2);
  const delivery = 2;
  const total = subTotal + tax + delivery;

  function refreshPage() {
    window.location.reload(false);
  }

  const userInfo = () => {
    const userInformation = { ...order };
    userInformation.isUserInfo = true;
    setOrder(userInformation);
  };

  const deliveryInfo = (e) => {
    console.log(e);
  };

  const handleOrderPlace = () => {
    setCart([]);
    processOrder();
  };

  return (
    <div className="container">
      <div style={{ display: "flex" }}>
        <div className="order-delivery">
          <h2>Edit Delivery Details</h2>
          <div>
            <form onSubmit={deliveryInfo}>
              <input type="text" placeholder="Delivery Type" required></input>
              <input type="text" placeholder="Address1" required></input>
              <input type="text" placeholder="Address2"></input>
              <input type="text" placeholder="Name" required></input>
              <input
                type="text"
                placeholder="Delivery Instructor"
                required
              ></input>
              <br />
              <input
                type="submit"
                onClick={userInfo}
                value="Save and Continue"
                style={{
                  backgroundColor: "tomato",
                }}
              />
            </form>
          </div>
        </div>
        <div
          style={{
            width: "500px",

            marginLeft: "50px",
            borderLeft: "50px",
          }}
          className="card"
        >
          <h1>Order Review</h1>

          <div className="container">
            {cart.map((pd) => (
              <div className="cart-container" key={pd.id}>
                <div
                  style={{ marginTop: "20px" }}
                  className="d-flex align-items-center"
                >
                  <img src={pd.img} alt={pd.name} width="50px" />
                </div>
                <div>
                  <div className="row d-flex align-items-center ml-1 mt-4">
                    <div>
                      <div style={{ width: "150px" }} className="pd-name">
                        {pd.name}
                      </div>
                      <div>
                        <h3>${pd.price * pd.quantity}</h3>
                      </div>
                    </div>

                    <div style={{ marginLeft: "10px" }} className="item-count">
                      {pd.quantity > 1 ? (
                        <button
                          className="minusButton"
                          onClick={() =>
                            addToDatabaseCart(pd.id, pd.quantity - 1)
                          }
                          onClickCapture={refreshPage}
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
                        {pd.quantity}
                      </h6>

                      <button
                        className="minusButton"
                        onClick={() =>
                          addToDatabaseCart(pd.id, parseInt(pd.quantity) + 1)
                        }
                        onClickCapture={refreshPage}
                      >
                        {" "}
                        +{" "}
                      </button>
                      {/* <button
                        className="plusButton"
                        onClick={() => setCount(count + 1)}
                      >
                        {" "}
                        +{" "}
                      </button> */}
                    </div>
                  </div>
                  {/* {"Name:"} {pd.name} {<br></br>}
                {"Price:"} {pd.price} {<br></br>}
                {"Qnt:"} {pd.quantity} */}
                </div>
              </div>
            ))}
          </div>
          <h6>Total Items: {cart.length}</h6>
          <h6>Tax: ${tax}</h6>
          <h6>Delivery Fee: ${delivery} </h6>
          <h5>Total Price: ${total}</h5>
          <div className="checkout d-flex justify-content-center my-3">
            {order.isUserInfo ? (
              <Link to="/orderPlaced">
                <button
                  onClick={handleOrderPlace}
                  style={{ backgroundColor: "tomato" }}
                >
                  Place Order
                </button>
              </Link>
            ) : (
              <button>Place Order</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
