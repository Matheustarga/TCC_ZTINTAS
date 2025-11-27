const pool = require("../config/db");
const { randomUUID } = require("crypto");

module.exports = {
  listar: async () => {
    const sql = "SELECT * FROM categorias ORDER BY nome ASC";
    const [rows] = await pool.query(sql);
    return rows;
  },

  buscarPorId: async (id) => {
    const sql = "SELECT * FROM categorias WHERE id = ?";
    const [rows] = await pool.query(sql, [id]);
    return rows[0] || null;
  },

  criar: async (dados) => {
    const { id, nome } = dados;
    const novoId = id || randomUUID();

    const sql = "INSERT INTO categorias (id, nome) VALUES (?, ?)";
    await pool.query(sql, [novoId, nome || null]);

    return await module.exports.buscarPorId(novoId);
  },

  atualizar: async (id, dados) => {
    const { nome } = dados;
    const sql = "UPDATE categorias SET nome = ? WHERE id = ?";

    const [result] = await pool.query(sql, [nome || null, id]);

    if (result.affectedRows === 0) {
      return null;
    }

    return await module.exports.buscarPorId(id);
  },

  excluir: async (id) => {
    const sql = "DELETE FROM categorias WHERE id = ?";
    const [result] = await pool.query(sql, [id]);
    return result.affectedRows > 0;
  },
};
