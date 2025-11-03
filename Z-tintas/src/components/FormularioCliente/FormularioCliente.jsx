//Importação componentes Bootstrap
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Image from "react-bootstrap/Image";

//Importando a função useForm do pacote react-hook-form
import { useForm } from "react-hook-form";
import { useListaClientes, useCadastrarClientes, useListaCategorias} from "../../hooks/useClientes";

const FormularioCliente = (props) => {
const { cadastrarClientes } = useCadastrarClientes();



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

  const cates = useListaCategorias();
  const onSubmit =  (data) => {
      console.log("Dados:", data)
      if (props.page === "cadastrar") {
        
        
        //Envia o objeto data para o hook inserir produto
        cadastrarClientes(data)
        alert("Cliente cadastrado com sucessoa")
      }
      else {
        // Depois nóis vê
      }
  }
  // Caso tenha algum erro no formulário, mostra as mensagens de erro nos campos
  const onError = (errors) => {
      console.log("Erros:" , errors);
  }

  return(
    <div>
        <Form className="mt-3 w-full" onSubmit={handleSubmit(onSubmit,onError)}>
          <h2 className="mb-5">Dados</h2>
          <Row>
            {/* inicio caixa nome */}
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
            {/* fim caixa nome */}
            {/* inicio caixa email */}
            <Col>
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
            </Col>
            {/* fim caixa email */}
          </Row>
          <Row>
            {/* inicio caixa categoria */}
            <Col>
              <FloatingLabel
                controlId="FI-CATEGORIAS"
                label="Categoria"
                className="mb-5"
              >
                <Form.Select
                  {...register("categorias", {
                    validate: (value) => value !== "0" || "Escolha uma categoria",
                  })}
                >
                <option value="0"> Escolha um tipo </option>
                {cates.map((cat) => (
                  <option key={cat.id} value={cat.nome}>
                      {" "}
                      {cat.nome}{" "}
                  </option>
                  ))}
                </Form.Select>
                {errors.categorias && (
                  <p className="error"> {errors.categorias.message} </p>
                )}
              </FloatingLabel>        
            </Col>
            {/* fim caixa categoria */}
            {/* inicio caixa documento */}
            <Col>
              <FloatingLabel controlId="FI-DOCUMENTO" label="Documento" className="mb-5">
                <Form.Control
                  type="text"
                  {...register("documento", {
                    required: "O documento é obrigatório",
                    minLength: {
                      value: 11,
                      message: "O documento deve ter pelo menos onze caracteres",
                    },
                  })}
                ></Form.Control>
                {errors.documento && <p className="error">{errors.documento.message}</p>}
              </FloatingLabel>                   
            </Col>
            {/* fim caixa documento */}
          </Row>
          <Row>
            {/* inicio caixa numero */}
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
            {/* fim caixa numero */}
            {/* inicio caixa data nascimento */}
            <Col>
              <FloatingLabel controlId="FI-DATANASCI" label="DataNascimento" className="mb-5">
                <Form.Control
                  type="text"
                  {...register("dataNascimento", {
                    required: "A data de nascimento é obrigatório",
                    minLength: {
                      value: 8,
                      message: "A data de nascimento deve ter pelo menos 8 caracteres",
                    },
                  })}
                ></Form.Control>
                {errors.dataNascimento && <p className="error">{errors.dataNascimento.message}</p>}
              </FloatingLabel>                  
            </Col>
          </Row>
          <h2 className="mb-5">Endereço</h2>
          <Row>
            {/* inicio caixa cep */}
            <Col>
              <FloatingLabel controlId="FI-CEP" label="Cep" className="mb-5">
                <Form.Control
                  type="text"
                  {...register("cep", {
                    required: "O CEP é obrigatório",
                    minLength: {
                      value: 8,
                      message: "O CEP deve ter pelo menos 8 caracteres",
                    },
                  })}
                ></Form.Control>
                {errors.cep && <p className="error">{errors.cep.message}</p>}
              </FloatingLabel>            
            </Col>
            {/* fim caixa cep */}
            {/* incio caixa logradouro */}
            <Col>
              <FloatingLabel controlId="FI-LOGRADOURO" label="Logradouro" className="mb-5">
                <Form.Control
                  type="text"
                  {...register("logradouro", {
                    required: "O logradouro é obrigatório",
                    minLength: {
                      value: 1,
                      message: "O logradouro deve ter pelo menos 1 caracter",
                    },
                  })}
                ></Form.Control>
                {errors.logradouro && <p className="error">{errors.logradouro.message}</p>}
              </FloatingLabel>            
            </Col>
            {/* fim caixa logradouro */}
          </Row>
          <Row>
            {/* incio caixa complemento */}
            <Col>
              <FloatingLabel controlId="FI-COMPLEMENTO" label="Complemento" className="mb-5">
                <Form.Control
                  type="text"
                  {...register("complemento", {

                  
                  })}
                ></Form.Control>
                {errors.complemento && <p className="error">{errors.complemento.message}</p>}
              </FloatingLabel>                
            </Col>
            {/* fim caixa complemento */}
            {/* inicio caixa bairro */}
            <Col>
              <FloatingLabel controlId="FI-BAIRRO" label="Bairro" className="mb-5">
                <Form.Control
                  type="text"
                  {...register("bairro", {
                    required: "O bairro é obrigatório",
                    minLength: {
                      value: 1,
                      message: "O bairro deve ter pelo menos 1 caracter",
                    },
                  })}
                ></Form.Control>
                {errors.bairro && <p className="error">{errors.bairro.message}</p>}
              </FloatingLabel>              
            </Col>
            {/* fim caixa bairro */}
          </Row>
          <Row>
            {/* inicio caixa cidade */}
            <Col>
              <FloatingLabel controlId="FI-CIDADE" label="Cidade" className="mb-5">
                <Form.Control
                  type="text"
                  {...register("cidade", {
                    required: "A cidade é obrigatório",
                    minLength: {
                      value: 1,
                      message: "A cidade deve ter pelo menos 1 caracter",
                    },
                  })}
                ></Form.Control>
                {errors.cidade && <p className="error">{errors.cidade.message}</p>}
              </FloatingLabel>              
            </Col>
            {/* fim caixa cidade */}
            {/* inicio caixa uf */}
            <Col>
              <FloatingLabel controlId="FI-UF" label="Uf" className="mb-5">
                <Form.Control
                  type="text"
                  {...register("uf", {
                    required: "O UF é obrigatório",
                    minLength: {
                      value: 2,
                      message: "A UF deve ter pelo menos 2 caracter",
                    },
                  })}
                ></Form.Control>
                {errors.uf && <p className="error">{errors.uf.message}</p>}
              </FloatingLabel>    

            </Col>
            {/* fim caixa uf */}
          </Row>
          {/* botao de cadastro */}
          <Row className="justify-content-center align-items-center vh-20">
            <Col md={6} className="text-center">
              <Button variant="primary" size="lg" type="submit">
                {props.page ==="editar" ? "Atualizar" : "Cadastrar"}
              </Button>          
            </Col>
          </Row>          
        </Form>
    </div>
  )










}
export default FormularioCliente;