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


import{ useListarCliente, useDeletaCliente } from "../../hooks/useClientes"

const VerCliente = () => {

const cliente = useListarCliente();

const {deletarCliente} = useDeletaCliente();

const handleDelete = async (idCliente, nome)=>{
  if(confirm(`Deseja realmente excluir o funcionario ${nome}?`)){
    const deletado = await deletarFuncionario(idCliente)
    alert(`Cliente ${nome} deletado com sucesso!`)
    window.location.reload()
  }
 }

const [buscaNome,setBuscaNome] = useState("")
const [buscaTipo, setBuscaTipo] = useState("")

const clientesFiltrados = cliente.filter((func)=>{
  //verificando se o está na caixinha tem semelhança
  const nomeCorresponde = func.nome.toLowerCase().includes(buscaNome.toLowerCase())

  const tipoCorresponde = buscaTipo
  ? func.tipo?.toLowerCase() === buscaTipo.toLowerCase(): true //---------------------------------------------
   return nomeCorresponde &&  tipoCorresponde
})

  return (
    <div>
      <h1 className="text-center"> Ver Cliente </h1>


      {/* INICIO FILTRO */}
      <div className="w-75 mx-auto d-flex justify-content-center gap-2 flex-wrap">
        {/* Caixinha */}
          <InputGroup className="mb-3" style={{maxWidth:"400px"}}>
            <Form.Control
              placeholder="Procurar um Cliente"
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

      
    </div>
  )
}

export default VerCliente
