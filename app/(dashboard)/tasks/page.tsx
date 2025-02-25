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
import { currentTasksSchedule } from "@/app/_data-access/tasks/current-task-schedule";
import { SidebarRight } from "@/app/_components/nav-edit-task";
import { canUserAddtask } from "@/app/_data-access/can-user-add-task";
import Image from "next/image";
import { Badge } from "@/app/_components/ui/badge";

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
        <header className="sticky top-0 flex h-16 shrink-0 items-center gap-2 bg-background transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
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
            <div className="flex size-full flex-col">
              <div className="flex items-center justify-between">
                <h1 className="text-xl font-bold">Minhas Tarefas</h1>

                <CreateTaskButton userCanAddtasks={userCanAddtasks} />
              </div>

              {tasks.length > 0 ? (
                <DataItemsTasks tasks={tasks} />
              ) : (
                <div className="flex flex-1 flex-col items-center justify-center gap-10">
                  <div className="mr-auto max-w-3xl space-y-5 pl-16">
                    <div className="flex flex-wrap gap-2 lg:gap-4">
                      <Badge className="w-fit rounded-full bg-transparent px-3 ring-2 ring-sky-700 hover:bg-transparent">
                        Gerencie
                      </Badge>
                      <Badge className="w-fit rounded-full bg-transparent px-3 ring-2 ring-violet-700 hover:bg-transparent">
                        Crie
                      </Badge>
                      <Badge className="w-fit rounded-full bg-transparent px-3 ring-2 ring-rose-700 hover:bg-transparent">
                        Organize-se
                      </Badge>
                    </div>

                    <h1 className="text-3xl font-bold sm:text-4xl lg:text-4xl xl:text-5xl 2xl:text-balance">
                      Crie novas <span className="text-primary">Tarefas</span>{" "}
                      hoje mesmo, gerencie sua{" "}
                      <span className="text-primary">Rotina</span>!
                    </h1>
                  </div>

                  <div className="relative aspect-video size-1/2">
                    <Image
                      alt="Imagem informando que não tem tarefas cadastradas"
                      src="/checklist.svg"
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
              )}
            </div>
          </Card>
        </div>
      </SidebarInset>

      <SidebarRight />
    </>
  );
};

export default Tasks;
