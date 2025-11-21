import React, { useState, useEffect } from "react";
import {
  Container,
  Table,
  Button,
  Form,
  Row,
  Col,
  Card,
} from "react-bootstrap";
import { FaEdit, FaTrash, FaSearch, FaPlus } from "react-icons/fa";
import axios from "axios";
import { Link } from "react-router-dom";
import BarraNavegacao from "../../components/BarraNavegacao/BarraNavegacao";
import CadastrarEstoque from "./CadastrarEstoque";

const VerTintas = () => {
  const [tintas, setTintas] = useState([]);
  const [busca, setBusca] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = "http://localhost:5000/produtos"; // Usando 'produtos' conforme db.json

  useEffect(() => {
    fetchTintas();
  }, []);

  const fetchTintas = async () => {
    try {
      const response = await axios.get(API_URL);
      // Filtra os produtos para garantir que estamos listando o que o usuário considera "tintas"
      setTintas(response.data);
      setLoading(false);
    } catch (err) {
      setError(
        "Erro ao carregar as tintas. Verifique se o servidor (json-server) está rodando na porta 5000."
      );
      setLoading(false);
      console.error("Erro ao buscar tintas:", err);
    }
  };

  const handleBuscaChange = (e) => {
    setBusca(e.target.value);
  };

  // ✅ FUNÇÃO DE DELETAR ADICIONADA 
  const handleDelete = async (id) => {
    const confirmar = window.confirm(
      "Tem certeza que deseja excluir esta tinta?"
    );
    if (!confirmar) return;

    try {
      await axios.delete(`${API_URL}/${id}`);
      setTintas((prev) => prev.filter((t) => t.id !== id));
    } catch (err) {
      console.error("Erro ao deletar:", err);
      alert("Erro ao deletar a tinta. Verifique o servidor.");
    }
  };

  const tintasFiltradas = tintas.filter(
    (tinta) =>
      tinta.nome.toLowerCase().includes(busca.toLowerCase()) ||
      tinta.marca.toLowerCase().includes(busca.toLowerCase()) ||
      tinta.SKU.includes(busca)
  );

  if (loading) {
    return (
      <>
        <Container className="mt-5">
          <p>Carregando tintas...</p>
        </Container>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Container className="mt-5">
          <p className="text-danger">{error}</p>
        </Container>
      </>
    );
  }

  return (
    <>
      <Container className="mt-4">
        <h2 className="mb-4">Visualizar Tintas Cadastradas</h2>

        <Card className="mb-4 shadow-sm">
          <Card.Body>
            <Row className="align-items-center">
              <Col md={8}>
                <Form.Group controlId="formBusca">
                  <div className="input-group">
                    <span className="input-group-text bg-custom-blue text-white">
                      <FaSearch />
                    </span>
                    <Form.Control
                      type="text"
                      placeholder="Buscar por nome, marca ou SKU..."
                      value={busca}
                      onChange={handleBuscaChange}
                    />
                  </div>
                </Form.Group>
              </Col>
              <Col md={4} className="text-end">
                <Link to="/estoque">
                  <Button variant="primary" className="bg-custom-blue border-0">
                    <FaPlus className="me-2" />
                    Cadastrar Nova Tinta
                  </Button>
                </Link>
              </Col>
            </Row>
          </Card.Body>
        </Card>

        {tintasFiltradas.length === 0 ? (
          <p className="text-center mt-5">Nenhuma tinta encontrada.</p>
        ) : (
          <Table striped bordered hover responsive className="shadow-sm">
            <thead
              className="table-dark"
              style={{ backgroundColor: "#081F66" }}
            >
              <tr>
                <th>SKU</th>
                <th>Nome</th>
                <th>Marca</th>
                <th>Medida</th>
                <th>Tamanho (L)</th>
                <th>Preço Venda (R$)</th>
                <th>Quantidade</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {tintasFiltradas.map((tinta) => (
                <tr key={tinta.id}>
                  <td>{tinta.SKU}</td>
                  <td>{tinta.nome}</td>
                  <td>{tinta.marca}</td>
                  <td>{tinta.medida}</td>
                  <td>{tinta.tamanho}</td>
                  <td>{tinta.precoVenda.toFixed(2)}</td>
                  <td>{tinta.quantidade}</td>
                  <td>
                    <span
                      className={`badge ${
                        tinta.status === "Ativo" ? "bg-success" : "bg-danger"
                      }`}
                    >
                      {tinta.status}
                    </span>
                  </td>
                  <td>
                    <Link to={`/estoque/editar/${tinta.id}`}>
                      <Button
                        variant="outline-primary"
                        size="sm"
                        className="me-2"
                      >
                        <FaEdit />
                      </Button>
                    </Link>

                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => handleDelete(tinta.id)}
                    >
                      <FaTrash />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Container>
    </>
  );
};

export default VerTintas;
