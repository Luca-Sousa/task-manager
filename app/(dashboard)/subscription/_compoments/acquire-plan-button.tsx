"use client";

import { Button } from "@/app/_components/ui/button";
import { createStripeCheckout } from "../_actions/create-stripe-checkout";
import { loadStripe } from "@stripe/stripe-js";

const AcquirePlanButton = () => {
  const handleAcquirePlanClick = async () => {
    const { sessionId } = await createStripeCheckout();

    if (!process.env.NEXT_PUBLIC_SPRIPE_PUBLISHABLE_KEY)
      throw new Error("Stripe publishable key not found!");

    const stripe = await loadStripe(
      process.env.NEXT_PUBLIC_SPRIPE_PUBLISHABLE_KEY,
    );

    if (!stripe) throw new Error("stripe not found!");

    await stripe.redirectToCheckout({ sessionId });
  };

  return (
    <Button className="shadow-xs mt-8 w-full" onClick={handleAcquirePlanClick}>
      Adquirir Plano Premium
    </Button>
  );
};

export default AcquirePlanButton;
