import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { useRouter, useSearchParams } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import TimeSelect from "@/app/_components/time-select";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
  useSearchParams: jest.fn(),
}));

jest.mock("@clerk/nextjs", () => ({
  useUser: jest.fn(),
}));

describe("TimeSelect", () => {
  const pushMock = jest.fn();
  const mockUser = { publicMetadata: { subscriptionPlan: "premium" } };

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: pushMock });
    (useUser as jest.Mock).mockReturnValue({ user: mockUser });
    (useSearchParams as jest.Mock).mockReturnValue({
      get: jest
        .fn()
        .mockReturnValueOnce("2025") // mock de 'year'
        .mockReturnValueOnce("3") // mock de 'month'
        .mockReturnValueOnce("5"), // mock de 'day'
    });
  });

  test("deve renderizar corretamente", async () => {
    render(<TimeSelect path="/test" isOpenSelectFiltersPremium />);

    const button = screen.getByRole("button");
    fireEvent.click(button); // Abre o popover

    await waitFor(() => {
      expect(screen.getByText("Filtrar por Dia")).toBeInTheDocument(); // Verifica se o texto está presente
    });
  });

  test("deve abrir o popover ao clicar no botão", async () => {
    render(<TimeSelect path="/test" isOpenSelectFiltersPremium />);

    const button = screen.getByRole("button");
    fireEvent.click(button); // Abre o popover

    await waitFor(() => {
      expect(screen.getByText("Filtrar por Dia")).toBeInTheDocument(); // Verifica se o texto está presente
    });
  });

  test("deve formatar corretamente a data com base nos parâmetros da URL", () => {
    render(<TimeSelect path="/test" isOpenSelectFiltersPremium />);

    const button = screen.getByRole("button");
    expect(button).toHaveTextContent("5 de março de 2025"); // Verifica o texto do botão
  });
});
