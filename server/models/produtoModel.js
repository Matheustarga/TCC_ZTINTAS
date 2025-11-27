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
    const {
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

    const sql = `
      UPDATE produtos
      SET SKU = ?, nome = ?, descricao = ?, categoria = ?, marca = ?,
          medida = ?, tamanho = ?, precoCusto = ?, precoVenda = ?,
          quantidade = ?, fornecedor = ?, imagemUrl = ?
      WHERE id = ?
    `;

    const [result] = await pool.query(sql, [
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
      id,
    ]);

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
