import { useState } from 'react'
import { Container, Table, Button, Form, Dropdown, DropdownButton, Row, Col, Card } from "react-bootstrap";
import { BsSearch } from "react-icons/bs"
import { Link } from "react-router-dom"

import{ useListarFuncionarios, useDeletaFuncionario } from "../../hooks/useFuncionarios"

const VerFuncionario = () => {
//varaivel para armazenar a lista de funcionarios
 const funcionarios = useListarFuncionarios();

 const {deletarFuncionario} = useDeletaFuncionario();

 const handleDelete = async (idFuncionario, nome)=>{
  if(confirm(`Deseja realmente excluir o funcionario ${nome}?`)){
    const deletado = await deletarFuncionario(idFuncionario)
    alert(`Cliente ${nome} deletado com sucesso!`)
    window.location.reload()
  }
 }

 //parte de filtros

 //Variaveis para os filtros
const [buscaNome,setBuscaNome] = useState("")
const [buscaTipo, setBuscaTipo] = useState("")

const funcionariosFiltrados = funcionarios.filter((func)=>{
  //verificando se o está na caixinha tem semelhança
  const nomeCorresponde = func.nome.toLowerCase().includes(buscaNome.toLowerCase())

  const tipoCorresponde = buscaTipo
  ? func.tipo?.toLowerCase() === buscaTipo.toLowerCase(): true //---------------------------------------------
   return nomeCorresponde &&  tipoCorresponde
})

  
  return (
    <Container className="mt-4">
      <h2 className="mb-4">Visualizar Funcionários Cadastrados</h2>

      {/* Filtro e ações */}
      <Card className="mb-4 shadow-sm">
        <Card.Body>
          <Row className="align-items-center">
            <Col md={6}>
              <Form.Group controlId="formBuscaFuncionario">
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
              <Form.Group controlId="formTipoFuncionario">
                <DropdownButton
                  id="dropdown-tipo-funcionario"
                  title={buscaTipo || "Filtrar por tipo"}
                  variant="outline-secondary"
                  className="w-100"
                >
                  <Dropdown.Item onClick={() => setBuscaTipo("")}>
                    Todas
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => setBuscaTipo("Gerente")}>
                    Gerente
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => setBuscaTipo("Atendente")}>
                    Atendente
                  </Dropdown.Item>
                </DropdownButton>
              </Form.Group>
            </Col>

            <Col md={3} className="text-md-end mt-3 mt-md-0">
              <Link to="/funcionario/cadastrar">
                <Button className="bg-custom-blue border-0">
                  Cadastrar Funcionário
                </Button>
              </Link>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Tabela de funcionários */}
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Id</th>
            <th>Nome Completo</th>
            <th>Email</th>
            <th>CPF</th>
            <th>Cargo</th>
            <th>Telefone</th>
            <th>Usuário</th>
            <th>Imagem</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {funcionarios.length > 0 ? (
            funcionariosFiltrados.map((func) => (
              <tr key={func.id}>
                <td>{func.id}</td>
                <td>{func.nome}</td>
                <td>{func.email}</td>
                <td>{func.cpf}</td>
                <td>{func.cargo}</td>
                <td>{func.numero}</td>
                <td>{func.usuario}</td>
                <td>
                  {func.imagemUrl && (
                    <img
                      src={func.imagemUrl}
                      alt={`Foto de ${func.nome}`}
                      style={{
                        width: "50px",
                        height: "50px",
                        objectFit: "cover",
                        borderRadius: "4px",
                      }}
                    />
                  )}
                </td>
                <td>
                  <Button
                    as={Link}
                    to={`/funcionario/editar/${func.id}`}
                    size="sm"
                    variant="outline-primary"
                    className="me-2"
                  >
                    Editar
                  </Button>

                  <Button
                    size="sm"
                    variant="outline-danger"
                    className="ms-2"
                    onClick={() => {
                      handleDelete(func.id, func.nome);
                    }}
                  >
                    Excluir
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={9} className="text-center">
                Nenhum cliente encontrado
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </Container>
  );
}

export default VerFuncionario
