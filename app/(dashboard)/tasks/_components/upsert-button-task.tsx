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

const CreateTaskButton = () => {
  const [dialogIsOpen, setDialogIsOpen] = useState<boolean>(false);

  return (
    <Dialog open={dialogIsOpen} onOpenChange={(open) => setDialogIsOpen(open)}>
      <DialogTrigger asChild>
        <Button className="hidden rounded-full font-bold sm:flex">
          Nova Tarefa
          <PlusIcon />
        </Button>
      </DialogTrigger>

      <DialogContent className="flex h-full max-h-[80%] flex-col overflow-hidden">
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
