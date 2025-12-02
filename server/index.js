require("dotenv").config();
const express = require("express");
const cors = require("cors");

const usuarioRouter = require("./routes/usuarioRouter");
const produtoRouter = require("./routes/produtoRouter");
const categoriaRouter = require("./routes/categoriaRouter");
const clienteRouter = require("./routes/clienteRouter");
const movimentacaoRouter = require("./routes/movimentacaoRouter");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Rotas principais
app.use("/usuarios", usuarioRouter);
app.use("/produtos", produtoRouter);
app.use("/categorias", categoriaRouter);
app.use("/clientes", clienteRouter);
app.get("/movimentacoes", movimentacaoRouter);

app.get("/", (req, res) => {
  res.json({ status: "API Z-Tintas rodando 🚀" });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
