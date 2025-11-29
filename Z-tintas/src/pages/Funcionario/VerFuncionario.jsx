import { useState } from 'react'
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
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
    
    <div>
        <h1 className="text-center"> Ver Funcionários </h1>
              {/* INICIO FILTRO */}
      <div className="w-75 mx-auto d-flex justify-content-center gap-2 flex-wrap">
        {/* Caixinha */}
          <InputGroup className="mb-3" style={{maxWidth:"400px"}}>
            <Form.Control
              placeholder="Procurar um Funcionario"
              value={buscaNome}
              onChange={ (e) => setBuscaNome(e.target.value)}
            >

            </Form.Control>
            <Button variant="primary" id="botao-filtrar">
                <BsSearch /> Pesquisar
            </Button>
          </InputGroup>
        {/* Select */}
          <DropdownButton id="dropdown-categoria" title={buscaTipo || "Todas as categorias"} variant="secondary" className="mb-3">
            <Dropdown.Item onClick={()=> setBuscaTipo("")}>Todas</Dropdown.Item>
            <Dropdown.Item onClick={()=> setBuscaTipo("PF")}>PF</Dropdown.Item>
            <Dropdown.Item onClick={()=> setBuscaTipo("PJ")}>PJ</Dropdown.Item>
          </DropdownButton>
      </div>

      {/* FIM FILTRO */}
      {/* INICIO TABELA */}
        <Table striped bordered hover>
          {/* cABEÇALHO DA TABELA */}
          <thead>
            <tr>
              <th>Id</th>
              <th>Nome Completo</th>
              <th>Email</th>
              <th>CPF</th>
              <th>Cargo</th>
              <th>Telefone</th>
              <th>Usuario</th>
              <th>Imagem</th>
              <th></th>
            </tr>
          </thead>
          {/* CORPO DA TABELA */}
          <tbody>
            {
              funcionarios.length > 0 ?
              (
                funcionarios.map( (func) => (
                  <tr key={func.id}>
                    <td>{func.id}</td>
                    <td>{func.nome}</td>
                    <td>{func.email}</td>
                    <td>{func.cpf}</td>
                    <td>{func.cargo}</td>
                    <td>{func.numero}</td>
                    <td>{func.usuario}</td>
                    <td>{func.imagemUrl &&     <img
      src={func.imagemUrl}
      alt={`Foto de ${func.nome}`}
      style={{ width: "50px", height: "50px", objectFit: "cover", borderRadius: "4px" }}
    />}</td>
                    <td>
                      {/* Editar */}
                      <Button as={Link} to={`/funcionario/editar/${func.id }`} size="sm" variant="warning" className="mx-2">
                        Editar
                      </Button>

                      <Button size="sm" variant="danger" className="mx-2" onClick={ () => {handleDelete(func.id, func.nome)}}>
                        Excluir
                      </Button>
                    </td>
                  </tr>
                ))
              )
              :
              //Caso não haja clientes na lista
              (
                <tr>
                  <td colSpan={9} className="text-center">Nenhum cliente encontrado</td>
                </tr>
              )
            }
          </tbody>
        </Table>
      {/* FIM TABELA */}

    </div>
  )
}

export default VerFuncionario
