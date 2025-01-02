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
      items: [
        {
          title: "Informações Gerais",
          url: "dashboard",
        },
        {
          title: "Starred",
          url: "dashboard",
        },
        {
          title: "Settings",
          url: "dashboard",
        },
      ],
    },
    {
      title: "Assinatura",
      url: "/subscription",
      icon: SignatureIcon,
      items: [
        {
          title: "Ver Planos",
          url: "/subscription",
        },
        {
          title: "Adquirir Premium",
          url: "/subscription",
        },
      ],
    },
    {
      title: "FAQs",
      url: "/faq",
      icon: CircleHelpIcon,
      items: [
        {
          title: "Introduction",
          url: "/faq",
        },
        {
          title: "Get Started",
          url: "/faq",
        },
      ],
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
