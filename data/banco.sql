-- Script de criação do banco de dados ZTINTAS
CREATE DATABASE IF NOT EXISTS ztintas CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE ztintas;

DROP TABLE IF EXISTS usuarios;
CREATE TABLE usuarios (
  id VARCHAR(50) PRIMARY KEY,
  nome VARCHAR(255),
  email VARCHAR(255),
  senha VARCHAR(255),
  cargo VARCHAR(100),
  cpf VARCHAR(20),
  numero VARCHAR(20),
  usuario VARCHAR(100),
  imagemUrl TEXT,
  confsenha VARCHAR(255)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS produtos;
CREATE TABLE produtos (
  id VARCHAR(50) PRIMARY KEY,
  SKU VARCHAR(100),
  nome VARCHAR(255),
  descricao TEXT,
  categoria VARCHAR(255),
  marca VARCHAR(255),
  medida VARCHAR(50),
  tamanho DECIMAL(10,2),
  precoCusto DECIMAL(10,2),
  precoVenda DECIMAL(10,2),
  quantidade INT,
  fornecedor VARCHAR(255),
  imagemUrl TEXT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS categorias;
CREATE TABLE categorias (
  id VARCHAR(50) PRIMARY KEY,
  nome VARCHAR(255)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS clientes;
CREATE TABLE clientes (
  id VARCHAR(50) PRIMARY KEY,
  nome VARCHAR(255),
  email VARCHAR(255),
  documento VARCHAR(50),
  tipo VARCHAR(50),
  telefone VARCHAR(50),
  dataNascimento DATE,
  endereco TEXT,
  status VARCHAR(50)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS funcionarios;
CREATE TABLE funcionarios (
  id VARCHAR(50) PRIMARY KEY,
  cargo VARCHAR(100),
  confsenha VARCHAR(255),
  cpf VARCHAR(20),
  email VARCHAR(255),
  nome VARCHAR(255),
  numero VARCHAR(50),
  senha VARCHAR(255),
  usuario VARCHAR(100)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- POPULAÇÃO INICIAL (gerada a partir do server/db.json)

INSERT INTO usuarios (id, nome, email, senha, cargo, cpf, numero, usuario, imagemUrl, confsenha) VALUES ('4', 'Fernando', 'fernandobt481@gmail.com', '555', 'Administrador', '12345678989', '222222222', 'fernandinho beira mar', 'https://scinter.com.br/wp-content/uploads/2024/11/image-3-17-1024x631.jpg', '555');
INSERT INTO usuarios (id, nome, email, senha, cargo, cpf, numero, usuario, imagemUrl, confsenha) VALUES ('2b92', 'zeze', 'matheus.targa@gmail.com', '55', 'faz', '12345678989', '27898989', 'zezinho', NULL, '55');
INSERT INTO usuarios (id, nome, email, senha, cargo, cpf, numero, usuario, imagemUrl, confsenha) VALUES ('2ce3', 'zeze', 'zezeca@gmail.com', '55', 'faz tudo', '12312312312', '2799999999', 'zeca', NULL, '55');

INSERT INTO produtos (id, SKU, nome, descricao, categoria, marca, medida, tamanho, precoCusto, precoVenda, quantidade, fornecedor, imagemUrl) VALUES (
  '1',
  '0123456789',
  'Shampoo CR7',
  'Anticaspa, shampoo dos vencedores',
  'Saúde e Beleza',
  'Clear men',
  'mL',
  400,
  0,
  0,
  7,
  'Ambev',
  'https://www.arenaatacado.com.br/on/demandware.static/-/Sites-storefront-catalog/default/dw0f560ab0/hi-res/7891150075762_02_shampoo%20clear%20men%20cristiano%20ronaldo%20limpeza%20profunda%20400ml-clear-5.jpg'
);

INSERT INTO categorias (id, nome) VALUES ('1', 'CPF');
INSERT INTO categorias (id, nome) VALUES ('2', 'CNPJ');

INSERT INTO clientes (id, nome, email, documento, tipo, telefone, dataNascimento, endereco, status) VALUES (
  '1',
  'Maria das Graças',
  'maria@example.com',
  '12345678900',
  'PF',
  '27999999999',
  '1980-01-01',
  '{"cep":"29999666","logradouro":"Rua dos Alfeneiros","complemento":"Número 4","bairro":"Terra do nunca","cidade":"Ilha da bruxaria","uf":"SP"}',
  'Ativo'
);

INSERT INTO clientes (id, nome, email, documento, tipo, telefone, dataNascimento, endereco, status) VALUES (
  '2',
  'José da Silva',
  'jose@example.com',
  '11222333000199',
  'PJ',
  '27988887777',
  '1975-05-10',
  '{"cep":"29000000","logradouro":"Av. Central","complemento":"Sala 101","bairro":"Centro","cidade":"Vitória","uf":"ES"}',
  'Ativo'
);

INSERT INTO funcionarios (id, cargo, confsenha, cpf, email, nome, numero, senha, usuario) VALUES (
  '1',
  'Gerente',
  '5',
  '12345678989',
  'matheus@gmail.com',
  'Matheus funcionario',
  '996644414',
  '5',
  'matheustarga'
);

INSERT INTO funcionarios (id, cargo, confsenha, cpf, email, nome, numero, senha, usuario) VALUES (
  '2',
  'Atendente',
  '55',
  '98765432100',
  'joao@example.com',
  'João da Loja',
  '27991112222',
  '55',
  'joaoatendente'
);

INSERT INTO funcionarios (id, cargo, confsenha, cpf, email, nome, numero, senha, usuario) VALUES (
  '3',
  'Vendedor',
  '55',
  '12312312312',
  'zezeca@gmail.com',
  'Zeze Vendedor',
  '2799999999',
  '55',
  'zezinho'
);
