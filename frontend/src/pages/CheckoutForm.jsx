import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import "../styles/checkoutForm.css";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState(""); // Success or error type

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return; // Stripe.js has not loaded
    }

    setIsProcessing(true);
    setMessage(null);
    setMessageType(""); // Reset message type when new submission happens

    const cardElement = elements.getElement(CardElement);

    try {
      const { paymentMethod, error } = await stripe.createPaymentMethod({
        type: "card",
        card: cardElement,
      });

      if (error) {
        setMessage(error.message);
        setMessageType("error");
      } else {
        console.log("/confirm-payment", paymentMethod.id);
        const response = await fetch("http://localhost:8000/confirm-payment", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            paymentMethodId: paymentMethod.id,
            amount: 5000, // Amount in cents (e.g., $50)
          }),
        });

        const result = await response.json();
        if (result.success) {
          setMessage("Payment successful! PaymentIntent ID: " + result.paymentIntent.id);
          setMessageType("success");
        } else {
          setMessage("Payment failed: " + result.error);
          setMessageType("error");
        }
      }
    } catch (err) {
      setMessage("An unexpected error occurred.");
      setMessageType("error");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="checkout-container">
      <h2 className="checkout-title">Stripe Payment</h2>
      <form onSubmit={handleSubmit}>
        <div className="card-details">
          <label htmlFor="card-element">Card Details</label>
          <CardElement
            id="card-element"
            options={{
              style: {
                base: {
                  fontSize: "20px",
                  color: "#424770",
                  letterSpacing: "0.025em",
                  fontFamily: "'Source Code Pro', monospace",
                  "::placeholder": {
                    color: "#aab7c4",
                  },
                },
                invalid: {
                  color: "#9e2146",
                },
              },
            }}
            className="card-element"
          />
        </div>

        {message && (
          <p className={messageType === "success" ? "success-message" : "error-message"}>
            {message}
          </p>
        )}

        <button
          type="submit"
          className={`submit-button ${isProcessing ? "disabled" : ""}`}
          disabled={!stripe || isProcessing}
        >
          {isProcessing ? "Processing..." : "Pay Now"}
        </button>
      </form>
    </div>
  );
};

export default CheckoutForm;
