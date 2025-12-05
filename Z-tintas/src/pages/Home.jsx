import { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaBoxOpen, FaHistory, FaBell, FaPlus } from "react-icons/fa";

const Home = () => {
  const [produtos, setProdutos] = useState([]);
  const [movimentacoes, setMovimentacoes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const prodResponse = await fetch("http://localhost:5000/produtos");
        const movResponse = await fetch("http://localhost:5000/movimentacoes");

        if (!prodResponse.ok || !movResponse.ok) {
          throw new Error("Erro ao buscar dados");
        }

        const prodData = await prodResponse.json();
        const movData = await movResponse.json();

        setProdutos(prodData);
        setMovimentacoes(movData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // VAMO QUERER MEU FI QUE ISSO 

  const ultimasMovimentacoes = movimentacoes.slice(-5).reverse();

  if (loading) return <div className="text-center mt-5">Carregando...</div>;

  return (
    <Container className="mt-5">
      <h1 className="mb-4 text-center">Dashboard - Z Tintas</h1>

      {error && <Alert variant="danger">Erro: {error}</Alert>}

      {/* Resumo Rápido */}
      <Row className="mb-4 justify-content-center">
        <Col md={3}>
          <Card className="text-center">
            <Card.Body>
              <FaBoxOpen className="fs-1 text-primary mb-3" />
              <h5>Total de Produtos</h5>
              <h2>{produtos.length}</h2>
            </Card.Body>
          </Card>
        </Col>
       
        <Col md={3}>
          <Card className="text-center">
            <Card.Body>
              <FaHistory className="fs-1 text-info mb-3" />
              <h5>Movimentações</h5>
              <h2>{movimentacoes.length}</h2>
            </Card.Body>
          </Card>
        </Col>
        
      </Row>

      {/* Alertas de Estoque Baixo */}
     

      {/* Ações Rápidas */}
      <Row className="mb-4 justify-content-center">
        <Col md={4}>
          <Card>
            <Card.Body className="text-center">
              <h5>Cadastrar Novo Produto</h5>
              <Link to="/estoque">
                <Button variant="primary">Novo Produto</Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body className="text-center">
              <h5>Registrar Movimentação</h5>
              <Link to="/movimentacoes">
                <Button variant="info">Registrar</Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>
        
      </Row>

      {/* Últimas Movimentações */}
      <Row>
        <Col>
          <Card>
            <Card.Header>
              <h5 className="mb-0">Últimas Movimentações</h5>
            </Card.Header>
            <Card.Body>
              {ultimasMovimentacoes.length > 0 ? (
                <div>
                  {ultimasMovimentacoes.map((mov) => (
                    <div key={mov.id} className="mb-3 pb-3 border-bottom">
                      <div className="d-flex justify-content-between">
                        <span>
                          <strong>ID: {mov.id}</strong> - {mov.tipo === "entrada" ? " Entrada" : " Saída"}
                        </span>
                        <span className="text-muted">
                          {new Date(mov.dataMovimentacao).toLocaleString("pt-BR")}
                        </span>
                      </div>
                      <small>Quantidade: {mov.quantidade} | Motivo: {mov.motivo || "-"}</small>
                    </div>
                  ))}
                  <Link to="/movimentacoes">
                    <Button variant="outline-primary" size="sm">
                      Ver Histórico Completo
                    </Button>
                  </Link>
                </div>
              ) : (
                <p className="text-muted">Nenhuma movimentação registrada</p>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
