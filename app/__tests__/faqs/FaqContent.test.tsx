import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { faqs_category } from "@/app/_constants/data-faqs";
import FAQContent from "../../(dashboard)/faq/_components/faq-content";

describe("FAQContent", () => {
  it("deve renderizar os botões de categoria corretamente", () => {
    render(<FAQContent />);

    faqs_category.forEach((category) => {
      expect(screen.getByText(category.Category)).toBeInTheDocument();
    });
  });

  it("deve alterar a categoria ativa ao clicar em um botão", () => {
    render(<FAQContent />);

    const button = screen.getByText("Conta e Login");
    fireEvent.click(button);

    expect(button).toHaveClass("bg-primary");
  });

  it("deve exibir as perguntas corretas ao selecionar uma categoria", () => {
    render(<FAQContent />);

    fireEvent.click(screen.getByText("Conta e Login"));

    const question = screen.getByText("Como posso criar uma conta?");
    expect(question).toBeInTheDocument();
  });

  it("deve renderizar os botões de categoria corretamente", () => {
    render(<FAQContent />);
    faqs_category.forEach(({ Category }) => {
      expect(screen.getByText(Category)).toBeInTheDocument();
    });
  });

  it("deve mudar a categoria ativa ao clicar em um botão", () => {
    render(<FAQContent />);
    const button = screen.getByText("Conta e Login");
    fireEvent.click(button);
    expect(button).toHaveClass("bg-primary");
  });

  it("deve exibir as perguntas da categoria ativa", () => {
    render(<FAQContent />);
    fireEvent.click(screen.getByText("Conta e Login"));
    expect(screen.getByText("Como posso criar uma conta?")).toBeInTheDocument();
  });
});
