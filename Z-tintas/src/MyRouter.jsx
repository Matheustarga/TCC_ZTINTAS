import { Children } from "react";
import { createBrowserRouter } from "react-router-dom"
import App from "./App";
import PaginaErro from "./pages/PaginaErro";
import Login from "./pages/Login";
import Catalogo from "./pages/Catalogo";
import Estoque from "./pages/Estoque";
import Funcionario from "./pages/Funcionario";


const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>, //elemento pai
        errorElement:<PaginaErro/>,
        Children:[
            {
                path:"login", // elemento login, que apos a validação de efetivaçao do login deverá ter as telas de Estoque,Funcionarios e Catalogo como filhos.
                element: <Login/>,
                Children:[
                    { //Primeiro filho
                        path:"/catalogo",
                        element:<Catalogo />
                    },
                    { // Segundo Filho
                            path: "/estoque",
                            element: <Estoque />
                    }, 
                    {//Terceiro Filho
                        path: "/funcionario",
                        element: <Funcionario />
                    }
                ]
            }//provavelmente terei que fazer alteraçoes, preciso perguntar ao gregory sobre as rotas protegidas



        ]
    }
])

export default router;