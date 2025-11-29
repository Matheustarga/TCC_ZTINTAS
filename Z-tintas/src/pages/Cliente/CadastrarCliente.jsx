import React from "react";
import { Container, Card } from "react-bootstrap";
import FormularioCliente from "../../components/FormularioCliente/FormularioCliente.jsx";

const CadastrarCliente = () => {
  return (
    <Container className="my-5">
      <h1 className="text-center mb-4">Cadastrar Cliente</h1>
      <Card className="p-4 shadow-sm">
        <FormularioCliente page="cadastrar" />
      </Card>
    </Container>
  );
};

export default CadastrarCliente;
