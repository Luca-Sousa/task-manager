"use client";

import { Button } from "@/app/_components/ui/button";
import { createStripeCheckout } from "../_actions/create-stripe-checkout";
import { loadStripe } from "@stripe/stripe-js";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";

const AcquirePlanButton = () => {
  const { user } = useUser();
  const hasPremiumPlan = user?.publicMetadata.subscriptionPlan === "premium";

  const handleAcquirePlanClick = async () => {
    const { sessionId } = await createStripeCheckout();

    if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)
      throw new Error("Stripe publishable key not found!");

    const stripe = await loadStripe(
      process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
    );

    if (!stripe) throw new Error("stripe not found!");

    await stripe.redirectToCheckout({ sessionId });
  };

  if (hasPremiumPlan) {
    if (!process.env.NEXT_PUBLIC_STRIPE_CUSTOMER_PORTAL_URL)
      throw new Error("Stripe customer portal url not found!");
    return (
      <Button variant="link" className="mt-8 w-full font-bold" asChild>
        <Link
          href={`${process.env.NEXT_PUBLIC_STRIPE_CUSTOMER_PORTAL_URL}?prefilled_email=${user.emailAddresses[0].emailAddress}`}
        >
          Gerenciar Plano
        </Link>
      </Button>
    );
  }

  return (
    <Button className="mt-8 w-full font-bold" onClick={handleAcquirePlanClick}>
      Adquirir Plano Premium
    </Button>
  );
};

export default AcquirePlanButton;
