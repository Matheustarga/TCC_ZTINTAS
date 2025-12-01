import React from "react";
import { Container, Card } from "react-bootstrap";

const Catalogo = () => {
  return (
    <Container className="mt-4">
      <Card className="shadow-sm">
        <Card.Body>
          <h2 className="mb-3">Catálogo de Produtos</h2>
          <p>
            Em breve você poderá consultar o catálogo completo de produtos por aqui.
          </p>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Catalogo;
