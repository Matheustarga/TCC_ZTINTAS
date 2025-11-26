const Funcionario = require("../models/funcionarioModel");

module.exports = {
  listar: async (req, res) => {
    try {
      const dados = await Funcionario.listar();
      return res.status(200).json(dados);
    } catch (err) {
      return res.status(500).json({ erro: err.message });
    }
  },

  buscarPorId: async (req, res) => {
    try {
      const { id } = req.params;
      const funcionario = await Funcionario.buscarPorId(id);

      if (!funcionario) {
        return res
          .status(404)
          .json({ mensagem: "Funcionário não encontrado." });
      }

      return res.status(200).json(funcionario);
    } catch (err) {
      return res.status(500).json({ erro: err.message });
    }
  },

  criar: async (req, res) => {
    try {
      const novoFuncionario = await Funcionario.criar(req.body);
      return res.status(201).json(novoFuncionario);
    } catch (err) {
      return res.status(500).json({ erro: err.message });
    }
  },

  atualizar: async (req, res) => {
    try {
      const { id } = req.params;
      const funcionarioAtualizado = await Funcionario.atualizar(id, req.body);

      if (!funcionarioAtualizado) {
        return res
          .status(404)
          .json({ mensagem: "Funcionário não encontrado." });
      }

      return res.status(200).json(funcionarioAtualizado);
    } catch (err) {
      return res.status(500).json({ erro: err.message });
    }
  },

  excluir: async (req, res) => {
    try {
      const { id } = req.params;
      const removido = await Funcionario.excluir(id);

      if (!removido) {
        return res
          .status(404)
          .json({ mensagem: "Funcionário não encontrado." });
      }

      return res
        .status(200)
        .json({ mensagem: "Funcionário excluído com sucesso." });
    } catch (err) {
      return res.status(500).json({ erro: err.message });
    }
  },
};
