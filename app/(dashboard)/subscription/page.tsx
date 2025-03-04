import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/app/_components/ui/breadcrumb";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";
import { Separator } from "@/app/_components/ui/separator";
import { SidebarInset, SidebarTrigger } from "@/app/_components/ui/sidebar";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { CheckIcon, CrownIcon } from "lucide-react";
import { redirect } from "next/navigation";
import AcquirePlanButton from "./_components/acquire-plan-button";
import { Badge } from "@/app/_components/ui/badge";
import { getCurrentDayTasks } from "@/app/_data-access/get-current-day-tasks";

const SubscriptionPage = async () => {
  const { userId } = await auth();
  if (!userId) return redirect("/");

  const user = await clerkClient().users.getUser(userId);
  const hasPremiumPlan = user.publicMetadata.subscriptionPlan === "premium";

  const currentDayTasks = await getCurrentDayTasks();

  return (
    <SidebarInset>
      <header className="sticky top-0 z-50 flex h-16 shrink-0 items-center gap-2 bg-background transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="/">Task Manager</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Assinatura</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>

      <div className="flex min-h-[100vh] flex-1 flex-col p-4 lg:min-h-min">
        <Card className="flex h-full flex-col justify-between">
          <CardHeader className="mx-auto max-w-4xl text-center">
            <CardTitle className="text-balance text-2xl font-semibold tracking-tight sm:text-3xl">
              Escolha o plano certo para você
            </CardTitle>
            <CardDescription className="mx-auto max-w-2xl text-pretty text-center text-lg font-medium sm:text-xl lg:max-w-4xl xl:max-w-6xl">
              Otimize sua produtividade com o plano perfeito para suas
              necessidades! Nosso plano premium oferece recursos que vão desde a
              organização básica de tarefas até ferramentas avançadas para sua
              rotina de tarefas.
            </CardDescription>
          </CardHeader>

          <CardContent className="mx-auto grid max-w-lg flex-1 grid-cols-1 items-center gap-y-6 sm:gap-y-0 lg:max-w-4xl lg:grid-cols-2">
            <div className="relative rounded-3xl bg-accent-foreground/90 p-8 sm:mx-8 sm:rounded-b-none sm:p-10 lg:mx-0 lg:rounded-bl-3xl lg:rounded-tr-none">
              <h1 className="text-base/7 font-bold text-primary">Free</h1>

              <p className="mt-4 flex items-baseline gap-x-2">
                <span className="text-3xl font-semibold tracking-tight text-gray-900">
                  R$ 0
                </span>
                <span className="text-base/7 text-gray-500">/mês</span>
              </p>

              <p className="mt-6 text-base/7 text-gray-500">
                Gerencie suas tarefas de forma simples e eficiente, sem custo!
                Este plano oferece o essencial para você se manter produtivo.
              </p>

              <ul
                role="list"
                className="mt-8 space-y-3 text-sm/6 text-gray-600 sm:mt-10"
              >
                <li className="flex gap-x-3">
                  <CheckIcon className="stroke-primary" />
                  Até 5 Tarefas Diárias({currentDayTasks}/5)
                </li>
                <li className="flex gap-x-3">
                  <CheckIcon className="stroke-primary" />
                  Up to 10,000 subscribers
                </li>
                <li className="flex gap-x-3">
                  <CheckIcon className="stroke-primary" />
                  Advanced analytics
                </li>
                <li className="flex gap-x-3">
                  <CheckIcon className="stroke-primary" />
                  24-hour support response time
                </li>
              </ul>
            </div>

            <div className="relative rounded-3xl border border-muted-foreground/40 bg-muted-foreground/10 p-8 shadow-2xl sm:p-10">
              {hasPremiumPlan && (
                <Badge className="absolute right-6 top-6 space-x-1.5">
                  <CrownIcon size={14} />
                  <span>Ativo</span>
                </Badge>
              )}
              <h1 className="text-xl font-bold text-primary">Premium</h1>

              <p className="mt-4 flex items-baseline gap-x-2">
                <span className="text-4xl font-semibold tracking-tight text-white lg:text-5xl">
                  R$ 24,99
                </span>
                <span className="text-base text-gray-400">/mês</span>
              </p>

              <p className="mt-6 text-base/7 text-gray-300">
                Desbloqueie recursos avançados para otimizar sua gestão de
                tarefas diárias. Com o plano Premium, você tem mais controle,
                automação e suporte prioritário.
              </p>

              <ul
                role="list"
                className="mt-8 space-y-3 text-sm/6 text-gray-300 sm:mt-10"
              >
                <li className="flex gap-x-3">
                  <CheckIcon className="stroke-primary" />
                  Tarefas Ilimitadas
                </li>
                <li className="flex gap-x-3">
                  <CheckIcon className="stroke-primary" />
                  Unlimited subscribers
                </li>
                <li className="flex gap-x-3">
                  <CheckIcon className="stroke-primary" />
                  Advanced analytics
                </li>
                <li className="flex gap-x-3">
                  <CheckIcon className="stroke-primary" />
                  Marketing automations
                </li>
                <li className="flex gap-x-3">
                  <CheckIcon className="stroke-primary" />
                  Custom integrations
                </li>
              </ul>

              <AcquirePlanButton />
            </div>
          </CardContent>
        </Card>
      </div>
    </SidebarInset>
  );
};

export default SubscriptionPage;
