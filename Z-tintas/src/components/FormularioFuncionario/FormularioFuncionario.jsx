//Importação componentes Bootstrap
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Image from "react-bootstrap/Image";

//Importando a função useForm do pacote react-hook-form
import { useForm } from "react-hook-form";
import { useListaFuncionarios, useCadastrarFuncionario } from "../../hooks/useFuncionarios";

const FormularioFuncionario = (props) => {
const {cadastrarFuncionario} = useCadastrarFuncionario();

//register = cria um objeto com os valores retirados dos inputs
  //handleSubmit = envia os dados do formulario, caso dê erro ou sucesso
  //formState {erros} = objetoque guarda uma lista de erros que aconteceram na tentativa de envio

  
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm();
    // FUNÇÕES QUE LIDAM COM O SUCESSO OU ERRO DO FORMULÁRIO
  // Função pra caso dê certo na validação do formulário
  // data é o objeto com as informações dos campos do formulário
  const onSubmit = async (data) => {
      console.log("Dados:", data)
      if (props.page === "cadastro") {
        //Envia o objeto data para o hook inserir produto
       await cadastrarFuncionario(data)
        alert("Funcionario cadastrado com sucesso")
      }
      else {
        // Depois nóis vê
      }
  }
  // Caso tenha algum erro no formulário, mostra as mensagens de erro nos campos
  const onError = (errors) => {
      console.log("Erros:" , errors);
  }
  return (
    <div className='text-center'>
      <Form className="mt-3 w-full" onSubmit={handleSubmit(onSubmit,onError)}>
        <Row>
          <Col>
            <FloatingLabel controlId="FI-NOME" label="Nome" className="mb-5">
              <Form.Control
                type="text"
                {...register("nome", {
                  required: "O Nome é obrigatório",
                  minLength: {
                    value: 2,
                    message: "O Nome deve ter pelo menos dois caracteres",
                  }
                })}
              ></Form.Control>
              {errors.nome && <p className="error">{errors.nome.message}</p>}
            </FloatingLabel>          
          </Col>
          <Col>
            <FloatingLabel controlId="FI-CPF" label="CPF" className="mb-5">
              <Form.Control
                type="text"
                {...register("cpf", {
                  required: "O Nome é obrigatório",
                  minLength: {
                    value: 11,
                    message: "O CPF deve ter pelo menos onze caracteres",
                  }

                })}
              ></Form.Control>
              {errors.cpf && <p className="error">{errors.cpf.message}</p>}
            </FloatingLabel>          
          </Col>         
        </Row>
        <Row>
          <Col>
            <FloatingLabel controlId="FI-CARGO" label="Cargo" className="mb-5">
              <Form.Control
                type="text"
                {...register("cargo", {
                  required: "O cargo é obrigatório",
                  minLength: {
                    value: 2,
                    message: "O cargo deve ter pelo menos dois caracteres",
                  },

                })}
              ></Form.Control>
              {errors.cargo && <p className="error">{errors.cargo.message}</p>}
            </FloatingLabel>           
          </Col>
          <Col>
            <FloatingLabel controlId="FI-NUMERO" label="Numero" className="mb-5">
              <Form.Control
                type="text"
                {...register("numero", {
                  required: "O numero é obrigatório",
                  minLength: {
                    value: 2,
                    message: "O numero deve ter pelo menos dois caracteres",
                  },

                })}
              ></Form.Control>
              {errors.numero && <p className="error">{errors.numero.message}</p>}
            </FloatingLabel>           
          </Col>
        </Row>
        <Row>
            <FloatingLabel controlId="FI-EMAIL" label="E-mail" className="mb-5">
              <Form.Control
                type="text"
                {...register("email", {
                  required: "O email é obrigatório",
                  minLength: {
                    value: 2,
                    message: "O email deve ter pelo menos dois caracteres",
                  },

                })}
              ></Form.Control>
              {errors.email && <p className="error">{errors.email.message}</p>}
            </FloatingLabel>              
        </Row>
        <Row>
            <FloatingLabel controlId="FI-USUARIO" label="Usuário" className="mb-5">
              <Form.Control
                type="text"
                {...register("usuario", {
                  required: "O usuario é obrigatório",
                  minLength: {
                    value: 2,
                    message: "O usuario deve ter pelo menos dois caracteres",
                  },

                })}
              ></Form.Control>
              {errors.usuario && <p className="error">{errors.usuario.message}</p>}
            </FloatingLabel>           
        </Row>
        <Row>
          <Col>
            <FloatingLabel controlId="FI-SENHA" label="Senha" className="mb-5">
              <Form.Control
                type="text"
                {...register("senha", {
                  required: "O senha é obrigatório",
                  minLength: {
                    value: 2,
                    message: "O senha deve ter pelo menos dois caracteres",
                  },

                })}
              ></Form.Control>
              {errors.senha && <p className="error">{errors.senha.message}</p>}
            </FloatingLabel>            
          </Col>
          <Col>
            <FloatingLabel controlId="FI-CONFSENHA" label="Confirmação de Senha" className="mb-5">
              <Form.Control
                type="text"
                {...register("confsenha", {
                  required: "O campo é obrigatório",
                  minLength: {
                    value: 2,
                    message: "O campo deve ter pelo menos dois caracteres",
                  },

                })}
              ></Form.Control>
              {errors.confsenha && <p className="error">{errors.confsenha.message}</p>}
            </FloatingLabel>           
          </Col>
        </Row>
        <Row>
          <Col>
            <Button variant="primary" size="lg" type="submit">
              {props.page ==="editar" ? "Atualizar" : "Cadastrar"}
            </Button>          
          </Col>

        </Row>
      </Form>
    </div>
  )
}

export default FormularioFuncionario
