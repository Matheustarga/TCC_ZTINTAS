const Categoria = require("../models/categoriaModel");

module.exports = {
  listar: async (req, res) => {
    try {
      const dados = await Categoria.listar();
      return res.status(200).json(dados);
    } catch (err) {
      return res.status(500).json({ erro: err.message });
    }
  },

  buscarPorId: async (req, res) => {
    try {
      const { id } = req.params;
      const categoria = await Categoria.buscarPorId(id);

      if (!categoria) {
        return res.status(404).json({ mensagem: "Categoria não encontrada." });
      }

      return res.status(200).json(categoria);
    } catch (err) {
      return res.status(500).json({ erro: err.message });
    }
  },

  criar: async (req, res) => {
    try {
      const novaCategoria = await Categoria.criar(req.body);
      return res.status(201).json(novaCategoria);
    } catch (err) {
      return res.status(500).json({ erro: err.message });
    }
  },

  atualizar: async (req, res) => {
    try {
      const { id } = req.params;
      const categoriaAtualizada = await Categoria.atualizar(id, req.body);

      if (!categoriaAtualizada) {
        return res
          .status(404)
          .json({ mensagem: "Categoria não encontrada." });
      }

      return res.status(200).json(categoriaAtualizada);
    } catch (err) {
      return res.status(500).json({ erro: err.message });
    }
  },

  excluir: async (req, res) => {
    try {
      const { id } = req.params;
      const removido = await Categoria.excluir(id);

      if (!removido) {
        return res.status(404).json({ mensagem: "Categoria não encontrada." });
      }

      return res
        .status(200)
        .json({ mensagem: "Categoria excluída com sucesso." });
    } catch (err) {
      return res.status(500).json({ erro: err.message });
    }
  },
};
