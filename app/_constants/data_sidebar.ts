import {
  CircleHelpIcon,
  Frame,
  LayoutDashboardIcon,
  Map,
  PieChart,
  SignatureIcon,
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
      icon: CircleHelpIcon,
    },
    {
      title: "Assinatura",
      url: "/subscription",
      icon: SignatureIcon,

    },
    {
      title: "FAQs",
      url: "/faq",
      icon: CircleHelpIcon,
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
