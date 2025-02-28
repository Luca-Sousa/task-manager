import { TasksCategory, TasksStatus } from "@prisma/client";

export const TASK_CATEGORY_LABELS = {
  WORK: "Trabalho",
  STUDY: "Educação",
  HOME: "Casa",
  HEALTH_AND_WELLNESS: "Saúde e Bem-Estar",
  FINANCIAL: "Finanças",
  LEISURE: "Lazer",
  RELATIONSHIPS: "Relacionamentos",
  VOLUNTEERING: "Voluntariado",
  TRAVEL: "Viagens e Transporte",
  PERSONAL_DEVELOPMENT: "Desenvolvimento Pessoal",
  TECHNOLOGY: "Tecnologia",
  SHOPPING: "Compras",
  ERRANDS: "Compromissos",
  OTHER: "Outros",
};

export const TASK_STATUS_LABELS = {
  NOT_STARTED: "Não Iniciado",
  IN_PROGRESS: "Em Andamento",
  COMPLETED: "Concluído",
  UNREALIZED: "Não Realizado",
};

export const TASK_STATUS_OPTIONS = [
  {
    value: TasksStatus.NOT_STARTED,
    label: TASK_STATUS_LABELS[TasksStatus.NOT_STARTED],
  },
  {
    value: TasksStatus.IN_PROGRESS,
    label: TASK_STATUS_LABELS[TasksStatus.IN_PROGRESS],
  },
  {
    value: TasksStatus.COMPLETED,
    label: TASK_STATUS_LABELS[TasksStatus.COMPLETED],
  },
  {
    value: TasksStatus.UNREALIZED,
    label: TASK_STATUS_LABELS[TasksStatus.UNREALIZED],
  },
];

export const TASK_CATEGORY_OPTIONS = [
  {
    value: TasksCategory.WORK,
    label: TASK_CATEGORY_LABELS[TasksCategory.WORK],
  },
  {
    value: TasksCategory.STUDY,
    label: TASK_CATEGORY_LABELS.STUDY,
  },
  {
    value: TasksCategory.HOME,
    label: TASK_CATEGORY_LABELS[TasksCategory.HOME],
  },
  {
    value: TasksCategory.HEALTH_AND_WELLNESS,
    label: TASK_CATEGORY_LABELS[TasksCategory.HEALTH_AND_WELLNESS],
  },
  {
    value: TasksCategory.FINANCIAL,
    label: TASK_CATEGORY_LABELS[TasksCategory.FINANCIAL],
  },
  {
    value: TasksCategory.LEISURE,
    label: TASK_CATEGORY_LABELS[TasksCategory.LEISURE],
  },
  {
    value: TasksCategory.RELATIONSHIPS,
    label: TASK_CATEGORY_LABELS[TasksCategory.RELATIONSHIPS],
  },
  {
    value: TasksCategory.VOLUNTEERING,
    label: TASK_CATEGORY_LABELS[TasksCategory.VOLUNTEERING],
  },
  {
    value: TasksCategory.TRAVEL,
    label: TASK_CATEGORY_LABELS[TasksCategory.TRAVEL],
  },
  {
    value: TasksCategory.PERSONAL_DEVELOPMENT,
    label: TASK_CATEGORY_LABELS[TasksCategory.PERSONAL_DEVELOPMENT],
  },
  {
    value: TasksCategory.TECHNOLOGY,
    label: TASK_CATEGORY_LABELS[TasksCategory.TECHNOLOGY],
  },
  {
    value: TasksCategory.SHOPPING,
    label: TASK_CATEGORY_LABELS[TasksCategory.SHOPPING],
  },
  {
    value: TasksCategory.ERRANDS,
    label: TASK_CATEGORY_LABELS[TasksCategory.ERRANDS],
  },
  {
    value: TasksCategory.OTHER,
    label: TASK_CATEGORY_LABELS[TasksCategory.OTHER],
  },
];

export const TASK_CATEGORY_ICONS = {
  [TasksCategory.WORK]: "work.svg",
  [TasksCategory.STUDY]: "study.svg",
  [TasksCategory.HOME]: "home.svg",
  [TasksCategory.HEALTH_AND_WELLNESS]: "health-and-wellness.svg",
  [TasksCategory.FINANCIAL]: "financial.svg",
  [TasksCategory.LEISURE]: "leisure.svg",
  [TasksCategory.RELATIONSHIPS]: "relationships.svg",
  [TasksCategory.VOLUNTEERING]: "volunteering.svg",
  [TasksCategory.TRAVEL]: "travel.svg",
  [TasksCategory.PERSONAL_DEVELOPMENT]: "personal-development.svg",
  [TasksCategory.TECHNOLOGY]: "technology.svg",
  [TasksCategory.SHOPPING]: "shopping.svg",
  [TasksCategory.ERRANDS]: "errands.svg",
  [TasksCategory.OTHER]: "other.svg",
};
