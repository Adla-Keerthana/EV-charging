import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";

// Load your Stripe publishable key
const stripePromise = loadStripe("pk_test_51QckczKfahkTtl2n8s9bHO0WTsP77jp9hZJpRKfvaacl3rHiQ8cDYiIVJVS0E3W00JKk9frqg2aBY4gA4g2pVxsd00VWdOmvJA");

function StripeElement() {
  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <Elements stripe={stripePromise}>
        <CheckoutForm />
      </Elements>
    </div>
  );
}

export default StripeElement;
