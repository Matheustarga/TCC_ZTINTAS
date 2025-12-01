import React from "react";
import FormularioCliente from "../../components/FormularioCliente/FormularioCliente.jsx";
import { Container, Card } from "react-bootstrap";

const CadastrarCliente = () => {
  return (
    <Container className="mt-4">
      <Card className="shadow-sm">
        <Card.Body>
          <h2 className="mb-4 text-center">Cadastrar Cliente</h2>
          <FormularioCliente page="cadastrar" />
        </Card.Body>
      </Card>
    </Container>
  );
};

export default CadastrarCliente;
