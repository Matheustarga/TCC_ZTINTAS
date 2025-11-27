const express = require("express");
const router = express.Router();
const UsuarioController = require("../controllers/usuarioController");

router.get("/", UsuarioController.listar);
router.get("/:id", UsuarioController.buscarPorId);
router.post("/", UsuarioController.criar);
router.put("/:id", UsuarioController.atualizar);
router.delete("/:id", UsuarioController.excluir);

router.post("/login", UsuarioController.login);

module.exports = router;
