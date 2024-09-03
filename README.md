Claro! Abaixo está um exemplo de como você pode escrever a descrição para o `README.md` do seu projeto, cobrindo o que foi implementado e fornecendo informações úteis para os desenvolvedores que desejam entender e contribuir para o projeto.

---

# Contact Management System

## Descrição

O Contact Management System é uma aplicação web desenvolvida em React e ASP.NET Core que permite gerenciar contatos de pessoas. A aplicação permite criar, editar e excluir pessoas e seus contatos associados. O sistema é estruturado com uma interface intuitiva para adicionar e editar contatos, bem como para visualizar e gerenciar informações de pessoas e seus contatos.

## Funcionalidades

- **Visualizar Pessoas e Contatos:** Exibe uma lista de pessoas e seus contatos associados.
- **Adicionar Pessoa:** Permite adicionar uma nova pessoa ao sistema.
- **Editar Pessoa:** Permite editar as informações de uma pessoa existente.
- **Excluir Pessoa:** Remove uma pessoa do sistema junto com seus contatos.
- **Adicionar Contato:** Adiciona um novo contato para uma pessoa.
- **Editar Contato:** Edita um contato existente associado a uma pessoa.
- **Excluir Contato:** Remove um contato específico de uma pessoa.

## Tecnologias Utilizadas

- **Frontend:** React, Material-UI
- **Backend:** ASP.NET Core, Entity Framework Core
- **Banco de Dados:** SQLite (para desenvolvimento), PostgreSQL (para produção)
- **Gerenciamento de Estado:** React Hooks
- **Roteamento:** React Router
- **Comunicação com a API:** Axios

## Estrutura do Projeto

### Frontend

- **AddContact:** Componente para adicionar um novo contato.
- **EditContact:** Componente para editar um contato existente.
- **PersonDetail:** Componente que exibe detalhes de uma pessoa, incluindo a lista de contatos, e fornece opções para adicionar, editar e excluir contatos.
- **App:** Componente principal que configura as rotas e exibe o conteúdo.

### Backend

- **API de Contatos:** Fornece endpoints para gerenciar pessoas e contatos, incluindo operações CRUD (Criar, Ler, Atualizar, Excluir).

## Instalação

### Requisitos

- Node.js (versão 14.x ou superior)
- .NET Core (versão 8 ou superior)
- Banco de Dados SQLite para desenvolvimento

### Configuração do Frontend

1. Clone o repositório:

   ```bash
   git clone https://github.com/dionathan-freitas/TesteWeduka.git
   cd contact-management-system
   ```

2. Navegue até o diretório do frontend:

   ```bash
   cd frontend
   ```

3. Instale as dependências:

   ```bash
   npm install
   ```

4. Inicie o servidor de desenvolvimento:

   ```bash
   npm start
   ```

### Configuração do Backend

1. Navegue até o diretório do backend:

   ```bash
   cd backend
   ```

2. Restaure as dependências e atualize o banco de dados:

   ```bash
   dotnet restore
   dotnet ef database update
   ```

3. Inicie o servidor:

   ```bash
   dotnet run
   ```

## Uso

1. Acesse a aplicação no navegador em `http://localhost:3000` (para o frontend) e `https://localhost:44324` (para o backend).
2. Utilize as opções de menu para gerenciar pessoas e contatos.
