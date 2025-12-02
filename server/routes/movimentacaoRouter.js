const express = require("express");
const router = express.Router();
const movimentacaoController = require("../controllers/movimentacaoController");

console.log("aqui");

router.get("/", movimentacaoController.listar);
router.get("/:id", movimentacaoController.buscarPorId);
router.post("/", movimentacaoController.criar);

module.exports = router;
