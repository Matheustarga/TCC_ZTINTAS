import React from 'react'
import Button from 'react-bootstrap/esm/Button'
//Importação do navigate para transitar entre páginas
import { useNavigate } from 'react-router-dom'
import { BsDatabaseSlash } from "react-icons/bs";
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';

const PaginaErro = () => {
  const navigate = useNavigate()
  return (
    <div className='text-center'>
      <h2>Essa página não existe</h2>
      <Row>
        <Col>
          <BsDatabaseSlash fontSize={"500px"} />       
        </Col>
      </Row>
      <Row>
        <Col>
          <Button variant='danger' size='lg' style={{width:"300px",marginTop:"50px"}}  onClick={ () => { navigate("/home")}}>Voltar para home</Button>
        </Col>       
      </Row>           
    </div>
  )
}

export default PaginaErro
