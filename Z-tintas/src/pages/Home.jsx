import React from "react";
import { Container, Card } from "react-bootstrap";

const Home = () => {
  return (
    <Container className="mt-4">
      <Card className="shadow-sm">
        <Card.Body>
          <h2 className="mb-3">Dashboard</h2>
          <p>Bem-vindo ao sistema de gestão Z-Tintas.</p>
          <p>
            Utilize o menu para acessar o estoque, clientes e funcionários.
          </p>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Home;
