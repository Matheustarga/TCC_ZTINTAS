const pool = require("../config/db");
const { randomUUID } = require("crypto");

function mapMovimentacao(row) {
  return row;
}

module.exports = {
  listar: async () => {
    const sql = `
      SELECT 
        m.*,
        p.nome AS produtoNome,
        p.SKU AS produtoSKU,
        u.nome AS usuarioNome
      FROM movimentacoes m
      JOIN produtos p ON m.produtoId = p.id
      JOIN usuarios u ON m.usuarioId = u.id
      ORDER BY m.dataMovimentacao DESC
    `;
    const [rows] = await pool.query(sql);
    return rows.map(mapMovimentacao);
  },

  buscarPorId: async (id) => {
    const sql = `
      SELECT 
        m.*,
        p.nome AS produtoNome,
        p.SKU AS produtoSKU,
        u.nome AS usuarioNome
      FROM movimentacoes m
      JOIN produtos p ON m.produtoId = p.id
      JOIN usuarios u ON m.usuarioId = u.id
      WHERE m.id = ?
    `;
    const [rows] = await pool.query(sql, [id]);
    if (!rows[0]) return null;
    return mapMovimentacao(rows[0]);
  },

  criar: async ({ produtoId, tipo, quantidade, motivo, usuarioId }) => {
    if (!produtoId || !tipo || !quantidade || !usuarioId) {
      throw new Error("Dados obrigatórios não informados.");
    }

    const qtd = parseInt(quantidade, 10);
    if (Number.isNaN(qtd) || qtd <= 0) {
      throw new Error("Quantidade inválida.");
    }

    if (tipo !== "entrada" && tipo !== "saida") {
      throw new Error("Tipo de movimentação inválido.");
    }

    const connection = await pool.getConnection();
    try {
      await connection.beginTransaction();

      // Buscar produto atual
      const [prodRows] = await connection.query(
        "SELECT quantidade FROM produtos WHERE id = ? FOR UPDATE",
        [produtoId]
      );
      if (!prodRows[0]) {
        throw new Error("Produto não encontrado.");
      }

      const estoqueAtual = prodRows[0].quantidade || 0;
      let novoEstoque = estoqueAtual;

      if (tipo === "entrada") {
        novoEstoque = estoqueAtual + qtd;
      } else if (tipo === "saida") {
        if (estoqueAtual < qtd) {
          throw new Error("Estoque insuficiente para saída.");
        }
        novoEstoque = estoqueAtual - qtd;
      }

      // Atualizar estoque do produto
      await connection.query(
        "UPDATE produtos SET quantidade = ? WHERE id = ?",
        [novoEstoque, produtoId]
      );

      const id = randomUUID();
      const [result] = await connection.query(
        "INSERT INTO movimentacoes (id, produtoId, tipo, quantidade, motivo, usuarioId) VALUES (?, ?, ?, ?, ?, ?)",
        [id, produtoId, tipo, qtd, motivo || null, usuarioId]
      );

      await connection.commit();

      // Retornar registro criado com joins
      const [rows] = await connection.query(
        `SELECT 
           m.*,
           p.nome AS produtoNome,
           p.SKU AS produtoSKU,
           u.nome AS usuarioNome
         FROM movimentacoes m
         JOIN produtos p ON m.produtoId = p.id
         JOIN usuarios u ON m.usuarioId = u.id
         WHERE m.id = ?`,
        [id]
      );

      if (!rows[0]) {
        return null;
      }

      return mapMovimentacao(rows[0]);
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  },
};
