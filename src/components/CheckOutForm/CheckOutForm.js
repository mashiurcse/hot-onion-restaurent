import React, { useState } from "react";

import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { Link } from "react-router-dom";

const CheckoutForm = (props) => {
  const [paymentError, setPaymentError] = useState(null);
  const [paymentFinished, setPayFinished] = useState(null);
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });
    if (error) {
      setPaymentError(error.message);
      setPayFinished(null);
    } else {
      setPayFinished(paymentMethod);
      const payment = { id: paymentMethod.id, last4: paymentMethod.card.last4 };
      props.handlePlaceOrder(payment);
      setPaymentError(null);
    }
  };

  return (
    <form
      style={{ border: "solid 1px", padding: "20px", margin: "10px" }}
      onSubmit={handleSubmit}
    >
      <CardElement />
      <br />
      <button
        style={{ backgroundColor: "green", width: "100px", fontWeight: "600" }}
        type="submit"
        disabled={!stripe}
      >
        Pay
      </button>
      {paymentError && <p style={{ color: "red" }}>{paymentError}</p>}
      {paymentFinished && (
        <p style={{ color: "green" }}>Payment Successfull...</p>
      )}
      <br />
      <br />
      <Link to="/">
        <button style={{ backgroundColor: "tomato", borderRadius: "5px" }}>
          ::: Shop More :::
        </button>
      </Link>
    </form>
  );
};

export default CheckoutForm;
