import { Children } from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import PaginaErro from "./pages/PaginaErro";
import Login from "./pages/Login";
import Catalogo from "./pages/Catalogo";
import Estoque from "./pages/Estoque";
import Funcionario from "./pages/Funcionario";
import Home from "./pages/Home";
import RotasProtegidas from "./pages/RotasProtegidas";

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
            }
        ]
    }
 ])
export default router;
