//Importação componentes Bootstrap
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Image from "react-bootstrap/Image";

//Importando a função useForm do pacote react-hook-form
import { useForm } from "react-hook-form";
import { useListaFuncionarios, useCadastrarFuncionario, useDeletaFuncionario, useListarFuncionarios,useBuscarFuncionarioPorId,useAtualizarFuncionarios } from "../../hooks/useFuncionarios";

//Navigate - transitar entre páginas, params - pegar o id fornecido na url 11/11/2025
import { useNavigate, useParams } from "react-router-dom";

//UseState - monitorar váriaveis e useEffect para realizar algo quando o componente cerregar 11/11/2025
import { useState, useEffect } from "react";

const FormularioFuncionario = (props) => {
  // cadastrando funcionario
const { cadastrarFuncionario } = useCadastrarFuncionario();
//usando a função de buscar o produto e atualizar 11/11/2025
const { buscarFuncionarioPorID } = useBuscarFuncionarioPorId() //mudei aqui no dia 15/11/2025
const { atualizarFuncionario } = useAtualizarFuncionarios()


//Guardando o id do produto vindo da url 11/11/2025
const { id } = useParams();
//Navigate para trocar paginas 11/11/2025
const navigate = useNavigate();
//register = cria um objeto com os valores retirados dos inputs
  //handleSubmit = envia os dados do formulario, caso dê erro ou sucesso
  //formState {erros} = objetoque guarda uma lista de erros que aconteceram na tentativa de envio

  
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset
  } = useForm();
    // FUNÇÕES QUE LIDAM COM O SUCESSO OU ERRO DO FORMULÁRIO
  // Função pra caso dê certo na validação do formulário
  // data é o objeto com as informações dos campos do formulário
  const linkImagem ="https://multilit.com.br/wp-content/uploads/2020/03/Produto-sem-foto.png"
  //variavel para armazenar o link da imagem, vindo do input
  const imagemAtual = watch("imagemUrl")

// Caso o formulário seja de edição, buscar o produto id 11/11/2025
  if(props.page ==="editar"){
    //Variavel que controla se o produto já fi carregado 11/11/2025
    const [carregado, setCarregado] = useState();
    //Effect pra buscar o produto assim que o componente for montado 11/11/2025
    useEffect(()=>{
      async function fetchFuncionario() {
        try{
          //Guarda as informações do produto na variável 11/11/2025
          const usuario = await buscarFuncionarioPorID(id)
          console.log(usuario)
          
          //Se houver produto, reseta o formulario com os dados do produto
          if(produto && !carregado){
            reset({
              nome: usuario.nome,
              email: usuario.email,
              senha: usuario.senha,
              cargo: usuario.cargo,
              imagemUrl: usuario.imagemUrl,

            })
            //Evita chamadas múltiplas do reset
            setCarregado(true)
          }
        }
        catch(erro){
          console.log("Erro ao buscar o produto: ",erro);
          alert("Produto não encontrado")
          navigate("/home")
        }
      }
      fetchFuncionario();
    },[])
  }




  const onSubmit =  (data) => {
      console.log("Dados:", data)
      if (props.page === "cadastrar") {
        console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaa");
        
        //Envia o objeto data para o hook inserir produto
        cadastrarFuncionario(data)
        alert("Funcionario cadastrado com sucessoa")
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
    <div className='text-center ' style={{border:" 1px solid #d3d3d3", padding:"20px", borderRadius:"15px"}}>
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
        <Row >
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
    
            {/* fim da Caixinha de imagem */}
            </Col>

          <Col>
              <Form.Group controlId="FI-IMAGEM" className="mb-5">
                <FloatingLabel controlId="FI-IMAGEM" label="Link da imagem" className="mb-1">
                    <Form.Control
                      type="url"
                      {...register("imagemUrl",{
                        required:"O link é obrigatório",
                        pattern:{
                          value:/^(http|https):\/\/[^"]+$/,
                          message:"Insira um link válido"
                        }})}>
                    </Form.Control>
                    {errors.imagemUrl && (<p className="error">{errors.imagemUrl.message}</p>)}
                </FloatingLabel>
                            
              </Form.Group>            

              <Image width={130} height={130} rounded src={imagemAtual == "" ? linkImagem : imagemAtual} />           
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
