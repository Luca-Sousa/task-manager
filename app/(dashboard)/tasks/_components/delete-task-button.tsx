import { deleteTasks } from "@/app/_actions/tasks/delete-task";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/app/_components/ui/alert-dialog";
import { Button } from "@/app/_components/ui/button";
import { TasksStatus } from "@prisma/client";
import { Trash2Icon } from "lucide-react";
import { toast } from "sonner";

interface DeleteTaskButtonProps {
  taskId: string;
  status: TasksStatus;
}

const DeleteTaskButton = ({ taskId, status }: DeleteTaskButtonProps) => {
  const handleConfirmDeleteClick = async () => {
    try {
      await deleteTasks({ taskId });

      toast.success("Tarefa deletada com sucesso!");
    } catch (error) {
      console.error("Erro ao deletar a tarefa:", error);
      toast.error("Ocorreu um erro ao tentar deletar a tarefa!");
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button size="icon" variant="ghost" disabled={status === "IN_PROGRESS"}>
          <Trash2Icon />
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Você tem certeza que deseja deletar a tarefa?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Esta ação não pode ser desfeita. Isso excluirá permanentemente a
            tarefa.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={handleConfirmDeleteClick}>
            Continuar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteTaskButton;
