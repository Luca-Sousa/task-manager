import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { TotalTasksPerCategory } from "../../_data-access/get-dashboard/types";
import TasksPerCategory from "../../(dashboard)/dashboard/_components/tasks-per-category";
import { TASK_CATEGORY_LABELS } from "../../_constants/data_tasks";

// Mock dos dados de tarefas por categoria
const mockTasksPerCategory: TotalTasksPerCategory[] = [
  {
    category: "WORK", // Usando o valor correto do tipo TasksCategory
    TotalAmount: 10, // Adicionando a propriedade TotalAmount
    porcentageOfTotalTasks: 50,
  },
  {
    category: "ERRANDS", // Usando o valor correto do tipo TasksCategory
    TotalAmount: 6, // Adicionando a propriedade TotalAmount
    porcentageOfTotalTasks: 30,
  },
  {
    category: "SHOPPING", // Usando o valor correto do tipo TasksCategory
    TotalAmount: 4, // Adicionando a propriedade TotalAmount
    porcentageOfTotalTasks: 20,
  },
];

describe("TasksPerCategory", () => {
  test("deve renderizar o título corretamente", () => {
    render(<TasksPerCategory tasksPerCategory={mockTasksPerCategory} />);

    // Verifica se o título está presente
    expect(
      screen.getByText("Quantidade de Tarefas por Categoria"),
    ).toBeInTheDocument();
  });

  test("deve renderizar as categorias e suas porcentagens corretamente", () => {
    render(<TasksPerCategory tasksPerCategory={mockTasksPerCategory} />);

    // Verifica se todas as categorias e porcentagens estão sendo renderizadas
    mockTasksPerCategory.forEach((category) => {
      const categoryLabel = screen.getByText(
        new RegExp(TASK_CATEGORY_LABELS[category.category], "i"),
      );
      const percentageText = screen.getByText(
        `${category.porcentageOfTotalTasks}%`,
      );

      expect(categoryLabel).toBeInTheDocument();
      expect(percentageText).toBeInTheDocument();
    });
  });

  test("deve renderizar corretamente quando não há tarefas", () => {
    render(<TasksPerCategory tasksPerCategory={[]} />);

    // Verifica se o componente não renderiza categorias quando não há dados
    const progressBars = screen.queryAllByRole("progressbar");
    expect(progressBars.length).toBe(0);
  });
});
