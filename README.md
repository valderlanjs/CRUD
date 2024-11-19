# CRUD completo com Front-end e Back-end

### DESCRIÇÃO
Este projeto implementa um CRUD (Create, Read, Update, Delete) completo para gerenciar clientes. Ele permite que os usuários adicionem, visualizem, editem e excluam registros de clientes, incluindo informações como nome, email e cargo. A aplicação também oferece uma funcionalidade de pesquisa que permite filtrar clientes por nome, email ou cargo.
Esse projeto foi desenvolvido pensando nas melhores práticas e padrões de desenvolvimento para garantir um aplicativo robusto.

### Tecnologias utilizadas no Front-end e Back-end

    - React.js
    - Tailwind CSS
    - DaisyUI
    - Express
    - Node.js
    - PostgreSQL
    - Axios

### Instrução de instalação

#### Front-end

        cd crud-frontend
        npm install
        npm run dev

#### Back-End

        cd crud-backend
        npm install
        npm start


### Configuração inicial do Projeto

1. Instalar o Node.js:
    - Certificar de que o Node.js esteja instalado na máquina.

2. Criar o projeto Vite:
    - Executar o comando:

            npm create vite@latest

3. Seguir a configuração do Tailwind CSS:
    - Seguir o guia de instalação Tailwind CSS para Vite:
    
        - [Guia do Tailwind CSS](https://tailwindcss.com/docs/guides/vite)

4. Instalação do DaisyUI

    - [Instalação DaisyUI](https://daisyui.com/docs/install/)
    
6. Criar estrutura do projeto:
    - Criar a seguinte pasta para os componentes

                CRUD/
                  ├── crud-frontend/
                  |         ├── src/
                  |         |   ├── components
                  |         |   |         ├──── ModalForm.jsx
                  |         |   |         ├──── NavBar.jsx
                  |         |   |         ├──── TableList.jsx
                  |         |   ├── index.css
                  |         |   ├── App.jsx
                  |         |   ├── main.jsx
                  |
                  ├── crud-backend/
                  |         ├── src/
                  |         |     ├── controllers
                  |         |     |      ├──── clientController.js
                  |         |     |
                  |         |     ├── routes
                  |         |     |      ├──── clientRoute.js
                  |         |     |
                  |         |     ├── services
                  |         |     |      ├──── clientServices.js
                  |         |     |
                  |         |     ├── db.js
                  |         |     ├── index.js

### Detalhes sobre a aplicação

#### Banco de dados

O projeto utiliza um banco de dados PostgreSQL. A tabela ``clients_tb`` possui as seguintes colunas:

- ``id`` (serial): ID único do cliente.
- ``name`` (varchar): Nome do cliente.
- ``email`` (varchar): Email do cliente.
- ``rate`` (number): Avaliação do cliente.
- ``job`` (varchar): Cargo do cliente.

Para configurar o banco de dados, crie um arquivo ``.env`` na pasta **crud-backend** com as seguintes variáveis de ambiente:

        PG_USER=seu_usuario
        PG_HOST=seu_host
        PG_DATABASE=nome_do_banco
        PG_PASSWORD=sua_senha
        PG_PORT=5432

# API do CRUD

Esta API permite gerenciar clientes com as operações de criação, leitura, atualização e exclusão (CRUD), além de oferecer uma funcionalidade de pesquisa.

## Rotas da API

**Base URL:** `/api`

**1. Listar todos os clientes:**

* **Método:** GET
* **Rota:** `/clients`
* **Descrição:** Retorna uma lista de todos os clientes cadastrados.
* **Resposta:**
    * **Código 200 (OK):**  Um array JSON contendo os clientes.
    * **Código 500 (Internal Server Error):**  Erro ao buscar os clientes.

**2. Criar um novo cliente:**

* **Método:** POST
* **Rota:** `/clients`
* **Descrição:** Cria um novo cliente no banco de dados.
* **Corpo da requisição:** JSON com os dados do cliente:
    ```json
    {
      "name": "Nome do Cliente",
      "email": "[email address removed]",
      "job": "Cargo do Cliente",
      "rate": 100.50,
      "isactive": true
    }
    ```
* **Resposta:**
    * **Código 201 (Created):**  O cliente criado.
    * **Código 500 (Internal Server Error):**  Erro ao criar o cliente (ex: email já cadastrado).

**3. Atualizar um cliente:**

* **Método:** PUT
* **Rota:** `/clients/:id`
* **Descrição:** Atualiza os dados de um cliente existente.
* **Parâmetros:**
    * `id`: ID do cliente a ser atualizado.
* **Corpo da requisição:** JSON com os novos dados do cliente.
* **Resposta:**
    * **Código 200 (OK):**  O cliente atualizado.
    * **Código 404 (Not Found):**  Cliente não encontrado.
    * **Código 500 (Internal Server Error):**  Erro ao atualizar o cliente.

**4. Excluir um cliente:**

* **Método:** DELETE
* **Rota:** `/clients/:id`
* **Descrição:** Exclui um cliente do banco de dados.
* **Parâmetros:**
    * `id`: ID do cliente a ser excluído.
* **Resposta:**
    * **Código 200 (OK):**  Cliente excluído com sucesso.
    * **Código 404 (Not Found):**  Cliente não encontrado.
    * **Código 500 (Internal Server Error):**  Erro ao excluir o cliente.

**5. Buscar clientes:**

* **Método:** GET
* **Rota:** `/clients/search`
* **Descrição:** Busca clientes por nome, email ou cargo.
* **Parâmetros de consulta:**
    * `q`: Termo de pesquisa.
* **Resposta:**
    * **Código 200 (OK):**  Um array JSON contendo os clientes que correspondem à busca.
    * **Código 500 (Internal Server Error):**  Erro ao buscar os clientes.