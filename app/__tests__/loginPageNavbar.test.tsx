import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Navbar from "@/app/(login)/_components/navbar";
import { auth } from "@clerk/nextjs/server";
import userEvent from "@testing-library/user-event";

// Mock da função auth do Clerk
jest.mock("@clerk/nextjs/server", () => ({
  auth: jest.fn(),
}));

// Mock dos componentes do Clerk (evita erros de renderização)
jest.mock("@clerk/nextjs", () => ({
  SignInButton: ({ children }: { children: React.ReactNode }) => (
    <>{children}</>
  ),
  SignUpButton: ({ children }: { children: React.ReactNode }) => (
    <>{children}</>
  ),
}));

describe("Navbar", () => {
  it("deve renderizar o logo e o título corretamente", async () => {
    (auth as jest.Mock).mockResolvedValue({ userId: null });

    render(await Navbar());

    expect(screen.getByTitle("Task Manager")).toBeInTheDocument();
    expect(screen.getByText("Task Manager")).toBeInTheDocument();
  });

  it("deve exibir botões de login e cadastro quando o usuário não estiver autenticado", async () => {
    (auth as jest.Mock).mockResolvedValue({ userId: null });

    render(await Navbar());

    expect(screen.getByText("Fazer login")).toBeInTheDocument();
    expect(screen.getByText("Criar Conta")).toBeInTheDocument();
  });

  it("deve exibir o botão de acessar dashboard quando o usuário estiver autenticado", async () => {
    (auth as jest.Mock).mockResolvedValue({ userId: "12345" });

    render(await Navbar());

    expect(screen.getByText("Acessar Dashboard")).toBeInTheDocument();
  });

  it("deve abrir o menu lateral ao clicar no botão de menu", async () => {
    (auth as jest.Mock).mockResolvedValue({ userId: null });

    render(await Navbar());

    const menuButton = screen.getByTitle("Menu");
    await userEvent.click(menuButton);

    expect(
      screen.getByText(
        "O organizador de tarefas mais simples para facilitar o seu dia a dia.",
      ),
    ).toBeInTheDocument();
  });
});
