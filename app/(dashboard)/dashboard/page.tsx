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

  const dateFilter = new Date(Number(year), Number(month) - 1, Number(day));
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
        <Card className="flex min-h-[100vh] flex-1 flex-col space-y-8 p-4 md:min-h-min">
          <div className="flex items-center justify-between">
            <h1 className="mt-1 text-xl font-bold">Dashboard</h1>

            <TimeSelect path="dashboard" />
          </div>

          <div className="flex min-h-[100vh] flex-1 flex-col gap-3 md:min-h-min 2xl:grid 2xl:grid-cols-[2fr,1fr]">
            <div className="flex min-h-[100vh] flex-1 flex-col space-y-3 md:min-h-min">
              <SummaryCards {...userCanAddTask} />

              <div className="grid min-h-min flex-1 grid-cols-1 gap-3 rounded-xl lg:grid-cols-2">
                <TasksPieChart {...userCanAddTask} dateFilter={dateFilter} />

                <Card className="min-h-[100vh] bg-muted/20 hover:bg-muted/30 lg:col-span-1 lg:min-h-min">
                  <TasksPerCategory
                    tasksPerCategory={userCanAddTask.TotalTasksPerCategory}
                  />
                </Card>
              </div>
            </div>

            <Card className="flex min-h-[100vh] w-full flex-col bg-muted/20 hover:bg-muted/30 2xl:min-h-min">
              <LastTasks lastTasks={userCanAddTask.lastTasks} />
            </Card>
          </div>
        </Card>
      </div>
    </SidebarInset>
  );
};

export default Dashboard;
