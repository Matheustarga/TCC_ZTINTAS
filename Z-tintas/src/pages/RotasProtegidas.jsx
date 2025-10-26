import React from 'react'
import { Outlet, Navigate } from "react-router-dom"

// Importação dos componentes do bootstrap
import Container from "react-bootstrap/Container"

// Importar as informações do contexto autenticação de usuário
import { AuthContext } from "../contexts/UserContext.jsx"
import { useContext } from "react";
import BarraNavegacao from "../components/BarraNavegacao/BarraNavegacao.jsx";


const RotasProtegidas = () => {
//pega a variavel de usuario nome para saber se tem alguem logado
  const {usuarioNome} = useContext(AuthContext);
  if(usuarioNome === "Visitante"){
    return <Navigate to="/login"/>
  }



  return (
    <div className='App d-flex'>
      {/* Barra de navegação lateral */}
          <div className="position-fixed top-0 start-0 min-vh-100 bg-danger">
      <BarraNavegacao />
     </div>

      {/* Conteudo principal, dependendo de qual rota está */}
      <div className='d-flex flex-column min-vh-100 flex-grow-1 p-2 justify-content-center' style={{marginLeft:"350px"}}>
        <Container fluid>
          <h1>Conteúdo Principal</h1>
        </Container>
      </div>      
    </div>
  )
}

export default RotasProtegidas
