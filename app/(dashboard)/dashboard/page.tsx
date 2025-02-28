import { auth, clerkClient } from "@clerk/nextjs/server";
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
import { isMatch } from "date-fns";
import { getDashboard } from "@/app/_data-access/get-dashboard";
import TimeSelect from "@/app/_components/time-select";
import SummaryCards from "../components/summary-cards";
import TasksPieChart from "../components/tasks-pie-chart";
import TasksPerCategory from "../components/tasks-per-category";
import LastTasks from "../components/last-tasks";

interface DashboardProps {
  searchParams: {
    year: string;
    month: string;
    day?: string;
    week?: string;
  };
}

const Dashboard = async ({
  searchParams: { year, month, day },
}: DashboardProps) => {
  const { userId } = await auth();
  if (!userId) return redirect("/");

  const user = await clerkClient().users.getUser(userId);
  const hasPremiumPlan = user.publicMetadata.subscriptionPlan === "premium";

  const now = new Date();

  let dateFilter = new Date();

  if (hasPremiumPlan) {
    const dateIsInvalid =
      !year ||
      (month && !isMatch(`${year}-${month}`, "yyyy-MM")) ||
      (day && !isMatch(`${year}-${month}-${day}`, "yyyy-MM-dd"));

    if (dateIsInvalid) {
      const queryParams = day
        ? `?year=${now.getFullYear()}&month=${now.getMonth() + 1}&day=${now.getDate()}`
        : month
          ? `?year=${now.getFullYear()}&month=${now.getMonth() + 1}`
          : `?year=${now.getFullYear()}`; // Redireciona para o ano atual, se apenas o ano for passado

      return redirect(queryParams);
    }

    dateFilter = day
      ? new Date(Number(year), Number(month) - 1, Number(day))
      : month
        ? new Date(Number(year), Number(month) - 1, 1)
        : new Date(Number(year), 0, 1); // Início do ano, se apenas o ano for passado
  } else {
    const dateIsInvalid =
      !year ||
      !month ||
      !day ||
      !isMatch(`${year}-${month}-${day}`, "yyyy-MM-dd");

    if (dateIsInvalid) {
      return redirect(
        `?year=${String(now.getFullYear())}&month=${now.getMonth() + 1}&day=${now.getDate()}`,
      );
    }

    dateFilter = new Date(Number(year), Number(month) - 1, Number(day));
  }

  const userCanAddTask = await getDashboard({ year, month, day });

  return (
    <SidebarInset className="2xl:h-screen">
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
                <BreadcrumbPage>Dashboard</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>

      <div className="flex h-full flex-col gap-6 overflow-hidden p-4 pt-0">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold">Dashboard</h1>
          <TimeSelect path="dashboard" />
        </div>

        <div className="grid h-full gap-3 overflow-hidden 2xl:grid-cols-[2fr,1fr]">
          <div className="flex flex-col gap-3 overflow-hidden">
            <SummaryCards {...userCanAddTask} />

            <div className="grid h-full grid-rows-1 gap-3 overflow-hidden lg:grid-cols-2 2xl:grid-cols-3">
              <TasksPieChart {...userCanAddTask} dateFilter={dateFilter} />

              <TasksPerCategory
                tasksPerCategory={userCanAddTask.TotalTasksPerCategory}
              />
            </div>
          </div>

          <LastTasks lastTasks={userCanAddTask.lastTasks} />
        </div>
      </div>
    </SidebarInset>
  );
};

export default Dashboard;
