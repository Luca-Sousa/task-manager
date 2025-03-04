import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import LoginPage from "../../(login)/page";

describe("LoginPage", () => {
  it("deve renderizar a imagem do banner corretamente", () => {
    render(<LoginPage />);

    const bannerImage = screen.getByTestId("banner-homepage");
    expect(bannerImage).toBeInTheDocument();
    expect(bannerImage).toHaveAttribute("src", "/banner-homepage.svg");
    expect(bannerImage).toHaveAttribute("alt", "Banner da Homepage");
  });

  it("deve renderizar os badges corretamente", () => {
    render(<LoginPage />);

    const gerenciamentoBadge = screen.getByText("Gerenciamento");
    const organizacaoBadge = screen.getByText("Organização");
    const gestaoBadge = screen.getByText("Gestão");

    expect(gerenciamentoBadge).toBeInTheDocument();
    expect(organizacaoBadge).toBeInTheDocument();
    expect(gestaoBadge).toBeInTheDocument();
  });

  it("deve exibir o título principal corretamente", () => {
    render(<LoginPage />);

    const title = screen.getByRole("heading", { level: 1 });

    expect(title).toHaveTextContent(
      /O lugar onde sua produtividade encontra organização/i,
    );
  });
});
