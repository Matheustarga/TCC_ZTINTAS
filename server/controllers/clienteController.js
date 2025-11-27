const Cliente = require("../models/clienteModel");

module.exports = {
  listar: async (req, res) => {
    try {
      const dados = await Cliente.listar();
      return res.status(200).json(dados);
    } catch (err) {
      return res.status(500).json({ erro: err.message });
    }
  },

  buscarPorId: async (req, res) => {
    try {
      const { id } = req.params;
      const cliente = await Cliente.buscarPorId(id);

      if (!cliente) {
        return res.status(404).json({ mensagem: "Cliente não encontrado." });
      }

      return res.status(200).json(cliente);
    } catch (err) {
      return res.status(500).json({ erro: err.message });
    }
  },

  criar: async (req, res) => {
    try {
      const novoCliente = await Cliente.criar(req.body);
      return res.status(201).json(novoCliente);
    } catch (err) {
      return res.status(500).json({ erro: err.message });
    }
  },

  atualizar: async (req, res) => {
    try {
      const { id } = req.params;
      const clienteAtualizado = await Cliente.atualizar(id, req.body);

      if (!clienteAtualizado) {
        return res.status(404).json({ mensagem: "Cliente não encontrado." });
      }

      return res.status(200).json(clienteAtualizado);
    } catch (err) {
      return res.status(500).json({ erro: err.message });
    }
  },

  excluir: async (req, res) => {
    try {
      const { id } = req.params;
      const removido = await Cliente.excluir(id);

      if (!removido) {
        return res.status(404).json({ mensagem: "Cliente não encontrado." });
      }

      return res
        .status(200)
        .json({ mensagem: "Cliente excluído com sucesso." });
    } catch (err) {
      return res.status(500).json({ erro: err.message });
    }
  },
};
