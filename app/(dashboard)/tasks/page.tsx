import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/app/_components/ui/breadcrumb";
import { Card } from "@/app/_components/ui/card";
import { Separator } from "@/app/_components/ui/separator";
import { SidebarInset, SidebarTrigger } from "@/app/_components/ui/sidebar";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import DataItemsTasks from "./_components/data-items";
import CreateTaskButton from "./_components/upsert-button-task";
import { isMatch } from "date-fns";
import { tasksCurrentTimeUser } from "@/app/data-access/tasks-current-time-user";

interface TasksProps {
  searchParams: {
    year: string;
    month: string;
    day: string;
  };
}

const Tasks = async ({ searchParams: { year, month, day } }: TasksProps) => {
  const { userId } = await auth();
  if (!userId) return redirect("/");

  const dateIsInvalid =
    !year ||
    !month ||
    !day ||
    !isMatch(`${year}-${month}-${day}`, "yyyy-MM-dd");

  if (dateIsInvalid) {
    redirect(
      `/tasks/?year=${String(new Date().getFullYear()).padStart(2, "0")}&month=${new Date().getMonth() + 1}&day=${new Date().getDate()}`,
    );
  }

  const tasks = await tasksCurrentTimeUser({ year, month, day });

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
                <BreadcrumbPage>Tarefas</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>

      <div className="flex flex-1 p-4 pt-0">
        <Card className="min-h-[100vh] flex-1 space-y-8 p-4 md:min-h-min">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold">Minhas Tarefas</h1>

            <CreateTaskButton />
          </div>

          <DataItemsTasks tasks={tasks} />
        </Card>
      </div>
    </SidebarInset>
  );
};

export default Tasks;
