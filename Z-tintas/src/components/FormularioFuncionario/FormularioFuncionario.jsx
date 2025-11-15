//Importação componentes Bootstrap
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Image from "react-bootstrap/Image";

//Importando a função useForm do pacote react-hook-form
import { useForm } from "react-hook-form";

// Hooks da API de funcionários
import {
  useCadastrarFuncionario,
  useBuscarFuncionarioPorId,
  useAtualizarFuncionarios,
} from "../../hooks/useFuncionarios";

//Navigate / params
import { useNavigate, useParams } from "react-router-dom";

// useState / useEffect
import { useState, useEffect } from "react";

const FormularioFuncionario = (props) => {
  // cadastrando funcionario
  const { cadastrarFuncionario } = useCadastrarFuncionario();
  // buscando / atualizando funcionário
  const { buscarFuncionarioPorID } = useBuscarFuncionarioPorId(); // ok
  const { atualizarFuncionario } = useAtualizarFuncionarios();

  // id vindo da URL (para edição)
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm();

  const linkImagem =
    "https://multilit.com.br/wp-content/uploads/2020/03/Produto-sem-foto.png";

  // variavel para armazenar o link da imagem, vindo do input
  const imagemAtual = watch("imagemUrl") || "";

  // controla se já carregou os dados do funcionário em modo edição
  const [carregado, setCarregado] = useState(false);

  // Se for página de edição, buscar funcionário pelo id e preencher o form
  useEffect(() => {
    async function fetchFuncionario() {
      try {
        if (props.page === "editar" && id && !carregado) {
          const usuario = await buscarFuncionarioPorID(id);
          console.log("Funcionario carregado:", usuario);

          if (usuario) {
            reset({
              nome: usuario.nome || "",
              email: usuario.email || "",
              senha: usuario.senha || "",
              cargo: usuario.cargo || "",
              cpf: usuario.cpf || "",
              numero: usuario.numero || "",
              usuario: usuario.usuario || "",
              imagemUrl: usuario.imagemUrl || "",
            });
            setCarregado(true);
          }
        }
      } catch (erro) {
        console.log("Erro ao buscar o funcionário: ", erro);
        alert("Funcionário não encontrado");
        navigate("/home");
      }
    }

    fetchFuncionario();
  }, [props.page, id, buscarFuncionarioPorID, carregado, reset, navigate]);

  // SUBMIT
  const onSubmit = async (data) => {
    try {
      console.log("Dados:", data);

      if (props.page === "cadastrar") {
        await cadastrarFuncionario(data);
        alert("Funcionário cadastrado com sucesso!");
        navigate("/home"); // ajuste a rota que quiser
      } else if (props.page === "editar") {
        await atualizarFuncionario(data, id);
        alert("Funcionário atualizado com sucesso!");
        navigate("/home"); // ajuste a rota que quiser
      }
    } catch (erro) {
      console.log("Erro ao salvar funcionário:", erro);
      alert("Ocorreu um erro ao salvar o funcionário.");
    }
  };

  const onError = (errors) => {
    console.log("Erros:", errors);
  };

  return (
    <div
      className="text-center "
      style={{ border: " 1px solid #d3d3d3", padding: "20px", borderRadius: "15px" }}
    >
      <Form className="mt-3 w-full" onSubmit={handleSubmit(onSubmit, onError)}>
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
                  },
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
                  required: "O CPF é obrigatório",
                  minLength: {
                    value: 11,
                    message: "O CPF deve ter pelo menos onze caracteres",
                  },
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
                  required: "O número é obrigatório",
                  minLength: {
                    value: 2,
                    message: "O número deve ter pelo menos dois caracteres",
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
                required: "O usuário é obrigatório",
                minLength: {
                  value: 2,
                  message: "O usuário deve ter pelo menos dois caracteres",
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
                type="password"
                {...register("senha", {
                  required: "A senha é obrigatória",
                  minLength: {
                    value: 2,
                    message: "A senha deve ter pelo menos dois caracteres",
                  },
                })}
              ></Form.Control>
              {errors.senha && <p className="error">{errors.senha.message}</p>}
            </FloatingLabel>

            <FloatingLabel
              controlId="FI-CONFSENHA"
              label="Confirmação de Senha"
              className="mb-5"
            >
              <Form.Control
                type="password"
                {...register("confsenha", {
                  required: "O campo é obrigatório",
                  minLength: {
                    value: 2,
                    message: "O campo deve ter pelo menos dois caracteres",
                  },
                })}
              ></Form.Control>
              {errors.confsenha && (
                <p className="error">{errors.confsenha.message}</p>
              )}
            </FloatingLabel>
          </Col>

          <Col>
            <Form.Group controlId="FI-IMAGEM" className="mb-5">
              <FloatingLabel
                controlId="FI-IMAGEM"
                label="Link da imagem"
                className="mb-1"
              >
                <Form.Control
                  type="url"
                  {...register("imagemUrl", {
                    required: "O link é obrigatório",
                    pattern: {
                      value: /^(http|https):\/\/[^"]+$/,
                      message: "Insira um link válido",
                    },
                  })}
                ></Form.Control>
                {errors.imagemUrl && (
                  <p className="error">{errors.imagemUrl.message}</p>
                )}
              </FloatingLabel>
            </Form.Group>

            <Image
              width={130}
              height={130}
              rounded
              src={imagemAtual === "" ? linkImagem : imagemAtual}
            />
          </Col>
        </Row>

        <Row>
          <Col>
            <Button variant="primary" size="lg" type="submit">
              {props.page === "editar" ? "Atualizar" : "Cadastrar"}
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default FormularioFuncionario;
