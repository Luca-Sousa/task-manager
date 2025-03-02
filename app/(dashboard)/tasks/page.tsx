import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/app/_components/ui/breadcrumb";
import { Separator } from "@/app/_components/ui/separator";
import { SidebarInset, SidebarTrigger } from "@/app/_components/ui/sidebar";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import CreateTaskButton from "./_components/create-button-task";
import { isMatch } from "date-fns";
import { currentTasksSchedule } from "@/app/_data-access/tasks/current-task-schedule";
import { canUserAddtask } from "@/app/_data-access/can-user-add-task";
import TasksPageDataView from "./_components/tasks-page-data-view";

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
      `/tasks/?year=${String(new Date().getFullYear())}&month=${new Date().getMonth() + 1}&day=${new Date().getDate()}`,
    );
  }

  const tasks = await currentTasksSchedule({ year, month, day });

  const userCanAddtasks = await canUserAddtask();

  return (
    <>
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
                  <BreadcrumbPage>Tarefas</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>

        <div className="flex flex-1 p-4 pt-0">
          <div className="flex w-full flex-col">
            <div className="flex items-center justify-between">
              <h1 className="text-xl font-bold">Minhas Tarefas</h1>

              <CreateTaskButton userCanAddtasks={userCanAddtasks} />
            </div>

            <Separator className="my-4" />
            <TasksPageDataView tasks={tasks} />
          </div>
        </div>
      </SidebarInset>
    </>
  );
};

export default Tasks;
