# Atena PDV

O desafio consiste em desenvolver uma API REST para um sistema de ponto de venda. Essa API deve permitir a realização de múltiplas operações, sendo elas: cadastro de usuário, login, listagem de categorias, filtragem de produtos por categoria, cadastro de produto, edição de produto, exclusão de produto, cadastro de cliente, cadastro de pedido e detalhamento de pedido por cliente, entre outros...

![enter image description here](https://raw.githubusercontent.com/pmagalhaes2/atena-pdv/main/src/assets/atena-image.webp)


## 🚀 Tecnologias

Esse projeto foi desenvolvido com as seguintes tecnologias:

- **[Axios](https://axios-http.com/)**
- **[Bcrypt](https://www.npmjs.com/package/bcrypt)**
- **[Express](https://expressjs.com/pt-br/)**
- **[Git](https://git-scm.com/doc)**
-  **[Joi](https://joi.dev/)**
-  **[JWT](https://jwt.io/)**
-  **[Multer](https://expressjs.com/en/resources/middleware/multer.html)**
- **[Node.js](https://nodejs.org/en)**
-  **[Nodemailer](https://nodemailer.com/)**
- **[Nodemon](https://nodemon.io/)**
-  **[Node-postgres](https://www.npmjs.com/package/pg)**
- **[Knex](https://knexjs.org/)**


## ⚠️ Dependências

Antes de começar, você deve ter as seguintes ferramentas instaladas na sua máquina: [Git] ([https://git-scm.com](https://git-scm.com/)), [Node.js] ([https://nodejs.org/en/](https://nodejs.org/en/)). Como complemento, é bom tem um editor de código como o [VSCode] ([https://code.visualstudio.com/](https://code.visualstudio.com/))



## 📥 Instalação e utilização

```bash
# Clone este repositório

$  git  clone  https://github.com/pmagalhaes2/atena-pdv.git


# Acesse a pasta do projeto pelo terminal

$  cd atena-pdv


# Instale as dependências

$  npm  install


# Rode a aplicação no modo de desenvolvimento

$  npm run dev


# Rode a aplicação em produção

$  npm run start


```

## 📖 Documentação da API

Esta aplicação foi implementada no Swagger, sendo assim é possível acessá-la através do [link](https://mushy-calf-wrap.cyclic.cloud/api-doc/)


### Cadastro de usuário

Cria um novo usuário com base nos dados descritos abaixo recebidos no body da requisição e retorna as informações do usuário, acrescentando o `id` cadastrado e excluindo a `senha`.


    POST /usuario

##### Endpoint:

    https://mushy-calf-wrap.cyclic.cloud/usuario

##### Corpo da requisição:

| Parâmetro | Tipo | Descrição|
| ------------ | ------------------------- |------------ |
| `nome`  | `string` | Responsável por armazenar o nome do usuario |
| `email` | `string`| Responsável por armazenar o e-mail do usuario |
| `senha` | `string`| Responsável por armazenar a senha do usuario |

---

### Login do usuário

    POST /login

Permite que o usuário cadastrado realize login no sistema e retorna as informações do usuário acrescentando o token de autenticação.

##### Endpoint:

    https://mushy-calf-wrap.cyclic.cloud/login


##### Corpo da requisição:

| Parâmetro | Tipo | Descrição|
| ------------ | ------------------------- |------------ |
|  `email` | `string`| Responsável por armazenar o e-mail do usuario |
|  `senha` | `string`| Responsável por armazenar a senha do usuario |


---

---

### Listagem das categorias

    GET /categoria

Retorna a listagem de todas as categorias cadastradas.


##### Endpoint:

    https://mushy-calf-wrap.cyclic.cloud/categoria



## **ATENÇÃO**: Todas as funcionalidades (endpoints) a seguir, a partir desse ponto, deverão exigir o token de autenticação do usuário logado, recebendo no header com o formato Bearer Token. 



### Detalhamento do usuário

    GET /usuario

Retorna os dados do usuário logado de acordo com o `id` presente no token de autenticação.


##### Endpoint:

    https://mushy-calf-wrap.cyclic.cloud/usuario

--- 

### Alteração do usuário

    PUT /usuario

Altera os dados do usuário logado baseado nos dados recebidos no body da requisição.

##### Endpoint:

    https://mushy-calf-wrap.cyclic.cloud/usuario


##### Corpo da requisição:

| Parâmetro | Tipo | Descrição|
| ------------ | ------------------------- |------------ |
| `nome`  | `string` | Responsável por armazenar o nome do usuario |
| `email` | `string`| Responsável por armazenar o e-mail do usuario |
| `senha` | `string`| Responsável por armazenar a senha do usuario |

---

### Listagem de produtos

    GET /produto

Retorna a listagem de todos os produtos cadastrados, e caso receba um parâmetro do tipo query  `categoria_id`, realiza a filtragem por categoria.

| Parâmetro query | Tipo | Descrição|
| ------------ | ------------------------- |------------ |
| `categoria_id`  | `number` | Responsável por armazenar o id da categoria baseado na tabela `categorias`  |

##### Endpoint:

    https://mushy-calf-wrap.cyclic.cloud/produto
---

### Detalhamento de produto

    GET /produto/:id

Retorna o produto com base no `id`  do produto recebido como parâmetro de requisição.

| Parâmetro | Tipo | Descrição|
| ------------ | ------------------------- |------------ |
| `id`  | `number` | Responsável por armazenar o id do produto|


##### Endpoint:

    https://mushy-calf-wrap.cyclic.cloud/produto/:id

---

### Criação de produto

    POST /produto

Realiza o cadastro de produto para o usuário logado baseado nos dados recebidos no body da requisição.

##### Endpoint:

    https://mushy-calf-wrap.cyclic.cloud/transacao
    

##### Corpo da requisição:

| Parâmetro | Tipo | Descrição|
| ------------ | ------------------------- |------------ |
| `descricao`  | `string` | Responsável por armazenar a descrição do produto |
|  `valor` |  `number`|  Responsável por armazenar o valor do produto |
|  `quantidade_estoque` |  `number`|  Responsável por armazenar a quantidade do produto em estoque  |
|  `categoria_id` |  `number`|  Responsável por armazenar o id da categoria do produto baseada na tabela `categorias`  |
|  `produto_imagem` |  `string`|  Responsável por armazenar a imagem do produto |

---

### Alteração de produto

    PUT /produto/:id

Altera os dados do produto com base no `id`  do produto recebido como parâmetro de requisição e nos dados recebidos no body da requisição.


| Parâmetro | Tipo | Descrição|
| ------------ | ------------------------- |------------ |
| `id`  | `number` | Responsável por armazenar o id do produto|


##### Endpoint:

    https://mushy-calf-wrap.cyclic.cloud/produto/:id
    


##### Corpo da requisição:

| Parâmetro | Tipo | Descrição|
| ------------ | ------------------------- |------------ |
| `descricao`  | `string` | Responsável por armazenar a descrição do produto |
|  `valor` |  `number`|  Responsável por armazenar o valor do produto |
|  `quantidade_estoque` |  `number`|  Responsável por armazenar a quantidade do produto em estoque  |
|  `categoria_id` |  `number`|  Responsável por armazenar o id da categoria do produto baseada na tabela `categorias`  |
|  `produto_imagem` |  `string`|  Responsável por armazenar a imagem do produto |


--- 

### Deleção de produto

    DELETE /produto/:id

Exclui o produto com base no `id`  do produto recebido como parâmetro de requisição.

*OBS: O produto é deletado somente se não estiver vinculado a nenhum pedido.*

| Parâmetro | Tipo | Descrição|
| ------------ | ------------------------- |------------ |
| `id`  | `number` | Responsável por armazenar o id do produto |


##### Endpoint:

    https://mushy-calf-wrap.cyclic.cloud/produto/:id
  
  ---
  
### Cadastro de cliente

Cria um novo cliente com base nos dados descritos abaixo recebidos no body da requisição e retorna as informações do cliente, acrescentando o `id` cadastrado e excluindo a `senha`.


    POST /cliente

##### Endpoint:

    https://mushy-calf-wrap.cyclic.cloud/cliente

##### Corpo da requisição:

| Parâmetro | Tipo | Descrição|
| ------------ | ------------------------- |------------ |
| `nome`  | `string` | Responsável por armazenar o nome do cliente |
| `email` | `string`| Responsável por armazenar o e-mail do cliente  |
| `cpf` | `string`| Responsável por armazenar o cpf do cliente  |
| `cep` | `string`| Responsável por armazenar o cep do cliente  |
| `numero` | `string`| Responsável por armazenar o numero do endereço do cliente  |

---

### Listagem de clientes

    GET /cliente

Retorna a listagem de todos os clientes cadastrados.

##### Endpoint:

    https://mushy-calf-wrap.cyclic.cloud/cliente
---

### Detalhamento de cliente

    GET /cliente/:id

Retorna o cliente com base no `id`  do cliente recebido como parâmetro de requisição.

| Parâmetro | Tipo | Descrição|
| ------------ | ------------------------- |------------ |
| `id`  | `number` | Responsável por armazenar o id do cliente |


##### Endpoint:

    https://mushy-calf-wrap.cyclic.cloud/produto/:id

---

### Alteração de cliente

    PUT /cliente/:id

Altera os dados do cliente com base no `id`  do cliente recebido como parâmetro de requisição e nos dados recebidos no body da requisição.


| Parâmetro | Tipo | Descrição|
| ------------ | ------------------------- |------------ |
| `id`  | `number` | Responsável por armazenar o id do cliente |



##### Endpoint:

    https://mushy-calf-wrap.cyclic.cloud/cliente/:id

##### Corpo da requisição:

| Parâmetro | Tipo | Descrição|
| ------------ | ------------------------- |------------ |
| `nome`  | `string` | Responsável por armazenar o nome do cliente |
| `email` | `string`| Responsável por armazenar o e-mail do cliente  |
| `cpf` | `string`| Responsável por armazenar o cpf do cliente  |
| `cep` | `string`| Responsável por armazenar o cep do cliente  |
| `numero` | `string`| Responsável por armazenar o numero do endereço do cliente  |

---

### Cadastro de pedido

Cria um novo pedido com base nos dados descritos abaixo recebidos no body da requisição e retorna as informações do pedido.


    POST /pedido

##### Endpoint:

    https://mushy-calf-wrap.cyclic.cloud/pedido

##### Corpo da requisição:

| Parâmetro | Tipo | Descrição|
| ------------ | ------------------------- |------------ |
| `cliente_id`  | `number` | Responsável por armazenar o `id` do cliente com base na tabela `clientes` |
| `observacao` | `string`| Responsável por armazenar a observacao do pedido  |
| `pedido_produtos` | `Array`| Responsável por armazenar o `produto_id` e `quantidade_produto`  |

--- 

### Listagem de pedidos

    GET /pedido

Retorna a listagem de todos os pedidos cadastrados, e caso receba um parâmetro do tipo query  `cliente_id`, realiza a filtragem por cliente.

| Parâmetro query | Tipo | Descrição|
| ------------ | ------------------------- |------------ |
| `cliente_id`  | `number` | Responsável por armazenar o id do cliente baseado na tabela `clientes`  |

##### Endpoint:

    https://mushy-calf-wrap.cyclic.cloud/pedido
---

Feito por [Patricia Magalhães](https://github.com/pmagalhaes2), [Fernanda Charbel](https://github.com/fcharbel), [Tiele Fin](https://github.com/TieleFin) e [Emanuelle Cruz](https://github.com/manuscruz) 💙
