# Nimbus-Ecommerce-back

## Este projeto é uma API desenvolvida com Node.js que permite gerenciar um sistema de e-commerce. A API oferece funcionalidades para gerenciar usuários, produtos, carrinhos, pedidos e pagamentos.


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

- **Pedido**
  - `id_pedido`: INTEGER, Primary Key, Auto Increment
  - `id_usuario`: INTEGER, Foreign Key
  - `data_pedido`: DATE, Default: NOW
  - `status`: STRING(20), Not Null
  - `total`: DECIMAL(10,2), Not Null

- **Pagamento**
  - `id_pagamento`: INTEGER, Primary Key, Auto Increment
  - `id_pedido`: INTEGER, Foreign Key
  - `valor`: DECIMAL(10,2), Not Null
  - `data_pagamento`: DATE, Default: NOW
  - `metodo_pagamento`: STRING(50), Not Null
  - `status_pagamento`: STRING(20), Not Null

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

src/
  ├── config/ 
  ├── controllers/ 
  ├── database/ 
  ├── migrations/ 
  ├── models/ 
  ├── routes/ 
  └── seeders/


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

