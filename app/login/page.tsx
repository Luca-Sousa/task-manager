import { Button } from "../_components/ui/button";

const Login = () => {
  return (
    <div className="flex h-full w-2/5 flex-col justify-center gap-4 px-32">
      <h1 className="w- text-3xl font-bold">Task Manager</h1>

      <div>
        <h2 className="text-xl font-bold">Bem-Vindo</h2>
        <p className="text-sm text-slate-600">
          A Finance AI é uma plataforma de gestão financeira que utiliza IA para
          monitorar suas movimentações, e oferecer insights personalizados,
          facilitando o controle do seu orçamento.
          A Finance AI é uma plataforma de gestão financeira que utiliza IA para
          monitorar suas movimentações, e oferecer insights personalizados,
          facilitando o controle do seu orçamento.
        </p>
      </div>

      <Button type="submit" variant="default">
        Fazer login ou Criar conta
      </Button>
    </div>
  );
};

export default Login;
