import React from "react";
import FormularioCliente from "../../components/FormularioCliente/FormularioCliente.jsx";
import { Container } from "react-bootstrap";

const CadastrarCliente = () => {
  return (
    <div>
      <Container>
        <h1 className="text-center">Cadastrar Cliente</h1>
        <FormularioCliente page="cadastrar" />
      </Container>
    </div>
  );
};

export default CadastrarCliente;