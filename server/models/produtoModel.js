const pool = require("../config/db");
const { randomUUID } = require("crypto");

function mapProduto(row) {
  return row;
}

module.exports = {
  listar: async () => {
    const sql = "SELECT * FROM produtos ORDER BY nome ASC";
    const [rows] = await pool.query(sql);
    return rows.map(mapProduto);
  },

  buscarPorId: async (id) => {
    const sql = "SELECT * FROM produtos WHERE id = ?";
    const [rows] = await pool.query(sql, [id]);
    if (!rows[0]) return null;
    return mapProduto(rows[0]);
  },

  criar: async (dados) => {
    const {
      id,
      SKU,
      nome,
      descricao,
      categoria,
      marca,
      medida,
      tamanho,
      precoCusto,
      precoVenda,
      quantidade,
      fornecedor,
      imagemUrl,
    } = dados;

    const novoId = id || randomUUID();

    const sql = `
      INSERT INTO produtos
        (id, SKU, nome, descricao, categoria, marca, medida, tamanho,
         precoCusto, precoVenda, quantidade, fornecedor, imagemUrl)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    await pool.query(sql, [
      novoId,
      SKU || null,
      nome || null,
      descricao || null,
      categoria || null,
      marca || null,
      medida || null,
      typeof tamanho === "number" ? tamanho : tamanho || null,
      precoCusto != null ? precoCusto : null,
      precoVenda != null ? precoVenda : null,
      quantidade != null ? quantidade : null,
      fornecedor || null,
      imagemUrl || null,
    ]);

    return await module.exports.buscarPorId(novoId);
  },


  atualizar: async (id, dados) => {
    // Atualização parcial: só altera os campos presentes em "dados"
    const campos = [];
    const valores = [];

    if (dados.SKU !== undefined) {
      campos.push("SKU = ?");
      valores.push(dados.SKU || null);
    }

    if (dados.nome !== undefined) {
      campos.push("nome = ?");
      valores.push(dados.nome || null);
    }

    if (dados.descricao !== undefined) {
      campos.push("descricao = ?");
      valores.push(dados.descricao || null);
    }

    if (dados.categoria !== undefined) {
      campos.push("categoria = ?");
      valores.push(dados.categoria || null);
    }

    if (dados.marca !== undefined) {
      campos.push("marca = ?");
      valores.push(dados.marca || null);
    }

    if (dados.medida !== undefined) {
      campos.push("medida = ?");
      valores.push(dados.medida || null);
    }

    if (dados.tamanho !== undefined) {
      campos.push("tamanho = ?");
      valores.push(typeof dados.tamanho === "number" ? dados.tamanho : dados.tamanho || null);
    }

    if (dados.precoCusto !== undefined) {
      campos.push("precoCusto = ?");
      valores.push(dados.precoCusto != null ? dados.precoCusto : null);
    }

    if (dados.precoVenda !== undefined) {
      campos.push("precoVenda = ?");
      valores.push(dados.precoVenda != null ? dados.precoVenda : null);
    }

    if (dados.quantidade !== undefined) {
      campos.push("quantidade = ?");
      valores.push(dados.quantidade != null ? dados.quantidade : null);
    }

    if (dados.fornecedor !== undefined) {
      campos.push("fornecedor = ?");
      valores.push(dados.fornecedor || null);
    }

    if (dados.imagemUrl !== undefined) {
      campos.push("imagemUrl = ?");
      valores.push(dados.imagemUrl || null);
    }

    if (dados.status !== undefined) {
      campos.push("status = ?");
      valores.push(dados.status || null);
    }

    // Se nenhum campo foi enviado, não faz nada
    if (campos.length === 0) {
      return null;
    }

    const sql = `
      UPDATE produtos
      SET ${campos.join(", ")}
      WHERE id = ?
    `;

    valores.push(id);

    const [result] = await pool.query(sql, valores);

    if (result.affectedRows === 0) {
      return null;
    }

    return await module.exports.buscarPorId(id);
  },

  excluir: async (id) => {
    const sql = "DELETE FROM produtos WHERE id = ?";
    const [result] = await pool.query(sql, [id]);
    return result.affectedRows > 0;
  },
};
