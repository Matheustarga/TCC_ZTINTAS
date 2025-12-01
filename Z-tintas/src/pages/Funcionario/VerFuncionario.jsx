import { useState } from 'react';
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

import { useListarFuncionarios, useDeletaFuncionario } from "../../hooks/useFuncionarios";

const VerFuncionario = () => {
  // variável para armazenar a lista de funcionários
  const funcionarios = useListarFuncionarios();

  const { deletarFuncionario } = useDeletaFuncionario();

  const handleDelete = async (id, nome) => {
    if (confirm(`Deseja realmente excluir o funcionário ${nome}?`)) {
      const deletado = await deletarFuncionario(id);
      if (deletado) {
        alert(`Funcionário ${nome} deletado com sucesso!`);
        window.location.reload();
      }
    }
  };

  // parte de filtros
  const [buscaNome, setBuscaNome] = useState("");
  const [buscaTipo, setBuscaTipo] = useState("");

  const funcionariosFiltrados = funcionarios.filter((func) => {
    const nomeCorresponde = func.nome
      .toLowerCase()
      .includes(buscaNome.toLowerCase());

    const tipoCorresponde = buscaTipo
      ? func.tipo?.toLowerCase() === buscaTipo.toLowerCase()
      : true;

    return nomeCorresponde && tipoCorresponde;
  });

  return (
    <Container className="mt-4">
      <h2 className="mb-4">Visualizar Funcionários</h2>

      <Card className="mb-4 shadow-sm">
        <Card.Body>
          <Row className="align-items-center">
            <Col md={8}>
              <InputGroup className="mb-3">
                <InputGroup.Text className="bg-custom-blue text-white">
                  <BsSearch />
                </InputGroup.Text>
                <Form.Control
                  placeholder="Procurar um Funcionário"
                  value={buscaNome}
                  onChange={(e) => setBuscaNome(e.target.value)}
                />
              </InputGroup>
            </Col>
            <Col md={4} className="text-end">
              <DropdownButton
                id="dropdown-categoria-func"
                title={buscaTipo || "Todas as categorias"}
                variant="secondary"
                className="me-2 mb-2"
              >
                <Dropdown.Item onClick={() => setBuscaTipo("")}>
                  Todas
                </Dropdown.Item>
                <Dropdown.Item onClick={() => setBuscaTipo("PF")}>
                  PF
                </Dropdown.Item>
                <Dropdown.Item onClick={() => setBuscaTipo("PJ")}>
                  PJ
                </Dropdown.Item>
              </DropdownButton>

              <Link to="/funcionario/cadastrar">
                <Button variant="success" className="mb-2">
                  Cadastrar novo funcionário
                </Button>
              </Link>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Id</th>
            <th>Nome Completo</th>
            <th>Email</th>
            <th>Categoria</th>
            <th>CPF/CNPJ</th>
            <th>Telefone</th>
            <th>Cargo</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {funcionariosFiltrados.length > 0 ? (
            funcionariosFiltrados.map((func) => (
              <tr key={func.id}>
                <td>{func.id}</td>
                <td>{func.nome}</td>
                <td>{func.email}</td>
                <td>{func.tipo}</td>
                <td>{func.cpf_cnpj}</td>
                <td>{func.telefone}</td>
                <td>{func.cargo}</td>
                <td>
                  <div style={{ display: "flex", gap: "8px" }}>
                    <Button
                      as={Link}
                      to={`/funcionario/editar/${func.id}`}
                      size="sm"
                      variant="warning"
                    >
                      Editar
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDelete(func.id, func.nome)}
                    >
                      Excluir
                    </Button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={8} className="text-center">
                Nenhum cliente encontrado
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </Container>
  );
};

export default VerFuncionario;
