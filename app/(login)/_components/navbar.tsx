import { Button } from "@/app/_components/ui/button";
import { SignInButton, SignUpButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import {
  LayoutDashboardIcon,
  LogInIcon,
  UserRoundPlusIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const Navbar = async () => {
  const { userId } = await auth();

  return (
    <nav className="border-b border-solid py-4">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="relative size-12">
            <Image
              src="/logo[256px].png"
              alt="Finance AI"
              fill
              className="object-cover"
            />
          </div>

          <span className="text-xl font-bold">Task Manager</span>
        </div>

        <div className="space-x-3">
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
