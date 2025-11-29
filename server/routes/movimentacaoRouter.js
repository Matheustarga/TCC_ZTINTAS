const express = require("express");
const movimentacaoController = require("../controllers/movimentacaoController");

const router = express.Router();

router.get("/", movimentacaoController.listar);
router.get("/:id", movimentacaoController.buscarPorId);
router.post("/", movimentacaoController.criar);

module.exports = router;
