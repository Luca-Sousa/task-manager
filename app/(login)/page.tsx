import Image from "next/image";
import { Badge } from "../_components/ui/badge";

const LoginPage = () => {
  return (
    <div className="mx-auto flex flex-col overflow-x-hidden p-6 md:mt-8 md:max-w-3xl md:pl-1 md:pr-0 lg:mt-16 lg:max-w-4xl xl:max-w-6xl xl:py-0 2xl:max-w-[1440px]">
      <div className="relative mx-auto flex size-full flex-col-reverse">
        <div className="relative mt-16 aspect-video size-full xl:-mr-28 xl:ml-auto xl:mt-0 xl:max-w-6xl 2xl:-mr-32 2xl:max-w-7xl">
          <Image
            src="/banner-homepage.svg"
            alt="Imagem Home"
            fill
            className="object-contain xl:object-right-top"
          />
        </div>

        <div className="left-0 space-y-5 xl:absolute xl:top-1/2 xl:max-w-2xl xl:-translate-y-1/2 2xl:top-[40%] 2xl:-translate-y-[40%]">
          <div className="flex flex-wrap gap-2 lg:gap-4">
            <Badge className="w-fit rounded-full bg-transparent px-3 ring-2 ring-sky-700 hover:bg-transparent">
              Gerenciamento
            </Badge>
            <Badge className="w-fit rounded-full bg-transparent px-3 ring-2 ring-violet-700 hover:bg-transparent">
              Organização
            </Badge>
            <Badge className="w-fit rounded-full bg-transparent px-3 ring-2 ring-rose-700 hover:bg-transparent">
              Gestão
            </Badge>
          </div>

          <h1 className="text-3xl font-bold sm:text-4xl lg:text-4xl xl:text-5xl 2xl:text-balance 2xl:text-6xl">
            O lugar onde sua <span className="text-primary">produtividade</span>{" "}
            encontra <span className="text-primary">organização</span>!
          </h1>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
