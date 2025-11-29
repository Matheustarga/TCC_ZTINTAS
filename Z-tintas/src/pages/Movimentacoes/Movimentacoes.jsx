import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Table,
  Card,
  Alert,
  Badge,
} from "react-bootstrap";
import axios from "axios";

const API_URL = "http://localhost:5000/movimentacoes";
const PRODUTOS_URL = "http://localhost:5000/produtos";

const Movimentacoes = () => {
  const [movimentacoes, setMovimentacoes] = useState([]);
  const [produtos, setProdutos] = useState([]);
  const [produtoId, setProdutoId] = useState("");
  const [tipo, setTipo] = useState("entrada");
  const [quantidade, setQuantidade] = useState("");
  const [motivo, setMotivo] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const usuarioId = localStorage.getItem("id");

  useEffect(() => {
    const carregarDados = async () => {
      try {
        setLoading(true);
        setError("");

        const [respMov, respProd] = await Promise.all([
          axios.get(API_URL),
          axios.get(PRODUTOS_URL),
        ]);

        setMovimentacoes(respMov.data || []);
        setProdutos(respProd.data || []);
      } catch (err) {
        console.error("Erro ao carregar dados de movimentações:", err);
        setError(
          "Erro ao carregar movimentações ou produtos. Verifique se o servidor está rodando na porta 5000."
        );
      } finally {
        setLoading(false);
      }
    };

    carregarDados();
  }, []);

  const handleSalvar = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!usuarioId) {
      setError("Usuário não identificado. Faça login novamente.");
      return;
    }

    if (!produtoId) {
      setError("Selecione um produto.");
      return;
    }

    const qtdNumero = parseInt(quantidade, 10);
    if (!qtdNumero || qtdNumero <= 0) {
      setError("Informe uma quantidade válida maior que zero.");
      return;
    }

    try {
      setSaving(true);

      const payload = {
        produtoId,
        tipo,
        quantidade: qtdNumero,
        motivo,
        usuarioId,
      };

      const response = await axios.post(API_URL, payload);

      // Adiciona o registro recém-criado no topo da lista
      setMovimentacoes((prev) => [response.data, ...(prev || [])]);

      setSuccess("Movimentação registrada com sucesso!");
      setQuantidade("");
      setMotivo("");
    } catch (err) {
      console.error("Erro ao registrar movimentação:", err);
      const mensagem =
        err.response?.data?.mensagem ||
        "Erro ao registrar movimentação. Verifique os dados.";
      setError(mensagem);
    } finally {
      setSaving(false);
    }
  };

  const getNomeProduto = (id) => {
    const prod = produtos.find((p) => p.id === id);
    return prod ? `${prod.nome} (${prod.SKU})` : id;
  };

  const formatarDataHora = (valor) => {
    if (!valor) return "";
    try {
      const data = new Date(valor);
      if (Number.isNaN(data.getTime())) return String(valor);
      return data.toLocaleString("pt-BR");
    } catch {
      return String(valor);
    }
  };

  return (
    <Container fluid className="mt-4">
      <Row className="mb-3">
        <Col>
          <h2>Movimentações de Estoque</h2>
          <p className="text-muted mb-0">
            Registre entradas e saídas e acompanhe o histórico de estoque.
          </p>
        </Col>
      </Row>

      {/* Alertas */}
      <Row className="mb-3">
        <Col>
          {error && (
            <Alert
              variant="danger"
              onClose={() => setError("")}
              dismissible
              className="mb-2"
            >
              {error}
            </Alert>
          )}
          {success && (
            <Alert
              variant="success"
              onClose={() => setSuccess("")}
              dismissible
              className="mb-2"
            >
              {success}
            </Alert>
          )}
        </Col>
      </Row>

      {/* Formulário de nova movimentação */}
      <Row className="mb-4">
        <Col>
          <Card>
            <Card.Body>
              <Card.Title className="mb-3">
                Registrar movimentação
              </Card.Title>
              <Form onSubmit={handleSalvar}>
                <Row className="align-items-end">
                  <Col md={4} className="mb-3">
                    <Form.Group controlId="produtoId">
                      <Form.Label>Produto</Form.Label>
                      <Form.Select
                        value={produtoId}
                        onChange={(e) => setProdutoId(e.target.value)}
                        required
                      >
                        <option value="">Selecione um produto</option>
                        {produtos.map((p) => (
                          <option key={p.id} value={p.id}>
                            {p.nome} ({p.SKU})
                          </option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </Col>

                  <Col md={3} className="mb-3">
                    <Form.Group controlId="tipo">
                      <Form.Label>Tipo de movimentação</Form.Label>
                      <Form.Select
                        value={tipo}
                        onChange={(e) => setTipo(e.target.value)}
                      >
                        <option value="entrada">Entrada</option>
                        <option value="saida">Saída</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>

                  <Col md={2} className="mb-3">
                    <Form.Group controlId="quantidade">
                      <Form.Label>Quantidade</Form.Label>
                      <Form.Control
                        type="number"
                        min="1"
                        value={quantidade}
                        onChange={(e) => setQuantidade(e.target.value)}
                        required
                      />
                    </Form.Group>
                  </Col>

                  <Col md={3} className="mb-3">
                    <Form.Group controlId="motivo">
                      <Form.Label>Motivo (opcional)</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Ex.: Compra fornecedor, venda, ajuste..."
                        value={motivo}
                        onChange={(e) => setMotivo(e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col className="text-end">
                    <Button type="submit" disabled={saving}>
                      {saving ? "Salvando..." : "Salvar"}
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Tabela de movimentações */}
      <Row>
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>Histórico de movimentações</Card.Title>
              {loading ? (
                <p>Carregando movimentações...</p>
              ) : movimentacoes && movimentacoes.length > 0 ? (
                <div className="table-responsive">
                  <Table striped bordered hover size="sm" className="mt-3">
                    <thead>
                      <tr>
                        <th>Data/Hora</th>
                        <th>Produto</th>
                        <th>Tipo</th>
                        <th>Quantidade</th>
                        <th>Motivo</th>
                        <th>Usuário</th>
                      </tr>
                    </thead>
                    <tbody>
                      {movimentacoes.map((mov) => (
                        <tr key={mov.id}>
                          <td>{formatarDataHora(mov.dataMovimentacao)}</td>
                          <td>
                            {mov.produtoNome && mov.produtoSKU
                              ? `${mov.produtoNome} (${mov.produtoSKU})`
                              : getNomeProduto(mov.produtoId)}
                          </td>
                          <td>
                            <Badge
                              bg={
                                mov.tipo === "entrada"
                                  ? "success"
                                  : "danger"
                              }
                            >
                              {mov.tipo === "entrada" ? "Entrada" : "Saída"}
                            </Badge>
                          </td>
                          <td>{mov.quantidade}</td>
                          <td>{mov.motivo || "-"}</td>
                          <td>{mov.usuarioNome || mov.usuarioId}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              ) : (
                <p className="mt-3">
                  Nenhuma movimentação registrada até o momento.
                </p>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Movimentacoes;
