const pool = require("../config/db");
const { randomUUID } = require("crypto");

function mapUsuario(row) {
  return row;
}

module.exports = {
  // LISTAR TODOS
  listar: async () => {
    const sql = "SELECT * FROM usuarios ORDER BY nome ASC";
    const [rows] = await pool.query(sql);
    return rows.map(mapUsuario);
  },

  // BUSCAR POR ID
  buscarPorId: async (id) => {
    const sql = "SELECT * FROM usuarios WHERE id = ?";
    const [rows] = await pool.query(sql, [id]);
    if (!rows[0]) return null;
    return mapUsuario(rows[0]);
  },

  // CRIAR
  criar: async (dados) => {
    const {
      id,
      nome,
      email,
      senha,
      cargo,
      cpf,
      numero,
      usuario,
      imagemUrl,
      confsenha,
    } = dados;

    const novoId = id || randomUUID();

    const sql = `
      INSERT INTO usuarios
        (id, nome, email, senha, cargo, cpf, numero, usuario, imagemUrl, confsenha)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    await pool.query(sql, [
      novoId,
      nome || null,
      email || null,
      senha || null,
      cargo || null,
      cpf || null,
      numero || null,
      usuario || null,
      imagemUrl || null,
      confsenha || null,
    ]);

    return await module.exports.buscarPorId(novoId);
  },

  // ATUALIZAR
  atualizar: async (id, dados) => {
    const {
      nome,
      email,
      senha,
      cargo,
      cpf,
      numero,
      usuario,
      imagemUrl,
      confsenha,
    } = dados;

    const sql = `
      UPDATE usuarios
      SET nome = ?, email = ?, senha = ?, cargo = ?, cpf = ?, numero = ?,
          usuario = ?, imagemUrl = ?, confsenha = ?
      WHERE id = ?
    `;

    const [result] = await pool.query(sql, [
      nome || null,
      email || null,
      senha || null,
      cargo || null,
      cpf || null,
      numero || null,
      usuario || null,
      imagemUrl || null,
      confsenha || null,
      id,
    ]);

    if (result.affectedRows === 0) {
      return null;
    }

    return await module.exports.buscarPorId(id);
  },

  // EXCLUIR
  excluir: async (id) => {
    const sql = "DELETE FROM usuarios WHERE id = ?";
    const [result] = await pool.query(sql, [id]);
    return result.affectedRows > 0;
  },

  // LOGIN — BUSCAR POR EMAIL E SENHA
  login: async (email, senha) => {
    const sql = "SELECT * FROM usuarios WHERE email = ? AND senha = ?";
    const [rows] = await pool.query(sql, [email, senha]);
    if (!rows[0]) return null;
    return mapUsuario(rows[0]);
  },
};
