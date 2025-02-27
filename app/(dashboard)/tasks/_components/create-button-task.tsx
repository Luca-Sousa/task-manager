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
import { useEffect, useState } from "react";
import CreateTaskDialogContent from "./create-task-content";

interface CreateTaskButtonProps {
  userCanAddtasks: boolean;
}

const CreateTaskButton = ({ userCanAddtasks }: CreateTaskButtonProps) => {
  const [dialogIsOpen, setDialogIsOpen] = useState<boolean>(false);

  useEffect(() => {
    if (dialogIsOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => document.body.classList.remove("overflow-hidden");
  }, [dialogIsOpen]);

  return (
    <Dialog
      modal={false}
      open={dialogIsOpen}
      onOpenChange={(open) => setDialogIsOpen(open)}
    >
      <DialogTrigger asChild>
        <Button
          className="flex h-9 w-9 rounded-full font-bold sm:h-9 sm:w-fit sm:px-4 sm:py-2"
          disabled={!userCanAddtasks}
        >
          <span className="hidden sm:block">Nova Tarefa</span>
          <PlusIcon />
        </Button>
      </DialogTrigger>

      {dialogIsOpen && <div className="fixed inset-0 z-40 bg-black/80" />}

      <DialogContent className="flex max-h-[90vh] max-w-[95vw] flex-col overflow-auto p-4 md:max-w-[80vw] md:p-6 lg:max-w-[60vw] xl:max-w-[50vw] 2xl:max-w-[40vw]">
        <DialogHeader>
          <DialogTitle>Adicionar Tarefa</DialogTitle>
          <DialogDescription>
            Crie uma nova tarefa com as informações necessárias.
          </DialogDescription>
        </DialogHeader>

        <CreateTaskDialogContent onSuccess={() => setDialogIsOpen(false)} />
      </DialogContent>
    </Dialog>
  );
};

export default CreateTaskButton;
