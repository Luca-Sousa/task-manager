import {
  ChartGanttIcon,
  Frame,
  LayoutDashboardIcon,
  ListTodoIcon,
  Map,
  PieChart,
  TableOfContentsIcon,
} from "lucide-react";

export const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboardIcon,
      isActive: true,
    },
    {
      title: "Tarefas",
      url: "/tasks",
      icon: ListTodoIcon,
    },
    {
      title: "Assinatura",
      url: "/subscription",
      icon: ChartGanttIcon,
    },
    {
      title: "FAQs",
      url: "/faq",
      icon: TableOfContentsIcon,
    },
  ],

  tasks: [
    {
      name: "Tarefa 01",
      url: "/tasks",
      icon: Frame,
    },
    {
      name: "Tarefa 02",
      url: "/tasks",
      icon: PieChart,
    },
    {
      name: "Tarefa 03",
      url: "/tasks",
      icon: Map,
    },
  ],
};
