import { auth, clerkClient } from "@clerk/nextjs/server";
import "@testing-library/jest-dom";
import { redirect } from "next/navigation";
import Dashboard from "../../(dashboard)/dashboard/page";
import { getDashboard } from "../../_data-access/get-dashboard";

jest.mock("@clerk/nextjs/server", () => ({
  auth: jest.fn(),
  clerkClient: jest.fn(),
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

jest.mock("../../_data-access/get-dashboard", () => ({
  getDashboard: jest.fn(),
}));

describe("Dashboard Component", () => {
  const mockDashboardData = {
    notStartedTotal: 4,
    inProgressTotal: 1,
    completedTotal: 10,
    unrealizedTotal: 5,
    tasksTotal: 20,
    percentageOfTasksCompleted: 50,
    TotalTasksPerCategory: [],
    lastTasks: [],
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

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

    await Dashboard({ searchParams: { year: "2024", month: "03" } });

    expect(redirect).toHaveBeenCalledWith("/");
  });

  it("deve buscar os dados do usuário e verificar o plano de assinatura", async () => {
    (auth as jest.Mock).mockResolvedValue({ userId: "123" });

    (clerkClient as unknown as jest.Mock).mockReturnValue({
      users: {
        getUser: jest.fn().mockResolvedValue({
          publicMetadata: { subscriptionPlan: "free" },
        }),
      },
    });

    await (getDashboard as jest.Mock).mockResolvedValue(mockDashboardData);

    await Dashboard({ searchParams: { year: "2024", month: "03" } });
    expect(clerkClient().users.getUser).toHaveBeenCalledWith("123");
  });

  it("deve redirecionar se a data for inválida para usuários premium", async () => {
    (auth as jest.Mock).mockResolvedValue({ userId: "123" });

    (clerkClient as unknown as jest.Mock).mockReturnValue({
      users: {
        getUser: jest.fn().mockResolvedValue({
          publicMetadata: { subscriptionPlan: "premium" },
        }),
      },
    });

    await Dashboard({ searchParams: { year: "2024", month: "13" } });
    expect(redirect).toHaveBeenCalled();
  });
});
