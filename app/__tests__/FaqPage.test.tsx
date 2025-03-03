import { render, screen, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import Faq from "../(dashboard)/faq/page";
import { SidebarProvider } from "../_components/ui/sidebar";

jest.mock("@clerk/nextjs/server", () => ({
  auth: jest.fn(),
}));

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
  redirect: jest.fn(),
}));

describe("Faq Page", () => {
  beforeAll(() => {
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });
  });

  it("deve redirecionar para a página inicial se o usuário não estiver autenticado", async () => {
    (auth as jest.Mock).mockResolvedValue({ userId: null });

    await act(async () => {
      render(await Faq());
    });

    expect(redirect).toHaveBeenCalledWith("/");
  });

  it("renderiza corretamente a página de FAQ se o usuário estiver autenticado", async () => {
    (auth as jest.Mock).mockResolvedValue({ userId: "123" });

    await act(async () => {
      render(<SidebarProvider>{await Faq()}</SidebarProvider>);
    });

    expect(await screen.findByText("Perguntas Frequentes")).toBeInTheDocument();
    expect(await screen.findByText("FAQ's")).toBeInTheDocument();
  });
});
