import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/app/_components/ui/accordion";
import { Button } from "@/app/_components/ui/button";

const faqs_category = [
  {
    Category: "Geral",
    faqs: [],
  },
  {
    Category: "Conta e Login",
    faqs: [
      {
        title: "Como posso criar uma conta?",
        response:
          "Você pode criar uma conta utilizando um endereço de e-mail ou conectando-se com sua conta Google",
      },
      {
        title: "Esqueci minha senha, como posso redefini-la?",
        response:
          'Na tela de login, clique em "Esqueci minha senha" e siga as instruções enviadas para o seu e-mail cadastrado.',
      },
      {
        title: "Posso acessar minha conta em dispositivos diferentes?",
        response:
          "Sim, sua conta pode ser acessada de qualquer dispositivo conectado à internet, desde que utilize suas credenciais de login.",
      },
    ],
  },
  {
    Category: "Gerenciamento de Tarefas",
    faqs: [
      {
        title: "Como posso adicionar uma nova tarefa?",
        response:
          'Acesse a página de "Tarefas" e clique no botão "Nova Tarefa". Preencha os detalhes e clique no botão "Adicionar Tarefa".',
      },
      {
        title: "Posso editar uma tarefa após criá-la?",
        response:
          "Sim, você pode modificar informações como título, descrição, categoria e status diretamente na lista de tarefas.",
      },
      {
        title: "Como excluir uma tarefa?",
        response:
          'No painel de tarefas, selecione a tarefa desejada e clique no botão de "Excluir". A tarefa será removida do seu painel automaticamente.',
      },
    ],
  },
  {
    Category: "Dashboard e Monitoramento",
    faqs: [
      {
        title: "O que a Dashboard exibe?",
        response:
          "A dashboard exibe o total de tarefas cadastradas, status das tarefas (não iniciado, concluído, não realizado), gráficos de desempenho, quantidade de tarefas por categoria e últimas tarefas cadastradas.",
      },
      {
        title: "Como os gráficos são atualizados?",
        response:
          "Os gráficos são atualizados automaticamente sempre que você adiciona, edita ou exclui tarefas.",
      },
      {
        title: "Como posso personalizar os filtros da Dashboard?",
        response:
          "Sim, você pode visualizar suas tarefas por períodos específicos (semanal ou mensal) e status.",
      },
    ],
  },
  {
    Category: "Planos e Assinaturas",
    faqs: [
      {
        title: "Qual a diferença entre os planos Free e Premium?",
        response:
          "O plano Free permite até 5 tarefas diárias, enquanto o Premium oferece tarefas ilimitadas e recursos avançados, como notificações e dashboard avançada.",
      },
      {
        title: "Como posso assinar o plano Premium?",
        response:
          'Na página "Assinatura", clique em "Adquirir Plano Premium" e siga as instruções para pagamento.',
      },
      {
        title: "Posso cancelar minha assinatura?",
        response:
          "Sim, você pode cancelar a qualquer momento na página de Assinaturas. Uma confirmação será solicitada antes da finalização do cancelamento.",
      },
      {
        title: "O que acontece ao cancelar minha assinatura Premium?",
        response:
          "Você perderá o acesso aos recursos premium imediatamente e voltará ao plano Free.",
      },
    ],
  },
  {
    Category: "Busca e Filtros",
    faqs: [
      {
        title: "Como posso encontrar uma tarefa específica?",
        response:
          "Você pode utilizar a barra de pesquisa para encontrar tarefas rapidamente. Basta digitar palavras-chave do título ou da descrição da tarefa, e os resultados serão exibidos em tempo real. A pesquisa funciona tanto para palavras completas quanto parciais.",
      },
      {
        title: "Quais filtros estão disponíveis?",
        response:
          "O sistema permite a filtragem de tarefas por categoria, status e prazo. Você pode organizar suas tarefas conforme sua necessidade. As tarefas filtradas são exibidas em uma tabela organizada, que apresenta o título, descrição, categoria, status, prazo e botões de ação para facilitar a gestão.",
      },
      {
        title: "Posso salvar filtros personalizados?",
        response:
          "Atualmente, o sistema não oferece a opção de salvar filtros personalizados. No entanto, os filtros aplicados permanecerão ativos até que a página seja recarregada ou novos critérios de filtragem sejam definidos.",
      },
    ],
  },
  {
    Category: "Notificações",
    faqs: [
      {
        title: "Eu recebo notificações sobre minhas tarefas?",
        response:
          "Somente usuários Premium recebem notificações sobre tarefas, incluindo alertas antes dos prazos configurados. Usuários Free não têm acesso a esse recurso.",
      },
      {
        title: "Como ativar ou desativar as notificações?",
        response:
          "Acesse as configurações da conta e altere suas preferências de notificação.",
      },
      {
        title: "As notificações são enviadas em tempo real?",
        response:
          "Sim, as notificações são enviadas antes do prazo configurado para garantir que você não perca nenhuma tarefa importante. No entanto, essa funcionalidade está disponível apenas para usuários do plano Premium. Usuários da versão Free não recebem notificações.",
      },
    ],
  },
];

const FAQContent = () => {
  return (
    <div>
      <div className="flex items-center gap-5">
        {faqs_category.map((items, index) => (
          <Button key={index}>{items.Category}</Button>
        ))}
      </div>

      <div className="flex flex-col gap-5">
        {faqs_category.map((items, index) => (
          <div key={index} className="flex flex-col gap-8">
            {items.faqs.map((item) => (
              <Accordion key={index} type="single" collapsible>
                <AccordionItem value="item-1">
                  <AccordionTrigger className="rounded-xl px-4 py-3 text-base ring-1 ring-accent hover:bg-primary/60 hover:no-underline focus:bg-primary/60">
                    {item.title}
                  </AccordionTrigger>
                  <AccordionContent className="px-4 py-3 text-base text-muted-foreground">
                    {item.response}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQContent;
