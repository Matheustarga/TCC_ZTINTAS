import { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import { BsSearch } from "react-icons/bs";
import { Link } from "react-router-dom";
import axios from "axios";

import BarraNavegacao from "../../components/BarraNavegacao/BarraNavegacao";

const API_URL = "http://localhost:5000/produtos";

const VerTintas = () => {
  const [tintas, setTintas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState("");

  // filtros
  const [buscaNome, setBuscaNome] = useState("");
  const [buscaCategoria, setBuscaCategoria] = useState("");

  const carregarTintas = async () => {
    try {
      setLoading(true);
      const response = await axios.get(API_URL);
      setTintas(response.data || []);
      setErro("");
    } catch (error) {
      console.error(error);
      setErro(
        "Erro ao carregar o estoque. Verifique se o servidor está rodando na porta 5000."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarTintas();
  }, []);

  const handleDelete = async (id, nome) => {
    if (confirm(`Deseja realmente excluir o produto "${nome}" do estoque?`)) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        alert(`Produto "${nome}" excluído com sucesso!`);
        // remove do estado sem precisar dar reload
        setTintas((anteriores) => anteriores.filter((t) => t.id !== id));
      } catch (error) {
        console.error(error);
        alert("Erro ao excluir o produto. Tente novamente.");
      }
    }
  };

  // lista de categorias únicas para o dropdown
  const categoriasUnicas = Array.from(
    new Set(
      tintas
        .map((t) => t.categoria)
        .filter((c) => c !== null && c !== undefined && c !== "")
    )
  );

  const tintasFiltradas = tintas.filter((tinta) => {
    const termoBusca = buscaNome.toLowerCase();

    const nomeOuSkuCorresponde =
      (tinta.nome || "").toLowerCase().includes(termoBusca) ||
      (tinta.SKU || "").toLowerCase().includes(termoBusca);

    const categoriaCorresponde = buscaCategoria
      ? (tinta.categoria || "").toLowerCase() ===
        buscaCategoria.toLowerCase()
      : true;

    return nomeOuSkuCorresponde && categoriaCorresponde;
  });

  const formatarMoeda = (valor) => {
    const numero = Number(valor) || 0;
    return numero.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  return (
    <>
      
      <Container className="mt-4">
        <h2 className="mb-4">Consultar Estoque</h2>

        <Card className="mb-4 shadow-sm">
          <Card.Body>
            <Row className="align-items-center">
              {/* Campo de busca por nome/SKU */}
              <Col md={8}>
                <InputGroup className="mb-3">
                  <InputGroup.Text className="bg-custom-blue text-white">
                    <BsSearch />
                  </InputGroup.Text>
                  <Form.Control
                    placeholder="Buscar por nome ou SKU"
                    value={buscaNome}
                    onChange={(e) => setBuscaNome(e.target.value)}
                  />
                </InputGroup>
              </Col>

              {/* Filtro de categoria + botão cadastrar */}
              <Col md={4} className="text-end">
                <DropdownButton
                  id="dropdown-categoria-estoque"
                  title={buscaCategoria || "Todas as categorias"}
                  variant="secondary"
                  className="me-2 mb-2"
                >
                  <Dropdown.Item onClick={() => setBuscaCategoria("")}>
                    Todas
                  </Dropdown.Item>
                  {categoriasUnicas.map((cat) => (
                    <Dropdown.Item
                      key={cat}
                      onClick={() => setBuscaCategoria(cat)}
                    >
                      {cat}
                    </Dropdown.Item>
                  ))}
                </DropdownButton>

                <Link to="/estoque">
                  <Button variant="success" className="mb-2">
                    Cadastrar novo produto
                  </Button>
                </Link>
              </Col>
            </Row>
          </Card.Body>
        </Card>

        {erro && (
          <p className="text-danger">
            {erro}
          </p>
        )}

        {loading ? (
          <p>Carregando estoque...</p>
        ) : (
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>SKU</th>
                <th>Nome</th>
                <th>Categoria</th>
                <th>Marca</th>
                <th>Medida / Tamanho</th>
                <th>Quantidade</th>
                <th>Preço Venda</th>
                <th>Fornecedor</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {tintasFiltradas.length > 0 ? (
                tintasFiltradas.map((tinta) => (
                  <tr key={tinta.id}>
                    <td>{tinta.id}</td>
                    <td>{tinta.SKU}</td>
                    <td>{tinta.nome}</td>
                    <td>{tinta.categoria}</td>
                    <td>{tinta.marca}</td>
                    <td>
                      {tinta.tamanho} {tinta.medida}
                    </td>
                    <td>{tinta.quantidade}</td>
                    <td>{formatarMoeda(tinta.precoVenda)}</td>
                    <td>{tinta.fornecedor}</td>
                    <td>
                      <div style={{ display: "flex", gap: "8px" }}>
                        <Button
                          as={Link}
                          to={`/estoque/editar/${tinta.id}`}
                          size="sm"
                          variant="warning"
                        >
                          Editar
                        </Button>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => handleDelete(tinta.id, tinta.nome)}
                        >
                          Excluir
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={10} className="text-center">
                    Nenhum produto encontrado no estoque.
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        )}
      </Container>
    </>
  );
};

export default VerTintas;
