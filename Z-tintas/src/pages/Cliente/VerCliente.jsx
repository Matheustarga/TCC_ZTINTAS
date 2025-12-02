import React from 'react';
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

import { useListarClientes, useDeletaClientes } from "../../hooks/useClientes";

const VerCliente = () => {
  const cliente = useListarClientes();
  const { deletarCliente } = useDeletaClientes(); // <-- mantém lógica original

  const handleDelete = async (idCliente, nome) => {
    if (confirm(`Deseja realmente excluir o cliente ${nome}?`)) {
      const deletado = await deletarCliente(idCliente);
      alert(`Cliente ${nome} deletado com sucesso!`);
      window.location.reload();
    }
  };

  const [buscaNome, setBuscaNome] = useState("");
  const [buscaTipo, setBuscaTipo] = useState("");

  const clientesFiltrados = cliente.filter((clien) => {
    const nomeCorresponde =
      clien.nome.toLowerCase().includes(buscaNome.toLowerCase());

    const tipoCorresponde = buscaTipo
      ? clien.tipo?.toLowerCase() === buscaTipo.toLowerCase()
      : true;

    return nomeCorresponde && tipoCorresponde;
  });

  return (
    <Container className="mt-4">
      <h2 className="mb-4">Visualizar Clientes</h2>

      <Card className="mb-4 shadow-sm">
        <Card.Body>
          <Row className="align-items-center">
            <Col md={8}>
              <InputGroup className="mb-3">
                <InputGroup.Text className="bg-custom-blue text-white">
                  <BsSearch />
                </InputGroup.Text>
                <Form.Control
                  placeholder="Procurar um Cliente"
                  value={buscaNome}
                  onChange={(e) => setBuscaNome(e.target.value)}
                />
              </InputGroup>
            </Col>
            <Col md={4} className="text-end">
              <DropdownButton
                id="dropdown-categoria-cliente"
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

              <Link to="/cliente">
                <Button variant="success" className="mb-2">
                  Cadastrar novo cliente
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
            {/* <th>Data de Nascimento</th> */}
            <th>Cep</th>
            <th>Logradouro</th>
            <th>Complemento</th>
            <th>Bairro</th>
            <th>Cidade</th>
            <th>UF</th>
            <th>Ações</th>
          </tr>
        </thead>

        <tbody>
          {clientesFiltrados.length > 0 ? (
            clientesFiltrados.map((clien) => (
              <tr key={clien.id}>
                <td>{clien.id}</td>
                <td>{clien.nome}</td>
                <td>{clien.email}</td>
                <td>{clien.tipo}</td>
                <td>{clien.cpf_cnpj}</td>
                <td>{clien.telefone}</td>
                {/* <td>{clien.data_nascimento}</td> */}
                <td>{clien.cep}</td>
                <td>{clien.logradouro}</td>
                <td>{clien.complemento}</td>
                <td>{clien.bairro}</td>
                <td>{clien.cidade}</td>
                <td>{clien.uf}</td>
                <td>
                  <div style={{ display: "flex", gap: "8px" }}>
                    <Button
                      as={Link}
                      to={`/cliente/editar/${clien.id}`}
                      size="sm"
                      variant="warning"
                    >
                      Editar
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDelete(clien.id, clien.nome)}
                    >
                      Excluir
                    </Button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={14} className="text-center">
                Nenhum cliente encontrado
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </Container>
  );
};

export default VerCliente;
