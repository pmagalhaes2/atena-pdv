
CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL
);

CREATE TABLE categorias (
    id SERIAL PRIMARY KEY,
    descricao VARCHAR(255) NOT NULL
);

CREATE TABLE produtos (
    id SERIAL PRIMARY KEY,
    descricao VARCHAR(255) NOT NULL,
    quantidade_estoque INT NOT NULL,
    valor INT NOT NULL,
  	categoria_id INT REFERENCES categorias(id) NOT NULL
);

CREATE TABLE clientes ( 
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255),
    email VARCHAR(255) UNIQUE,
    cpf VARCHAR(11) UNIQUE,
    cep VARCHAR(8),
    rua VARCHAR(255),
    numero VARCHAR(10),
    bairro VARCHAR(255),
    cidade VARCHAR(255),
    estado CHAR(2)
);

CREATE TABLE pedidos (
    id SERIAL PRIMARY KEY,
    cliente_id INT NOT NULL REFERENCES clientes(id),
    observacao VARCHAR(255),
    valor_total INT NOT NULL
);

CREATE TABLE pedido_produtos (
    id SERIAL PRIMARY KEY,
    pedido_id INT NOT NULL REFERENCES pedidos(id),
    produto_id INT NOT NULL REFERENCES produtos(id),
    quantidade_produto INT NOT NULL,
    valor_produto INT NOT NULL
);

ALTER TABLE produtos ADD COLUMN produto_imagem VARCHAR(255);