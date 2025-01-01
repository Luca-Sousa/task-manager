import { LogInIcon } from "lucide-react";
import { Button } from "../../_components/ui/button";
import { SignInButton, SignUpButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const LoginPage = async () => {
  const { userId } = await auth();
  if (userId) return redirect("/");

  return (
    <div className="flex h-full w-2/5 flex-col justify-center gap-4 px-32">
      <h1 className="w- text-3xl font-bold">Task Manager</h1>

      <div>
        <h2 className="text-xl font-bold">Bem-Vindo</h2>
        <p className="text-sm text-slate-600">
          A Finance AI é uma plataforma de gestão financeira que utiliza IA para
          monitorar suas movimentações, e oferecer insights personalizados,
          facilitando o controle do seu orçamento. A Finance AI é uma plataforma
          de gestão financeira que utiliza IA para monitorar suas movimentações,
          e oferecer insights personalizados, facilitando o controle do seu
          orçamento.
        </p>
      </div>

      <SignInButton>
        <Button className="gap-2">
          <LogInIcon />
          Fazer login
        </Button>
      </SignInButton>

      <SignUpButton>
        <Button className="gap-2">
          <LogInIcon />
          Criar Conta
        </Button>
      </SignUpButton>
    </div>
  );
};

export default LoginPage;
