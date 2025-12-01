import React from "react";
import FormularioFuncionario from "../../components/FormularioFuncionario/FormularioFuncionario";
import { Container, Card } from "react-bootstrap";

const CadastrarFuncionario = () => {
  return (
    <Container className="mt-4">
      <Card className="shadow-sm">
        <Card.Body>
          <h2 className="mb-4 text-center">Cadastrar Funcionarios</h2>
          <FormularioFuncionario page="cadastrar" />
        </Card.Body>
      </Card>
    </Container>
  );
};

export default CadastrarFuncionario;
