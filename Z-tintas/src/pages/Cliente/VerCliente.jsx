import React from 'react'
import { useState } from 'react'
import { Container, Table, Button, Form, Dropdown, DropdownButton, Row, Col, Card } from "react-bootstrap";
import { BsSearch } from "react-icons/bs"
import { Link } from "react-router-dom"

import { useListarClientes, useDeletaClientes } from "../../hooks/useClientes"

const VerCliente = () => {

  const cliente = useListarClientes();
  const { deletarCliente } = useDeletaClientes(); // <-- CORRIGIDO

  const handleDelete = async (idCliente, nome) => {
    if (confirm(`Deseja realmente excluir o cliente ${nome}?`)) {
      const deletado = await deletarCliente(idCliente); // <-- CORRIGIDO
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
      <h2 className="mb-4">Visualizar Clientes Cadastrados</h2>

      {/* Filtro e ações */}
      <Card className="mb-4 shadow-sm">
        <Card.Body>
          <Row className="align-items-center">
            <Col md={6}>
              <Form.Group controlId="formBuscaCliente">
                <div className="input-group">
                  <span className="input-group-text bg-custom-blue text-white">
                    <BsSearch />
                  </span>
                  <Form.Control
                    type="text"
                    placeholder="Buscar por nome..."
                    value={buscaNome}
                    onChange={(e) => setBuscaNome(e.target.value)}
                  />
                </div>
              </Form.Group>
            </Col>

            <Col md={3} className="mt-3 mt-md-0">
              <Form.Group controlId="formTipoCliente">
                <DropdownButton
                  id="dropdown-tipo-cliente"
                  title={buscaTipo || "Filtrar por tipo"}
                  variant="outline-secondary"
                  className="w-100"
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
              </Form.Group>
            </Col>

            <Col md={3} className="text-md-end mt-3 mt-md-0">
              <Link to="/cliente/cadastrar">
                <Button className="bg-custom-blue border-0">
                  Cadastrar Cliente
                </Button>
              </Link>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Tabela de clientes */}
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Id</th>
            <th>Nome Completo</th>
            <th>Email</th>
            <th>Categoria</th>
            <th>CPF/CNPJ</th>
            <th>Telefone</th>
            <th>Data de Nascimento</th>
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
          {cliente.length > 0 ? (
            clientesFiltrados.map((clien) => (
              <tr key={clien.id}>
                <td>{clien.id}</td>
                <td>{clien.nome}</td>
                <td>{clien.email}</td>
                <td>{clien.categorias}</td>
                <td>{clien.documento}</td>
                <td>{clien.numero}</td>
                <td>{clien.dataNascimento}</td>
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
                      variant="outline-primary"
                    >
                      Editar
                    </Button>
                    <Button
                      size="sm"
                      variant="outline-danger"
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