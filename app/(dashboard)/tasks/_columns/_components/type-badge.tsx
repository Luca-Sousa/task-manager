import { Badge } from "@/app/_components/ui/badge";
import { Tasks, TasksStatus } from "@prisma/client";
import { CircleIcon } from "lucide-react";

interface TasksTypeBadgeProps {
  task: Tasks;
}
const TasksTypeBadge = ({ task }: TasksTypeBadgeProps) => {
  if (task.status === TasksStatus.NOT_STARTED) {
    return (
      <Badge className="bg-gray-700 px-1.5 py-px font-bold hover:bg-gray-700">
        <CircleIcon size={6} className="mr-1.5 fill-current" />
        Não Iniciado
      </Badge>
    );
  }
  if (task.status === TasksStatus.IN_PROGRESS) {
    return (
      <Badge className="bg-yellow-700 px-1.5 py-px font-bold hover:bg-yellow-700">
        <CircleIcon size={6} className="mr-1.5 fill-current" />
        Em Andamento
      </Badge>
    );
  }
  if (task.status === TasksStatus.COMPLETED) {
    return (
      <Badge className="bg-green-700 px-1.5 py-px font-bold hover:bg-green-700">
        <CircleIcon size={6} className="mr-1.5 fill-current" />
        Concluído
      </Badge>
    );
  }
  return (
    <Badge className="bg-red-700 px-1.5 py-px font-bold hover:bg-red-700">
      <CircleIcon size={6} className="mr-1.5 fill-current" />
      Não Realizado
    </Badge>
  );
};

export default TasksTypeBadge;
