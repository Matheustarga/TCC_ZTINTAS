import { Children } from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import PaginaErro from "./pages/PaginaErro";
import Login from "./pages/Login";
import Home from "./pages/Home";
import RotasProtegidas from "./pages/RotasProtegidas";
import Catalogo from "./pages/Catalogo"

// Importação Cliente
import VerCliente from "./pages/Cliente/VerCliente"
import CadastrarCliente from "./pages/Cliente/CadastrarCliente"
import EditarCliente from "./pages/Cliente/EditarCliente"

// Importação Estoque
import VerTintas from "./pages/Estoque/VerTintas"
import VerTinta from "./pages/Estoque/VerTintas"
import CadastrarEstoque from "./pages/Estoque/CadastrarEstoque"
import EditarTinta from "./pages/Estoque/EditarTinta"


// Importação Funcionario

import VerFuncionario from "./pages/Funcionario/VerFuncionario"
import CadastrarFuncionario from "./pages/Funcionario/CadastrarFuncionario"
import EditarFuncionario from "./pages/Funcionario/EditarFuncionario"




const router = createBrowserRouter([
  {
        path:"/",
        element: <App />,
        errorElement: <PaginaErro />,
        children: [
            {
                index: true,
                element: <Login />
            },
            {
                path:"login",
                element: <Login />
            }
        ]
    },
    {
        path: "/",
        element: <RotasProtegidas />,
        errorElement: <PaginaErro />,
        children:[
            {
                path: "home",
                element: <Home />
            },
            // Criando rota de Catalogo
            {
                path: "catalogo",
                element:<Catalogo />
            },
            // Criando rota de Cliente
            {
                path: "cliente",
                children:[
                    {
                        index: true,
                        element: <CadastrarCliente />
                    },
                    {
                        path: "consultar",
                        element: <VerCliente />
                    },
                    {
                        path: "editar/:id",
                        element: <EditarCliente />
                    }
                ]
            },
            // Criando rota de Estoque
            {
                path: "estoque",
                children:[
                    {
                        index: true,
                        element: <CadastrarEstoque />
                    },
                    {
                        path: "consultar",
                        element: <EditarTinta />
                    },
                    {
                        path: "tintas",
                        element: <VerTintas />
                    },
                    {
                        path: "editar/:id",
                        element: <EditarTinta />
                    }                
                ]
            },
            // Criando rota de Funcionario
            {
                path: "funcionario",
                children:[
                    {
                        index: true,
                        element: <CadastrarFuncionario />
                    },
                    {
                        path: "consultar",
                        element: <VerFuncionario />
                    },
                    {
                        path: "editar/:id",
                        element: <EditarFuncionario />
                    }
                ]
            }
            

        ]
    }
 ])
export default router;
