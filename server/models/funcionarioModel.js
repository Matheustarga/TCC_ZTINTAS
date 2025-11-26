const pool = require("../config/db");
const { randomUUID } = require("crypto");

function mapFuncionario(row) {
  return row;
}

module.exports = {
  listar: async () => {
    const sql = "SELECT * FROM funcionarios ORDER BY nome ASC";
    const [rows] = await pool.query(sql);
    return rows.map(mapFuncionario);
  },

  buscarPorId: async (id) => {
    const sql = "SELECT * FROM funcionarios WHERE id = ?";
    const [rows] = await pool.query(sql, [id]);
    if (!rows[0]) return null;
    return mapFuncionario(rows[0]);
  },

  criar: async (dados) => {
    const {
      id,
      cargo,
      confsenha,
      cpf,
      email,
      nome,
      numero,
      senha,
      usuario,
    } = dados;

    const novoId = id || randomUUID();

    const sql = `
      INSERT INTO funcionarios
        (id, cargo, confsenha, cpf, email, nome, numero, senha, usuario)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    await pool.query(sql, [
      novoId,
      cargo || null,
      confsenha || null,
      cpf || null,
      email || null,
      nome || null,
      numero || null,
      senha || null,
      usuario || null,
    ]);

    return await module.exports.buscarPorId(novoId);
  },

  atualizar: async (id, dados) => {
    const {
      cargo,
      confsenha,
      cpf,
      email,
      nome,
      numero,
      senha,
      usuario,
    } = dados;

    const sql = `
      UPDATE funcionarios
      SET cargo = ?, confsenha = ?, cpf = ?, email = ?, nome = ?,
          numero = ?, senha = ?, usuario = ?
      WHERE id = ?
    `;

    const [result] = await pool.query(sql, [
      cargo || null,
      confsenha || null,
      cpf || null,
      email || null,
      nome || null,
      numero || null,
      senha || null,
      usuario || null,
      id,
    ]);

    if (result.affectedRows === 0) {
      return null;
    }

    return await module.exports.buscarPorId(id);
  },

  excluir: async (id) => {
    const sql = "DELETE FROM funcionarios WHERE id = ?";
    const [result] = await pool.query(sql, [id]);
    return result.affectedRows > 0;
  },
};
