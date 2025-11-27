const Usuario = require("../models/usuarioModel");

module.exports = {
  // LISTAR TODOS OS USUÁRIOS
  listar: async (req, res) => {
    try {
      const dados = await Usuario.listar();
      return res.status(200).json(dados);
    } catch (err) {
      return res.status(500).json({ erro: err.message });
    }
  },

  // BUSCAR POR ID
  buscarPorId: async (req, res) => {
    try {
      const { id } = req.params;
      const usuario = await Usuario.buscarPorId(id);

      if (!usuario) {
        return res.status(404).json({ mensagem: "Usuário não encontrado." });
      }

      return res.status(200).json(usuario);
    } catch (err) {
      return res.status(500).json({ erro: err.message });
    }
  },

  // CRIAR
  criar: async (req, res) => {
    try {
      const novoUsuario = await Usuario.criar(req.body);
      return res.status(201).json(novoUsuario);
    } catch (err) {
      return res.status(500).json({ erro: err.message });
    }
  },

  // ATUALIZAR
  atualizar: async (req, res) => {
    try {
      const { id } = req.params;
      const usuarioAtualizado = await Usuario.atualizar(id, req.body);

      if (!usuarioAtualizado) {
        return res.status(404).json({ mensagem: "Usuário não encontrado." });
      }

      return res.status(200).json(usuarioAtualizado);
    } catch (err) {
      return res.status(500).json({ erro: err.message });
    }
  },

  // EXCLUIR
  excluir: async (req, res) => {
    try {
      const { id } = req.params;
      const removido = await Usuario.excluir(id);

      if (!removido) {
        return res.status(404).json({ mensagem: "Usuário não encontrado." });
      }

      return res.status(200).json({ mensagem: "Usuário excluído com sucesso." });
    } catch (err) {
      return res.status(500).json({ erro: err.message });
    }
  },

  // LOGIN
  login: async (req, res) => {
    try {
      const { email, senha } = req.body;

      if (!email || !senha) {
        return res
          .status(400)
          .json({ mensagem: "Email e senha são obrigatórios." });
      }

      const usuario = await Usuario.login(email, senha);

      if (!usuario) {
        return res
          .status(401)
          .json({ mensagem: "Credenciais inválidas." });
      }

      return res.status(200).json({
        mensagem: "Login realizado com sucesso.",
        usuario: {
          id: usuario.id,
          nome: usuario.nome,
          email: usuario.email,
          // front costuma esperar 'tipo'; aqui usamos o cargo como tipo de usuário
          tipo: usuario.cargo,
        },
      });
    } catch (err) {
      return res.status(500).json({ erro: err.message });
    }
  },
};
