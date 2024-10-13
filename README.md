# Nimbus-Ecommerce-back

## Descrição
Este projeto é uma API desenvolvida com Node.js que permite gerenciar um sistema de e-commerce. A API oferece funcionalidades para gerenciar usuários, produtos, carrinhos, pedidos e pagamentos.

## Requisitos Funcionais

- **CRUD para Usuários**: Criar, ler, atualizar e deletar usuários.
- **CRUD para Produtos**: Criar, ler, atualizar e deletar produtos.
- **Gerenciamento de Carrinhos**: Adicionar, remover e visualizar itens no carrinho.
- **Gerenciamento de Pedidos**: Criar e listar pedidos.
- **Pagamentos**: Processar pagamentos para pedidos.

## Requisitos Não Funcionais

- **Desempenho**: Respostas rápidas para requisições.
- **Segurança**: Proteção de dados sensíveis.
- **Escalabilidade**: Suporte a aumento de usuários.
- **Manutenibilidade**: Código organizado e fácil de manter.

## Modelagem de Dados

### Diagrama ER

![Diagrama ER](caminho/para/o/diagrama.png)

### Entidades e Atributos

### Entidades

- **Usuario**
  - `id_usuario`: INTEGER, PK, Auto Increment
  - `nome`: STRING(100), Not Null
  - `email`: STRING(100), Not Null, Unique
  - `senha`: STRING(255), Not Null
  - `idade`: INTEGER, Not Null

- **Produto**
  - `id_produto`: INTEGER, PK, Auto Increment
  - `nome`: STRING(100), Not Null
  - `descricao`: TEXT, Not Null
  - `preco`: DECIMAL(10, 2), Not Null
  - `estoque`: INTEGER, Not Null

- **Carrinho**
  - `id_carrinho`: INTEGER, PK, Auto Increment
  - `id_usuario`: INTEGER, FK
  - `data_criacao`: DATE, Default: NOW

- **Item_Carrinho**
  - `id_item_carrinho`: INTEGER, PK, Auto Increment
  - `id_carrinho`: INTEGER, FK
  - `id_produto`: INTEGER, FK
  - `quantidade`: INTEGER, Not Null

- **Pedido**
  - `id_pedido`: INTEGER, PK, Auto Increment
  - `id_usuario`: INTEGER, FK
  - `data_pedido`: DATE, Default: NOW
  - `status`: STRING(20), Not Null
  - `total`: DECIMAL(10, 2), Not Null

- **Pagamento**
  - `id_pagamento`: INTEGER, PK, Auto Increment
  - `id_pedido`: INTEGER, FK
  - `valor`: DECIMAL(10, 2), Not Null
  - `data_pagamento`: DATE, Default: NOW
  - `metodo_pagamento`: STRING(50), Not Null
  - `status_pagamento`: STRING(20), Not Null

- **Item_Pedido**
  - `id_item_pedido`: INTEGER, PK, Auto Increment
  - `id_pedido`: INTEGER, FK
  - `id_produto`: INTEGER, FK
  - `quantidade`: INTEGER, Not Null
  - `preco`: DECIMAL(10, 2), Not Null


## Arquitetura da API

### Estrutura de Endpoints

- **GET /**: Verifica se o servidor está ativo.
- **POST /usuarios**: Cria um novo usuário.
- **GET /usuarios**: Lista todos os usuários.
- **GET /produtos**: Lista todos os produtos.
- **POST /produtos**: Cria um novo produto.
- **POST /carrinhos**: Cria um novo carrinho.
- **POST /item_carrinho**: Adiciona um item ao carrinho.
- **POST /pedidos**: Cria um novo pedido.
- **POST /pagamentos**: Registra um pagamento.

### Estrutura de Pastas do Projeto

**src/**
  - `├── config/`
  - `├── controllers/`
  - `├── database/`
  - `├── migrations/` 
  - `├── models/`
  - `├── routes/`
  - `└── seeders/`

## Tecnologias Utilizadas

- **Node.js**
- **Express**
- **Sequelize**
- **MySQL**

## Configuração do Ambiente

1. Clone o repositório:
   ```bash
   git clone https://github.com/usuario/nome-do-repositorio.git

## Instale as dependências:
- npm install

## Configure o arquivo .env com as variáveis de ambiente.

- `DB_HOST`=localhost
- `DB_USER`=seu_usuario
- `DB_PASS`=sua_senha
- `DB_NAME`=nome_do_banco
- `PORT`=3000

## Inicie o servidor:
- npm run dev


### Resumo
- Mantenha os conceitos curtos e diretos.
- Certifique-se de que todas as seções necessárias estejam cobertas. Sinta-se à vontade para modificar conforme necessário!
