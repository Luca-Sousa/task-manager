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
import { PencilIcon } from "lucide-react";
import UpsertTaskDialogContent from "./upsert-task-content";
import { Tasks } from "@prisma/client";
import { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/app/_components/ui/tooltip";

interface EditButtonTaskProps {
  task: Tasks;
}

const EditButtonTask = ({ task }: EditButtonTaskProps) => {
  const [dialogIsOpen, setDialogIsOpen] = useState<boolean>(false);

  return (
    <TooltipProvider>
      <Tooltip>
        <Dialog
          open={dialogIsOpen}
          onOpenChange={(open) => setDialogIsOpen(open)}
        >
          <TooltipTrigger asChild>
            <DialogTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="text-muted-foreground"
                onClick={() => setDialogIsOpen(true)}
              >
                <PencilIcon />
              </Button>
            </DialogTrigger>
          </TooltipTrigger>
          <TooltipContent>
            <p className="font-bold">Atualizar Tarefa</p>
          </TooltipContent>

          <DialogContent className="flex h-full max-h-[80%] flex-col overflow-hidden">
            <DialogHeader>
              <DialogTitle>Atualizar Tarefa</DialogTitle>
              <DialogDescription>
                Atualize a tarefa com as informações necessárias.
              </DialogDescription>
            </DialogHeader>

            <UpsertTaskDialogContent
              defaultValues={{
                ...task,
              }}
              taskId={task.id}
              onSuccess={() => setDialogIsOpen(false)}
            />
          </DialogContent>
        </Dialog>
      </Tooltip>
    </TooltipProvider>
  );
};

export default EditButtonTask;
