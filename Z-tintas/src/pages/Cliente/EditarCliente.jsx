import FormularioCliente from "../../components/FormularioCliente/FormularioCliente.jsx";
import { Container } from "react-bootstrap";




const EditarCliente = () => {
  return (
    <div>
      <Container>
        <h1 className="text-center">Editar Cliente</h1>
        <FormularioCliente page="editar" />
      </Container>
    </div>
  )
}

export default EditarCliente
