const Produto = require("../models/produtoModel");

module.exports = {
  listar: async (req, res) => {
    try {
      const dados = await Produto.listar();
      return res.status(200).json(dados);
    } catch (err) {
      return res.status(500).json({ erro: err.message });
    }
  },

  buscarPorId: async (req, res) => {
    try {
      const { id } = req.params;
      const produto = await Produto.buscarPorId(id);

      if (!produto) {
        return res.status(404).json({ mensagem: "Produto não encontrado." });
      }

      return res.status(200).json(produto);
    } catch (err) {
      return res.status(500).json({ erro: err.message });
    }
  },

  criar: async (req, res) => {
    try {
      const novoProduto = await Produto.criar(req.body);
      return res.status(201).json(novoProduto);
    } catch (err) {
      return res.status(500).json({ erro: err.message });
    }
  },

  atualizar: async (req, res) => {
    try {
      const { id } = req.params;
      const produtoAtualizado = await Produto.atualizar(id, req.body);

      if (!produtoAtualizado) {
        return res.status(404).json({ mensagem: "Produto não encontrado." });
      }

      return res.status(200).json(produtoAtualizado);
    } catch (err) {
      return res.status(500).json({ erro: err.message });
    }
  },

  excluir: async (req, res) => {
    try {
      const { id } = req.params;
      const removido = await Produto.excluir(id);

      if (!removido) {
        return res.status(404).json({ mensagem: "Produto não encontrado." });
      }

      return res.status(200).json({ mensagem: "Produto excluído com sucesso." });
    } catch (err) {
      return res.status(500).json({ erro: err.message });
    }
  },
};
