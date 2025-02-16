"use client";

import { Button } from "@/app/_components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/_components/ui/dialog";
import { PlusIcon } from "lucide-react";
import { useState } from "react";
import UpsertTaskDialogContent from "./upsert-task-content";

interface CreateTaskButtonProps {
  userCanAddtasks: boolean;
}

const CreateTaskButton = ({ userCanAddtasks }: CreateTaskButtonProps) => {
  const [dialogIsOpen, setDialogIsOpen] = useState<boolean>(false);

  return (
    <Dialog open={dialogIsOpen} onOpenChange={(open) => setDialogIsOpen(open)}>
      <DialogTrigger asChild>
        <Button
          className="flex h-9 w-9 rounded-full font-bold sm:h-9 sm:w-fit sm:px-4 sm:py-2"
          disabled={!userCanAddtasks}
        >
          <span className="hidden sm:block">Nova Tarefa</span>
          <PlusIcon />
        </Button>
      </DialogTrigger>

      <DialogContent className="max-h-[90%] overflow-y-auto overflow-x-hidden">
        <DialogHeader>
          <DialogTitle>Adicionar Tarefa</DialogTitle>
          <DialogDescription>
            Crie uma nova tarefa com as informações necessárias.
          </DialogDescription>
        </DialogHeader>

        <UpsertTaskDialogContent onSuccess={() => setDialogIsOpen(false)} />
      </DialogContent>
    </Dialog>
  );
};

export default CreateTaskButton;
