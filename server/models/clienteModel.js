const pool = require("../config/db");
const { randomUUID } = require("crypto");

function mapCliente(row) {
  if (!row) return null;

  if (row.endereco && typeof row.endereco === "string") {
    try {
      row.endereco = JSON.parse(row.endereco);
    } catch (err) {
      // Se não for JSON válido, deixa como string mesmo
    }
  }

  return row;
}

module.exports = {
  listar: async () => {
    const sql = "SELECT * FROM clientes ORDER BY nome ASC";
    const [rows] = await pool.query(sql);
    return rows.map(mapCliente);
  },

  buscarPorId: async (id) => {
    const sql = "SELECT * FROM clientes WHERE id = ?";
    const [rows] = await pool.query(sql, [id]);
    if (!rows[0]) return null;
    return mapCliente(rows[0]);
  },

  criar: async (dados) => {
    const {
      id,
      nome,
      email,
      documento,
      tipo,
      telefone,
      dataNascimento,
      endereco,
      status,
    } = dados;

    const novoId = id || randomUUID();

    const sql = `
      INSERT INTO clientes
        (id, nome, email, documento, tipo, telefone, dataNascimento,
         endereco, status)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const enderecoStr =
      endereco && typeof endereco === "object"
        ? JSON.stringify(endereco)
        : endereco || null;

    await pool.query(sql, [
      novoId,
      nome || null,
      email || null,
      documento || null,
      tipo || null,
      telefone || null,
      dataNascimento || null,
      enderecoStr,
      status || null,
    ]);

    return await module.exports.buscarPorId(novoId);
  },

  atualizar: async (id, dados) => {
    const {
      nome,
      email,
      documento,
      tipo,
      telefone,
      dataNascimento,
      endereco,
      status,
    } = dados;

    const sql = `
      UPDATE clientes
      SET nome = ?, email = ?, documento = ?, tipo = ?, telefone = ?,
          dataNascimento = ?, endereco = ?, status = ?
      WHERE id = ?
    `;

    const enderecoStr =
      endereco && typeof endereco === "object"
        ? JSON.stringify(endereco)
        : endereco || null;

    const [result] = await pool.query(sql, [
      nome || null,
      email || null,
      documento || null,
      tipo || null,
      telefone || null,
      dataNascimento || null,
      enderecoStr,
      status || null,
      id,
    ]);

    if (result.affectedRows === 0) {
      return null;
    }

    return await module.exports.buscarPorId(id);
  },

  excluir: async (id) => {
    const sql = "DELETE FROM clientes WHERE id = ?";
    const [result] = await pool.query(sql, [id]);
    return result.affectedRows > 0;
  },
};
