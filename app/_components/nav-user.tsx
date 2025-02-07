"use client";

import { BadgeCheck, ChevronsUpDown, LogOut, Sparkles } from "lucide-react";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/app/_components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/_components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/app/_components/ui/sidebar";
import { SignOutButton, UserProfile, useUser } from "@clerk/nextjs";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Skeleton } from "./ui/skeleton";
import { ScrollArea } from "./ui/scroll-area";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

export function NavUser() {
  const { isMobile, setOpenMobile } = useSidebar();
  const { user } = useUser();
  const hasPremiumPlan = user?.publicMetadata.subscriptionPlan === "premium";

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <Dialog>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                tooltip={user?.fullName || "Perfil"}
              >
                {user ? (
                  <>
                    <Avatar className="h-8 w-8 rounded-lg">
                      <AvatarImage
                        className="rounded-full"
                        src={user.imageUrl}
                        alt="Imagem do usuário"
                      />
                      <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-semibold">
                        {user.fullName}
                      </span>
                      <span className="truncate text-xs">
                        {user.emailAddresses[0].emailAddress}
                      </span>
                    </div>
                    <ChevronsUpDown className="ml-auto size-4" />
                  </>
                ) : (
                  <>
                    <Avatar className="h-8 w-8 rounded-lg">
                      <Skeleton className="h-full w-full rounded-full bg-accent" />
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <Skeleton className="h-3 w-1/2 rounded bg-accent" />
                      <Skeleton className="mt-1 h-3 w-4/5 rounded bg-accent" />
                    </div>
                    <ChevronsUpDown className="ml-auto size-4" />
                  </>
                )}
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
              side={isMobile ? "bottom" : "right"}
              align="end"
              sideOffset={4}
            >
              <DropdownMenuLabel className="p-0 font-normal">
                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage
                      className="rounded-full"
                      src={user?.imageUrl}
                      alt="Imagem do usuário"
                    />
                    <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">
                      {user?.fullName}
                    </span>
                    <span className="truncate text-xs">
                      {user?.emailAddresses[0].emailAddress}
                    </span>
                  </div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />

              <DropdownMenuGroup>
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={() => setOpenMobile(false)}
                  asChild
                >
                  <Link href={"/subscription"}>
                    <Sparkles />
                    {hasPremiumPlan
                      ? "Gerenciar Plano Premium"
                      : "Atualize pro Premium"}
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />

              <DropdownMenuGroup>
                <DialogTrigger asChild>
                  <DropdownMenuItem className="cursor-pointer">
                    <BadgeCheck />
                    Configurar Conta
                  </DropdownMenuItem>
                </DialogTrigger>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />

              <SignOutButton redirectUrl="/">
                <DropdownMenuItem asChild>
                  <Button
                    className="w-full cursor-pointer justify-start bg-destructive/70 focus:bg-destructive focus-visible:ring-0"
                    variant="destructive"
                  >
                    <LogOut />
                    Sair da Conta
                  </Button>
                </DropdownMenuItem>
              </SignOutButton>
            </DropdownMenuContent>

            <DialogContent className="flex h-[95%] max-w-fit flex-col overflow-hidden rounded-3xl border-0 p-0 md:h-auto">
              <DialogTitle hidden>
                <VisuallyHidden>
                  Configuração da Conta do Usuário
                </VisuallyHidden>
              </DialogTitle>
              <DialogDescription hidden>
                <VisuallyHidden>
                  Selecione as configurações que desejar!
                </VisuallyHidden>
              </DialogDescription>

              <ScrollArea>
                <UserProfile routing="hash" />
              </ScrollArea>
            </DialogContent>
          </DropdownMenu>
        </Dialog>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
