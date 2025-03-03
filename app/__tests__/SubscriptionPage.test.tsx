import "@testing-library/jest-dom";
import { auth, clerkClient } from "@clerk/nextjs/server";
import SubscriptionPage from "../(dashboard)/subscription/page";
import { redirect } from "next/navigation";
import { act, render, screen } from "@testing-library/react";
import { getCurrentDayTasks } from "../_data-access/get-current-day-tasks";
import { SidebarProvider } from "../_components/ui/sidebar";
import { ClerkProvider } from "@clerk/nextjs";

jest.mock("@clerk/nextjs/server", () => ({
  auth: jest.fn(),
  clerkClient: jest.fn(),
}));

jest.mock("../_data-access/get-current-day-tasks", () => ({
  getCurrentDayTasks: jest.fn(),
}));

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
  })),
  redirect: jest.fn(),
  usePathname: jest.fn(() => "/subscription"),
  useSearchParams: jest.fn(() => new URLSearchParams()),
}));

describe("SubscriptionPage", () => {
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
      render(await SubscriptionPage());
    });

    expect(redirect).toHaveBeenCalledWith("/");
  });

  it("deve renderizar o componente corretamente quando o usuário está autenticado", async () => {
    (auth as jest.Mock).mockResolvedValue({ userId: "123" });

    (clerkClient as unknown as jest.Mock).mockReturnValue({
      users: {
        getUser: jest.fn().mockResolvedValue({
          publicMetadata: { subscriptionPlan: "free" },
        }),
      },
    });

    (getCurrentDayTasks as jest.Mock).mockResolvedValue(3);

    await act(async () => {
      render(
        <ClerkProvider>
          <SidebarProvider>{await SubscriptionPage()}</SidebarProvider>
        </ClerkProvider>,
      );
    });

    expect(
      screen.getByText("Escolha o plano certo para você"),
    ).toBeInTheDocument();
    expect(screen.getByText("Free")).toBeInTheDocument();
    expect(screen.getByText("Até 5 Tarefas Diárias(3/5)")).toBeInTheDocument();
    expect(screen.getByText("Premium")).toBeInTheDocument();
  });

  it('deve mostrar o badge "Ativo" quando o usuário tem um plano premium', async () => {
    (auth as jest.Mock).mockResolvedValue({ userId: "123" });

    (clerkClient as unknown as jest.Mock).mockReturnValue({
      users: {
        getUser: jest.fn().mockResolvedValue({
          publicMetadata: { subscriptionPlan: "premium" },
        }),
      },
    });

    (getCurrentDayTasks as jest.Mock).mockResolvedValue(3);

    await act(async () => {
      render(
        <ClerkProvider>
          <SidebarProvider>{await SubscriptionPage()}</SidebarProvider>
        </ClerkProvider>,
      );
    });

    expect(screen.getByText("Ativo")).toBeInTheDocument();
  });
});
