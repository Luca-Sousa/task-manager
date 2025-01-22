import React from "react";
import {
  ToggleGroup as ToggleGroupPrimitive,
  Toolbar as ToolbarPrimitive,
} from "@radix-ui/react-toolbar";

import { cn } from "@/app/_lib/utils";

interface ToolbarProps {
  children: React.ReactNode;
  className?: string;
}

const Toolbar = ({ children, className }: ToolbarProps) => {
  return (
    <ToolbarPrimitive
      className={cn("my-2 rounded-sm bg-secondary/40 px-4 py-2", className)}
    >
      {children}
    </ToolbarPrimitive>
  );
};

const ToggleGroup = ToggleGroupPrimitive;

ToggleGroup.displayName = ToggleGroupPrimitive.displayName;

export { Toolbar, ToggleGroup };
