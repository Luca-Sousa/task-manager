import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { useUser } from "@clerk/nextjs";
import { loadStripe } from "@stripe/stripe-js";
import { createStripeCheckout } from "../(dashboard)/subscription/_actions/create-stripe-checkout";
import AcquirePlanButton from "../(dashboard)/subscription/_compoments/acquire-plan-button";

jest.mock("@clerk/nextjs", () => ({
  useUser: jest.fn(),
}));

jest.mock(
  "../(dashboard)/subscription/_actions/create-stripe-checkout",
  () => ({
    createStripeCheckout: jest.fn(),
  }),
);

jest.mock("@stripe/stripe-js", () => ({
  loadStripe: jest.fn(),
}));

describe("AcquirePlanButton", () => {
  it("mostra botão 'Adquirir Plano Premium' para usuários sem assinatura", () => {
    (useUser as jest.Mock).mockReturnValue({
      user: { publicMetadata: { subscriptionPlan: "free" } },
    });

    render(<AcquirePlanButton />);
    expect(screen.getByText("Adquirir Plano Premium")).toBeInTheDocument();
  });

  it("mostra botão 'Gerenciar Plano' para usuários premium", () => {
    (useUser as jest.Mock).mockReturnValue({
      user: {
        publicMetadata: { subscriptionPlan: "premium" },
        emailAddresses: [{ emailAddress: "teste@email.com" }],
      },
    });

    process.env.NEXT_PUBLIC_STRIPE_CUSTOMER_PORTAL_URL =
      "https://stripe.com/portal";

    render(<AcquirePlanButton />);
    expect(screen.getByText("Gerenciar Plano")).toBeInTheDocument();
  });

  it("chama a função de checkout ao clicar no botão", async () => {
    (useUser as jest.Mock).mockReturnValue({
      user: { publicMetadata: { subscriptionPlan: "free" } },
    });
    (createStripeCheckout as jest.Mock).mockResolvedValue({
      sessionId: "fake-session",
    });
    (loadStripe as jest.Mock).mockResolvedValue({
      redirectToCheckout: jest.fn(),
    });

    render(<AcquirePlanButton />);
    const button = screen.getByText("Adquirir Plano Premium");

    fireEvent.click(button);
    expect(createStripeCheckout).toHaveBeenCalled();
  });
});
