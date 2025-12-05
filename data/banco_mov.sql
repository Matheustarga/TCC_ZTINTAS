-- Script de criação do banco de dados ZTINTAS
CREATE DATABASE IF NOT EXISTS ztintas CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE ztintas;

DROP TABLE IF EXISTS movimentacoes;

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

ALTER TABLE produtos
ADD COLUMN status VARCHAR(50) NOT NULL DEFAULT 'Ativo';


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

CREATE TABLE movimentacoes (
  id VARCHAR(50) PRIMARY KEY,
  produtoId VARCHAR(50) NOT NULL,
  tipo ENUM('entrada','saida') NOT NULL,
  quantidade INT NOT NULL,
  motivo VARCHAR(255),
  dataMovimentacao DATETIME DEFAULT CURRENT_TIMESTAMP,
  usuarioId VARCHAR(50) NOT NULL,
  FOREIGN KEY (produtoId) REFERENCES produtos(id),
  FOREIGN KEY (usuarioId) REFERENCES usuarios(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- POPULAÇÃO INICIAL
-- Tabela: usuarios
-- POPULAÇÃO INICIAL
------------------------------------------------------------
-- Tabela: usuarios
------------------------------------------------------------
INSERT INTO usuarios (id, nome, email, senha, cargo, cpf, numero, usuario, imagemUrl, confsenha) VALUES
('u001', 'Eduardo Gonçalves', 'eduardo.goncalves@ztintas.com', '123456', 'Administrador', '12345678901', '27999990001', 'eduardo.g', 'https://example.com/imagens/usuarios/eduardo.jpg', '123456'),
('u002', 'Mariana Alves', 'mariana.alves@ztintas.com', '123456', 'Coordenadora Comercial', '23456789012', '27999990002', 'mariana.alves', 'https://example.com/imagens/usuarios/mariana.jpg', '123456'),
('u003', 'Carlos Henrique', 'carlos.henrique@ztintas.com', '123456', 'Vendedor Externo', '34567890123', '27999990003', 'carlos.h', 'https://example.com/imagens/usuarios/carlos.jpg', '123456'),
('u004', 'Fernando Brito', 'fernando@gmail.com', '123456', 'Assistente Administrativo', '45678901234', '27999990004', 'fernando.b', 'https://direitoprocessual.org/wp-content/uploads/2020/06/fernando-de-brito.gif', '123456'),
('u005', 'Rodrigo Martins', 'rodrigo.martins@ztintas.com', '123456', 'Técnico de Suporte', '56789012345', '27999990005', 'rodrigo.m', 'https://example.com/imagens/usuarios/rodrigo.jpg', '123456');

------------------------------------------------------------
-- Tabela: produtos
------------------------------------------------------------
INSERT INTO produtos (id, SKU, nome, descricao, categoria, marca, medida, tamanho, precoCusto, precoVenda, quantidade, fornecedor, imagemUrl) VALUES
('p001', 'ACM-4MM-BRANCO-001', 'Chapa ACM Branco Fosco 4mm', 'Chapa de ACM branco fosco 4mm para comunicação visual e fachadas.', 'ACM', 'ZTintas', 'm²', 4.00, 120.00, 189.90, 150, 'AluComp Brasil', 'https://example.com/imagens/produtos/acm_branco_4mm.jpg'),
('p002', 'LONA-FRONT-440-002', 'Lona Front 440g Brilho', 'Lona frontlight 440g com acabamento brilho para impressão digital.', 'Lona', 'ZTintas', 'm²', 0.44, 18.00, 32.90, 500, 'FlexMidia Distribuidora', 'https://example.com/imagens/produtos/lona_front_440.jpg'),
('p003', 'VINIL-BRANCO-MONO-003', 'Vinil Branco Monomérico', 'Vinil adesivo branco monomérico para aplicações internas e externas de curta duração.', 'Vinil', 'ZTintas', 'm²', 0.10, 9.50, 19.90, 800, 'Adesiva Brasil', 'https://example.com/imagens/produtos/vinil_branco_mono.jpg'),
('p004', 'TINTA-ECO-004', 'Tinta Eco-Solvente Ciano 1L', 'Tinta eco-solvente ciano de alta performance para impressoras de grande formato.', 'Tinta', 'InkPro', 'L', 1.00, 95.00, 169.90, 40, 'InkPro Supplies', 'https://example.com/imagens/produtos/tinta_eco_ciano.jpg'),
('p005', 'TINTA-UV-005', 'Tinta UV Led Preta 1L', 'Tinta UV led preta para equipamentos de impressão rígida e flexível.', 'Tinta', 'UltraUV', 'L', 1.00, 150.00, 259.90, 25, 'UltraUV Technologies', 'https://example.com/imagens/produtos/tinta_uv_preta.jpg');

-- Obs.: a coluna "status" de produtos será preenchida com o DEFAULT 'Ativo'
-- definido pelo ALTER TABLE produtos ADD COLUMN status VARCHAR(50) NOT NULL DEFAULT 'Ativo';

------------------------------------------------------------
-- Tabela: categorias
------------------------------------------------------------
INSERT INTO categorias (id, nome) VALUES
('c001', 'PF'),
('c002', 'PJ');
-- ('c003', 'Agência de Publicidade'),
-- ('c004', 'Bureau de Impressão'),
-- ('c005', 'Loja de Comunicação Visual');

------------------------------------------------------------
-- Tabela: clientes
------------------------------------------------------------
INSERT INTO clientes (id, nome, email, documento, tipo, telefone, dataNascimento, endereco, status, categorias, cep, logradouro, complemento, bairro, cidade, uf, numero) VALUES
('cli001', 'Alfa Comunicação Visual', 'contato@alfacomunicacao.com.br', '12.345.678/0001-90', 'PJ', '27999980001', NULL,
 '{"cep":"29000000","logradouro":"Avenida Vitória","complemento":"Sala 305","bairro":"Centro","cidade":"Vitória","uf":"ES"}',
 'Ativo', 'Pessoa Jurídica', '29000000', 'Avenida Vitória', 'Sala 305', 'Centro', 'Vitória', 'ES', '305'),
('cli002', 'Beta Sinalização e Plotagens', 'comercial@betasinalizacao.com.br', '23.456.789/0001-55', 'PJ', '27999980002', NULL,
 '{"cep":"29100000","logradouro":"Rua das Palmeiras","complemento":"Galpão 02","bairro":"Distrito Industrial","cidade":"Serra","uf":"ES"}',
 'Ativo', 'Bureau de Impressão', '29100000', 'Rua das Palmeiras', 'Galpão 02', 'Distrito Industrial', 'Serra', 'ES', '02'),
('cli003', 'Carlos Eduardo Souza', 'carlos.souza@gmail.com', '123.456.789-10', 'PF', '27999980003', '1988-05-12',
 '{"cep":"29150000","logradouro":"Rua das Acácias","complemento":"Casa 14","bairro":"Jardim Tropical","cidade":"Vila Velha","uf":"ES"}',
 'Ativo', 'Pessoa Física', '29150000', 'Rua das Acácias', 'Casa 14', 'Jardim Tropical', 'Vila Velha', 'ES', '14'),
('cli004', 'Delta Outdoor Mídia', 'financeiro@deltaoutdoor.com.br', '34.567.890/0001-22', 'PJ', '27999980004', NULL,
 '{"cep":"29900000","logradouro":"Avenida Beira Mar","complemento":"Loja 01","bairro":"Praia do Canto","cidade":"Vitória","uf":"ES"}',
 'Inativo', 'Agência de Publicidade', '29900000', 'Avenida Beira Mar', 'Loja 01', 'Praia do Canto', 'Vitória', 'ES', '01'),
('cli005', 'Estúdio Criar Design', 'studio@criardesign.com.br', '45.678.901/0001-11', 'PJ', '27999980005', NULL,
 '{"cep":"29200000","logradouro":"Rua Projetada","complemento":"Conjunto 202","bairro":"Centro","cidade":"Guarapari","uf":"ES"}',
 'Ativo', 'Loja de Comunicação Visual', '29200000', 'Rua Projetada', 'Conjunto 202', 'Centro', 'Guarapari', 'ES', '202');

------------------------------------------------------------
-- Tabela: movimentacoes
-- Lembrando: produtoId deve existir em produtos, usuarioId deve existir em usuarios
------------------------------------------------------------
INSERT INTO movimentacoes (id, produtoId, tipo, quantidade, motivo, dataMovimentacao, usuarioId) VALUES
('mov001', 'p001', 'entrada', 50, 'Reposição de estoque - compra fornecedor AluComp Brasil', '2025-01-05 09:30:00', 'u002'),
('mov002', 'p002', 'saida',   30, 'Venda para cliente Alfa Comunicação Visual',           '2025-01-06 14:15:00', 'u003'),
('mov003', 'p003', 'entrada', 200, 'Compra programada - contrato anual',                   '2025-01-07 10:45:00', 'u001'),
('mov004', 'p004', 'saida',   10, 'Consumo em impressora de demonstração interna',        '2025-01-08 16:20:00', 'u005'),
('mov005', 'p005', 'saida',    5, 'Venda para cliente Beta Sinalização e Plotagens',      '2025-01-09 11:00:00', 'u003');
