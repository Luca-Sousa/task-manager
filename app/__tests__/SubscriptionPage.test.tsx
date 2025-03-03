import "@testing-library/jest-dom";
import { auth } from "@clerk/nextjs/server";
import SubscriptionPage from "../(dashboard)/subscription/page";
import { redirect } from "next/navigation";

jest.mock("@clerk/nextjs/server", () => ({
  auth: jest.fn(),
  clerkClient: jest.fn(),
}));

jest.mock("../_data-access/get-current-day-tasks", () => ({
  getCurrentDayTasks: jest.fn(),
}));

jest.mock("next/navigation", () => ({
  redirect: jest.fn(),
}));

describe("SubscriptionPage", () => {
  it("deve redirecionar para a página inicial se o usuário não estiver autenticado", async () => {
    (auth as jest.Mock).mockResolvedValue({ userId: null });

    await SubscriptionPage();
    expect(redirect).toHaveBeenCalledWith("/");
  });

  //   it("deve renderizar o componente corretamente quando o usuário está autenticado", async () => {
  //     // Mock da função auth para retornar um userId válido
  //     (auth as jest.Mock).mockResolvedValue({ userId: "123" });

  //     // Mock da função clerkClient para retornar um usuário sem plano premium
  //     (clerkClient as unknown as jest.Mock).mockReturnValue({
  //       users: {
  //         getUser: jest.fn().mockResolvedValue({
  //           publicMetadata: { subscriptionPlan: "free" },
  //         }),
  //       },
  //     });

  //     (getCurrentDayTasks as jest.Mock).mockResolvedValue(3);

  //     render(
  //       <ClerkProvider>
  //         <SidebarProvider>
  //           <SelectedItemProvider>
  //             <SubscriptionPage />
  //           </SelectedItemProvider>
  //         </SidebarProvider>
  //       </ClerkProvider>,
  //     );

  //     // Verificar se o título da página está presente
  //     await waitFor(() => {
  //       expect(
  //         screen.getByText("Escolha o plano certo para você"),
  //       ).toBeInTheDocument();
  //     });

  //     // Verificar se o plano Free está presente
  //     expect(screen.getByText("Free")).toBeInTheDocument();

  //     // Verificar se o número de tarefas diárias está correto
  //     expect(screen.getByText("Até 5 Tarefas Diárias(3/5)")).toBeInTheDocument();

  //     // Verificar se o plano Premium está presente
  //     expect(screen.getByText("Premium")).toBeInTheDocument();
  //   });

  // it('deve mostrar o badge "Ativo" quando o usuário tem um plano premium', async () => {
  //   // Mock da função auth para retornar um userId válido
  //   (auth as jest.Mock).mockResolvedValue({ userId: "123" });

  //   // Mock da função clerkClient para retornar um usuário com plano premium
  //   (clerkClient as unknown as jest.Mock).mockReturnValue({
  //     users: {
  //       getUser: jest.fn().mockResolvedValue({
  //         publicMetadata: { subscriptionPlan: "premium" },
  //       }),
  //     },
  //   });

  //   // Mock da função getCurrentDayTasks para retornar um número de tarefas
  //   (getCurrentDayTasks as jest.Mock).mockResolvedValue(3);

  //   render(
  //     <ClerkProvider>
  //       <SidebarProvider>
  //         <SubscriptionPage />
  //       </SidebarProvider>
  //     </ClerkProvider>,
  //   );

  //   // Verificar se o badge "Ativo" está presente
  //   expect(screen.getByText("Ativo")).toBeInTheDocument();
  // });
});
