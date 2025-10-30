import React from "react";
import FormularioFuncionario from "../../components/FormularioFuncionario/FormularioFuncionario";

import { Container } from "react-bootstrap";

const CadastrarFuncionario = () => {
  return (
    <div>
      <Container>
        <h1 className="text-center">Cadastrar Funcionarios</h1>
        <FormularioFuncionario page="cadastrar" />
      </Container>
    </div>
  );
};

export default CadastrarFuncionario;
