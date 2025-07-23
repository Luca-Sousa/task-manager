# 📋 Task Manager

Um sistema de gerenciamento de tarefas desenvolvido com Next.js, que oferece uma experiência intuitiva para organizar e monitorar sua produtividade diária.

## ✨ Funcionalidades Principais

### 🎯 Gestão de Tarefas
- **Criação e Edição**: Interface rica para criar tarefas com título, descrição, categoria e horários
- **14 Categorias**: Trabalho, Estudos, Casa, Saúde, Finanças, Lazer, Relacionamentos, Voluntariado, Viagens, Desenvolvimento Pessoal, Tecnologia, Compras, Compromissos e Outros
- **Status de Tarefas**: Não Iniciado, Em Andamento, Concluído e Não Realizado
- **Organização por Períodos**: Visualização automática por manhã, tarde e noite
- **Busca e Filtros**: Sistema de pesquisa por nome e filtros avançados

### 📊 Dashboard Analítico
- **Gráficos de Desempenho**: Visualização em pizza do status das tarefas
- **Estatísticas por Categoria**: Análise de distribuição percentual das tarefas
- **Histórico de Tarefas**: Últimas tarefas cadastradas com detalhes
- **Filtros Temporais**: Visualização por dia, mês e ano (Premium)

### 👤 Sistema de Autenticação
- **Autenticação Clerk**: Login seguro com múltiplas opções
- **Gestão de Usuários**: Perfis personalizados e metadata
- **Proteção de Rotas**: Middleware de segurança integrado

### 💎 Planos de Assinatura
#### Plano Free
- Até 5 tarefas diárias
- Acesso à Dashboard básica
- Filtro por dia
- Criação e edição de tarefas

#### Plano Premium (R$ 24,99/mês)
- Tarefas ilimitadas
- Filtros avançados (mês/ano)
- Notificações e lembretes personalizados
- Histórico completo e relatórios
- Gráficos analíticos avançados

### 🔔 Sistema de Notificações
- **Notificações Inteligentes**: Lembretes automáticos para tarefas
- **Status Avançados**: Não lida e lida
- **Integração com Sidebar**: Visualização rápida de notificações pendentes

## 🛠️ Tecnologias Utilizadas

### Frontend
- **Next.js 14** - Framework React com App Router
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização utilitária
- **Shadcn/ui** - Componentes de UI modernos
- **Radix UI** - Componentes primitivos acessíveis
- **Lucide React** - Ícones SVG
- **React Hook Form** - Gerenciamento de formulários
- **TipTap** - Editor de texto rico
- **Recharts** - Gráficos e visualizações

### Backend & Database
- **Prisma** - ORM para TypeScript
- **PostgreSQL** - Banco de dados relacional
- **Clerk** - Autenticação e gestão de usuários

### Pagamentos & Assinaturas
- **Stripe** - Processamento de pagamentos
- **Webhooks** - Sincronização automática de assinaturas

### Testes & Qualidade
- **Jest** - Framework de testes
- **Testing Library** - Testes de componentes React
- **ESLint** - Linting de código
- **Prettier** - Formatação de código
- **Husky** - Git hooks

## 🚀 Como Executar o Projeto

### Pré-requisitos
- Node.js 18+
- npm/yarn/pnpm
- PostgreSQL
- Contas configuradas: Clerk, Stripe

### Instalação

1. **Clone o repositório**
```bash
git clone https://github.com/Luca-Sousa/task-manager.git
cd task-manager
```

2. **Instale as dependências**
```bash
npm install
# ou
yarn install
# ou
pnpm install
```

3. **Configure as variáveis de ambiente**
```bash
cp .env.example .env.local
```

Preencha as variáveis necessárias:
- `DATABASE_URL` - URL do PostgreSQL
- `NEXT_PUBLIC_CLERK_*` - Configurações do Clerk
- `STRIPE_*` - Chaves do Stripe
- `API_URL` - URL da aplicação

4. **Configure o banco de dados**
```bash
npx prisma generate
npx prisma migrate dev
```

5. **Execute o servidor de desenvolvimento**
```bash
npm run dev
```

6. **Acesse a aplicação**
Abra [http://localhost:3000](http://localhost:3000) no seu navegador

## 📁 Estrutura do Projeto

```
├── app/                          # App Router do Next.js
│   ├── (dashboard)/             # Rotas protegidas do dashboard
│   │   ├── dashboard/           # Página principal do dashboard
│   │   ├── tasks/               # Gerenciamento de tarefas
│   │   └── subscription/        # Página de assinaturas
│   ├── (login)/                 # Páginas de autenticação
│   ├── _actions/                # Server Actions
│   ├── _components/             # Componentes reutilizáveis
│   ├── _constants/              # Constantes e configurações
│   ├── _contexts/               # Contextos React
│   ├── _data-access/            # Camada de acesso a dados
│   ├── _hooks/                  # Hooks customizados
│   ├── _lib/                    # Utilitários e configurações
│   ├── api/                     # API Routes
│   └── __tests__/               # Testes unitários
├── prisma/                      # Configuração do banco
├── public/                      # Arquivos estáticos
└── components.json              # Configuração shadcn/ui
```

## 🧪 Testes

Execute os testes:
```bash
npm run test          # Executa todos os testes
npm run test:watch    # Executa em modo watch
```

## 📝 Scripts Disponíveis

```bash
npm run dev           # Servidor de desenvolvimento
npm run build         # Build de produção
npm run start         # Servidor de produção
npm run lint          # Linting do código
npm run test          # Executa testes
npm run vercel-build  # Build para Vercel
```

## 🔧 Configuração de Produção

### Variáveis de Ambiente Obrigatórias
- Configurações do Clerk para autenticação
- Chaves do Stripe para pagamentos
- URL do banco PostgreSQL
- URLs de callback do Stripe

### Deploy
O projeto está configurado para deploy automático na Vercel com:
- Build otimizado
- Migrações automáticas do Prisma
- Webhooks do Stripe configurados

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 📞 Contato

**Lucas Sousa** - [GitHub](https://github.com/Luca-Sousa)

Link do Projeto: [https://github.com/Luca-Sousa/task-manager](https://github.com/Luca-Sousa/task-manager)
