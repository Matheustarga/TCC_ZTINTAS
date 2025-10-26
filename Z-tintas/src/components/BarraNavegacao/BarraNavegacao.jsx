// Importando o css da barra de navegação
import styles from "./BarraNavegacao.module.css";

// Importar os componentes do bootstrap
import { Nav, Navbar, NavDropdown, Image, Accordion } from "react-bootstrap";

// Importando os links do router
import { NavLink } from "react-router-dom";

// Importar as informações do contexto autenticação de usuário
import { AuthContext } from "../../contexts/UserContext.jsx";
import { useContext } from "react";

// Importanto os icones
import { PiPaintBucketFill } from "react-icons/pi";
import { FaBoxOpen } from "react-icons/fa";
import { BsPersonLinesFill } from "react-icons/bs";
import { BsFillPersonVcardFill } from "react-icons/bs";
import { IoPersonAddSharp } from "react-icons/io5"; 
import { MdPersonSearch } from "react-icons/md";
import { FaPersonCirclePlus } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa"; 
import { RiFunctionAddFill } from "react-icons/ri";
import { TbListSearch } from "react-icons/tb"; 

const BarraNavegacao = () => {
  // importar o nome de usuario logado e funcao logout
  const { usuarioNome, logout } = useContext(AuthContext);

  // Guarda o id do usuário atual
  const idAtual = localStorage.getItem("id");

  // Guarda a imagem do usuário atual
  const imagemAtual = localStorage.getItem("imagemPerfil");

  // Imagem padrão
  const semImagem =
    "https://www.shutterstock.com/image-photo/leipzig-germany-june-18-2024-600nw-2480563319.jpg";

  return (
    <div
    
      className="d-flex flex-column flex-shrink-0 p-3 text-white bg-custom-blue min-vh-100 max-vh-100"
      style={{ width: "250px" }}
    >
      {/* Logo da empresa */}

      <Navbar.Brand
        as={NavLink}
        to="/home"
        className="text-white mb-3 "
        style={{ textAlign: "center" }}
      >
        
        <span className="fs-2 " style={{ color: "#00FFCC" }}>Z </span>
        <span className="fs-2 ms-1 me-2">Tintas</span>
      </Navbar.Brand>

      <hr className=" border-secondary" />

      {/* Opções de catalogo*/}
      <Nav className="flex-column mb-auto bg-custom-blue" >
        <Nav.Link as={NavLink} to="/catalogo" className="text-white px-2 mb-2">
          < PiPaintBucketFill className="fs-4"/>
          <span className="fs-4 ms-2 {styles.navLateral}">Catalogo</span>
        </Nav.Link>

        {/* Criando o arcordeon */}
        <Accordion flush className="flex-column mb-auto bg-custom-blue " defaultActiveKey>
          {/* Páginas estoque */}
          <Accordion.Item eventKey="0" className=" text-white bg-custom-blue">
            <Accordion.Header
              className={styles.accordionHeader}
              style={{
                display: "flex",
                alignItems: "center",
                padding: "0.75rem 0.5rem",
              }}
            >
              <FaBoxOpen className="fs-4 mb-2"/>
              <span className="ms-2 fs-4 mb-2"> Estoque </span>
            </Accordion.Header>
            <Accordion.Body className={`p-0 bg-custom-blue ${styles.accordionBody}`}>
              <Nav className="flex-column">
                {/* Opção 1 */}
                <Nav.Link
                  as={NavLink}
                  to="/produtos/cadastrar"
                  className="text-white ps-4"
                >
                  <RiFunctionAddFill className="fs-4 mb-2"/>
                  <span className="ms-2 fs-5 fs-5"> Cadastrar Item </span>
                </Nav.Link>
                {/* Opção 2 */}
                <Nav.Link
                  as={NavLink}
                  to="/produtos/consultar"
                  className="text-white ps-4"
                >
                  <TbListSearch className="fs-4 mb-2"/>
                  <span className="ms-2 fs-5 fs-5"> Consultar Item </span>
                </Nav.Link>
              </Nav>
            </Accordion.Body>
          </Accordion.Item>
          {/* fim estoque */}

          {/* Páginas clientes */}
          <Accordion.Item eventKey="1" className=" text-white bg-custom-blue">
            <Accordion.Header
              className={styles.accordionHeader}
              style={{
                display: "flex",
                alignItems: "center",
                padding: "0.75rem 0.5rem",
              }}
            >
              <BsPersonLinesFill className="fs-4 mb-2"/>
              <span className="ms-2 fs-4 mb-2"> Clientes </span>
            </Accordion.Header>
            <Accordion.Body className={`p-0 bg-custom-blue ${styles.accordionBody}`}>
              <Nav className="flex-column">
                {/* Opção 1 */}
                <Nav.Link
                  as={NavLink}
                  to="/clientes/cadastrar"
                  className="text-white ps-4"
                >
                  <IoPersonAddSharp className="fs-4 mb-2"/>
                  <span className="ms-2 fs-5 fs-5"> Cadastrar Cliente </span>
                </Nav.Link>
                {/* Opção 2 */}
                <Nav.Link
                  as={NavLink}
                  to="/clientes/consultar"
                  className="text-white ps-4"
                >
                  <MdPersonSearch className="fs-4 mb-2"/>
                  <span className="ms-2 fs-5 fs-5"> Consultar Cliente</span>
                </Nav.Link>
              </Nav>
            </Accordion.Body>
          </Accordion.Item>
          {/* fim clientes */}

          {/* Páginas funcionarios */}
          <Accordion.Item eventKey="2" className="bg-custom-blue text-white">
            <Accordion.Header
              className={styles.accordionHeader}
              style={{
                display: "flex",
                alignItems: "center",
                padding: "0.75rem 0.5rem",
              }}
            >
              <BsFillPersonVcardFill className="fs-4 mb-2"/>
              <span className="ms-2 fs-4 mb-2"> Funcionarios </span>
            </Accordion.Header>
            <Accordion.Body className={`p-0 bg-custom-blue ${styles.accordionBody}`}>
              <Nav className="flex-column">
                {/* Opção 1 */}
                <Nav.Link
                  as={NavLink}
                  to="/produtos/cadastrar"
                  className="text-white ps-4"
                >
                  <FaPersonCirclePlus className="fs-4 mb-2"/>
                  <span className="ms-2 fs-5 fs-5">
                    Cadastrar Funcionarios
                  </span>
                </Nav.Link>
                {/* Opção 2 */}
                <Nav.Link
                  as={NavLink}
                  to="/produtos/consultar"
                  className="text-white ps-4"
                >
                  <FaSearch className="fs-4 mb-2"/>
                  <span className="ms-2 fs-5 fs-5">                  
                    Consultar Funcionarios
                  </span>
                </Nav.Link>
              </Nav>
            </Accordion.Body>
          </Accordion.Item>
          {/* fim funcionarios */}
        </Accordion>
      </Nav>

      

      {/* Visualizar foto e nome do perfil, e opções */}
      <Nav className=" dropdown pb-4">
        <NavDropdown
          title={
            <span className=" text-white align-items-center">
              <Image
                src={imagemAtual == "null" ? semImagem : imagemAtual}
                width={60}
                height={60}
                roundedCircle
                className="ms-5 mt-1 me-3"
              />
              
            </span>
          }
          menuVariant="dark"
        >
          {/* Opção de editar o perfil */}
          <NavDropdown.Item as={NavLink} to={`/funcionarios/editar/${idAtual}`}>
            Editar
          </NavDropdown.Item>

          {/* Voltar pra tela de login */}
          <NavDropdown.Item as={NavLink} to="/login" onClick={logout}>
            Sair
          </NavDropdown.Item>
        </NavDropdown>
      </Nav>
    </div>
  );
};

export default BarraNavegacao;
