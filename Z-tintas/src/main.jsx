import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// 1 - configurando router
import {RouterProvider} from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'
import MyRouter from "./MyRouter.jsx"
import { AuthProvider } from './contexts/UserContext.jsx'; //importando os dados de login

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      {/* Faz o provedor utilizar as rotas que você definiu no MyRouter */}
      <RouterProvider router={MyRouter}/> 
    </AuthProvider>
  </StrictMode>,
)
