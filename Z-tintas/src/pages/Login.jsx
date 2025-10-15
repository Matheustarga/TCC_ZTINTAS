import React from "react";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
//importação icone login
import { BsSteam } from "react-icons/bs";
//importando o hook para verificar o login, vindo de useUsuarios
import { useVerificaLogin } from "../hooks/useUsuarios";
//Importando a função useForm do pacote react-hook-form
import { useForm } from "react-hook-form";
//Importando o useState para tratar de variáveis
import { useState } from "react";
//importação do Navigate para transitar entra as páginas
import { useNavigate } from "react-router-dom";
import  imgTelaLogin  from "../assets/imgTelaLogin.png";

const Login = () => {
  const navigate = useNavigate();
  //register = cria um objeto com os valores retirados dos inputs
  //handleSubmit = envia os dados do formulario, caso dê erro ou sucesso
  //formState {erros} = objetoque guarda uma lista de erros que aconteceram na tentativa de envio
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  //varaivel da classe do alert
  const [alertaClasse, setAlertaClasse] = useState("d-none");

  const { verificaLogin } = useVerificaLogin();
  //caso o envio dê certo
  //data = objeto com todas as informações preenchidas nos campos do formulário
  const onSubmit = (data) => {
    console.log("Dados enviados: ", data);
    const resposta = verificaLogin(data);
    //caso a resposta seja positiva mostra o alerta e leva ele pra home
    if (resposta === "Login Efetuado com sucesso") {
      alert(resposta);
      navigate("/home");
    } //se não, envia o alerta para exibir
    else {
      setAlertaClasse("my-3 w-75 mx-auto");
    }
  };
  // caso o envio dê errado
  //erros = objeto com todos os erros do envio
  const onError = (erros) => {
    console.log("Erros: ", erros);
  };
  return (
    <div>
      <Container className="justify-content-center align-content-center min-vh-100">
        <Row>
          <Col>
            <img src={imgTelaLogin} />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;
