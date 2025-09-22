import { NavLink,Link } from "react-router-dom"

const NavBar = () => {
  return (
    
    <nav>
        <NavLink to="/login">Login </NavLink>
        <NavLink to="/">Home </NavLink>
        <NavLink to="/funcionario">Funcionarios </NavLink>
        <NavLink to="/estoque">Estoque </NavLink>
        <NavLink to="/catalogo">Catalogo </NavLink>

    </nav>
        
             
        
    
  )
}

export default NavBar
