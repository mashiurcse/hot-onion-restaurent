import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { getDatabaseCart, processOrder } from "../../utilities/databaseManager";
import { useForm } from "react-hook-form";
import { useAuth } from "../Login/UseAuth";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../CheckOutForm/CheckOutForm";

const Shipment = () => {
  const [shipmentInfo, setShipmentInfo] = useState(null);
  const [order, setOrder] = useState({
    isUserInfo: false,
  });
  const [orderId, setOrderId] = useState(null);
  const { register, errors, handleSubmit } = useForm();
  const stripePromise = loadStripe(
    "pk_test_pJAbc6qIcJtzcUdMgnim6o1q00ejmd0ZCv"
  );

  const auth = useAuth();

  const onSubmit = (data) => {
    setShipmentInfo(data);
  };

  const handlePlaceOrder = (payment) => {
    const savedCart = getDatabaseCart();
    console.log(auth.user.name);
    const orderDetails = {
      email: auth.user.email,
      cart: savedCart,
      shipment: shipmentInfo,
      payment: payment,
    };
    fetch("http://localhost:4200/placeOrder", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderDetails),
    })
      .then((res) => res.json())
      .then((order) => {
        setOrderId(order._id);
        // console.log(order);
        // alert("Successfully Order Places - " + order._id);
        processOrder();
      });
  };
  const userInfo = () => {
    const userInformation = { ...order };
    userInformation.isUserInfo = true;
    setOrder(userInformation);
  };
  return (
    <div className="container">
      <div style={{ display: "flex" }}>
        <div
          className="order-delivery"
          style={{ display: shipmentInfo && "none" }}
        >
          <h2>Shipment Information</h2>
          <div>
            <form className="ship-form" onSubmit={handleSubmit(onSubmit)}>
              <input
                name="name"
                //defaultValue={auth.user.name}
                ref={register({ required: true })}
                placeholder="Your Name"
              />
              {errors.name && <span className="error">Name is required</span>}

              <input
                name="email"
                //defaultValue={auth.user.email}
                ref={register({ required: true })}
                placeholder="Your Email"
              />
              {errors.email && <span className="error">Email is required</span>}
              <input
                name="AddressLine1"
                ref={register({ required: true })}
                placeholder="Address Line 1"
              />
              {errors.AddressLine1 && (
                <span className="error">Address is required</span>
              )}
              <input
                name="AddressLine2"
                ref={register}
                placeholder="Address Line 1"
              />
              <input
                name="city"
                ref={register({ required: true })}
                placeholder="City"
              />
              {errors.city && <span className="error">City is required</span>}
              <input
                name="country"
                ref={register({ required: true })}
                placeholder="Country"
              />
              {errors.country && (
                <span className="error">Country is required</span>
              )}
              <input
                name="zipcode"
                ref={register({ required: true })}
                placeholder="Zip Code"
              />
              {errors.zipcode && (
                <span className="error">Zip Code is required</span>
              )}

              <input onClick={userInfo} type="submit" />
            </form>
          </div>
        </div>
        <div
          className="card"
          style={{ display: shipmentInfo ? "block" : "none" }}
        >
          <h1>Payment Information</h1>
          <Elements stripe={stripePromise}>
            <CheckoutForm handlePlaceOrder={handlePlaceOrder}></CheckoutForm>
          </Elements>
          <br />
          {orderId && (
            <div>
              <h3>Thank you for your shipping </h3>
              <p>Your order Id: {orderId}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Shipment;
