import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useListaCategorias } from "../../hooks/useClientes";

import {
  useCadastrarClientes,
  useBuscarClientesPorId,
  useAtualizarClientes,
} from "../../hooks/useClientes";

import { useParams, useNavigate } from "react-router-dom";

const FormularioCliente = ({ page }) => {
  const { cadastrarClientes } = useCadastrarClientes();
  const { buscarClientesID } = useBuscarClientesPorId();
  const { atualizarCliente } = useAtualizarClientes();

  const navigate = useNavigate();
  const { id } = useParams();
  const cates = useListaCategorias();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [carregado, setCarregado] = useState(false);

  useEffect(() => {
    async function fetchCliente() {
      try {
        if (page === "editar" && id && !carregado) {
          const cliente = await buscarClientesID(id);

          if (cliente) {
            reset({
              nome: cliente.nome || "",
              email: cliente.email || "",
              categorias: cliente.categorias || "",
              documento: cliente.documento || "",
              numero: cliente.numero || "",
              dataNascimento: cliente.dataNascimento || "",
              cep: cliente.cep || "",
              logradouro: cliente.logradouro || "",
              complemento: cliente.complemento || "",
              bairro: cliente.bairro || "",
              cidade: cliente.cidade || "",
              uf: cliente.uf || "",
            });
            setCarregado(true);
          }
        }
      } catch (erro) {
        console.log("Erro ao buscar cliente:", erro);
        alert("Cliente não encontrado");
        navigate("/home");
      }
    }

    fetchCliente();
  }, [page, id, carregado, buscarClientesID, reset, navigate]);

  const onSubmit = async (data) => {
    try {
      if (page === "cadastrar") {
        await cadastrarClientes(data);
        alert("Cliente cadastrado com sucesso!");
        navigate("/home");
      } else if (page === "editar") {
        await atualizarCliente(data, id);
        alert("Cliente atualizado com sucesso!");
        navigate("/home");
      }
    } catch (erro) {
      console.log("Erro ao salvar:", erro);
      alert("Erro ao salvar o cliente.");
    }
  };

  return (
    <div>
      <Form className="mt-3 w-full" onSubmit={handleSubmit(onSubmit)}>
        <h2 className="mb-5">Dados</h2>
        <Row>
          <Col>
            <FloatingLabel controlId="FI-NOME" label="Nome" className="mb-5">
              <Form.Control
                type="text"
                {...register("nome", {
                  required: "O Nome é obrigatório",
                  minLength: { value: 2, message: "Mínimo 2 caracteres" },
                })}
              />
              {errors.nome && <p className="error">{errors.nome.message}</p>}
            </FloatingLabel>
          </Col>

          <Col>
            <FloatingLabel controlId="FI-EMAIL" label="E-mail" className="mb-5">
              <Form.Control
                type="text"
                {...register("email", {
                  required: "O email é obrigatório",
                })}
              />
              {errors.email && <p className="error">{errors.email.message}</p>}
            </FloatingLabel>
          </Col>
        </Row>

        <Row>
          <Col>
            <FloatingLabel controlId="FI-CATEGORIAS" label="Categoria" className="mb-5">
              <Form.Select
                {...register("categorias", {
                  validate: (value) => value !== "0" || "Escolha uma categoria",
                })}
              >
                <option value="0">Escolha um tipo</option>
                {cates.map((cat) => (
                  <option key={cat.id} value={cat.nome}>{cat.nome}</option>
                ))}
              </Form.Select>
            </FloatingLabel>
          </Col>

          <Col>
            <FloatingLabel controlId="FI-DOCUMENTO" label="Documento" className="mb-5">
              <Form.Control
                type="text"
                {...register("documento", {
                  required: "O documento é obrigatório",
                })}
              />
            </FloatingLabel>
          </Col>
        </Row>

        <Row>
          <Col>
            <FloatingLabel controlId="FI-NUMERO" label="Numero" className="mb-5">
              <Form.Control
                type="text"
                {...register("numero", { required: true })}
              />
            </FloatingLabel>
          </Col>

          <Col>
            <FloatingLabel controlId="FI-DATANASCI" label="DataNascimento" className="mb-5">
              <Form.Control
                type="text"
                {...register("dataNascimento", { required: true })}
              />
            </FloatingLabel>
          </Col>
        </Row>

        <h2 className="mb-5">Endereço</h2>

        <Row>
          <Col>
            <FloatingLabel controlId="FI-CEP" label="Cep" className="mb-5">
              <Form.Control type="text" {...register("cep", { required: true })} />
            </FloatingLabel>
          </Col>

          <Col>
            <FloatingLabel controlId="FI-LOGRADOURO" label="Logradouro" className="mb-5">
              <Form.Control type="text" {...register("logradouro", { required: true })} />
            </FloatingLabel>
          </Col>
        </Row>

        <Row>
          <Col>
            <FloatingLabel controlId="FI-COMPLEMENTO" label="Complemento" className="mb-5">
              <Form.Control type="text" {...register("complemento")} />
            </FloatingLabel>
          </Col>

          <Col>
            <FloatingLabel controlId="FI-BAIRRO" label="Bairro" className="mb-5">
              <Form.Control type="text" {...register("bairro", { required: true })} />
            </FloatingLabel>
          </Col>
        </Row>

        <Row>
          <Col>
            <FloatingLabel controlId="FI-CIDADE" label="Cidade" className="mb-5">
              <Form.Control type="text" {...register("cidade", { required: true })} />
            </FloatingLabel>
          </Col>

          <Col>
            <FloatingLabel controlId="FI-UF" label="UF" className="mb-5">
              <Form.Control type="text" {...register("uf", { required: true })} />
            </FloatingLabel>
          </Col>
        </Row>

        <Row className="justify-content-center align-items-center vh-20">
          <Col md={6} className="text-center">
            <Button variant="primary" size="lg" type="submit">
              {page === "editar" ? "Atualizar" : "Cadastrar"}
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default FormularioCliente;