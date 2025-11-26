import React from 'react'
import { useState } from 'react'
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
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
    <div>
      <h1 className="text-center"> Ver Cliente </h1>

      {/* FILTRO */}
      <div className="w-75 mx-auto d-flex justify-content-center gap-2 flex-wrap">

        {/* Caixinha pesquisa */}
        <InputGroup className="mb-3" style={{ maxWidth: "400px" }}>
          <Form.Control
            placeholder="Procurar um Cliente"
            value={buscaNome}
            onChange={(e) => setBuscaNome(e.target.value)}
          />
          <Button variant="primary" id="botao-filtrar">
            <BsSearch /> Pesquisar
          </Button>
        </InputGroup>

        {/* Dropdown */}
        <DropdownButton
          id="dropdown-categoria"
          title={buscaTipo || "Todas as categorias"}
          variant="secondary"
          className="mb-3"
        >
          <Dropdown.Item onClick={() => setBuscaTipo("")}>Todas</Dropdown.Item>
          <Dropdown.Item onClick={() => setBuscaTipo("PF")}>PF</Dropdown.Item>
          <Dropdown.Item onClick={() => setBuscaTipo("PJ")}>PJ</Dropdown.Item>
        </DropdownButton>
      </div>

      {/* TABELA */}
      <Table striped bordered hover>
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
            cliente.map((clien) => (
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
                      variant="warning"
                    >
                      Editar
                    </Button>

                    <Button
                      size="sm"
                      variant="danger"
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
    </div>
  );
};

export default VerCliente;