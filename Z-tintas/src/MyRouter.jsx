import { Children } from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import PaginaErro from "./pages/PaginaErro";
import Login from "./pages/Login";
import Catalogo from "./pages/Catalogo";
import Estoque from "./pages/Estoque";
import Funcionario from "./pages/Funcionario";
import Home from "./pages/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <PaginaErro />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "login",
        children: [
          {
            index: true,
            element: <Login />,
          },
          {
            path: "catalogo",
            element: <Catalogo />,
          },
        ],
      },
      {
        path: "funcionario",
        element: <Funcionario />,
      },
      {
        path: "estoque",
        element: <Estoque />,
      },
      {
        path: "catalogo",
        element: <Catalogo />,
      },
    ],
  },
]);

export default router;
