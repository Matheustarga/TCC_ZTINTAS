import React from "react";
import { Container, Card } from "react-bootstrap";
import FormularioFuncionario from "../../components/FormularioFuncionario/FormularioFuncionario";

const CadastrarFuncionario = () => {
  return (
    <Container className="my-5">
      <h1 className="text-center mb-4">Cadastrar Funcionários</h1>
      <Card className="p-4 shadow-sm">
        <FormularioFuncionario page="cadastrar" />
      </Card>
    </Container>
  );
};

export default CadastrarFuncionario;
