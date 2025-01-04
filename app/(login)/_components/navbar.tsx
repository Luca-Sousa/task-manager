import { Button } from "@/app/_components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/app/_components/ui/sheet";
import { SignInButton, SignUpButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import {
  AlignCenterIcon,
  LayoutDashboardIcon,
  LogInIcon,
  UserRoundPlusIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import NavbarNavigation from "./navbar-navigation";

const Navbar = async () => {
  const { userId } = await auth();

  return (
    <nav className="border-b border-solid py-2 md:py-4">
      <div className="mx-auto flex items-center justify-between px-6 md:max-w-3xl md:px-0 lg:max-w-4xl xl:max-w-6xl 2xl:max-w-[1440px]">
        <div className="flex items-center gap-10">
          <div className="flex items-center gap-4">
            <div className="relative size-8 md:size-10 xl:size-12">
              <Image
                src="/logo[256px].png"
                alt="Finance AI"
                fill
                className="object-cover"
              />
            </div>

            <span className="text-lg font-bold md:text-xl">Task Manager</span>
          </div>

          <div className="hidden md:block">
            <NavbarNavigation />
          </div>
        </div>

        <Sheet>
          <SheetTrigger title="Menu" asChild className="md:hidden">
            <Button variant={"ghost"} className="gap-2">
              <AlignCenterIcon />
            </Button>
          </SheetTrigger>

          <SheetContent
            className="flex w-64 flex-col justify-between sm:w-[400px]"
            side={"left"}
          >
            <div className="space-y-10">
              <SheetHeader>
                <SheetTitle>Task Manager</SheetTitle>
                <SheetDescription>
                  O organizador de tarefas mais simples para facilitar o seu dia
                  a dia.
                </SheetDescription>
              </SheetHeader>

              <NavbarNavigation />
            </div>

            <SheetFooter>
              <SheetClose className="w-full" asChild>
                {userId ? (
                  <Button className="flex gap-2" asChild>
                    <Link href="/dashboard">
                      <LayoutDashboardIcon />
                      Acessar Dashboard
                    </Link>
                  </Button>
                ) : (
                  <div className="flex flex-col gap-3">
                    <SignInButton mode="modal" forceRedirectUrl={"/dashboard"} fallbackRedirectUrl="/dashboard">
                      <Button variant={"ghost"} className="gap-2">
                        <LogInIcon />
                        Fazer login
                      </Button>
                    </SignInButton>

                    <SignUpButton mode="modal" fallbackRedirectUrl="/dashboard">
                      <Button className="gap-2">
                        <UserRoundPlusIcon />
                        Criar Conta
                      </Button>
                    </SignUpButton>
                  </div>
                )}
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>

        <div className="hidden items-center space-x-3 md:flex">
          {userId ? (
            <Button className="gap-2" asChild>
              <Link href="/dashboard">
                <LayoutDashboardIcon />
                Acessar Dashboard
              </Link>
            </Button>
          ) : (
            <>
              <SignInButton mode="modal" fallbackRedirectUrl="/dashboard">
                <Button variant={"ghost"} className="gap-2">
                  <LogInIcon />
                  Fazer login
                </Button>
              </SignInButton>

              <SignUpButton mode="modal" fallbackRedirectUrl="/dashboard">
                <Button className="gap-2">
                  <UserRoundPlusIcon />
                  Criar Conta
                </Button>
              </SignUpButton>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
