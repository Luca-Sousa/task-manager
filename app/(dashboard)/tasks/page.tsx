import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/app/_components/ui/breadcrumb";
import { Button } from "@/app/_components/ui/button";
import { Card } from "@/app/_components/ui/card";
import { Separator } from "@/app/_components/ui/separator";
import { SidebarInset, SidebarTrigger } from "@/app/_components/ui/sidebar";
import { db } from "@/app/_lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { PlusIcon } from "lucide-react";
import { redirect } from "next/navigation";
import DataItemsTasks from "./_components/data-items";

const Tasks = async () => {
  const { userId } = await auth();
  if (!userId) return redirect("/");

  const tasks = await db.tasks.findMany({
    orderBy: { startTime: "asc" },
  });

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
            <Button size="icon" className="rounded-full sm:hidden">
              <PlusIcon />
            </Button>

            <Button className="hidden rounded-full font-bold sm:flex">
              Nova Tarefa
              <PlusIcon />
            </Button>
          </div>

          <DataItemsTasks tasks={tasks} />

          {/* <DataTable columns={tasksColumns} data={tasks} /> */}
        </Card>
      </div>
    </SidebarInset>
  );
};

export default Tasks;
