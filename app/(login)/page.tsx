import Image from "next/image";

const LoginPage = () => {
  return (
    <div className="mx-auto flex max-w-[1440px]">
      <div className="flex w-full flex-col items-center justify-center pt-32">
        <div className="flex flex-col items-center justify-center gap-10">
          <h1 className="text-3xl font-bold">
            O lugar onde sua produtividade encontra organização!
          </h1>

          <div className="flex max-w-[800px] gap-10">
            <p className="basis-1/3 text-sm text-slate-600">
              A Finance AI é uma plataforma de gestão financeira que utiliza IA
              para monitorar suas movimentações, e oferecer insights
              personalizados, facilitando o controle do seu orçamento. A Finance
              AI é uma plataforma de gestão financeira que utiliza IA para
              monitorar suas movimentações, e oferecer insights personalizados,
              facilitando o controle do seu orçamento.
            </p>

            <div className="relative size-80 basis-2/3">
              <Image
                src="/imagem-home.jpg"
                alt="Imagem Home"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
