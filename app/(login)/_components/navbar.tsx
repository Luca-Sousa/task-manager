import { Button } from "@/app/_components/ui/button";
import { SignInButton, SignUpButton } from "@clerk/nextjs";
import { LogInIcon, UserRoundPlusIcon } from "lucide-react";
import Image from "next/image";

const Navbar = () => {
  return (
    <nav className="border-b border-solid py-4">
      <div className="mx-auto flex max-w-[1440px] justify-between">
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
          <SignInButton>
            <Button variant={"ghost"} className="gap-2">
              <LogInIcon />
              Fazer login
            </Button>
          </SignInButton>

          <SignUpButton>
            <Button className="gap-2">
              <UserRoundPlusIcon />
              Criar Conta
            </Button>
          </SignUpButton>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
