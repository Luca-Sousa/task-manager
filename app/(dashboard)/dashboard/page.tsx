import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Separator } from "../../_components/ui/separator";
import { SidebarInset, SidebarTrigger } from "../../_components/ui/sidebar";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbSeparator,
  BreadcrumbLink,
  BreadcrumbPage,
} from "@/app/_components/ui/breadcrumb";
import { Card } from "@/app/_components/ui/card";
import { TASK_STATUS_OPTIONS } from "@/app/_constants/data_tasks";
import { isMatch } from "date-fns";
import { getDashboard } from "@/app/_data-access/get-dashboard";
import TimeSelect from "@/app/_components/time-select";
import CreateTaskButton from "../tasks/_components/upsert-button-task";
import { LoaderIcon } from "lucide-react";

interface DashboardProps {
  searchParams: {
    year: string;
    month: string;
    day: string;
  };
}

const Dashboard = async ({
  searchParams: { year, month, day },
}: DashboardProps) => {
  const { userId } = await auth();
  if (!userId) return redirect("/");

  const dateIsInvalid =
    !year ||
    !month ||
    !day ||
    !isMatch(`${year}-${month}-${day}`, "yyyy-MM-dd");

  if (dateIsInvalid) {
    redirect(
      `?year=${String(new Date().getFullYear())}&month=${new Date().getMonth() + 1}&day=${new Date().getDate()}`,
    );
  }

  const userCanAddTask = await getDashboard({ year, month, day });

  return (
    <SidebarInset>
      <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
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
                <BreadcrumbPage>Dashboard</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>

      <div className="flex flex-1 flex-col p-4 pt-0">
        <Card className="gap flex min-h-[100vh] flex-1 flex-col space-y-8 p-4 md:min-h-min">
          <div className="flex items-center justify-between">
            <h1 className="mt-1 text-xl font-bold">Dashboard</h1>

            <TimeSelect path="dashboard" />
          </div>

          <div className="space-y-3">
            <div className="grid flex-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <Card className="flex justify-between rounded-xl bg-muted/35 p-4 hover:bg-muted/50">
                <div className="flex flex-col gap-3">
                  <div className="flex flex-col gap-1.5">
                    <LoaderIcon />
                    <span className="text-xl font-bold text-primary">
                      Total de Tarefas
                    </span>
                  </div>

                  <div className="flex gap-1.5 text-sm text-muted-foreground">
                    <span>
                      {userCanAddTask.tasksTotal > 0 &&
                        userCanAddTask.tasksTotal}
                    </span>

                    <span>
                      {userCanAddTask.tasksTotal > 1
                        ? "Tarefas"
                        : userCanAddTask.tasksTotal === 0
                          ? "Nenhuma Tarefa"
                          : "Tarefa"}
                    </span>
                  </div>
                </div>

                <div className="flex items-end">
                  <CreateTaskButton />
                </div>
              </Card>

              {TASK_STATUS_OPTIONS.map((status) => (
                <Card
                  className={`${
                    status.value === "IN_PROGRESS" && "hidden"
                  } rounded-xl bg-muted/35 p-4 hover:bg-muted/50`}
                  key={status.label}
                >
                  <div className="flex flex-col gap-3">
                    <div className="flex flex-col gap-1.5">
                      <LoaderIcon />
                      <span className="text-xl font-bold text-primary">
                        {status.label}
                      </span>
                    </div>

                    <div className="flex gap-1.5 text-sm text-muted-foreground">
                      <span>
                        {status.value === "NOT_STARTED" &&
                          userCanAddTask.notStartedTotal > 0 &&
                          userCanAddTask.notStartedTotal}
                        {status.value === "COMPLETED" &&
                          userCanAddTask.completedTotal > 0 &&
                          userCanAddTask.completedTotal}
                        {status.value === "UNREALIZED" &&
                          userCanAddTask.unrealizedTotal > 0 &&
                          userCanAddTask.unrealizedTotal}
                      </span>

                      <span>
                        {status.value === "NOT_STARTED" &&
                          (userCanAddTask.notStartedTotal > 1
                            ? "Tarefas"
                            : userCanAddTask.notStartedTotal === 0
                              ? "Nenhuma Tarefa"
                              : "Tarefa")}
                        {status.value === "COMPLETED" &&
                          (userCanAddTask.completedTotal > 1
                            ? "Tarefas"
                            : userCanAddTask.completedTotal === 0
                              ? "Nenhuma Tarefa"
                              : "Tarefa")}
                        {status.value === "UNREALIZED" &&
                          (userCanAddTask.unrealizedTotal > 1
                            ? "Tarefas"
                            : userCanAddTask.unrealizedTotal === 0
                              ? "Nenhuma Tarefa"
                              : "Tarefa")}
                      </span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/35 hover:bg-muted/50 md:min-h-min" />
        </Card>
      </div>
    </SidebarInset>
  );
};

export default Dashboard;
