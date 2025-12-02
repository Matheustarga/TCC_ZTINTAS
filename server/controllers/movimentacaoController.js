const movimentacaoModel = require("../models/movimentacaoModel");

module.exports = {
  listar: async (req, res) => {
    try {
      const movimentacoes = await movimentacaoModel.listar();
      console.log(movimentacoes);
      
      res.json(movimentacoes);
    } catch (error) {
      console.error("Erro ao listar movimentações:", error);
      res.status(500).json({ mensagem: "Erro ao listar movimentações." });
    }
  },

  buscarPorId: async (req, res) => {
    try {
      const { id } = req.params;
      const movimentacao = await movimentacaoModel.buscarPorId(id);
      if (!movimentacao) {
        return res.status(404).json({ mensagem: "Movimentação não encontrada." });
      }
      res.json(movimentacao);
    } catch (error) {
      console.error("Erro ao buscar movimentação:", error);
      res.status(500).json({ mensagem: "Erro ao buscar movimentação." });
    }
  },

  criar: async (req, res) => {
    try {
      const { produtoId, tipo, quantidade, motivo, usuarioId } = req.body;

      if (!produtoId || !tipo || !quantidade || !usuarioId) {
        return res
          .status(400)
          .json({ mensagem: "produtoId, tipo, quantidade e usuarioId são obrigatórios." });
      }

      try {
        const movimentacaoCriada = await movimentacaoModel.criar({
          produtoId,
          tipo,
          quantidade,
          motivo,
          usuarioId,
        });
        res.status(201).json(movimentacaoCriada);
      } catch (error) {
        console.error("Erro de regra de negócio ao criar movimentação:", error);
        return res.status(400).json({ mensagem: error.message || "Erro ao criar movimentação." });
      }
    } catch (error) {
      console.error("Erro inesperado ao criar movimentação:", error);
      res.status(500).json({ mensagem: "Erro inesperado ao criar movimentação." });
    }
  },
};
