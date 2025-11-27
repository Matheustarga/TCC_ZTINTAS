-- Script de criação do banco de dados ZTINTAS
CREATE DATABASE IF NOT EXISTS ztintas CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE ztintas;

DROP TABLE IF EXISTS usuarios;
DROP TABLE IF EXISTS produtos;
DROP TABLE IF EXISTS categorias;
DROP TABLE IF EXISTS clientes;

CREATE TABLE usuarios (
  id VARCHAR(50) PRIMARY KEY,
  nome VARCHAR(255),
  email VARCHAR(255),
  senha VARCHAR(255),
  cargo VARCHAR(100),
  cpf VARCHAR(20),
  numero VARCHAR(50),
  usuario VARCHAR(100),
  imagemUrl TEXT,
  confsenha VARCHAR(255)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

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

CREATE TABLE categorias (
  id VARCHAR(50) PRIMARY KEY,
  nome VARCHAR(255)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE clientes (
  id VARCHAR(50) PRIMARY KEY,
  nome VARCHAR(255),
  email VARCHAR(255),
  documento VARCHAR(50),
  tipo VARCHAR(50),
  telefone VARCHAR(50),
  dataNascimento VARCHAR(20),
  endereco TEXT,
  status VARCHAR(50),
  categorias VARCHAR(100),
  cep VARCHAR(20),
  logradouro VARCHAR(255),
  complemento VARCHAR(255),
  bairro VARCHAR(255),
  cidade VARCHAR(255),
  uf VARCHAR(10),
  numero VARCHAR(50)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- POPULAÇÃO INICIAL
-- Tabela: usuarios
INSERT INTO usuarios (id, nome, email, senha, cargo, cpf, numero, usuario, imagemUrl, confsenha) VALUES ('4', 'Fernando', 'fernandobt481@gmail.com', '555', 'Administrador', '12345678989', '222222222', 'fernandinho beira mar', 'https://scinter.com.br/wp-content/uploads/2024/11/image-3-17-1024x631.jpg', '555');
INSERT INTO usuarios (id, nome, email, senha, cargo, cpf, numero, usuario, imagemUrl, confsenha) VALUES ('2b92', 'zeze', 'matheus.targa@gmail.com', '55', 'faz', '12345678989', '27898989', 'zezeca', 'https://media1.thrillophilia.com/filestore/n2ib9inwzcilxpg3aumbigvq4jus_IMG_World_Dubai_Fun_38a0986c1a.jpg', '55');
INSERT INTO usuarios (id, nome, email, senha, cargo, cpf, numero, usuario, imagemUrl, confsenha) VALUES ('20d9', 'misaki', 'misakifofinha@gmail.com', '123456', 'Médica', '15912345687', '99999999', 'misaki', 'https://i.pinimg.com/474x/b4/45/f0/b445f03ea5ecb86aa2b4fef71ff74f4b.jpg', '123456');
INSERT INTO usuarios (id, nome, email, senha, cargo, cpf, numero, usuario, imagemUrl, confsenha) VALUES ('1', 'Matheus funcionario', 'matheus@gmail.com', '5', 'Gerente', '12345678989', '996644414', 'matheustarga', '', '5');
INSERT INTO usuarios (id, nome, email, senha, cargo, cpf, numero, usuario, imagemUrl, confsenha) VALUES ('254f', 'aaaaa', 'matheussss@gmail.com', '55', 'gerente', '12345678989', '1254564', 'the thteteutetete', '', '55');
INSERT INTO usuarios (id, nome, email, senha, cargo, cpf, numero, usuario, imagemUrl, confsenha) VALUES ('2ce3', 'zeze', 'zezeca@gmail.com', '55', 'faz tudo', '12312312312', '2799999999', 'zeca', '', '55');

-- Tabela: produtos
INSERT INTO produtos (id, SKU, nome, descricao, categoria, marca, medida, tamanho, precoCusto, precoVenda, quantidade, fornecedor, imagemUrl) VALUES ('1', '0123456789', 'Shampoo CR7', 'Anticaspa, shampoo dos vencedores', 'Saúde e Beleza', 'Clear men', 'mL', 400, 0, 0, 7, 'Ambev', 'https://www.arenaatacado.com.br/on/demandware.static/-/Sites-storefront-catalog-sv/default/dw81b33c52/Produtos/501522-7891150019416-shampoo%20anticaspa%20clear%20men%20sports%20cristiano%20ronaldo%20limpeza%20profunda%20400ml-clear-5.jpg');

-- Tabela: categorias
INSERT INTO categorias (id, nome) VALUES ('1', 'CPF');
INSERT INTO categorias (id, nome) VALUES ('2', 'CNPJ');

-- Tabela: clientes
INSERT INTO clientes (id, nome, email, documento, tipo, telefone, dataNascimento, endereco, status, categorias, cep, logradouro, complemento, bairro, cidade, uf, numero) VALUES ('1', 'Maria das Graças', 'maria@gmail.com', '12345678910', 'PF', '27970707070', '2007-07-07', '{"cep": "29999666", "logradouro": "Rua dos Alfeneiros", "complemento": "Número 4", "bairro": "Terra do nunca", "cidade": "Ilha da bruxaria", "uf": "SP"}', 'Ativo', NULL, '29999666', 'Rua dos Alfeneiros', 'Número 4', 'Terra do nunca', 'Ilha da bruxaria', 'SP', NULL);
INSERT INTO clientes (id, nome, email, documento, tipo, telefone, dataNascimento, endereco, status, categorias, cep, logradouro, complemento, bairro, cidade, uf, numero) VALUES ('093f', 'Fernando De Brito Martins', 'fernandobt481@gmail.com', '12312312312', NULL, NULL, '18052006', NULL, NULL, 'CPF', '79013-794', 'bah', 'bag', 'Morada verde', 'Campo Grande', 'ES', '67992764515');
