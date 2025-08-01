# INF012 Internet Banking Frontend

Aplicação frontend de Internet Banking baseada em React e Vite, desenvolvida para a disciplina de Programação Web no Instituto Federal da Bahia (IFBA).

## Funcionalidades

- ✅ Autenticação segura de usuários
- ✅ Registro de novas contas
- ✅ Dashboard com visão geral da conta
- ✅ Consulta de saldo em tempo real
- ✅ Depósitos e saques
- ✅ Transferências entre contas
- ✅ Extrato detalhado de transações
- ✅ Interface responsiva e moderna
- ✅ Navegação protegida com guards de rota
- ✅ Gerenciamento de estado global
- ✅ Notificações e feedback visual

## Tecnologias

- **React 19** - Biblioteca de interface de usuário
- **Vite** - Ferramenta de build e desenvolvimento
- **React Router 7** - Roteamento e navegação
- **Zustand** - Gerenciamento de estado global
- **Axios** - Cliente HTTP para comunicação com API
- **Tailwind CSS** - Framework de estilização
- **React Icons** - Biblioteca de ícones
- **ESLint** - Linting e qualidade de código
- **Prettier** - Formatação de código

## Início Rápido

### Pré-requisitos

- Node.js 18+;
- npm ou yarn;
- Backend do Internet Banking exposto e configurado em variável de ambiente (verificar o `.env.example`).

### Configuração de Desenvolvimento

1. **Clone o repositório**:
```bash
git clone https://github.com/Ednaxx/INF012-internet-banking-frontend.git
cd INF012-internet-banking-frontend
```

2. **Instale as dependências**:
```bash
npm install
```

3. **Configure as variáveis de ambiente** (opcional):
```bash
# Crie um arquivo .env na raiz do projeto
VITE_BASE_API_URL=#Sua url
```

4. **Inicie o servidor de desenvolvimento**:
```bash
npm run dev
```

5. **Acesse a aplicação**:
   - URL: http://localhost:3000

### Scripts Disponíveis

```bash
npm run dev        # Inicia o servidor de desenvolvimento
npm run build      # Gera build de produção
npm run preview    # Visualiza o build de produção
npm run lint       # Executa verificação de lint
npm run lint:fix   # Corrige problemas de lint automaticamente
npm run fmt        # Formata o código com Prettier
```

## Estrutura do Projeto

```
src/
├── components/          # Componentes reutilizáveis
│   ├── shared/         # Componentes compartilhados
│   └── [PageName]/     # Componentes específicos de página
├── pages/              # Páginas da aplicação
│   ├── Login/          # Página de login
│   ├── Signup/         # Página de cadastro
│   ├── Dashboard/      # Dashboard principal
│   ├── Deposit/        # Página de depósito
│   ├── Withdrawal/     # Página de saque
│   ├── Transfer/       # Página de transferência
│   └── Statement/      # Página de extrato
├── store/              # Gerenciamento de estado (Zustand)
├── router.jsx          # Configuração de rotas
└── main.jsx           # Ponto de entrada da aplicação
```

## Licença

GNU General Public License v3.0
